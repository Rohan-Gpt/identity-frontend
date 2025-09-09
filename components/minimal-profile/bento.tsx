"use client";

import { CodingPlatformData, Contribution } from "@/types";
import CodeForces from "./codeforces";
import ContributionGraph from "./contribution";
import HackerRank from "./hackerRank";
import LeetCode from "./leetcode";
import Github from "./github";

export default function BentoProfile({
  platformData,
  contributions,
  isLoading,
}: {
  platformData: CodingPlatformData["platformData"];
  contributions: Contribution[];
  isLoading: boolean;
}) {
  console.log("Rendering BentoProfile with data:", {
    platformData,
    contributions,
  });
  return (
    <div>
      <div className="grid grid-cols-4 gap-8 justify-between items-center">
        <LeetCode data={platformData.leetcode} />
        <CodeForces data={platformData.codeforces} />
        <Github />
        <HackerRank data={platformData.hackerRank} />
        <div className="col-span-3">
          <ContributionGraph
            contribution={contributions}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
