import MainTitle from "@/components/new/MainTitle/MainTitle";
import { PartnershipCard } from "@/components/new/Partnerships/PartnershipCard";
import PartnershipContactPerson from "@/components/new/Partnerships/PartnershipContactPerson";
import { Image_List } from "@/content/partners";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Partner with Nivaran Foundation for Lasting Change",
  description:
    "Partner with Nivaran Foundation to create lasting change in education, healthcare, and community development. Explore collaboration opportunities with us",
  alternates: {
    canonical: "https://nivaranfoundation.org/partnerships",
  },
};

export default function page() {
  return (
    <div className="w-full px-4">
      <div className="font-Poppins max-w-[1320px] mx-auto">
        <section className="mb-4 md:mb-24 flex flex-col gap-4">
          <h2
            className={
              "inline-block  text-xl md:text-3xl font-[300] max-w-[450px] md:max-w-[700px]"
            }
          >
            <span className="text-gray-950 leading-[1rem] ">
              Advancing Change Through
            </span>

            <span className="text-primary-500 font-[600] leading-[1rem] ml-3">
              Strategic Alliances
            </span>
          </h2>

          <p className="text-sm text-gray-600 -mt-2">
            Together, we lead with creativity and collaboration, empowering
            communities to thrive.
          </p>
        </section>

        <section className="mt-20">
          <MainTitle suffix="Why" prefix="Partner with us" className="mb-8" />
          <PartnershipCard />
        </section>
      </div>
      <section className="max-w-[1096px] mx-auto flex flex-col items-center my-20 mb-24 gap-8 ">
        <MainTitle
          suffix="Our"
          prefix="Valued Partners"
          // className="text-center"
        />
        <ul className="list-none flex flex-wrap items-center  justify-center gap-x-8 gap-y-6">
          {Image_List?.map((image) => (
            <li key={image.name}>
              <div className="w-[120px] md:w-[150px]">
                <Image
                  src={image.src}
                  alt={image.name}
                  height={155}
                  width={155}
                  className="rounded-md w-full h-full object-cover object-center"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-[1096px] mx-auto flex flex-col gap-6 items-center justify-center font-Poppins my-10 ">
        <MainTitle
          suffix="Want to Become"
          prefix="Our Partner"
          // className="text-center"
        />

        <PartnershipContactPerson />
      </section>
    </div>
  );
}
