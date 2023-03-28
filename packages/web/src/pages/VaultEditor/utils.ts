import { IEditedVaultDescription, IVaultStatusData, IAddressRoleInVault, getAddressRoleOnVault } from "@hats-finance/shared";

// Only committee members or gov multisig members can edit the vault
export async function checkIfAddressCanEditTheVault(
  address: string | undefined,
  editData: IEditedVaultDescription | IVaultStatusData
): Promise<{ canEditVault: boolean; role: IAddressRoleInVault }> {
  const addressRole = await getAddressRoleOnVault(address, editData);
  return { canEditVault: addressRole !== "none" && addressRole !== "committee-multisig", role: addressRole };
}

export function vaultEditorRoleToIntlKey(role: IAddressRoleInVault): string {
  switch (role) {
    case "gov":
      return "addressRoleGov";
    case "committee":
      return "addressRoleCommittee";
    case "committee-multisig":
      return "addressRoleCommitteeMultisig";
    case "none":
      return "";
  }
}
