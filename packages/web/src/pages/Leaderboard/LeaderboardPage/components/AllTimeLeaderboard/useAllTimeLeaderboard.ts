import { ethers } from "ethers";
import { usePayoutsGroupedByAddress } from "hooks/leaderboard";
import { IPayoutsTimeframe } from "hooks/leaderboard/usePayoutsGroupedByAddress";
import { useVaults } from "hooks/subgraph/vaults/useVaults";
import { severitiesOrder } from "pages/HackerProfile/constants";
import { useAddressesStreak } from "pages/HackerProfile/useAddressesStreak";
import { useMemo, useState } from "react";
import { getOldTokenPrice } from "utils/getOldTokenPrice";
import { parseSeverityName } from "utils/severityName";

export type IAllTimeLeaderboardSortKey = "streak" | "totalAmount" | "totalFindings";

export type IAllTimeLeaderboard = {
  address: string;
  streak: number | undefined;
  payouts: any[];
  totalAmount: { tokens: number; usd: number };
  totalSubmissions: number;
  highestSeverity: string;
}[];

export const useAllTimeLeaderboard = (
  timeframe: IPayoutsTimeframe = "all",
  sortKey: IAllTimeLeaderboardSortKey = "streak"
): { leaderboard: IAllTimeLeaderboard; isLoading: boolean } => {
  const payoutsGroupedByAddress = usePayoutsGroupedByAddress(timeframe);
  const { getAddressesStreakCount } = useAddressesStreak();
  const { vaultsReadyAllChains } = useVaults();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const payoutsWithStats = useMemo(() => {
    if (!vaultsReadyAllChains) return [];

    // Iterate over each entry on payoutsGroupedByAddress and calculate stats (total amount, total submissions and highest severity)
    const payoutsGroupedByAddressWithStats = Object.entries(payoutsGroupedByAddress).map(([address, payouts]) => {
      return payouts.reduce(
        (acc, payout) => {
          const vault = payout.vaultData;
          if (!vault || !vault.description) return acc;
          const isAudit = vault.description?.["project-metadata"].type === "audit";

          const totalRewardInTokens = +ethers.utils.formatUnits(payout.totalPaidOut ?? "0", vault.stakingTokenDecimals);
          // If audit comp and no token price, assume the token price is 1 because is stable coin. If not, dont calculate the usd value
          const tokenPrice =
            payout.payoutData?.vault?.amountsInfo?.tokenPriceUsd ?? getOldTokenPrice(payout.id) ?? (isAudit ? 1 : 0);

          if (payout.payoutData?.type === "single") {
            const findingSeverityName = parseSeverityName(payout.payoutData.severity);

            if (acc.streak === undefined) acc.streak = getAddressesStreakCount([address]);
            acc.totalAmount.tokens += totalRewardInTokens;
            acc.totalAmount.usd += totalRewardInTokens * tokenPrice;
            acc.totalSubmissions += 1;
            acc.highestSeverity =
              severitiesOrder.indexOf(findingSeverityName) > severitiesOrder.indexOf(acc.highestSeverity)
                ? findingSeverityName
                : acc.highestSeverity;
          } else if (payout.payoutData?.type === "split") {
            for (const ben of payout.payoutData.beneficiaries) {
              if (address.toLowerCase() !== ben.beneficiary.toLowerCase()) continue;
              // Total percentage paid out to all beneficiaries (usually 100%)
              const totalPercentage = payout.payoutData.beneficiaries.reduce(
                (acc, curr) => acc + Number(curr.percentageOfPayout),
                0
              );
              const findingRewardInTokens = (Number(ben.percentageOfPayout) / totalPercentage) * totalRewardInTokens;

              const findingSeverityName = parseSeverityName(ben.severity);

              if (acc.streak === undefined) acc.streak = getAddressesStreakCount([address]);
              acc.totalAmount.tokens += findingRewardInTokens;
              acc.totalAmount.usd += findingRewardInTokens * tokenPrice;
              acc.totalSubmissions += 1;
              acc.highestSeverity =
                severitiesOrder.indexOf(findingSeverityName) > severitiesOrder.indexOf(acc.highestSeverity)
                  ? findingSeverityName
                  : acc.highestSeverity;
            }
          }

          return acc;
        },
        {
          address,
          payouts,
          totalAmount: { tokens: 0, usd: 0 },
          totalSubmissions: 0,
          highestSeverity: "",
          streak: undefined,
        } as IAllTimeLeaderboard[0]
      );
    });

    setIsLoading(false);

    if (sortKey === "totalAmount") {
      return payoutsGroupedByAddressWithStats.sort(
        (a, b) => b.totalAmount.usd - a.totalAmount.usd || (b.streak ?? 0) - (a.streak ?? 0)
      );
    } else if (sortKey === "totalFindings") {
      return payoutsGroupedByAddressWithStats.sort(
        (a, b) => b.totalSubmissions - a.totalSubmissions || b.totalAmount.usd - a.totalAmount.usd
      );
    } else {
      return payoutsGroupedByAddressWithStats.sort(
        (a, b) => (b.streak ?? 0) - (a.streak ?? 0) || b.totalAmount.usd - a.totalAmount.usd
      );
    }
  }, [payoutsGroupedByAddress, vaultsReadyAllChains, getAddressesStreakCount, sortKey]);

  return { leaderboard: payoutsWithStats, isLoading };
};
