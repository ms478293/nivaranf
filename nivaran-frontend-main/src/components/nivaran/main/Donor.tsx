import { partners } from "@/content/site-data";
import { Supporters } from "./Supporters";

export const Donor = () => {
  return (
    <div className=" flex flex-col justify-center max-w-[1140px] mx-auto py-6">
      <h1 className="text-3xl font-bold text-center py-4">Our Partnerships</h1>

      {/* Gaurssa Section */}
      {/* <Link href="https://www.gaurssa.com/">
        <div className="flex flex-col md:flex-row items-center lg:justify-center justify-start gap-8">
          <Image
            src="/images/gaurssa.png"
            alt="Gaurssa"
            height={300}
            width={400}
            className="rounded-lg object-cover shadow-md"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Gaurssa Foundation
            </h2>
            <p className="text-gray-600 text-wrap">
              The Gaurssa Foundation has been a pillar of support in empowering
              communities and driving impactful change. Their unwavering
              commitment to sustainability and humanitarian causes has touched
              countless lives.
            </p>
            <p className="text-gray-600 text-wrap">
              Through their generous donations, we&apos;ve been able to achieve
              milestones that make a real difference in society. Join us in
              celebrating their vision for a brighter future.
            </p>
          </div>
        </div>
      </Link> */}

      {/* Partners Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-lg transition-transform hover:scale-105 hover:shadow-xl  text-wrap "
          >
            <h3 className="text-x l font-semibold text-primary-main mb-4 text-wrap w-full">
              {partner.name}
            </h3>
            <ul className="text-gray-600 text-sm space-y-2">
              {partner.description.map((desc, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-gray-700 group"
                >
                  <span className="w-2 h-2 bg-primary-main rounded-full"></span>
                  <span className="group-hover:text-secondary-main transition">
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Supporters Section */}
      <div className="mt-10">
        <Supporters />
      </div>
    </div>
  );
};
