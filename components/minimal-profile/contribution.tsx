"use client";
import React from "react";
import { ActivityCalendar, ThemeInput } from "react-activity-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function ContributionGraph({
  contribution,
  isLoading,
}: {
  contribution: {
    date: string;
    count: number;
    level: number;
  }[];
  isLoading: boolean;
}) {
  const explicitTheme: ThemeInput = {
    light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
    dark: ["#383838", "#4D455D", "#7DB9B6", "#F5E9CF", "#E96479"],
  };
  const minimalTheme: ThemeInput = {
    light: ["hsl(0, 0%, 92%)", "rebeccapurple"],
    dark: ["hsl(0, 0%, 92%)", "rebeccapurple"],
    // for `dark` the default theme will be used
  };
  return (
    <div className="rounded-xl flex flex-col justify-center items-center p-8 bg-white">
      <h2>Contribution</h2>
      <p>This is the contribution section.</p>
      {isLoading ? (
        <>
          <ActivityCalendar data={[]} loading />
        </>
      ) : (
        <>
          <ActivityCalendar
            data={contribution}
            maxLevel={4}
            showWeekdayLabels
            theme={minimalTheme}
            renderBlock={(block, activity) =>
              React.cloneElement(block, {
                "data-tooltip-id": "react-tooltip",
                "data-tooltip-html": `${activity.count} activities on ${activity.date}`,
              })
            }
          />
        </>
      )}

      <ReactTooltip id="react-tooltip" />
    </div>
  );
}
