import RenderList from "@/components/nivaran/common/renderList/RenderList";
import Image from "next/image";
import MainTitle from "../MainTitle/MainTitle";

const COUNTING_HAPPINESS_DATA = [
  {
    id: 1,
    count: "330 Cr.",
    description: "Budget Allocated",
    image: "/counting_happiness/count_happiness_3.jpg",
    alt: "Children working in difficult conditions to support their daily needs",
  },
  {
    id: 2,
    count: "1.8 Million+",
    description: "People will be healed",
    image: "/counting_happiness/count_happiness_2.png",
    alt: "Health worker providing community education and support to a patient",
  },
  {
    id: 3,
    count: "1,200+",
    description: "Camps all over Nepal",
    image: "/counting_happiness/count_happiness_1.png",
    alt: "Doctor counseling a patient about health concerns",
  },
];

const NivaranHappiness = () => {
  return (
    <section className="w-full px-4 bg-white font-light font-Poppins">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4 py-4 md:py-16">
        <div className="flex flex-col md:items-center md:text-center">
          <header>
            <MainTitle
              suffix="Counting"
              prefix="Happiness"
              className="items-center justify-start md:justify-center  "
            />
          </header>
          <p className="text-gray-400 w-full md:w-1/2  leading-6 md:my-4 my-1.5">
            At the Nivaran Foundation, we are committed to improving lives and
            creating lasting change in communities in need. But we can not do it
            alone—we need people like you to help make the world a better place.
          </p>
        </div>

        <ul
          className="flex flex-col gap-4 sm:flex-row lg:px-[150px] "
          role="list"
        >
          <RenderList
            data={COUNTING_HAPPINESS_DATA}
            render={(data) => (
              <li
                role="listitem"
                key={data.id}
                className="w-full h-[500px] relative border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <Image
                  width={500}
                  height={500}
                  alt={data.alt}
                  src={data.image}
                  className="h-full w-full block object-cover object-center"
                />

                <div className=" w-full h-full bg-[linear-gradient(to_bottom,_transparent_0%_,transparent_60%_,white_80%)] absolute z-[10] bottom-0">
                  <p className="absolute bottom-0 p-4 flex flex-col font-Poppins">
                    <span className="text-primary-400 text-[36px]/[36px] font-bold ">
                      {data.count}
                    </span>
                    <span className="text-sm  text-gray-600">
                      {data.description}
                    </span>
                  </p>
                </div>
              </li>
            )}
          />
        </ul>
      </div>
    </section>
  );
};

export default NivaranHappiness;
