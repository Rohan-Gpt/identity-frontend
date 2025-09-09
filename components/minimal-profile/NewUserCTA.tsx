import CodeForces from "./codeforces";
import Github from "./github";
import HackerRank from "./hackerRank";
import LeetCode from "./leetcode";

export const NewUserCTA = () => (
  <div className="grid grid-cols-4 gap-8 justify-between items-center">
    <LeetCode />
    <CodeForces />
    <Github />
    <HackerRank />
    <div className="col-span-3 h-48 bg-gray-700 rounded-lg"></div>
  </div>
);
