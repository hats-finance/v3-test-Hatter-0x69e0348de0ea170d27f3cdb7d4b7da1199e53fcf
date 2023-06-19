import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { VaultDetailsContext } from "../../store";
import { CommitteeInfoSection } from "./CommitteeInfoSection/CommitteeInfoSection";
import { EnvSetupSection } from "./EnvSetupSection/EnvSetupSection";
import { InScopeSection } from "./InScopeSection/InScopeSection";
import { OutOfScopeSection } from "./OutOfScopeSection/OutOfScopeSection";
import { SeverityLevelsSection } from "./SeverityLevelsSection/SeverityLevelsSection";
import { StyledVaultScopeSection } from "./styles";

export const VaultScopeSection = () => {
  const { t } = useTranslation();
  const { vault } = useContext(VaultDetailsContext);

  return (
    <StyledVaultScopeSection>
      <div>
        <h2>{t("inScope")}</h2>
        <InScopeSection vault={vault} />
      </div>

      {vault.description?.scope?.outOfScope && (
        <div>
          <h2>{t("outOfScope")}</h2>
          <OutOfScopeSection vault={vault} />
        </div>
      )}

      {vault.description?.scope?.protocolSetupInstructions.instructions && (
        <div>
          <h2>{t("envSetupInstructions")}</h2>
          <EnvSetupSection vault={vault} />
        </div>
      )}

      {vault.description?.severities.length && (
        <div>
          <h2>{t("severityLevels")}</h2>
          <SeverityLevelsSection vault={vault} />
        </div>
      )}

      {vault.description?.committee?.members?.length && (
        <div>
          <h2>{t("committeeInfo")}</h2>
          <CommitteeInfoSection vault={vault} />
        </div>
      )}
    </StyledVaultScopeSection>
  );
};
