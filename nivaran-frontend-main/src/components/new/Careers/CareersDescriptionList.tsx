import { CareerType } from "@/app/(main)/career/page";

export const CareersDescriptionList = ({ items }: { items: CareerType }) => {
  // const benefits = [...JSON.parse(items.benefits)];

  return (
    <div className="flex flex-col space-y-2 gap-4 mt-6">
      <div>
        <h2 className="text-gray-800 font-medium  text-[18px]">
          Requirements:
        </h2>
        <ul className="pl-8">
          {items.requirements.map((list, i) => (
            <li key={i} className="text-gray-800 list-disc ">
              {list}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-gray-800 font-medium  text-[18px]">
          Responsibilities:
        </h2>
        <ul className="pl-8 flex flex-col">
          {items.responsibilities.map((list, i) => (
            <li key={i} className="text-gray-800 list-disc ">
              {list}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-gray-800 font-medium  text-[18px]">Benefits:</h2>
        <ul className="pl-4  items-start gap-2  flex flex-col">
          {Object.entries(items.benefits).map(([key, value], i) => (
            <li key={i} className="text-gray-800 list-disc flex flex- gap-2">
              <p className="text-gray-800 font-semibold ">{i + 1}.</p>
              <div>
                <h4 className="font-semibold  text-gray-800">{key}</h4>
                <p className="text-gray-800 font-light">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-gray-800 font-medium  text-[18px] ">
          Additional Info:
        </h2>
        <ul className="pl-8 flex items-start  flex-col ">
          {Object.entries(items.additionalInfo).map(([, value], i) => (
            <li key={i} className="text-gray-800 list-disc">
              {/* <h4 className="font-semibold  text-gray-800">{key}</h4> */}
              <p className="text-gray-800 font-light">{value}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* {items.map((item, index) => {
        if (typeof item === "string") {
          return (
            <li key={index} className="text-gray-800 list-disc ">
              {item}
            </li>
          );
        } else {
          return (
            <li key={index} className="mt-2 ">
              {item.title && item.description && (
                <div className="flex items-start gap-2 ">
                  <p className="font-semibold">{index + 1}. </p>
                  <div>
                    <h4 className="font-semibold  text-gray-800">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-gray-800 font-light">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {item.title && !item.description && (
                <h4 className=" text-[18px] font-medium text-gray-800 mt-8">
                  {item.title}
                </h4>
              )}
              <div className="pl-4">
                {item.list && <CareersDescriptionList items={item.list} />}
              </div>
            </li>
          );
        }
      })} */}
    </div>
  );
};
