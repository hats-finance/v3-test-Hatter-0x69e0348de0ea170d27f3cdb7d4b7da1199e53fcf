import { CODE_LANGUAGES, IEditedVaultDescription } from "@hats-finance/shared";
import { FormInput, Pill } from "components";
import { useEnhancedFormContext } from "hooks/form";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { VaultEditorFormContext } from "../../store";
import { StyledScopeDetailsForm } from "./styles";

export const ScopeDetailsForm = () => {
  const { t } = useTranslation();
  const { allFormDisabled } = useContext(VaultEditorFormContext);

  const { register, setValue, getValues, watch } = useEnhancedFormContext<IEditedVaultDescription>();

  const handleClickOnCodeLang = (codeLang: string, checked: boolean) => {
    const codeLangs = getValues("scope.codeLangs") ?? [];
    if (checked) {
      setValue("scope.codeLangs", [...codeLangs, codeLang]);
    } else {
      setValue(
        "scope.codeLangs",
        codeLangs.filter((lang) => lang !== codeLang)
      );
    }
  };

  return (
    <StyledScopeDetailsForm>
      <div className="helper-text">{t("vaultEditorScopeExplanation")}</div>

      <p className="mb-3 bold">{t("offerDescriptionHowTheProtocolWorks")}</p>
      <FormInput
        {...register(`scope.description`)}
        disabled={allFormDisabled}
        label={t("VaultEditor.scopeDescription")}
        rows={Math.ceil(watch(`scope.description`, "").length / 65) + 2}
        type="textarea"
        colorable
        placeholder={t("VaultEditor.scopeDescription-placeholder")}
      />

      <p className="mb-3 bold">{t("VaultEditor.selectCodeLanguages")}</p>
      <div className="code-langs mb-3">
        {CODE_LANGUAGES.solidity.map((codeLang) => (
          <Pill
            onClick={(checked) => handleClickOnCodeLang(codeLang, checked)}
            isChecked={watch("scope.codeLangs", []).some((lang) => lang === codeLang)}
            text={codeLang}
          />
        ))}
      </div>
      <div className="code-langs">
        {CODE_LANGUAGES.other.map((codeLang) => (
          <Pill
            onClick={(checked) => handleClickOnCodeLang(codeLang, checked)}
            isChecked={watch("scope.codeLangs", []).some((lang) => lang === codeLang)}
            text={codeLang}
          />
        ))}
      </div>
    </StyledScopeDetailsForm>
  );
};
