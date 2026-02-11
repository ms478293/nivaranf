import RenderList from "@/components/nivaran/common/renderList/RenderList";
import StatsBox from "./StatsBox";
const TOTAL_FIGURES = [
  {
    id: 1,
    label: "Gaupalika",
    // stats: calculatedTotalStats.totalGaupalikas,
    stats: 328,
  },
  {
    id: 2,
    label: "Total Camps",
    // stats: calculatedTotalStats.totalCamp,
    stats: "1,200+",
  },
  {
    id: 3,
    label: "Camp Duration",
    // stats: calculatedTotalStats.workingDay,
    stats: "2025-2030",
  },
];
export const TotalFigures = () => (
  <>
    <h3 className="text-gray-600 text-md uppercase font-semibold mb-1 ">
      Total Figures
    </h3>
    <ul className="grid  grid-cols-3 gap-2 sm:w-1/2 lg:w-1/2">
      <RenderList
        data={TOTAL_FIGURES}
        render={(data) => (
          <li key={data.id} className="flex flex-col gap-1 ">
            <StatsBox
              label={data.label}
              totalStats={data.stats}
              variant="outline"
            />
          </li>
        )}
      />
    </ul>
  </>
);
