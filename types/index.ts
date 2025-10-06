// src/types/index.ts

export interface Contribution {
  date: string;
  count: number;
  level: number;
}

// Example structure for other platforms
export interface LeetCodeData {
  username: string;
  totalSolved: number;
  // ... other properties
}

export interface PlatformData {
  leetcode: LeetCodeData;
  codeforces: any; // Define these as well
  hackerRank: any;
  codechef: any;
}

export interface CodingPlatformData {
  platformData: PlatformData;
}
