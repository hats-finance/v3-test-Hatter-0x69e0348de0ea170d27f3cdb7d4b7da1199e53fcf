import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RoutePaths } from "navigation";
import { Button, Loading } from "components";
import { IEditedVaultDescription, IEditedVulnerabilitySeverityV1 } from "./types";
import * as VaultService from "./vaultService";
import { createNewVaultDescription } from "./utils";
import { Section, VaultEditorForm, VaultEditorStep, VaultEditorStepper } from "./styles";
import { convertVulnerabilitySeverityV1ToV2 } from "./severities";
import { getEditedDescriptionYupSchema } from "./formSchema";
import { useVaultEditorSteps } from "./useVaultEditorSteps";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import BackIcon from "@mui/icons-material/ArrowBack";
import NextIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";

const VaultEditorFormPage = () => {
  const { t } = useTranslation();
  const { editSessionId } = useParams();
  const navigate = useNavigate();

  const [loadingEditSession, setLoadingEditSession] = useState(false);
  const [savingToServer, setSavingToServer] = useState(false);

  const test = () => console.log(getValues());

  const methods = useForm<IEditedVaultDescription>({
    defaultValues: createNewVaultDescription("v2"),
    resolver: yupResolver(getEditedDescriptionYupSchema(t)),
    mode: "onChange",
  });

  const { formState, reset: handleReset, control, setValue, getValues } = methods;
  const { steps, currentStepInfo, onGoToStep, onGoBack, onGoNext, initFormSteps } = useVaultEditorSteps(
    methods,
    async (data: IEditedVaultDescription) => {
      setSavingToServer(true);
      const sessionIdOrSession = await VaultService.upsertEditSession(data, editSessionId);

      setSavingToServer(false);
      if (typeof sessionIdOrSession === "string") {
        navigate(`${RoutePaths.vault_editor}/${sessionIdOrSession}`);
      } else {
        handleReset(sessionIdOrSession);
      }
    }
  );

  const vaultVersion = useWatch({ control, name: "version" });

  async function loadEditSessionData(editSessionId: string) {
    try {
      setLoadingEditSession(true);

      const editSessionData = await VaultService.getEditSessionData(editSessionId);
      handleReset(editSessionData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEditSession(false);
    }
  }

  useEffect(() => {
    initFormSteps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingEditSession]);

  useEffect(() => {
    if (editSessionId) loadEditSessionData(editSessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSessionId]);

  useEffect(() => {
    const dirtyFields = Object.keys(formState.dirtyFields);
    if (!dirtyFields.includes("version")) return;

    const onlyVersionDirty = dirtyFields.length === 1 && dirtyFields[0] === "version";

    // If it's a new and clean form description in v1
    if (!editSessionId && onlyVersionDirty) {
      handleReset(createNewVaultDescription(vaultVersion));
    }

    // Changing from v2 to v1 is not supported
    if (vaultVersion === "v1") return;

    // If it's not a clean form description
    if (editSessionId || (!editSessionId && !onlyVersionDirty)) {
      const indexArray = getValues("vulnerability-severities-spec.indexArray");
      const currentSeverities = getValues("vulnerability-severities-spec.severities") as IEditedVulnerabilitySeverityV1[];

      const newSeverities = currentSeverities.map((s) => convertVulnerabilitySeverityV1ToV2(s, indexArray));
      setValue("vulnerability-severities-spec.severities", newSeverities, { shouldDirty: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaultVersion]);

  // async function saveToIpfs(vaultDescription: IVaultDescription) {
  //   try {
  //     setSavingToIpfs(true);
  //     const ipfsHash = await VaultService.uploadVaultDescriptionToIpfs(vaultDescription);
  //     navigate(`${RoutePaths.vault_editor}/${ipfsHash}`);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setSavingToIpfs(false);
  //   }
  // }

  if (loadingEditSession || savingToServer) return <Loading fixed />;

  return (
    <FormProvider {...methods}>
      <button className="mb-5" onClick={test}>
        Show form
      </button>
      <VaultEditorForm className="content-wrapper">
        {/* Title */}
        <div className="editor-title">
          <div className="title">
            <ArrowBackIcon />
            <p>
              {t("vaultCreator")}
              <span>/{currentStepInfo.name}</span>
            </p>
          </div>
        </div>

        {/* Steps control */}
        <VaultEditorStepper>
          {steps
            .filter((step) => !step.isInvisible)
            .map((step, index) => (
              <VaultEditorStep
                key={step.id}
                // disabled={index > maxStep}
                active={step.id === currentStepInfo.id}
                passed={!!step.isValid}
                onClick={() => onGoToStep(index)}>
                {step.isValid && <CheckIcon className="ml-2" />}
                {step.isValid ? "" : `${index + 1}.`}
                {step.name}
              </VaultEditorStep>
            ))}
        </VaultEditorStepper>

        {/* Section */}
        {steps.map((step) => (
          <Section key={step.id} visible={step.id === currentStepInfo.id}>
            <p className="section-title">{step.title}</p>
            <div className="section-content">
              <step.component />
            </div>
          </Section>
        ))}

        {/* Action buttons */}
        <div className="buttons-container">
          <Button onClick={() => onGoNext.go()}>
            {onGoNext.text} <NextIcon className="ml-2" />
          </Button>
          {onGoBack && (
            <Button styleType="invisible" onClick={() => onGoBack.go()}>
              <BackIcon className="mr-2" /> {onGoBack.text}
            </Button>
          )}
        </div>
        {/* <div className="buttons-container">
          {formState.isDirty && ipfsHash && (
            <button type="button" onClick={() => handleReset()} className="fill">
              {t("VaultEditor.reset-button")}
            </button>
          )}
          <button type="button" onClick={handleSubmit(onSubmit)} className="fill" disabled={!formState.isDirty}>
            {t("VaultEditor.save-button")}
          </button>
        </div> */}
      </VaultEditorForm>
    </FormProvider>
  );
};

export { VaultEditorFormPage };
