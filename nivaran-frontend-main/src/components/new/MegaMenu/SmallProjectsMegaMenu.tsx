import RenderList from "@/components/nivaran/common/renderList/RenderList";
import Image from "next/image";
import Link from "next/link";

import * as SheetPrimitive from "@radix-ui/react-dialog";

export const PROJECT_DATA = [
  {
    id: 1,
    label: "Vidya",
    link: "/vidya",
    imgUrl: "/projects/images/projectVidyaHero.jpg",
  },
  {
    id: 2,
    label: "Nurture",
    link: "/nurture",
    imgUrl: "/projects/images/projectNurtureHero.jpg",
  },
  {
    id: 3,
    label: "Terra",
    link: "/terra",
    imgUrl: "/projects/images/projectTerraHero.jpg",
  },
  {
    id: 4,
    label: "Unity",
    link: "/unity",
    imgUrl: "/projects/images/projectUnityHero.jpg",
  },
];

export const SmallProjectsMegaMenu = () => {
  return (
    <div className="flex sm:flex-col items-start pl-3 gap-4">
      <Link href="/sanjeevani" className="block w-full">
        <SheetPrimitive.Close className="bg-neutral-50  p-1.5 sm:p-0 border relative border-gray-100 rounded-md max-[360px]:w-[180px] sm:w-full  w-[140px] text-start">
          <div className="rounded-md sm:h-[115px] overflow-hidden relative">
            <Image
              src="/why-nivaran/about-cover.jpeg"
              width={500}
              height={500}
              className="w-full h-full  object-cover "
              alt="Project Sanjeevani"
              style={{
                objectPosition: "5% 75%",
              }}
            />
            {/* <SheetPrimitive.Close> */}
            <div className="bg-[linear-gradient(to_right,transparent,_#000_70%)] w-full h-full absolute z-[10] top-0 hidden sm:block"></div>
            {/* </SheetPrimitive.Close> */}
          </div>
          <div className="mt-2 sm:mt-0 flex flex-col gap-1 sm:absolute sm:justify-between sm:h-full top-0 sm:right-0 z-[12] sm:py-2 sm:pr-6">
            <h2 className="text-gray-950 text-sm font-medium sm:text-neutral-50 sm:text-lg sm:font-semibold sm:uppercase">
              Sanjeevani
            </h2>
            <p className="text-gray-600 text-[10px] sm:hidden">
              2 million people being treated
            </p>

            <div className="hidden sm:flex sm:gap-8">
              <div className=" sm:flex flex-col gap-0">
                <p className="text-neutral-300 text-xsm font-light">
                  Phase-I Budget
                </p>
                <p className="text-neutral-50 text-sm font-medium ">$18M</p>
              </div>

              <div className="hidden sm:flex flex-col gap-0">
                <p className="text-neutral-300 text-xsm font-light">
                  Population treated
                </p>
                <p className="text-neutral-50 text-sm font-medium uppercase ">
                  2 Million
                </p>
              </div>
            </div>
          </div>
        </SheetPrimitive.Close>
        {/* </SheetPrimitive.Close> */}
      </Link>
      {/* </SheetPrimitive.Close> */}

      <div className=" hidden sm:flex sm:flex-col gap-1">
        <h3 className="test-sm text-gray-600 font-medium text-nowrap">
          Other Projects
        </h3>
        <ul className="flex gap-2">
          {PROJECT_DATA.map((image) => (
            <li className="" key={image.id}>
              <Link href={image.link}>
                <div>
                  <SheetPrimitive.Close className="rounded-md overflow-hidden h-[116px] w-full relative block">
                    <Image
                      src={image.imgUrl}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover object-center"
                      alt="Project Sanjeevani"
                    />
                    <div className="hidden sm:block h-[35px] w-full bg-[linear-gradient(to_bottom,_transparent_0%_,transparent_0%_,black_50%)] absolute z-[10] bottom-0">
                      <p className="uppercase text-neutral-50 font-medium p-2">
                        {image.label}
                      </p>
                    </div>
                  </SheetPrimitive.Close>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex flex-col gap-2 sm:hidden">
        <h3 className="test-sm text-gray-600 font-medium text-nowrap">
          Other Projects
        </h3>
        <RenderList
          data={PROJECT_DATA}
          render={(project) => (
            <li key={project.id}>
              <Link href={project.link}>
                <SheetPrimitive.Close className="text-gray-400 uppercase text-sm font-light">
                  {project.label}
                </SheetPrimitive.Close>
              </Link>
            </li>
          )}
        />
      </ul>
    </div>
  );
};
