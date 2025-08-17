import { CodeForcesStatsCard } from "./codeforces-stats-card";
import { ContributionCard } from "./contribuition-card";
import { GithubStatsCard } from "./github-stats-card";
import { HackerRankStatsCard } from "./hackerrank-stats-card";
import { LanguagesCard } from "./languages-card";
import { LeetCodeStatsCard } from "./leetcode-stats-card";
import { ProfileCard } from "./profile-card";

export function OverviewTab({
  user,
  colorTheme,
}: {
  user: any;
  colorTheme: {
    primary: string;
    accent: string;
    badge: string;
    highlight: string;
  };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {/* User Profile Card - Left Column */}
      <ProfileCard colorTheme={colorTheme} />

      {/* Stats Grid - Right Columns */}
      <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <GithubStatsCard user={user} />
        <LeetCodeStatsCard user={user} />

        <CodeForcesStatsCard user={user} />

        {/* <LanguagesCard userData={userGithubData} /> */}
        <ContributionCard colorTheme={colorTheme} />
        <HackerRankStatsCard colorTheme={colorTheme} />
      </div>
    </div>
  );
}
