import { DeiEmpoweringCard } from "@/components/new/DeiInfo/DeiEmpoweringCard";
import { DeiInfoCard } from "@/components/new/DeiInfo/DeiInfoCard";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import { DEI_EMPOWERING_VOICES, DEI_INFO_CARD } from "@/content/dei";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Building Trust with Nivaran Foundation",
  description:
    "Learn how Nivaran Foundation builds trust with accountability and transparency, ensuring a positive impact with responsibility and openness worldwide.",
};

export default function page() {
  return (
    <div className="font-Poppins">
      <section className="w-full pl-4  overflow-hidden relative">
        <div className="flex flex-col sm:flex-row-reverse  justify-between sm:items-start n  max-w-[1320px] overflow-hidden mx-auto ">
          <div className=" sm:absolute w-[45rem] top-16 -right-32 rotate-45 grayscale overflow-x-hidden">
            <Image
              src="/AandT/handshake.png"
              alt="Sanjeevani Image"
              width={1200}
              height={1200}
              className="w-full h-full block object-center object-cover"
            />{" "}
          </div>

          <div className="flex flex-col  py-2  sm:mr-auto ">
            <PageTitle
              suffix="Transparency Builds Trust"
              prefix="Accountability fuels Ownership,"
              className="text-center sm:text-start max-[830px]:text-xl"
            />
            <p className="text-sm text-gray-600 text-center sm:text-start md:max-w-[400px] max-w-[200px] mx-auto sm:mx-0 mt-4">
              We firmly believe that lasting change happens only when trust is
              at the core.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full mt-4 bg-[#f3f3f3] py-12 px-4 sm:mt-36">
        <section className="max-w-[1320px] mx-auto ">
          <MainTitle
            prefix=""
            suffix="Accountability Encourages Duty"
            className="mb-10"
          />
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6  gap-x-8 gap-y-8">
            {DEI_INFO_CARD.map((dei) => (
              <DeiInfoCard key={dei.id} dei={dei} />
            ))}
          </div>
        </section>

        <section className="py-12 flex flex-col gap-4 max-w-[1320px] mx-auto px-4">
          <MainTitle prefix="in Our Project" suffix="Empowering Voices" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  lg:gap-4 gap-y-2  gap-x-8 md:gap-y-8">
            <RenderList
              data={DEI_EMPOWERING_VOICES}
              render={(dei) => <DeiEmpoweringCard key={dei.id} dei={dei} />}
            />
          </div>
        </section>
      </div>

      <section className="py-10 max-w-[1320px] mx-auto ">
        <div className="w-full h-full px-4 ">
          <Image
            src={"/dei/dei-nepal.png"}
            alt="Diversity in Inclusion"
            width={1500}
            height={1500}
            className=""
          />
        </div>
      </section>

      <section className="flex flex-col gap-8 items-center py-12">
        <h3 className="text-gray-950 font-medium text-2xl md:text-5xl text-center flex flex-col ">
          <span className="md:leading-[4rem]">Let&apos;s Build a More</span>
          <span className="md:leading-[4rem]">Inclusive World Together</span>
        </h3>

        <Link
          href="/volunteer"
          className="md:mt-8"
          aria-label="Join Us & Be the Change"
        >
          <AppButton variant="primary-outline">
            Join Us & Be the Change
          </AppButton>
        </Link>
      </section>
    </div>
  );
}
