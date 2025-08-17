"use client";
import { useState } from "react";
import { OverviewTab } from "./overview-tab";

export const colorThemes = {
  purple: {
    primary: "from-violet-600 via-purple-600 to-indigo-600",
    accent: "bg-violet-500",
    badge: "bg-violet-100 text-violet-800 hover:bg-violet-200",
    highlight: "text-violet-500",
  },
  blue: {
    primary: "from-blue-600 via-sky-600 to-cyan-600",
    accent: "bg-blue-500",
    badge: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    highlight: "text-blue-500",
  },
  green: {
    primary: "from-emerald-600 via-green-600 to-teal-600",
    accent: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    highlight: "text-emerald-500",
  },
  amber: {
    primary: "from-amber-600 via-orange-600 to-yellow-600",
    accent: "bg-amber-500",
    badge: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    highlight: "text-amber-500",
  },
  rose: {
    primary: "from-rose-600 via-pink-600 to-red-600",
    accent: "bg-rose-500",
    badge: "bg-rose-100 text-rose-800 hover:bg-rose-200",
    highlight: "text-rose-500",
  },
};

export default function BentoProfile({
  user,
  initialTheme,
}: {
  user: any;
  initialTheme: string;
}) {
  const [colorTheme, setColorTheme] = useState("purple");

  const currentTheme = colorThemes[initialTheme as keyof typeof colorThemes];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-white">Developer Dashboard</h1>
      <p className="text-muted-foreground">
        Track your coding journey across platforms
      </p>

      <div className="my-4">
        <label htmlFor="theme-select" className="text-white mr-2">
          Selected Theme:
        </label>
        <span className="p-2 rounded bg-gray-800 text-white">
          {initialTheme}
        </span>
      </div>

      <OverviewTab user={user} colorTheme={colorThemes.purple} />
    </div>
  );
}

export async function getServerSideProps() {
  // Simulate fetching user data and theme from a database or API
  const user = { name: "John Doe", stats: {} }; // Replace with actual data fetching
  const initialTheme = "purple"; // Replace with actual theme fetching

  return {
    props: {
      user,
      initialTheme,
    },
  };
}
