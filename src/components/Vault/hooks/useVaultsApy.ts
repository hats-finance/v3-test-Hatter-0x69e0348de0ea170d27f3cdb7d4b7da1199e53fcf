import { useSelector } from "react-redux";
import { RootState } from "reducers";
import { IVault } from "types/types";
import { fromWei } from "utils";

export function useVaultsApy(vaults: IVault[]) {
  const { dataReducer: { hatsPrice } } = useSelector((state: RootState) => state);
  const tokensPrices = useSelector((state: RootState) => state.dataReducer.tokenPrices);
  const apys: { [token: string]: number | string } = {};

  vaults.forEach(vault => {
    if (!hatsPrice || !tokensPrices[vault.stakingToken]) {
      apys[vault.stakingToken] = "-";
    } else if (Number(fromWei(vault.totalStaking)) === 0) {
      apys[vault.stakingToken] = 0;
    } else {
      apys[vault.stakingToken] = ((Number(fromWei(vault.totalRewardPaid)) * Number(hatsPrice)) / Number(fromWei(vault.totalStaking))) * tokensPrices[vault.stakingToken];
    }
  })

  return { apys };
}
