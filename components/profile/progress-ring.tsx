"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface ProgressRingProps {
  radius?: number;
  stroke?: number;
  progress: number; // 0 to 100
  color?: string;
  bgColor?: string;
}

export default function ProgressRing({
  radius = 50,
  stroke = 10,
  progress,
  color = "#8b5cf6",
  bgColor = "#e2e8f0",
}: ProgressRingProps) {
  const normalizedRadius = radius - stroke / 2;

  const circumference = 2 * Math.PI * normalizedRadius; // Use normalizedRadius for accurate circumference
  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    if (typeof progress === "number" && !isNaN(progress)) {
      const clamped = Math.min(100, Math.max(0, progress));
      const offset = circumference * (1 - clamped / 100);
      setDashOffset(offset);
    }
  }, [progress, circumference]);

  return (
    <svg width={radius * 2} height={radius * 2}>
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="none"
        stroke={bgColor}
        strokeWidth={stroke}
      />
      <motion.circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        style={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: dashOffset }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
    </svg>
  );
}
