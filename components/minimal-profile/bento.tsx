"use client";
import { useEffect, useState } from "react";
import CodeChef from "./codeChef";
import CodeForces from "./codeforces";
import ContributionGraph from "./contribution";
import HackerRank from "./hackerRank";
import LeetCode from "./leetcode";

export default function BentoProfile({ userData }: { userData?: any }) {
  const [contributions, setContributions] = useState(
    userData?.contributions ?? []
  );
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8787/api/v1/ws`);
    ws.onopen = () => {
      console.log("WebSocket connection established");
      ws.send("Hello from client!");
    };
    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const contribData = JSON.parse(event.data).data;
      console.log("Parsed contribution data:", contribData);
      setContributions(contribData);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, []);
  useEffect(() => {
    if (userData?.contributions) {
      setContributions(userData.contributions);
    }
  }, [userData?.contributions]);
  if (userData) {
    console.log("BentoProfile userData", userData);
    return (
      <div>
        <div className="grid grid-cols-4 gap-8 justify-between items-center">
          <div className=" col-span-1 row-span-2">
            <LeetCode data={userData?.platformData.leetcode} />
          </div>
          <CodeForces data={userData?.platformData.codeforces} />
          <CodeChef data={userData?.platformData.codechef} />
          <HackerRank data={userData?.platformData.hackerRank} />
          <div className="col-span-3">
            <ContributionGraph contribution={contributions} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-8 justify-between items-center mx-72">
        <div className=" col-span-1 row-span-2">
          <LeetCode />
        </div>
        <CodeForces />
        <CodeChef />
        <HackerRank />
        <div className="col-span-3">
          {/* <ContributionGraph contribution={userData?.contribution} /> */}
        </div>
      </div>
    </div>
  );
}
