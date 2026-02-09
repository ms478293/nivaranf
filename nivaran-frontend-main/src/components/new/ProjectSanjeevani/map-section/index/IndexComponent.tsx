import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { IndexTag } from "./IndexTag";

export const IndexComponent = () => (
  <div className="mb-6">
    <h3 className="text-gray-600 text-md uppercase font-semibold mb-1 ">
      Index
    </h3>
    <ul className="flex w-full  gap-2  md:w-1/2 lg:w-1/3">
      <RenderList
        data={["Planned", "Ongoing", "Completed"]}
        render={(data) => (
          <IndexTag
            key={data}
            variant={data as "Completed" | "Ongoing" | "Planned"}
            label={data}
          />
        )}
      />
    </ul>
  </div>
);
