"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ImpactRingBadgeProps = {
  target?: number;
  className?: string;
};

export function ImpactRingBadge({ target = 96, className = "" }: ImpactRingBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(1);
  const clampedTarget = Math.max(1, Math.min(99, target));

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

  const ringBackground = useMemo(() => {
    const p = clampedTarget;
    const stop1 = Math.max(8, Math.round(p * 0.32));
    const stop2 = Math.max(stop1 + 10, Math.round(p * 0.66));
    return `conic-gradient(from -90deg,
      #eb5834 0%,
      #f36f44 ${stop1}%,
      #2c77bb ${stop2}%,
      #2aa89a ${p}%,
      transparent ${p}% 100%
    )`;
  }, [clampedTarget]);

  return (
    <div ref={badgeRef} className={`relative w-32 h-32 group select-none ${className}`}>
      <div className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,_rgba(44,119,187,0.28)_0%,_rgba(235,88,52,0.22)_46%,_transparent_72%)] blur-md opacity-90 transition-all duration-500 group-hover:blur-lg group-hover:opacity-100" />

      <div className="absolute inset-0 rounded-full border-[8px] border-gray-200/50" />

      <div
        className="absolute inset-0 rounded-full animate-[spin_8s_linear_infinite] transition-all duration-500 group-hover:[animation-duration:2.6s] group-hover:scale-[1.03]"
        style={{ background: ringBackground }}
      />

      <div className="absolute inset-[6px] rounded-full bg-white/95 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.95)]" />

      <div className="absolute inset-[12px] rounded-full border border-primary-100/80 bg-white flex items-center justify-center shadow-sm">
        <span className="text-primary-main font-semibold text-[28px] leading-none tracking-tight">
          {displayValue}%
        </span>
      </div>

      <span className="absolute top-[12px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-secondary-main shadow-[0_0_12px_rgba(44,119,187,0.9)] animate-pulse" />
      <span className="absolute bottom-[14px] right-[16px] w-2 h-2 rounded-full bg-primary-main shadow-[0_0_10px_rgba(235,88,52,0.9)] animate-pulse [animation-delay:300ms]" />
    </div>
  );
}
