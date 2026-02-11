import { DEI_EMPOWERING_TYPE } from "@/content/dei";

export const DeiEmpoweringCard = ({ dei }: { dei: DEI_EMPOWERING_TYPE }) => {
  return (
    <div>
      <h4 className="flex flex-col gap-1 font-semibold text-lg py-3 border-b border-primary-500 text-primary-500">
        <span>{dei.stats}</span>
        <span className="">{dei.title}</span>
      </h4>
      <p className="py-3 text-sm text-gray-600">{dei.description}</p>
    </div>
  );
};
