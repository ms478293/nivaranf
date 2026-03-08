import { SANJEEVANI_PUBLIC_STATS } from "@/content/sanjeevani-public-stats";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import StatsBox from "./StatsBox";

const TOTAL_FIGURES = [
  {
    id: 1,
    label: "Municipalities",
    stats: SANJEEVANI_PUBLIC_STATS.municipalitiesCoveredText,
  },
  {
    id: 2,
    label: "Patients Served",
    stats: SANJEEVANI_PUBLIC_STATS.patientsServedText,
  },
  {
    id: 3,
    label: "Province Coverage",
    stats: `${SANJEEVANI_PUBLIC_STATS.provincesCoveredText}/7`,
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
