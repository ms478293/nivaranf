import { Button } from "@/components/ui/button";
import { siteData } from "@/content/site-data";
import Image from "next/image";
import Link from "next/link";
import BuyButtonComponent from "../common/BuyButtonComponent";

const Stats = () => {
  return (
    <section className=" max-w-[1140px] mx-auto">
      <div className="max-w-screen-xl mx-auto grid gap-6 lg:grid-cols-2 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            What We Have Achieved{""}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Nivaran Foundation has worked tirelessly to improve lives and bring
            about meaningful change in the community. Your support makes all the
            difference.
          </p>
          <div className="flex gap-4">
            <BuyButtonComponent className="text-base   hover:scale-105 transition-all duration-300 ease-in-out hover:!bg-transparent" />
            <Link href="/volunteer" aria-label="Volunteer Link">
              <Button
                aria-label="Volunteer Button"
                variant="outline"
                className=" px-6 py-3 rounded-lg  hover:bg-secondary-main hover:scale-105 transition-all duration-300 ease-in-out hover:text-white text-base bg-transparent"
              >
                Volunteer
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics */}

        <Image
          src="/infographic/whatwedone.svg"
          alt="infographic"
          width={400}
          height={400}
          className="object-cover w-full"
        ></Image>
        <dl className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 text-center">
          {siteData.stats.map((stat, index) => (
            <div
              key={index}
              className="group hover:cursor-pointer flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <dt className="text-2xl font-extrabold text-primary-main  group-hover:text-secondary-main transition-all duration-300 ease-in-out mb-1">
                {stat.value}
              </dt>
              <dd className="text-gray-700 text-sm md:text-base group-hover:text-gray-900">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Stats;
