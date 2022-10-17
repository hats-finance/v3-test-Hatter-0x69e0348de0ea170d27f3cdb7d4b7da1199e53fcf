import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormInput, FormSelectInput } from "components";
import RemoveIcon from "assets/icons/remove-member.svg";
import { createNewCoveredContract } from "../../utils";
import { IEditedVaultDescription, IEditedContractCovered } from "../../types";
import { StyledContractCoveredForm } from "./styles";

type ContractCoveredFormProps = {
  index: number;
  append: (data: IEditedContractCovered) => void;
  remove: (index: number) => void;
};

export default function ContractCoveredForm({ index, append, remove }: ContractCoveredFormProps) {
  const { t } = useTranslation();
  const { register, watch, control, setValue, getValues, getFieldState, formState } = useFormContext<IEditedVaultDescription>();

  const contracts = watch("contracts-covered");
  const contractsCount = contracts.length;
  
  const severities = watch('vulnerability-severities-spec.severities');
  const severitiesOptions = severities.map((severity, index) => ({
    label: severity.name,
    value: severity.id,
  }));

  useEffect(() => {
    const severitiesFormIds = severities.map((sev) => sev.id);
    const severitiesIdsInThisContract: string[] = getValues()["contracts-covered"][index].severities;

    const filteredVulnerabilities = severitiesIdsInThisContract?.filter((sevId) => severitiesFormIds.includes(sevId));
    setValue(`contracts-covered.${index}.severities`, filteredVulnerabilities);
  }, [severities, getValues, setValue, index]);

  return (
    <StyledContractCoveredForm>
      <div className="contract">
        <div className="index-number">{index + 1}</div>

        <div className="content">
          <div className="subcontent">
            <div className="name">
              <FormInput
                {...register(`contracts-covered.${index}.name`)}
                isDirty={getFieldState(`contracts-covered.${index}.name`, formState).isDirty}
                label={t("VaultEditor.contract-name")}
                colorable
                placeholder={t("VaultEditor.contract-name-placeholder")}
              />
            </div>
            {severities && (
              <div className="severities">
                <Controller
                  control={control}
                  name={`contracts-covered.${index}.severities`}
                  render={({ field: { ...configProps } }) => (
                    <FormSelectInput
                      isDirty={getFieldState(`contracts-covered.${index}.severities`, formState).isDirty}
                      label={t("VaultEditor.contract-severities")}
                      placeholder={t("VaultEditor.contract-severities-placeholder")}
                      colorable
                      options={severitiesOptions}
                      multiple
                      {...configProps}
                    />
                  )}
                />
              </div>
            )}
          </div>

          <div>
            <FormInput
              {...register(`contracts-covered.${index}.address`)}
              isDirty={getFieldState(`contracts-covered.${index}.address`, formState).isDirty}
              label={t("VaultEditor.contract-address")}
              pastable
              colorable
              placeholder={t("VaultEditor.contract-address-placeholder")}
            />
          </div>
        </div>
      </div>

      <div className="controller-buttons">
        {contractsCount > 1 && (
          <button type="button" className="fill" onClick={() => remove(index)}>
            <img src={RemoveIcon} height={12} alt="remove-member" />
            {` ${t("VaultEditor.remove-member")}`}
          </button>
        )}
        {index === contractsCount - 1 && (
          <button type="button" className="fill" onClick={() => append(createNewCoveredContract(severities))}>
            {t("VaultEditor.add-member")}
          </button>
        )}
      </div>
    </StyledContractCoveredForm>
  );
}
