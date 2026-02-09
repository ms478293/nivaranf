import {
  PhaseSection,
  PhaseSectionDescription,
  PhaseSectionStatsBox,
  PhaseSectionTitle,
} from "../PhaseSection/PhaseSection";

export const ProjectPhase = ({
  phases,
}: {
  phases: {
    start_date: string;
    objective: string;
    metrics: {
      data: string;
      label: string;
    }[];
  }[];
}) => {
  const phaseColors = [
    "bg-secondary-100",
    "bg-secondary-200",
    "bg-secondary-300",
    "bg-secondary-400",
    "bg-secondary-500",
    "bg-secondary-600",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      {phases.map((phase, index) => {
        const phaseNumber = index + 1;
        const phaseColor = phaseColors[index % phaseColors.length];
        const textColor = index >= 3 ? "text-neutral-50" : "";

        return (
          <PhaseSection
            key={index}
            className={`${phaseColor} flex flex-col gap-4 p-4 justify-between`}
          >
            <div>
              <PhaseSectionTitle
                title={
                  `Phase-${
                    phaseNumber === 1
                      ? "I"
                      : phaseNumber === 2
                      ? "II"
                      : phaseNumber === 3
                      ? "III"
                      : phaseNumber === 4
                      ? "IV"
                      : null
                  }` as string
                }
                className={textColor}
              />
              <PhaseSectionDescription
                description={`Start Date: ${phase.start_date}`}
                className={textColor}
              />
            </div>
            <div>
              <PhaseSectionTitle title="Objective" className={textColor} />
              <PhaseSectionDescription
                description={phase.objective}
                className={textColor}
              />
            </div>
            <div className="w-full">
              <PhaseSectionTitle title="Metrics" className={textColor} />
              <div className="gap-2 w-full flex flex-wrap ">
                {phase.metrics.map((metric) => (
                  <PhaseSectionStatsBox
                    stats={metric.data}
                    description={metric.label}
                    key={metric.label}
                    className={textColor}
                  />
                ))}
              </div>
            </div>
          </PhaseSection>
        );
      })}
    </div>
  );
};
