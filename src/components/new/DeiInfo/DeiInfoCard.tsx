import { DEIINFOTYPE } from "@/content/dei";

export const DeiInfoCard = ({ dei }: { dei: DEIINFOTYPE }) => {
  return (
    <div key={dei.id} className="flex flex-col gap-2 ">
      <div className="p-2 bg-primary-100 rounded-full w-fit flex items-center justify-center">
        {dei.icon}
      </div>

      <div className=" flex flex-col gap-2">
        <h3 className="text-gray-800 text-[18px] font-medium">{dei.title}</h3>
        <p className="text-sm text-gray-600 font-light">{dei.description}</p>
      </div>
    </div>
  );
};
