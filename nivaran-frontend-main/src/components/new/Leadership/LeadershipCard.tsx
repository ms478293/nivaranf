import { LEADERSHIP_DATA } from "@/content/leadership";

export const LeadershipCard = ({
  leadershipData,
}: {
  leadershipData: (typeof LEADERSHIP_DATA)[0]["members"][0];
}) => {
  return (
    <div className="">
      <div className="h-[200px] w-[200px]">
        {/* {leadershipData.image === "" ? null : (
          <Image
            src={leadershipData.image}
            alt={leadershipData.name}
            width={500}
            height={500}
            className="bg-gray-200 h-full w-full object-cover object-top"
          />
        )} */}
        <h3 className="flex flex-col mt-2 ">
          <span className="text-gray-600 text-sm">{leadershipData.name}</span>
          <span className="text-xsm text-gray-400">
            {leadershipData.position}
          </span>
        </h3>
      </div>
    </div>
  );
};
