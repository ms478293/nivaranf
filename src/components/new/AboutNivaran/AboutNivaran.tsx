"use client";
import { SANJEEVANI_PUBLIC_STATS } from "@/content/sanjeevani-public-stats";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AboutNivaran = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn("w-full px-4 bg-[#f3f3f3]  font-Poppins", className)}
    >
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4 py-4 md:py-16">
        {children}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-2">
          {/* Healthcare Card */}
          <div className="flex flex-col relative items-start border border-neutral-200 h-[250px] sm:h-[350px] rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300 hover:scale-[1.02] group">
            <div className="p-4 w-[60%] relative z-[10]">
              <h2 className="text-gray-800 text-lg sm:text-xl font-semibold transition-colors duration-300 mb-2 group-hover:text-primary-500">
                Healthcare
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm">
                {SANJEEVANI_PUBLIC_STATS.campsCompletedText} completed health
                camps across all {SANJEEVANI_PUBLIC_STATS.provincesCoveredText}
                provinces delivering essential medical services and reaching{" "}
                {SANJEEVANI_PUBLIC_STATS.patientsServedText} patients so far.
              </p>
              <p className="text-primary-500 font-bold text-xl sm:text-2xl mt-2 sm:mt-3">70%</p>
              <p className="text-gray-600 text-xs">of our funds</p>
            </div>
            <div className="absolute right-0 bottom-0 w-[40%] sm:w-[200px] h-full overflow-hidden">
              <Image
                src="/about/about_img_10.png"
                alt="Doctor offering healthcare advice to a patient"
                fill
                sizes="(max-width: 640px) 40vw, 200px"
                className="w-full h-full block object-cover object-top transition-[filter] duration-300 md:grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
            </div>
          </div>

          {/* Education Card */}
          <div className="flex flex-col relative items-start border border-neutral-200 h-[250px] sm:h-[350px] rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300 hover:scale-[1.02] group">
            <div className="p-4 w-[60%] relative z-[10]">
              <h2 className="text-gray-800 text-lg sm:text-xl font-semibold transition-colors duration-300 mb-2 group-hover:text-primary-500">
                Education
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm">
                Ensuring every child has access to quality learning through
                teacher training, scholarships, and school infrastructure in
                underserved communities.
              </p>
              <p className="text-[#FCAC2B] font-bold text-xl sm:text-2xl mt-2 sm:mt-3">30%</p>
              <p className="text-gray-600 text-xs">of our funds</p>
            </div>
            <div className="absolute right-0 bottom-0 w-[40%] sm:w-[200px] h-full overflow-hidden">
              <Image
                src="/about/about_img_7.png"
                alt="Children receiving quality education for a better future"
                fill
                sizes="(max-width: 640px) 40vw, 200px"
                className="w-full h-full block object-cover object-top transition-[filter] duration-300 md:grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNivaran;
