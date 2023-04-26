import { IPayoutData, IPayoutResponse, IVaultInfo, PayoutType } from "@hats-finance/shared";
import { axiosClient } from "config/axiosClient";
import { BASE_SERVICE_URL } from "settings";

/**
 * Gets a payout by id
 * @param payoutId - The payout id to get
 */
export async function getPayoutById(payoutId?: string): Promise<IPayoutResponse> {
  try {
    const res = await axiosClient.get(`${BASE_SERVICE_URL}/payouts/${payoutId}`);
    return res.data.payout;
  } catch (error) {
    throw new Error(`Unknown error: ${error}`);
  }
}

/**
 * Deletes a payout by id
 * @param payoutId - The payout id to delete
 */
export async function deletePayoutById(payoutId?: string): Promise<boolean> {
  try {
    const res = await axiosClient.delete(`${BASE_SERVICE_URL}/payouts/${payoutId}`);
    return res.status === 200 ? res.data.ok : false;
  } catch (error) {
    throw new Error(`Unknown error: ${error}`);
  }
}

/**
 * Gets a list of all the payouts of a vaults list
 * @param vaultsList: IVaultInfo[] - The list of vaults to get the payouts from
 */
export async function getPayoutsByVaults(vaultsList: IVaultInfo[]): Promise<IPayoutResponse[]> {
  if (vaultsList.length === 0) return [];

  try {
    const res = await axiosClient.get(`${BASE_SERVICE_URL}/payouts/all/vaultsList`, {
      params: { vaults: JSON.stringify(vaultsList) },
    });
    return res.data.payouts;
  } catch (error) {
    throw new Error(`Unknown error: ${error}`);
  }
}

/**
 * Gets a list of all the in progress payouts of a vault
 * @param vaultAddress - The vault address to create the payout
 * @param chainId - The vault chain id to create the payout
 *
 * @returns A list of in progress payouts
 */
export async function getInProgressPayoutsByVault(vaultInfo?: IVaultInfo): Promise<IPayoutResponse[]> {
  if (!vaultInfo) return [];

  try {
    const res = await axiosClient.get(`${BASE_SERVICE_URL}/payouts/in-progress`, {
      params: { vaultInfo: JSON.stringify(vaultInfo) },
    });
    return res.data.payouts;
  } catch (error) {
    throw new Error(`Unknown error: ${error}`);
  }
}

/**
 * Creates a new payout
 * @param vaultInfo - The vault info to create the payout
 * @param type - The payout type to create
 *
 * @returns The id of the created payout
 */
export async function createDraftPayout(vaultInfo: IVaultInfo, type: PayoutType): Promise<string> {
  try {
    const res = await axiosClient.post(`${BASE_SERVICE_URL}/payouts`, { vaultInfo, type });
    return res.data.upsertedId;
  } catch (error) {
    throw new Error(`Unknown error: ${error}`);
  }
}

/**
 * Saves an existent payout
 * @param payoutId - The payout id to save
 * @param vaultInfo - The vault info to create the payout
 * @param payoutData - The payout data to save
 *
 * @returns The updated payout
 */
export async function savePayoutData(payoutId: string, vaultInfo: IVaultInfo, payoutData: IPayoutData): Promise<IPayoutResponse> {
  try {
    const res = await axiosClient.post(`${BASE_SERVICE_URL}/payouts/${payoutId}`, { payoutData, vaultInfo });
    return res.data.payout;
  } catch (error) {
    throw new Error(`Unknown error: ${error}`);
  }
}

/**
 * Locks a payout. This means, the payout is set to  "Peding" and a nonce is generated
 * @param payoutId - The payout id to lock
 *
 * @returns True if the payout was locked, false otherwise
 */
export async function lockPayout(payoutId: string): Promise<boolean> {
  try {
    const res = await axiosClient.post(`${BASE_SERVICE_URL}/payouts/lock/${payoutId}`);
    return res.status === 200 ? res.data.ok : false;
  } catch (error) {
    throw new Error(`Unknown error: ${error}`);
  }
}

/**
 * Adds a new signature to a payout
 * @param payoutId - The payout id
 * @param signature - The signature to add
 *
 * @returns True if the signature was added, false otherwise
 */
export async function addSignature(payoutId: string, signature: string): Promise<boolean> {
  try {
    const res = await axiosClient.post(`${BASE_SERVICE_URL}/payouts/signatures/${payoutId}`, { signature });
    return res.status === 200 ? res.data.ok : false;
  } catch (error) {
    throw new Error(`Unknown error: ${error}`);
  }
}

/**
 * Marks a payout as executed
 * @param payoutId - The payout id to mark as executed
 * @param payoutTxHash - The payout transaction hash
 * @param payoutClaimId - The payout claim id
 *
 * @returns True if the payout was marked as executed, false otherwise
 */
export async function markPayoutAsExecuted(payoutId: string, payoutTxHash: string, payoutClaimId: string): Promise<boolean> {
  try {
    const res = await axiosClient.post(`${BASE_SERVICE_URL}/payouts/executed/${payoutId}`, { payoutTxHash, payoutClaimId });
    return res.status === 200 ? res.data.ok : false;
  } catch (error) {
    throw new Error(`Unknown error: ${error}`);
  }
}