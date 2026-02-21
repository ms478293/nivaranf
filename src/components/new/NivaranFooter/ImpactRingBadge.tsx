"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type ImpactRingBadgeProps = {
  target?: number;
  className?: string;
};

export function ImpactRingBadge({ target = 96, className = "" }: ImpactRingBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const gradientId = useId().replace(/:/g, "");
  const [displayValue, setDisplayValue] = useState(1);
  const clampedTarget = Math.max(1, Math.min(99, target));
  const GAP_PERCENT = 12;
  const END_CLEARANCE_PERCENT = 2;
  const MAX_ARC_PERCENT = Math.max(1, 100 - GAP_PERCENT - END_CLEARANCE_PERCENT);
  const strokeWidth = 18;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const node = badgeRef.current;
    if (!node) return;

    const animateCounter = () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setDisplayValue(clampedTarget);
        return;
      }

      const startValue = 1;
      const endValue = clampedTarget;
      const duration = 1800;
      const start = performance.now();
      let raf = 0;

      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const nextValue = Math.round(startValue + (endValue - startValue) * eased);
        setDisplayValue(nextValue);
        if (t < 1) {
          raf = window.requestAnimationFrame(step);
        }
      };

      raf = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(raf);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          animateCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [clampedTarget]);

  const animatedArcPercent = useMemo(() => {
    const progress = displayValue / clampedTarget;
    return Math.max(0, Math.min(MAX_ARC_PERCENT, MAX_ARC_PERCENT * progress));
  }, [displayValue, clampedTarget, MAX_ARC_PERCENT]);

  const arcLength = useMemo(
    () => (animatedArcPercent / 100) * circumference,
    [animatedArcPercent, circumference],
  );

  const trackArcLength = useMemo(
    () => (MAX_ARC_PERCENT / 100) * circumference,
    [MAX_ARC_PERCENT, circumference],
  );

  const rotateDeg = useMemo(() => {
    const hiddenPercent = 100 - MAX_ARC_PERCENT;
    const halfHiddenDeg = (hiddenPercent * 360) / 200;
    // Center the fixed gap at the top (12 o'clock) instead of the left side.
    return 270 + halfHiddenDeg;
  }, [MAX_ARC_PERCENT]);

  return (
    <div ref={badgeRef} className={`relative w-32 h-32 group select-none ${className}`}>
      <div className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,_rgba(44,119,187,0.28)_0%,_rgba(235,88,52,0.22)_46%,_transparent_72%)] blur-md opacity-90 transition-all duration-500 group-hover:blur-lg group-hover:opacity-100" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible transition-transform duration-500 group-hover:scale-[1.03]">
        <defs>
          <linearGradient id={`impact-ring-${gradientId}`} x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#eb5834" />
            <stop offset="35%" stopColor="#f36f44" />
            <stop offset="68%" stopColor="#2c77bb" />
            <stop offset="100%" stopColor="#2aa89a" />
          </linearGradient>
        </defs>

        <g transform={`rotate(${rotateDeg} 50 50)`}>
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(203,213,225,0.6)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${trackArcLength} ${circumference}`}
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={`url(#impact-ring-${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            className="transition-[stroke-dasharray] duration-150"
          />
        </g>
      </svg>

      <div className="absolute inset-[18px] rounded-full bg-white/95 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.96)]" />

      <div className="absolute inset-[28px] rounded-full border border-primary-100/80 bg-white flex items-center justify-center shadow-sm">
        <span className="text-primary-main font-semibold text-[28px] leading-none tracking-tight">
          {displayValue}%
        </span>
      </div>
    </div>
  );
}
