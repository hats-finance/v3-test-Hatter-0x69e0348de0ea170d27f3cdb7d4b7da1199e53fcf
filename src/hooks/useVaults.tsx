import { useApolloClient, useQuery } from "@apollo/client";
import { useEthers } from "@usedapp/core";
import { PROTECTED_TOKENS } from "data/vaults";
import { GET_VAULTS } from "graphql/subgraph";
import { GET_PRICES, UniswapV3GetPrices } from "graphql/uniswap";
import { useCallback, useEffect, useState, createContext, useContext } from "react";
import { IMaster, IVault, IVaultDescription } from "types/types";
import { getTokensPrices, ipfsTransformUri } from "utils";

interface IVaultsContext {
  vaults?: IVault[]
  tokenPrices?: number[]
  generalParameters?: IMaster
}

const DATA_REFRESH_TIME = 10000;

export const VaultsContext = createContext<IVaultsContext>(undefined as any);

export function useVaults() {
  return useContext(VaultsContext);
}

export function VaultsProvider({ children }) {
  const [vaults, setVaults] = useState<IVault[]>();
  const [tokenPrices, setTokenPrices] = useState<number[]>();
  const apolloClient = useApolloClient();
  const { chainId } = useEthers();

  const { data: vaultsData } = useQuery<{ vaults: IVault[] }>(
    GET_VAULTS, {
    variables: { chainId },
    context: { chainId },
    fetchPolicy: "network-only",
    pollInterval: DATA_REFRESH_TIME
  })


  const getPrices = useCallback(async (vaults: IVault[]) => {
    if (vaults) {
      const stakingTokens = Array.from(new Set(vaults?.map(
        (vault) => vault.stakingToken
      )));
      const newTokenPrices = Array<number>();
      try {
        const coinGeckoTokenPrices = await getTokensPrices(stakingTokens!);
        if (coinGeckoTokenPrices) {
          stakingTokens?.forEach((token) => {
            if (coinGeckoTokenPrices.hasOwnProperty(token)) {
              const price = coinGeckoTokenPrices?.[token]?.['usd'];

              if (price > 0) {
                newTokenPrices[token] = price;
              }
            }
          })
        }
      } catch (error) {
        console.error(error);
      }

      // get all tokens that are still without prices
      const missingTokens = stakingTokens?.filter((token) => !newTokenPrices.hasOwnProperty(token));
      if (missingTokens && missingTokens.length > 0) {
        const uniswapPrices = (await apolloClient.query<UniswapV3GetPrices>({
          query: GET_PRICES,
          variables: { tokens: missingTokens }
        })).data;
        uniswapPrices.tokens.forEach(tokenData => {
          const price = tokenData.tokenDayData[0].priceUSD;
          if (price > 0) {
            newTokenPrices[tokenData.id] = price;
          }
        });
      }
      return newTokenPrices;
    }
  }, [apolloClient]);

  const setVaultsWithDetails = async (vaultsData: IVault[]) => {
    const loadVaultDescription = async (vault: IVault): Promise<IVaultDescription | undefined> => {
      if (vault.descriptionHash && vault.descriptionHash !== "") {
        try {
          const dataResponse = await fetch(ipfsTransformUri(vault.descriptionHash)!)
          const object = await dataResponse.json()
          return fixObject(object)
        } catch (error) {
          console.error(error);
          return undefined;
        }
      }
      return undefined;
    }

    const getVaultsData = async (vaults: IVault[]) => Promise.all(
      vaultsData.map(async (vault) => ({
        ...vault,
        stakingToken: PROTECTED_TOKENS.hasOwnProperty(vault.stakingToken) ?
          PROTECTED_TOKENS[vault.stakingToken]
          : vault.stakingToken,
        description: await loadVaultDescription(vault)
      })));

    const vaultsWithDescription = await getVaultsData(vaultsData);
    const vaultsWithMultiVaults = addMultiVaults(vaultsWithDescription);
    setVaults(vaultsWithMultiVaults);
  };

  useEffect(() => {
    let cancelled = false;
    if (vaults)
      getPrices(vaults)
        .then((prices) => {
          if (!cancelled) {
            setTokenPrices(prices);
          }
        })
    return () => {
      cancelled = true;
    }
  }, [vaults, getPrices, chainId])

  useEffect(() => {
    if (vaultsData?.vaults)
      setVaultsWithDetails(vaultsData?.vaults)
  }, [vaultsData])

  const context: IVaultsContext = {
    vaults,
    tokenPrices,
    generalParameters: vaults?.[0].master,
  };

  return <VaultsContext.Provider value={context}>
    {children}
  </VaultsContext.Provider>
}

export const fixObject = (description: any): IVaultDescription => {
  if ("Project-metadata" in description) {
    description["project-metadata"] = description["Project-metadata"]
    delete description["Project-metadata"]
  }
  if ('gamification' in description["project-metadata"] &&
    description["project-metadata"].gamification) {
    description["project-metadata"].type = 'gamification';
  }
  return description;
}

const addMultiVaults = (vaults: IVault[]) =>
  vaults.map(vault => vault.description?.["additional-vaults"] ?
    {
      ...vault,
      multipleVaults: [vault, ...fetchVaultsByPids(vaults, vault.description["additional-vaults"])]
    }
    : vault);

const fetchVaultsByPids = (vaults: IVault[], pids: string[]) => (
  pids.map(pid => vaults.find(vault => vault.pid === pid)).filter(vault => vault) as IVault[]
)