import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Media } from "components";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useEscapePressed } from "hooks/useKeyPress";
import { ipfsTransformUri } from "utils";
import OpenInNewTabIcon from "assets/icons/open-in-new-tab.svg";
import { defaultAnchorProps } from "constants/defaultAnchorProps";
import { ChainsConfig } from "config/chains";
import { useNetwork } from "wagmi";
import { INFTTokenInfoRedeemed } from "hooks/nft/types";

interface IProps {
  tokenInfo: INFTTokenInfoRedeemed;
}

export function NFTCard({ tokenInfo }: IProps) {
  const { metadata, isRedeemed, tokenId, isDeposit, isMerkleTree } = tokenInfo;
  const { chain } = useNetwork();
  const { t } = useTranslation();
  const [fullScreen, setFullScreen] = useState(false);
  const tier = metadata.attributes.find((attr) => attr.trait_type === "Trust Level")?.value;
  const vaultName = metadata.attributes.find((attr) => attr.trait_type === "Vault")?.value;
  const escapePressed = useEscapePressed();

  useEffect(() => {
    if (escapePressed) {
      setFullScreen(false);
    }
  }, [escapePressed]);

  // TODO: [v2] add opensea link to multichain
  let openSeaUrl;
  if (chain?.id === 1) {
    openSeaUrl = `https://opensea.io/assets/${ChainsConfig[chain.id].vaultsNFTContract}/${tokenId}`;
  } else if (chain?.id === 4) {
    openSeaUrl = `https://testnets.opensea.io/assets/${ChainsConfig[chain.id].vaultsNFTContract}/${tokenId}`;
  }

  if (fullScreen) {
    return ReactDOM.createPortal(
      <div className="nft-card-full-screen-wrapper">
        <button onClick={() => setFullScreen(false)} className="nft-card-full-screen__close-btn">
          &times;
        </button>
        <div className="nft-card-full-screen__container">
          <Media
            link={ipfsTransformUri(metadata.animation_url)}
            poster={ipfsTransformUri(metadata.image)}
            className="nft-card-full-screen__video"
          />
          {isRedeemed && (
            <a className="nft-card-full-screen__opensea-link" href={openSeaUrl} {...defaultAnchorProps}>
              {t("NFTCard.view-on-open-sea")} <img src={OpenInNewTabIcon} alt="" />{" "}
            </a>
          )}
        </div>
      </div>,
      document.body
    );
  }

  const both = isDeposit && isMerkleTree;

  return (
    <div className={classNames("nft-card-wrapper", { "not-redeemed": !isRedeemed })} onClick={() => setFullScreen(true)}>
      <Media link={ipfsTransformUri(metadata.image)} />
      <div className="nft-card__info-container">
        {/* <div className="nft-card__info-title">{roleName}</div> */}
        <div className="nft-card__info-element">
          <div className="nft-card__info-element-title">{t("NFTCard.vault-embassy")}</div>
          <div className="nft-card__info-element-value">{vaultName}</div>
        </div>
        <div className="nft-card__info-element">
          <div className="nft-card__info-element-title">{t("NFTCard.tier")}</div>
          <div className="nft-card__info-element-value">
            {tier} {t("NFTCard.tier-text")}
          </div>
        </div>
      </div>
      <div className={classNames("nft-card__status", { eligible: !isRedeemed, redeemed: isRedeemed })}>
        {isRedeemed ? t("NFTCard.redeemed") : both ? "Airdrop/Deposit" : isDeposit ? "Deposit" : "Airdrop"}
      </div>
    </div>
  );
}
