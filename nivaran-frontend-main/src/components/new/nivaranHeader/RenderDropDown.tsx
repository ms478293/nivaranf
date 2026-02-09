import DropDownIcon from "@/assets/new/icons/DropDownIcon";
import { howToHelpData, newsAndStroiesData } from "@/content/site-data";
import Link from "next/link";

interface RenderDropDownProps {
  data: typeof howToHelpData | typeof newsAndStroiesData;
  title: string;
  basePath: string;
  isWhite?: boolean;
}

const RenderDropDown = ({
  data,
  title,
  basePath,
  isWhite,
}: RenderDropDownProps) => {
  return (
    <div className="relative group flex">
      <button
        aria-label={`Dropdown button of ${title}`}
        className={`${
          isWhite ? "text-gray-600" : "text-white"
        }  flex items-center px-2 gap-1 rounded-lg leading-[0px] text-sm`}
      >
        <span> {title}</span>
        <DropDownIcon
          className={`w-5 h-5  ${
            isWhite ? "stroke-gray-600" : "stroke-white"
          } fill-none`}
        />
      </button>
      <div className="absolute left-0 top-full  hidden group-hover:block bg-white shadow-lg rounded-lg z-50 w-fit min-w-max">
        <ul className="p-2 space-y-2">
          {data.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <div className="group relative">
                  <Link href={basePath}>
                    <div className=" font-bold flex items-center text-nowrap gap-2">
                      <span className="text-nowrap ">{item.title}</span>
                      <DropDownIcon className="w-4 h-4  stroke-white fill-none" />{" "}
                      {/* <DropDownIcon className="w-3 h-3" /> */}
                    </div>
                  </Link>
                  <ul className="">
                    {item.children.map((child) => (
                      <li key={child.title} className="mb-0.5 font-thin">
                        <Link href={child.href}>
                          <span className="hover:text-primary-main pl-2 text-nowrap ">
                            {child.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link href={item.href}>
                  <span className="hover:text-primary-main block -mb-1">
                    {item.title}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RenderDropDown;
