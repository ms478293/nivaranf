"use client";
import { cn } from "@/lib/utils";
import { createContext } from "react";

const PhaseSectionContext = createContext(null);

const PhaseSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <PhaseSectionContext.Provider value={{}}>
      <section className={cn("p-4", className)}>{children}</section>
    </PhaseSectionContext.Provider>
  );
};

// Export components separately
const Title = ({ title, className }: { title: string; className?: string }) => {
  return (
    <h3 className={cn("text-secondary-800 text-xl font-semibold ", className)}>
      {title}
    </h3>
  );
};

const Description = ({
  description,
  className,
}: {
  description: string;
  className?: string;
}) => {
  return (
    <p className={cn("text-secondary-800 text-sm", className)}>{description}</p>
  );
};

const StatsBox = ({
  stats,
  description,
  className,
}: {
  stats: string;
  description: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-lg flex flex-col gap-8 items-start text-secondary-800 bg-neutral-50 p-2 min-w-[150px] flex-1 justify-between ",
        className
      )}
    >
      <h4 className="font-medium ">{stats}</h4>
      <p className="text-sm">{description}</p>
    </div>
  );
};

// Export each component explicitly
export {
  PhaseSection,
  Description as PhaseSectionDescription,
  StatsBox as PhaseSectionStatsBox,
  Title as PhaseSectionTitle,
};
