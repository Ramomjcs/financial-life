"use client";

import React from "react";
import clsx from "clsx";

interface GoalProgressBarProps {
  title: string;
  percentage: number;
  barColor?: string;
  backgroundColor?: string;
  showPercentageInside?: boolean;
}

export default function GoalProgressBar({
  title,
  percentage,
  barColor = "bg-blue-500",
  backgroundColor = "bg-gray-200",
  showPercentageInside = false,
}: GoalProgressBarProps) {
  const percent = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="w-full">
      <p className="mb-1 text-sm font-medium text-gray-700">{title}</p>

      <div className={clsx("w-full h-5 rounded-full", backgroundColor)}>
        <div
          className={clsx(
            "h-full rounded-full flex items-center justify-center px-2 transition-all duration-300 ease-in-out",
            barColor
          )}
          style={{ width: `${percent}%` }}
        >
          {showPercentageInside && percent > 10 && (
            <span className="text-xs font-semibold text-white">{percent}%</span>
          )}
        </div>
      </div>

      {!showPercentageInside && (
        <div className="text-right text-xs font-medium text-gray-600 mt-1">
          {percent}%
        </div>
      )}
    </div>
  );
}
