import { useEffect, useState } from "react";
import { getAddressSafes, IVault } from "@hats-finance/shared";
import { useAccount } from "wagmi";
import { FormSelectInputOption } from "components";
import { useVaults } from "./useVaults";
import { appChains } from "settings";

type UserVaultsVersion = "v1" | "v2" | "all";

export const useUserVaults = (version: UserVaultsVersion = "all") => {
  const { allVaults } = useVaults();
  const { address } = useAccount();

  const [isLoading, setIsLoading] = useState(true);
  const [userVaults, setUserVaults] = useState<IVault[] | undefined>();
  const selectInputOptions: FormSelectInputOption[] =
    userVaults?.map((vault) => ({
      value: vault.id,
      label: vault.description?.["project-metadata"].name ?? vault.name,
      icon: vault.description?.["project-metadata"].icon,
      onHoverText: `${vault.version} - ${appChains[vault.chainId as number].chain.name}`,
    })) ?? [];

  useEffect(() => {
    if (!address) return;
    if (!allVaults || allVaults.length === 0) return;

    getUserVaults(address, allVaults, version);
  }, [address, allVaults, version]);

  /**
   * Retrieves the user's vaults based on their address and vault version.
   *
   * @param address - The user's wallet address.
   * @param allVaults - An array of all available vaults.
   * @param version - The version of the vaults to retrieve ("v1", "v2", or "all").
   */
  const getUserVaults = async (address: string, allVaults: IVault[], version: UserVaultsVersion) => {
    const foundVaults = [] as IVault[];
    for (const vault of allVaults) {
      if (!vault.description) continue;

      const userSafes = await getAddressSafes(address, vault.chainId);
      const isSafeMember = userSafes.some((safeAddress) => safeAddress.toLowerCase() === vault.committee.toLowerCase());

      if (isSafeMember && (version !== "all" ? vault.version === version : true)) foundVaults.push(vault);
    }

    setUserVaults(foundVaults);
    setIsLoading(false);
  };

  return {
    isLoading,
    userVaults,
    selectInputOptions,
  };
};