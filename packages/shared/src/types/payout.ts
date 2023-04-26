import { IVaultInfo } from "./types";

export interface IPayoutGraph {
  id: string;
  vault: { id: string };
  chainId: number;
  beneficiary: string;
  approvedAt: string; // Date in seconds
  dismissedAt: string; // Date in seconds
  bountyPercentage: string; // Number between 0 and 10000 (for V2 vaults)
  severityIndex: string; // Severity index (for V1 vaults)
  isChallenged: boolean;
  hackerReward: string;
  hackerVestedReward: string;
  governanceHatReward: string;
  hackerHatReward: string;
  committeeReward: string;
  // Computed
  isActive?: boolean; // Is active claim
  isApproved?: boolean; // Is approved claim
  isDismissed?: boolean; // Is dismissed claim
}

export interface IPayoutResponse {
  _id: string;
  vaultInfo: IVaultInfo;
  payoutData: IPayoutData;
  nonce: number;
  txToSign: string;
  minSignaturesNeeded: number;
  signatures: IPayoutSignature[];
  status: PayoutStatus;
  lastActionNeededNotifiedAt: Date;
  payoutTxHash: string; // Only after execution
  payoutClaimId: string; // Only after execution
  payoutDescriptionHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IPayoutData = ISinglePayoutData | ISplitPayoutData;

interface IPayoutDataBase {
  type: PayoutType;
  title: string;
  percentageToPay: string; // Percentage of the whole vault: number between 0 and 100
  explanation: string;
  additionalInfo: string;
}

export interface ISinglePayoutData extends IPayoutDataBase {
  type: "single";
  beneficiary: string;
  severity: string; // Severity name
  severityBountyIndex: string; // Severity index (for V1 vaults)
  nftUrl: string;
}

// Only for v2 vaults
export interface ISplitPayoutData extends IPayoutDataBase {
  type: "split";
  paymentSplitterBeneficiary?: string;
  beneficiaries: ISplitPayoutBeneficiary[];
}

export interface ISplitPayoutBeneficiary {
  beneficiary: string;
  severity: string; // Severity name
  percentageToPay: string; // Number between 0 and 100
  nftUrl: string;
}

export interface IPayoutSignature {
  signature: string;
  signedAt: Date;
  signerAddress: string;
  membersNotified: boolean;
}

export enum PayoutStatus {
  Creating = "creating", // is a draft
  Pending = "pending", // is ready to be signed and waiting signatures
  ReadyToExecute = "readyToExecute", // the minimum signatures are reached and the payout is ready to be executed
  Executed = "executed", // the payout was executed by committee
  Approved = "approved", // the payout was approved
  Rejected = "rejected", // the payout was rejected
}

export type PayoutType = "single" | "split";

export const payoutStatusInfo = {
  [PayoutStatus.Creating]: {
    label: "creating",
    color: "--warning-yellow",
  },
  [PayoutStatus.Pending]: {
    label: "collecting",
    color: "--warning-yellow",
  },
  [PayoutStatus.ReadyToExecute]: {
    label: "waitingExecution",
    color: "--turquoise",
  },
  [PayoutStatus.Executed]: {
    label: "executed",
    color: "--warning-yellow",
  },
  [PayoutStatus.Approved]: {
    label: "approved",
    color: "--teal",
  },
  [PayoutStatus.Rejected]: {
    label: "rejected",
    color: "--error-red",
  },
};
