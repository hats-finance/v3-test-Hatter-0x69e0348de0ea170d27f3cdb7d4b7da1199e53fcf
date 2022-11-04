import { BigNumber, Contract } from "ethers";
import { useCall, useContractFunction, useEthers } from "@usedapp/core";
import { Transactions } from "constants/constants";
import { IVault } from "types/types";
import erc20Abi from "data/abis/erc20.json";
import vaultAbiV1 from "data/abis/HATSVaultV1.json";
import vaultAbiV2 from "data/abis/HATSVaultV2.json";
import vaultRegistryAbiV2 from "data/abis/HATSVaultsRegistry.json";
import rewardControllerAbi from "data/abis/RewardController.json";

/**
 * Returns the amount of pending reward to claim for a giver user
 *
 * @remarks
 * This method is supporting v1 and v2 vaults.
 *
 * @param vault - The selected vault to get the user pending reward from
 * @returns The pending reward amount
 */
export function usePendingReward(vault: IVault): BigNumber | undefined {
  const { account } = useEthers();
  const contractAddress = vault.version === "v1" ? vault.master.address : vault.rewardController.id;
  const vaultAbi = vault.version === "v1" ? vaultAbiV1 : rewardControllerAbi;
  const method = vault.version === "v1" ? "pendingReward" : "getPendingReward";
  const args = vault.version === "v1" ? [vault.pid, account] : [vault.id, account];

  const { value, error } =
    useCall({
      contract: new Contract(contractAddress, vaultAbi),
      method: method,
      args,
    }) ?? {};

  return !error ? value?.[0] : undefined;
}

/**
 * Returns the amount of shares the user has on the vault.
 *
 * @remarks
 * This method is supporting v1 and v2 vaults.
 *
 * @param vault - The selected vault to get the user shares from
 * @returns The user shares amount
 */
export function useUserSharesPerVault(vault: IVault): BigNumber | undefined {
  const { account } = useEthers();
  const contractAddress = vault.version === "v1" ? vault.master.address : vault.id;
  const vaultAbi = vault.version === "v1" ? vaultAbiV1 : vaultAbiV2;
  const method = vault.version === "v1" ? "userInfo" : "balanceOf";
  const args = vault.version === "v1" ? [vault.pid, account] : [account];

  const { value, error } =
    useCall({
      contract: new Contract(contractAddress, vaultAbi),
      method: method,
      args,
    }) ?? {};

  return !error ? value?.[0] : undefined;
}

/**
 * Returns the amount of shares the user has and the value of those shares (balance) on staking token.
 *
 * @remarks
 * This method is supporting v1 and v2 vaults.
 *
 * @param vault - The selected vault to get the user shares from and the balance of those shares
 * @returns The user shares amount and the user balance
 */
export function useUserSharesAndBalancePerVault(vault: IVault): {
  userSharesAvailable: BigNumber | undefined;
  userBalanceAvailable: BigNumber | undefined;
} {
  const userSharesAvailable = useUserSharesPerVault(vault);

  const contractAddress = vault.version === "v1" ? vault.master.address : vault.id;
  const vaultAbi = vault.version === "v1" ? vaultAbiV1 : vaultAbiV2;
  const method = vault.version === "v1" ? "poolInfo" : "previewRedeem";
  const args = vault.version === "v1" ? [vault.pid] : [userSharesAvailable];

  const { value, error } =
    useCall({
      contract: new Contract(contractAddress, vaultAbi),
      method: method,
      args,
    }) ?? {};

  let userBalanceAvailable: BigNumber | undefined = undefined;

  if (!error) {
    if (vault.version === "v1") {
      const totalShares: BigNumber | undefined = value?.totalUsersAmount;
      const totalBalance: BigNumber | undefined = value?.balance;

      if (totalShares && totalBalance) {
        userBalanceAvailable = userSharesAvailable?.mul(totalBalance).div(totalShares);
      }
    } else {
      userBalanceAvailable = value?.[0];
    }
  }

  return { userSharesAvailable, userBalanceAvailable };
}

/**
 * Returns the starting time in seconds when the user can withdraw from the vault.
 *
 * @remarks
 * This method is supporting v1 and v2 vaults.
 *
 * @param vault - The selected vault to get the user withdraw start time from
 * @returns The user withdraw start time
 */
export function useWithdrawRequestStartTime(vault: IVault): BigNumber | undefined {
  const { account } = useEthers();
  const contractAddress = vault.version === "v1" ? vault.master.address : vault.id;
  const vaultAbi = vault.version === "v1" ? vaultAbiV1 : vaultAbiV2;
  const method = vault.version === "v1" ? "withdrawRequests" : "withdrawEnableStartTime";
  const args = vault.version === "v1" ? [vault.pid, account] : [account];

  const { value, error } =
    useCall({
      contract: new Contract(contractAddress, vaultAbi),
      method: method,
      args,
    }) ?? {};

  if (error) return undefined;

  const startTimeNumber = value?.[0] ? (value[0] as BigNumber).toNumber() : 0;
  return startTimeNumber !== 0 ? value?.[0] : undefined;
}

/**
 * Returns a caller function to approve the vault to spend the user's staking token.
 *
 * @remarks
 * This method is supporting v1 and v2 vaults.
 *
 * @param vault - The selected vault to give approval to spend the user's staking token
 */
export function useTokenApproveAllowance(vault: IVault) {
  const allowedContractAddress = vault.version === "v1" ? vault.master.address : vault.id;

  const approveAllowance = useContractFunction(new Contract(vault.stakingToken, erc20Abi), "approve", {
    transactionName: Transactions.Approve,
  });

  return {
    ...approveAllowance,
    send: (allowedAmount: BigNumber) => {
      // [params]: allowedContract, allowedAmount
      return approveAllowance.send(allowedContractAddress, allowedAmount);
    },
  };
}

