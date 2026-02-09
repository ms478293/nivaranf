import MoveUpRightArrowIcon from "@/assets/icons/MoveUpRightArrowIcon";
import { AppButton } from "@/components/ui/app-button";
import Image from "next/image";
import Link from "next/link";

const DonationBanner = () => {
  return (
    <section className="w-full px-4 bg-white font-Poppins -mb-10 ">
      <div className="max-w-[1320px] mx-auto  p-4 sm:py-10 sm:px-16 rounded-2xl bg-[#3777BC]   relative overflow-hidden shadow-[2px_2px_10px_#3777bc55] ">
        <div className="flex flex-col  relative z-[10]">
          <h2 className="text-white text-xl sm:text-3xl font-semibold">
            What is the price of inaction?
          </h2>

          <div className="flex items-center gap-2">
            <div className=" flex items-center justify-center  gap-1 w-fit rounded-md ">
              {/* <FemaleIcon fill="#fff" className="w-6 h-6 sm:w-10 sm:h-10" /> */}
              <span className="text-white text-md   sm:font-[600]">
                For children, mothers, and families, it could be everything.
              </span>
            </div>
            {/* <div className="p-2  flex items-center justify-center  gap-1 w-fit rounded-md ">
              <MaleIcon fill="#fff" className="w-6 h-6 sm:w-10 sm:h-10" />
              <span className="text-white text-md sm:text-lg font-medium sm:font-[600]">
                75% male
              </span>
            </div> */}
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:items-end justify-between ">
            <p className="text-gray-50 text-sm font-medium  md:max-w-[40%]">
              {/* Don't wait — every moment counts in the fight for a better future */}
            </p>

            <Link href="/donate" className="flex items-center gap-2 group">
              <AppButton
                variant="secondary"
                size="lg"
                className="group-hover:text-white group-hover:border-white text-base group-hover:bg-transparent [&+button]:group-hover:bg-transparent"
              >
                Donate now
              </AppButton>
              <AppButton
                variant="secondary"
                size="lg"
                className="h-fit p-2 group-hover:border-white [&>svg]:group-hover:fill-white"
              >
                <MoveUpRightArrowIcon className="fill-primary-500 w-6 h-6 " />
              </AppButton>
            </Link>
          </div>
        </div>

        <div className="absolute top-2 left-4 sm:left-8 h-full sm:h-[310px]  w-1/2 min-[445px]:w-1/4  sm:w-1/5 rotate-[10deg] sm:rotate-[15deg]">
          <Image
            width={500}
            height={500}
            alt="Donation banner"
            src="/donation-banner-image.png"
            className="h-full w-full  object-left  "
          />
        </div>

        <div className="absolute -top-56 -right-56 scale-105 sm:block hidden">
          <div className="bg-[#467FBD] w-[28rem] h-[28rem] rounded-full flex items-center justify-center">
            <div className="bg-[#5993D1]  w-[24rem] h-[24rem] rounded-full flex items-center justify-center">
              <div className="bg-[#83AEDD] w-[20rem] h-[20rem] rounded-full flex items-center justify-center">
                <div className="bg-[#9AC1EB] w-[16rem] h-[16rem] rounded-full flex items-center justify-center">
                  <div className="bg-[#C8DDF4] w-[12rem] h-[12rem] rounded-full flex items-center justify-center">
                    <div className="bg-white w-[8rem] h-[8rem] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white h-28 w-28 rounded-full"></div>
    </section>
  );
};

export default DonationBanner;
