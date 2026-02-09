import { LeadershipList } from "@/components/new/Leadership/LeadershipList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nivaran Foundation | Leadership",
  description:
    "The Leadership of Nivaran Foundation have resolve to solve core issues relating to health, education, welfare, environment and community.",
  alternates: {
    canonical: "https://nivaranfoundation.org/leadership",
  },
};

export default function Page() {
  return (
    <div className="w-full px-4 font-Poppins">
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-4 md:mb-8 flex flex-col gap-4">
          <h2
            className={
              "inline-block  text-xl md:text-3xl font-[300]  max-w-[800px]"
            }
          >
            <span className="text-gray-950 leading-[2.5rem] ">
              Empowering Change Through
            </span>

            <span className="text-primary-500 font-[600] leading-[2.5rem] ml-3">
              Visionary Leadership
            </span>
          </h2>

          <p className="text-sm text-gray-600">
            Together, we lead with creativity and collaboration, empowering
            communities to thrive.
          </p>
          <LeadershipList />
        </div>
      </div>
    </div>
  );
}
