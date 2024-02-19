import { HackerProfileImage } from "components/HackerProfile";
import { WithTooltip } from "components/WithTooltip/WithTooltip";
import { useAuditFrameGame } from "hooks/auditFrameGame";
import { RoutePaths } from "navigation";
import { useCachedProfile } from "pages/HackerProfile/useCachedProfile";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { StyledOptedInList } from "./styles";

type IOptedInListProps = {
  editSessionIdOrAddress?: string;
};

const USERS_TO_SHOW = 3;

export const OptedInList = ({ editSessionIdOrAddress }: IOptedInListProps) => {
  const { t } = useTranslation();

  const {
    optedInList: { data },
  } = useAuditFrameGame(editSessionIdOrAddress);

  if (!editSessionIdOrAddress) return <></>;

  return (
    <StyledOptedInList>
      {data && data.length !== 0 && <span className="subtitle mr-1">{t("optedIn")}:</span>}
      <div className="list">
        {data?.slice(0, USERS_TO_SHOW)?.map((username) => (
          <OptedInUser key={username} username={username} />
        ))}
        {data && data?.length > USERS_TO_SHOW && (
          <WithTooltip text={`and +${data.length - USERS_TO_SHOW} more`}>
            <div className="item more">...</div>
          </WithTooltip>
        )}
      </div>
    </StyledOptedInList>
  );
};

const OptedInUser = ({ username }: { username: string }) => {
  const navigate = useNavigate();

  const hackerProfile = useCachedProfile(username);
  if (!hackerProfile) return <></>;

  return (
    <WithTooltip text={`@${hackerProfile.username}`}>
      <div className="item" onClick={() => navigate(`${RoutePaths.profile}/${hackerProfile.username}`)}>
        <HackerProfileImage hackerProfile={hackerProfile} size="xxsmall" noMargin />
      </div>
    </WithTooltip>
  );
};
