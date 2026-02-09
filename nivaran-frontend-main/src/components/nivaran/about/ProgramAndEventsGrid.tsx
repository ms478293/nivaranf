import { ProgramData } from "@/content/site-data";
import Link from "next/link";

type CardType = {
  title: string;
  description: string;
  link: string;
  imgSrc: string;
};

const ProgramCard = ({ title, description, link }: CardType) => {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow pb-4 ">
      {/* <img className="rounded-t-2xl" src={imgSrc} alt=""></img> */}

      <div className="p-5 h-full">
        <div className="flex flex-col justify-between items-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-primary-main">
            {title}
          </h5>

          <p className="mb-3 font-normal text-black">{description}</p>
        </div>
      </div>
      <div className="flex justify-start pl-6 ">
        <Link
          href={link}
          className=" inline-flex items-center rounded-lg bg-primary-main px-3 py-2 text-center text-sm font-medium text-white hover:bg-secondary-main focus:outline-none focus:ring-4 focus:ring-secondary-main"
        >
          Read more
          <svg
            className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const Information = () => {
  return (
    <div className="w-full items-center flex justify-center">
      <div className="max-w-sm py-5">
        <h4 className="mb-2 text-2xl font-bold text-secondary-main text-center ">
          We Are Nivaran Foundation
        </h4>
        <p className="mb-3 font-normal text-black text-center">
          Our mission is to empower communities through sustainable development
          initiatives that address critical needs in helthcare, education, and
          environmental conservation.
        </p>
      </div>
    </div>
  );
};
export const ProgramAndEventsGrid = () => {
  return (
    <div className="max-w-[1140px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-0 py-6 w-full">
        <Information></Information>
        {ProgramData.map((data, index) => (
          <ProgramCard
            key={index}
            description={data.description}
            title={data.title}
            imgSrc={data.imgSrc}
            link={data.link}
          ></ProgramCard>
        ))}
      </div>
    </div>
  );
};