/**
 * Returns a caller function to deposit staking token to the vault.
 *
 * @remarks
 * This method is supporting v1 and v2 vaults.
 *
 * @param vault - The selected vault to deposit staking token
 */
export function useDeposit(vault: IVault) {
  const contractAddress = vault.version === "v1" ? vault.master.address : vault.id;
  const vaultAbi = vault.version === "v1" ? vaultAbiV1 : vaultAbiV2;

  const deposit = useContractFunction(new Contract(contractAddress, vaultAbi), "deposit", {
    transactionName: Transactions.Deposit,
  });

  const { account } = useEthers();

  return {
    ...deposit,
    send: (amount: BigNumber) => {
      if (vault?.version === "v2") {
        // [params]: asset, receiver
        return deposit.send(amount, account);
      } else {
        // [params]: pid, amount
        return deposit.send(vault.pid, amount);
      }
    },
  };
}

/**
 * Returns a caller function to withdraw the user's staking token and claim the available rewards
 * from the vault.
 *
 * @remarks
 * This method is supporting v1 and v2 vaults.
 *
 * @param vault - The selected vault to withdraw and claim the tokens from
 */
export function useWithdrawAndClaim(vault: IVault) {
  const { account } = useEthers();
  const contractAddress = vault.version === "v1" ? vault.master.address : vault.id;
  const contractFunctionName = vault.version === "v1" ? "withdraw" : "withdrawAndClaim";
  const vaultAbi = vault.version === "v1" ? vaultAbiV1 : vaultAbiV2;

  const withdrawAndClaim = useContractFunction(new Contract(contractAddress, vaultAbi), contractFunctionName, {
    transactionName: Transactions.WithdrawAndClaim,
  });

  return {
    ...withdrawAndClaim,
    send: (amount: BigNumber) => {
      if (vault?.version === "v2") {
        // [params]: assets (ammount in tokens), receiver, owner
        return withdrawAndClaim.send(amount, account, account);
      } else {
        // [params]: pid, shares
        return withdrawAndClaim.send(vault.pid, amount);
      }
    },
  };
}

/**
 * Returns a caller function to request a withdraw from the vault.
 *
 * @remarks
 * This method is supporting v1 and v2 vaults.
 *
 * @param vault - The selected vault to request a withdraw from
 */
export function useWithdrawRequest(vault: IVault) {
  const contractAddress = vault.version === "v1" ? vault.master.address : vault.id;
  const vaultAbi = vault.version === "v1" ? vaultAbiV1 : vaultAbiV2;

  const withdrawRequest = useContractFunction(new Contract(contractAddress, vaultAbi), "withdrawRequest", {
    transactionName: Transactions.WithdrawRequest,
  });

  return {
    ...withdrawRequest,
    send: () => {
      if (vault?.version === "v2") {
        // [params]: none
        return withdrawRequest.send();
      } else {
        // [params]: pid
        return withdrawRequest.send(vault.pid);
      }
    },
  };
}

/**
 * Returns a caller function to claim the user's rewards from the vault.
 *
 * @remarks
 * This method is supporting v1 and v2 vaults. For v2 vaults, we are using the rewardController.
 *
 * @param vault - The selected vault to claim the user's rewards from
 */
export function useClaimReward(vault: IVault) {
  const { account } = useEthers();
  const contractAddress = vault.version === "v1" ? vault.master.address : vault.rewardController.id;
  const abi = vault.version === "v1" ? vaultAbiV1 : rewardControllerAbi;

  const claimReward = useContractFunction(new Contract(contractAddress, abi), "claimReward", {
    transactionName: Transactions.ClaimReward,
  });

  return {
    ...claimReward,
    send: () => {
      if (vault?.version === "v2") {
        // [params]: vault, user
        return claimReward.send(vault.id, account);
      } else {
        // [params]: pid
        return claimReward.send(vault.pid);
      }
    },
  };
}

/**
 * Returns a caller function to checkin the committee to the vault
 *
 * @remarks
 * This method is supporting v1 and v2 vaults.
 *
 * @param vault - The selected vault to checkin the committee to
 */
export function useCommitteeCheckIn(vault: IVault) {
  const contractAddress = vault.version === "v1" ? vault.master.address : vault.id;
  const vaultAbi = vault.version === "v1" ? vaultAbiV1 : vaultAbiV2;

  const committeeCheckIn = useContractFunction(new Contract(contractAddress, vaultAbi), "committeeCheckIn", {
    transactionName: Transactions.CheckIn,
  });

  return {
    ...committeeCheckIn,
    send: () => {
      if (vault?.version === "v2") {
        // [params]: none
        return committeeCheckIn.send();
      } else {
        // [params]: pid
        return committeeCheckIn.send(vault.pid);
      }
    },
  };
}

/**
 * Returns a caller function to log a claim on the registry
 *
 * @remarks
 * This method is supporting v1 and v2 vaults. In both version the logClaim function is
 * inside the registry
 *
 * @param vault - The selected vault to send the claim
 */
export function useClaim(vault?: IVault) {
  const contractAddress = vault?.master.address ?? "";
  const vaultAbi = vault?.version === "v1" ? vaultAbiV1 : vaultRegistryAbiV2;
  const method = vault?.version === "v1" ? "claim" : "logClaim";

  return useContractFunction(vault ? new Contract(contractAddress, vaultAbi) : null, method, {
    transactionName: "Claim",
  });
}
