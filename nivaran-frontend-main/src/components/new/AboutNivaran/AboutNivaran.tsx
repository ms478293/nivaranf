"use client";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AboutNivaran = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const screenSize = useScreenSize();
  return (
    <section
      className={cn("w-full px-4 bg-[#f3f3f3]  font-Poppins", className)}
    >
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4 py-4 md:py-16">
        {children}

        <div className="grid grid-cols-1 place gap-3 sm:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 lg:h-[65vh] mt-2">
          {/* Image 1 */}
          <div className="flex flex-col relative   items-start lg:items-stretch  border border-neutral-200  h-[350px] lg:h-full   rounded-2xl lg:row-start-1 lg:row-end-3 overflow-hidden lg:col-start-1: lg:col-end-2 bg-white [&>div>img]:hover:grayscale-0 [&>div>img]:grayscale-0 md:[&>div>img]:grayscale  hover:shadow-md transition-all duration-300 hover:scale-[1.02]  [&>div>h2]:hover:text-primary-500">
            <div className="p-3 w-[60%] ">
              <h2 className="text-gray-800 text-lg font-medium transition-all duration-300 mb-2">
                Education
              </h2>
              <p className="text-gray-600 text-sm ">
                Ensure every child has access to quality learning, creating
                equal opportunities for a brighter tomorrow.
              </p>
            </div>
            <div className="absolute right-0 w-[20rem] -bottom-0 overflow-hidden  ">
              <Image
                src="/about/about_img_7.png"
                alt="Children receiving quality education for a better future"
                width={500}
                height={500}
                className="w-full h-full block object-center object-cover transition-all duration-300"
              />
              {/* {screenSize == "lg" && ( */}
              <div className="absolute w-full h-[35%] bg-[linear-gradient(to_left,_transparent_50%_,white)] left-0 bottom-0"></div>
              {/* )} */}
            </div>
          </div>

          {/* Image 2 */}
          <div className="flex  md:h-full flex-col relative items-start border border-neutral-200 lg:col-start-1 lg:col-end-2 rounded-2xl lg:row-start-3 lg:row-end-4 overflow-hidden bg-white hover:shadow-md transition-all duration-300 hover:scale-[1.02] group">
            <div className="p-3 w-[60%]">
              <h2 className="text-gray-800 text-lg font-medium transition-all duration-300 mb-2 hover:text-primary-500 group-hover:text-primary-500">
                Healthcare
              </h2>
              <p className="text-gray-600 text-sm">
                Revolutionize healthcare systems to provide essential services,
                reduce disparities, and foster global well-being.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 w-[150px] h-full overflow-hidden  ">
              <Image
                src="/about/about_img_10.png"
                alt="Doctor offering healthcare advice to a patient"
                width={500}
                height={500}
                className="w-full h-full block object-cover object-left transition-all duration-300  md:grayscale group-hover:grayscale-0"
              />
              {screenSize == "lg" && (
                <div className="absolute w-full h-[40px] bg-[linear-gradient(to_left,_transparent_50%_,white)] left-0 bottom-0 "></div>
              )}
            </div>
          </div>

          {/* Image 3 */}
          <div className="flex relative h-fit flex-col  min-[490px]:flex-row-reverse sm:col-span-full gap-2 items-start lg:items-stretch border border-neutral-200   rounded-2xl sm:justify-between sm:h-[300px]  lg:h-full lg:row-span-full lg:col-start-2 lg:col-end-3 lg:flex-col bg-white lg:overflow-visible [&>div>div>img]:grayscale-0 md:[&>div>div>img]:grayscale [&>div>div>img]:hover:grayscale-0 overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-[1.02] [&>div>h2]:hover:text-primary-500">
            <div className="w-full h-full lg:relative overflow-visible -top-6">
              <div className="relative w-full h-full placeholder ">
                {screenSize === "lg" ? (
                  <Image
                    src="/about/about_img_8.avif"
                    alt="Protecting children and promoting their rights and 
safety"
                    layout="fill" // This will make the image cover the full container
                    className="object-top object-cover transition-all duration-300 w-full h-full"
                    priority
                  />
                ) : screenSize === "md" ? (
                  <Image
                    src="/about/about_img_8.png"
                    alt="Protecting children and promoting their rights and 
safety"
                    layout="fill" // This will make the image cover the full container
                    className="object-cover object-top transition-all duration-300 w-full h-full"
                    priority
                  />
                ) : (
                  <Image
                    src="/about/about_img_8.png"
                    alt="Protecting children and promoting their rights and 
safety"
                    layout="cover" // This will make the image cover the full container
                    className="object-cover object-center transition-all duration-300 w-full h-full"
                    height={600}
                    width={800}
                    priority
                  />
                )}

                <div className="absolute w-full h-full bg-[linear-gradient(to_bottom,_transparent_50%_,white)]  sm:bg-[linear-gradient(to_left,_transparent_50%_,white)] lg:bg-[linear-gradient(to_bottom,_transparent_50%_,white)] left-0 bottom-0 "></div>
              </div>
            </div>

            <div className="p-3 lg:-mt-16 relative z-[10]">
              <h2 className="text-gray-800 text-lg font-medium transition-all duration-300 mb-2">
                Child Welfare
              </h2>
              <p className="text-gray-600 text-sm">
                End child labor, malnutrition, and early marriages to guarantee
                every child’s safety and a fair childhood.
              </p>
            </div>
          </div>

          {/* Image 4 */}
          <div className="flex justify-between relative h-fit w-full md:h-auto  items-start   border border-neutral-200   rounded-2xl sm:flex-col lg:flex-row lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:-col-end-1 bg-white [&>div>img]:hover:grayscale-0 md:[&>div>img]:grayscale [&>div>img]:grayscale-0  hover:shadow-md transition-all duration-300 hover:scale-[1.02] [&>div>h2]:hover:text-primary-500 overflow-hidden">
            <div className="p-3 max-w-[60%] sm:max-w-full ">
              <h2 className="text-gray-800 text-lg font-medium transition-all duration-300 mb-2">
                Environmental Stewardship
              </h2>
              <p className="text-gray-600 w-full text-sm">
                Promoting sustainable practices and environmental conservation
                to ensure a greener, healthier world for tomorrow.
              </p>
            </div>
            <div className="  h-[250px] w-full md:w-auto  absolute  lg:top-0  sm:static -right-20  sm:-right-20 z-[20] sm:self-center  lg:overflow-visible overflow-x-hidden overflow-y-visible">
              <Image
                src="/about/about_img_9.png"
                alt="Promoting sustainable practices and 
environmental conservation"
                width={500}
                height={500}
                className="w-full h-full object-contain md:object-cover object-center transition-all duration-300"
              />
            </div>{" "}
          </div>

          {/* Image 5 */}
          <div className="flex flex-col relative h-fit md:h-auto  items-start  border border-neutral-200 overflow-hidden rounded-2xl lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:-row-end-1 bg-white [&>div>img]:hover:grayscale-0 [&>div>img]:grayscale-0 md:[&>div>img]:grayscale  hover:shadow-md transition-all duration-300 hover:scale-[1.02] [&>div>h2]:hover:text-primary-500">
            <div className="p-3 max-w-full">
              <h2 className="text-gray-800 text-lg font-medium transition-all duration-300 mb-2">
                Community Development
              </h2>
              <p className="text-gray-600 w-full text-sm ">
                Focus on economic empowerment, job creation, and infrastructure
                to lift communities out of poverty and create sustainable
                growth.
              </p>
              {/* <AppButton variant="ghost" className="px-0" asChild>
                <div className="flex items-center gap-1">
                  <span className="font-normal text-sm">View Detail</span>
                  <MoveUpRightArrowIcon className="w-4 h-4 fill-primary-500" />
                </div>
              </AppButton> */}
            </div>
            <div className="w-full  h-full   md:absolute -bottom-12  overflow-hidden">
              <Image
                src="/about/about_img_11.png"
                alt="Encouraging economic empowerment and 
sustainable development to reduce poverty"
                width={1000}
                height={1000}
                className="w-full h-full block object-cover object-left transition-all duration-300"
              />
            </div>{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNivaran;
