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

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-2">
          {/* Healthcare Card */}
          <div className="flex flex-col relative items-start border border-neutral-200 h-[350px] rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all duration-300 hover:scale-[1.02] group">
            <div className="p-4 w-[60%] relative z-[10]">
              <h2 className="text-gray-800 text-xl font-semibold transition-all duration-300 mb-2 group-hover:text-primary-500">
                Healthcare
              </h2>
              <p className="text-gray-600 text-sm">
                304 health camps across Nepal delivering essential medical
                services — eye care, dental care, maternal health, and disease
                prevention to communities that need it most.
              </p>
              <p className="text-primary-500 font-bold text-2xl mt-3">70%</p>
              <p className="text-gray-500 text-xs">of our funds</p>
            </div>
            <div className="absolute right-0 bottom-0 w-[150px] h-full overflow-hidden">
              <Image
                src="/about/about_img_10.png"
                alt="Doctor offering healthcare advice to a patient"
                width={500}
                height={500}
                className="w-full h-full block object-cover object-left transition-all duration-300 md:grayscale group-hover:grayscale-0"
              />
              {screenSize == "lg" && (
                <div className="absolute w-full h-[40px] bg-[linear-gradient(to_left,_transparent_50%_,white)] left-0 bottom-0"></div>
              )}
            </div>
          </div>

          {/* Education Card */}
          <div className="flex flex-col relative items-start border border-neutral-200 h-[350px] rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all duration-300 hover:scale-[1.02] group">
            <div className="p-4 w-[60%] relative z-[10]">
              <h2 className="text-gray-800 text-xl font-semibold transition-all duration-300 mb-2 group-hover:text-primary-500">
                Education
              </h2>
              <p className="text-gray-600 text-sm">
                Ensuring every child has access to quality learning through
                teacher training, scholarships, and school infrastructure in
                underserved communities.
              </p>
              <p className="text-[#FCAC2B] font-bold text-2xl mt-3">30%</p>
              <p className="text-gray-500 text-xs">of our funds</p>
            </div>
            <div className="absolute right-0 w-[20rem] -bottom-0 overflow-hidden">
              <Image
                src="/about/about_img_7.png"
                alt="Children receiving quality education for a better future"
                width={500}
                height={500}
                className="w-full h-full block object-center object-cover transition-all duration-300 md:grayscale group-hover:grayscale-0"
              />
              <div className="absolute w-full h-[35%] bg-[linear-gradient(to_left,_transparent_50%_,white)] left-0 bottom-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNivaran;
