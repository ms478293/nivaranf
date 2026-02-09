import { CareerType } from "@/app/(main)/career/page";
import { ContainerIcon } from "@/assets/icons/ContainerIcon";
import { SuitcaseIcon } from "@/assets/icons/SuitcaseIcon";
import TimeIcon from "@/assets/icons/TimeIcon";

export const JobDetailsModal = ({ data }: { data: CareerType }) => {
  return (
    <div className="bg-neutral-50 font-Poppins max-h-[80vh]">
      <h2 className="font-medium text-lg text-gray-800 p-4 border-b border-gray-400">
        Job Listing Details
      </h2>

      <div className=" overflow-y-auto p-4">
        <div className="flex gap-2">
          <JobDetailItem
            label={"Name of Job"}
            value={data.jobName}
            icon={
              <SuitcaseIcon className="stroke-1 w-5 h-5 stroke-secondary-500" />
            }
          />

          <JobDetailItem
            label={"Job Type"}
            value={data.jobType}
            icon={
              <SuitcaseIcon className="stroke-1 w-5 h-5 stroke-secondary-500" />
            }
          />

          <JobDetailItem
            label={"Opening"}
            value={data.positionsOpen}
            icon={
              <ContainerIcon className="stroke-1 w-5 h-5 stroke-secondary-500" />
            }
          />

          <JobDetailItem
            label={"Apply Before"}
            value={data.applyBefore.substring(0, 10)}
            icon={
              <TimeIcon className="stroke-1 w-5 h-5 stroke-secondary-500" />
            }
          />
        </div>

        <div className="flex flex-col  mt-4">
          <h3 className="font-medium text-gray-950">Introduction</h3>
          <p className="text-gray-600 font-light text-sm">
            {data.introduction}
          </p>
        </div>
        <div className="flex flex-col  mt-5 ">
          <h3 className="font-medium text-gray-950">Requirements</h3>
          <ul className="flex flex-col mb-4 pl-4">
            {data.requirements.map((list, i) => (
              <li key={i} className="text-gray-800 list-disc ">
                {list}
              </li>
            ))}
          </ul>

          <h3 className="font-medium text-gray-950">Responsibilities</h3>
          <ul className="flex flex-col mb-5 pl-4">
            {data.responsibilities.map((list, i) => (
              <li key={i} className="text-gray-800 list-disc ">
                {list}
              </li>
            ))}
          </ul>

          <ul className="  items-start  flex flex-col mb-5">
            <h3 className="font-medium text-gray-950">Benefits</h3>
            {Object.entries(data.benefits).map(([key, value], i) => (
              <li
                key={i}
                className="text-gray-800 list-disc  flex flex-row  gap-2"
              >
                {/* <p className="text-gray-800 font-medium ">{i + 1}.</p> */}
                <div className="flex items-center gap-2">
                  <h4 className="font-medium  text-gray-800">{key}: </h4>{" "}
                  <p className="text-gray-800 font-light">{value}</p>
                </div>
              </li>
            ))}
          </ul>

          <ul className="items-start   flex flex-col mb-5 ">
            <h3 className="font-medium text-gray-950">Additional Info</h3>
            {Object.entries(data.additionalInfo).map(([key, value], i) => (
              <li
                key={i}
                className="text-gray-800  list-disc flex flex-row  gap-2"
              >
                {/* <p className="text-gray-800 font-medium ">{i + 1}.</p> */}
                <div className="flex items-center gap-2">
                  <h4 className="font-medium  text-gray-800">{key}: </h4>{" "}
                  <p className="text-gray-800 font-light">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

type JobDetailItemProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

// type JobDetailSectionProps = {
//   title: string;
//   items: string[];
// };

const JobDetailItem: React.FC<JobDetailItemProps> = ({
  label,
  value,
  icon,
}) => (
  <div className="flex flex-col justify-between h-[120px] w-[145px] bg-secondary-50 p-2">
    <div className=" p-1 bg-secondary-200 w-fit rounded-sm">{icon}</div>
    <div>
      <h4 className="text-secondary-400 font-light text-sm ">{label}</h4>
      <p className="text-sm  text-secondary-600 font-[600]">{value}</p>
    </div>
  </div>
);

// const JobDetailSection: React.FC<JobDetailSectionProps> = ({
//   title,
//   items,
// }) => (
//   <div>
//     <h3 className="text-lg font-semibold mb-2">{title}</h3>
//     <ul className="list-disc list-inside text-gray-700">
//       {items.map((item, index) => (
//         <li key={index}>{item}</li>
//       ))}
//     </ul>
//   </div>
// );
