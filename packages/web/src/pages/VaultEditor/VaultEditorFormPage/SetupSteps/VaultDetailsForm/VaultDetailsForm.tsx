import { useContext, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  IEditedVaultDescription,
  IEditedVulnerabilitySeverity,
  createNewCoveredContract,
  getVulnerabilitySeveritiesTemplate,
} from "@hats-finance/shared";
import { getCustomIsDirty, useEnhancedFormContext } from "hooks/form";
import { useOnChange } from "hooks/usePrevious";
import { FormInput, FormIconInput, FormDateInput, FormSelectInput } from "components";
import { VaultEmailsForm } from "../shared/VaultEmailsList/VaultEmailsList";
import { VaultEditorFormContext } from "../../store";
import { StyledVaultDetails } from "./styles";

export function VaultDetailsForm() {
  const { t } = useTranslation();
  const { allFormDisabled } = useContext(VaultEditorFormContext);

  const { register, control, resetField, setValue, getValues } = useEnhancedFormContext<IEditedVaultDescription>();

  const showDateInputs = useWatch({ control, name: "includesStartAndEndTime" });
  const vaultType = useWatch({ control, name: "project-metadata.type" });

  const vaultTypes = [
    { label: t("bugBountyProgram"), value: "normal" },
    { label: t("auditCompetition"), value: "audit" },
    { label: t("grant"), value: "grants" },
  ];

  useEffect(() => {
    if (showDateInputs) {
      resetField("project-metadata.starttime");
      resetField("project-metadata.endtime");
    } else {
      setValue("project-metadata.starttime", undefined);
      setValue("project-metadata.endtime", undefined);
    }
  }, [showDateInputs, setValue, resetField]);

  useEffect(() => {
    const data = getValues();
    if (!data["project-metadata"]) return;

    const { starttime, endtime } = data["project-metadata"];

    if (starttime || endtime) return;

    if (vaultType === "audit" || vaultType === "grants") setValue("includesStartAndEndTime", true);
    else setValue("includesStartAndEndTime", false);
  }, [vaultType, getValues, setValue]);

  // Change the vulnerability template if the vault type changes
  useOnChange(vaultType, (_, prevVal) => {
    if (prevVal === undefined) return;

    const data = getValues();
    const vulnerabilitySeveritiesTemplate = getVulnerabilitySeveritiesTemplate(data.version, vaultType === "audit");

    const severitiesIds = vulnerabilitySeveritiesTemplate.severities.map((s) => s.id as string);
    const severitiesOptionsForContractsCovered = vulnerabilitySeveritiesTemplate.severities.map(
      (s: IEditedVulnerabilitySeverity) => ({
        label: s.name,
        value: s.id as string,
      })
    );

    setValue("vulnerability-severities-spec", vulnerabilitySeveritiesTemplate);
    setValue("contracts-covered", [{ ...createNewCoveredContract(severitiesIds) }]);
    setValue("severitiesOptions", severitiesOptionsForContractsCovered);
  });

  // useEffect(() => {
  //   const data = getValues();

  //   if (vaultType === "audit") {
  //     const vulnerabilitySeveritiesTemplate = getVulnerabilitySeveritiesTemplate(data.version);
  //     const severitiesIds = vulnerabilitySeveritiesTemplate.severities.map((s) => s.id as string);
  //     const severitiesOptionsForContractsCovered = vulnerabilitySeveritiesTemplate.severities.map(
  //       (s: IEditedVulnerabilitySeverity) => ({
  //         label: s.name,
  //         value: s.id as string,
  //       })
  //     );

  //     setValue('vulnerability-severities-spec', vulnerabilitySeveritiesTemplate);
  //     setValue('contracts-covered', [{ ...createNewCoveredContract(severitiesIds) }]);
  //     setValue('severitiesOptions', severitiesOptionsForContractsCovered);
  //   } else {

  //   }
  // }, [vaultType, getValues, setValue]);

  return (
    <StyledVaultDetails>
      <div className="sub-container">
        <div className="inputs">
          <FormInput
            {...register("project-metadata.name")}
            label={t("VaultEditor.vault-details.name")}
            colorable
            disabled={allFormDisabled}
            placeholder={t("VaultEditor.vault-details.name-placeholder")}
          />
          <Controller
            control={control}
            name={`project-metadata.type`}
            render={({ field, fieldState: { error }, formState: { dirtyFields, defaultValues } }) => (
              <FormSelectInput
                isDirty={getCustomIsDirty<IEditedVaultDescription>(field.name, dirtyFields, defaultValues)}
                error={error}
                label={t("VaultEditor.vault-details.type")}
                placeholder={t("VaultEditor.vault-details.type-placeholder")}
                colorable
                disabled={allFormDisabled}
                options={vaultTypes}
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </div>

        <VaultEmailsForm />

        <div className="inputs col-sm">
          <FormInput
            {...register("project-metadata.website")}
            colorable
            disabled={allFormDisabled}
            placeholder={t("VaultEditor.vault-details.website-placeholder")}
            label={t("VaultEditor.vault-details.website")}
          />

          <div className="icons">
            <FormIconInput
              {...register("project-metadata.icon")}
              disabled={allFormDisabled}
              colorable
              label={t("VaultEditor.vault-details.icon")}
            />
            <FormIconInput
              {...register("project-metadata.tokenIcon")}
              disabled={allFormDisabled}
              colorable
              label={t("VaultEditor.vault-details.token-icon")}
            />
          </div>
        </div>
      </div>

      <br />

      <FormInput
        {...register("includesStartAndEndTime")}
        disabled={allFormDisabled}
        type="checkbox"
        label={t("VaultEditor.addStartAndEndDate")}
      />

      {showDateInputs && (
        <div className="inputs">
          <Controller
            control={control}
            name={`project-metadata.starttime`}
            render={({ field, fieldState: { error }, formState: { defaultValues, dirtyFields } }) => (
              <FormDateInput
                withTime
                isDirty={getCustomIsDirty<IEditedVaultDescription>(field.name, dirtyFields, defaultValues)}
                error={error}
                label={t("VaultEditor.vault-details.starttime")}
                placeholder={t("VaultEditor.vault-details.starttime-placeholder")}
                colorable
                disabled={allFormDisabled}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`project-metadata.endtime`}
            render={({ field, fieldState: { error }, formState: { defaultValues, dirtyFields } }) => (
              <FormDateInput
                withTime
                isDirty={getCustomIsDirty<IEditedVaultDescription>(field.name, dirtyFields, defaultValues)}
                error={error}
                label={t("VaultEditor.vault-details.endtime")}
                placeholder={t("VaultEditor.vault-details.endtime-placeholder")}
                colorable
                disabled={allFormDisabled}
                {...field}
              />
            )}
          />
        </div>
      )}
    </StyledVaultDetails>
  );
}
