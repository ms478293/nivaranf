"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useCountAnimation } from "@/hooks/useCountAnimation";

interface AnimatedStatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: React.ReactNode;
  duration?: number;
  className?: string;
  numberClassName?: string;
}

export const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({
  value,
  suffix = "",
  prefix = "",
  label,
  icon,
  duration = 2000,
  className = "",
  numberClassName = "",
}) => {
  const { count, ref } = useCountAnimation(value, duration);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-4",
        "bg-white border border-gray-200 hover:shadow-lg hover:scale-105",
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-3xl transition-colors duration-300">
          {icon}
        </div>
      )}

      <div className="flex items-center justify-center gap-1">
        <span
          className={cn(
            "text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300",
            "bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent",
            numberClassName
          )}
        >
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </span>
      </div>

      <p className="mt-3 text-center text-sm sm:text-base text-gray-600 font-medium">
        {label}
      </p>
    </div>
  );
};

export default AnimatedStatCard;
