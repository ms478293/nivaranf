import { cn } from "@/lib/utils";

export const PAPTOS = ({
  title,
  details,
  id,
  listClassName,
}: {
  title: string;
  details: { description?: string; list?: string[] }[];
  id: string;
  listClassName?: string;
}) => {
  return (
    <div className="mt-4" id={id}>
      <h2 className="text-gray-950 text-lg font-medium">{title}</h2>
      {/* <p className="mt-2 text-gray-600">{details.description}</p> */}

      {details?.map((detail, i) => (
        <div key={i}>
          <ul className="">
            <p className="text-gray-600 leading-8">{detail.description}</p>
            {detail?.list?.map((l, i) => (
              <li
                key={i}
                className={cn(
                  "list-disc text-gray-600 leading-8",
                  listClassName
                )}
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
