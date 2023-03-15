import {
  CommitteeDetailsForm,
  CommitteeMembersList,
  ContractsCoveredList,
  VaultAssetsList,
  VaultDetailsForm,
  VaultFormReview,
  VaultParametersForm,
  VulnerabilitySeveritiesList,
} from ".";
import { SetupReview } from "./SetupSteps/SetupReview/SetupReview";

type IEditorStepDisabledOption = "needsAccount" | "editingFormDirty" | "onlyIfVaultNotCreated" | "allEmailsVerified";

export type IEditorSections = {
  [key: string]: {
    id: string;
    title: string;
    name: string;
    steps: IEditorSectionsStep[];
    onlyInCreation?: boolean;
  };
};

export type IEditorSectionsStep = {
  id: string;
  name: string;
  title: { creation: string; editing: string };
  backButtonTextKey?: { creation?: string; editing?: string };
  nextButtonTextKey?: { creation?: string; editing?: string };
  isAdvanced?: boolean;
  isInvisible?: boolean;
  isValid?: boolean;
  isChecked?: boolean;
  formFields: string[];
  disabledOptions?: IEditorStepDisabledOption[];
  component: React.FC;
};

export const AllEditorSections: IEditorSections = {
  setup: {
    id: "setup",
    title: "vaultDescription",
    name: "vaultSetup",
    steps: [
      {
        id: "details",
        name: "details",
        title: { creation: "vaultDescription", editing: "vaultDescription" },
        component: VaultDetailsForm,
        formFields: ["project-metadata"],
      },
      {
        id: "committee",
        name: "committee",
        title: { creation: "committeeDetails", editing: "committeeDetails" },
        component: CommitteeDetailsForm,
        formFields: ["committee.chainId", "committee.multisig-address"],
      },
      {
        id: "members",
        name: "members",
        title: { creation: "committeeMembersAndEncryption", editing: "committeeMembersAndEncryption" },
        component: CommitteeMembersList,
        formFields: ["committee.members"],
      },
      {
        id: "severities",
        name: "severities",
        title: { creation: "severities", editing: "severities" },
        component: VulnerabilitySeveritiesList,
        formFields: ["vulnerability-severities-spec"],
        isAdvanced: true,
      },
      {
        id: "contracts",
        name: "contracts",
        title: { creation: "contractsAssetsCovered", editing: "contractsAssetsCovered" },
        component: ContractsCoveredList,
        formFields: ["contracts-covered"],
      },
      {
        id: "setupReview",
        name: "setupReview",
        title: { creation: "goodJobYouAre50Done", editing: "vaultDescription" },
        isInvisible: true,
        component: SetupReview,
        formFields: [],
        nextButtonTextKey: { creation: "continueToVaultCreation", editing: "sendToGovernanceApproval" },
        disabledOptions: ["editingFormDirty"],
      },
    ],
  },
  deploy: {
    id: "deploy",
    title: "vaultCreator",
    name: "vaultDeployment",
    onlyInCreation: true,
    steps: [
      {
        id: "assets",
        name: "assets",
        title: { creation: "createVaultOnChain", editing: "createVaultOnChain" },
        component: VaultAssetsList,
        formFields: ["assets"],
        backButtonTextKey: { creation: "backToVaultDescription" },
      },
      {
        id: "params",
        name: "parameters",
        title: { creation: "vaultParameters", editing: "vaultParameters" },
        component: VaultParametersForm,
        formFields: ["parameters"],
      },
      {
        id: "preview",
        name: "preview",
        title: { creation: "vaultPreview", editing: "vaultPreview" },
        component: VaultFormReview,
        formFields: [],
        nextButtonTextKey: { creation: "createVaultOnChain" },
        disabledOptions: ["needsAccount", "onlyIfVaultNotCreated", "allEmailsVerified"],
      },
    ],
  },
};