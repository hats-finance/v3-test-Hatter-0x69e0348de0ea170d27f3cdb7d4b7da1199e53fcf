import SyncIcon from "@mui/icons-material/Sync";
import { Alert, Button, Modal, Pill } from "components";
import { BigNumber } from "ethers";
import useModal from "hooks/useModal";
import { useVaults } from "hooks/vaults/useVaults";
import millify from "millify";
import { DepositWithdraw } from "pages/HoneypotsPage/DepositWithdraw";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ipfsTransformUri } from "utils";
import { Amount } from "utils/amounts.utils";
import { getTokenInfo } from "utils/tokens.utils";
import { VaultStatusContext } from "../store";

export const DepositStatusCard = () => {
  const { t } = useTranslation();
  const [tokenInfo, setTokenInfo] = useState<{ isValidToken: boolean; name: string; symbol: string }>();

  const { vaultData, vaultAddress, vaultChainId, refreshVaultData } = useContext(VaultStatusContext);
  const { isShowing: isShowingDepositModal, show: showDepositModal, hide: hideDepositModal } = useModal();

  const { allVaults } = useVaults();
  const selectedVault = vaultAddress ? allVaults?.find((v) => v.id.toLowerCase() === vaultAddress.toLowerCase()) : undefined;

  const vaultBalance = new Amount(BigNumber.from(vaultData.depositedAmount), vaultData.tokenDecimals).number;
  const isVaultDeposited = vaultData.depositedAmount.gt(0);

  const getAssetInformation = async () => {
    const info = await getTokenInfo(vaultData.assetToken, vaultChainId);
    setTokenInfo(info);
  };

  useEffect(() => {
    getAssetInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaultData]);

  return (
    <>
      <div className="status-card">
        <div className="status-card__title">
          <div className="leftSide">
            <h3>{t("deposit")}</h3>
            <Pill
              color={isVaultDeposited ? "blue" : "red"}
              text={
                isVaultDeposited ? t("completed") : vaultData.isCommitteeCheckedIn ? t("awaitingAction") : t("awaitingCheckin")
              }
            />
          </div>
          <div className="reload" onClick={refreshVaultData}>
            <SyncIcon />
          </div>
        </div>
        {isVaultDeposited && (
          <div className="status-card__deposited">
            <div className="field">
              <p className="title">{t("depositedAsset")}</p>
              <div className="value">
                <img src={ipfsTransformUri(selectedVault?.description?.["project-metadata"].tokenIcon)} alt={tokenInfo?.name} />
                <p>
                  {tokenInfo?.name} ({tokenInfo?.symbol})
                </p>
              </div>
            </div>
            <div className="field">
              <p className="title">{t("amount")}</p>
              <div className="value">
                <p>{millify(vaultBalance)}</p>
              </div>
            </div>
          </div>
        )}
        {vaultData.isCommitteeCheckedIn && !isVaultDeposited && (
          <p className="status-card__text mb-5">{t("depositOnVaultExplanation")}</p>
        )}
        {!vaultData.isCommitteeCheckedIn && <Alert content={t("committeeMustCheckInFirst")} type="warning" />}
        <Button className="status-card__button" disabled={!vaultData.isCommitteeCheckedIn} onClick={showDepositModal}>
          {t("deposit")}
        </Button>
      </div>

      {selectedVault && (
        <Modal
          isShowing={isShowingDepositModal}
          title={`${selectedVault.description?.["project-metadata"].name!} ${selectedVault.version === "v2" ? "(v2)" : ""}`}
          titleIcon={ipfsTransformUri(selectedVault.description?.["project-metadata"].icon!)}
          onHide={hideDepositModal}
          removeHorizontalPadding
        >
          <DepositWithdraw vault={selectedVault} closeModal={hideDepositModal} />
        </Modal>
      )}
    </>
  );
};
