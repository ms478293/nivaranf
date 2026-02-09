import { SocialLinks } from "@/components/nivaran/common/footer/SocialLinks";
import { footerData } from "@/content/site-data";
import Image from "next/image";
import Link from "next/link";

const footerBottomLinks: { name: string; link: string }[] = [
  {
    name: "Contact Us",
    link: "/contact",
  },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Terms & Conditions", link: "/terms-of-service" },
];
const FooterUsa = () => {
  const { logo, others, ourWork } = footerData;

  return (
    <footer className=" bg-white w-full">
      <div className="w-full  p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 flex">
            <Link
              href="/"
              className="flex flex-col justify-between items-center"
            >
              <Image
                src={logo.src}
                className="me-3 h-[120px] w-[240px]"
                alt={logo.alt}
                height={120}
                width={240}
              ></Image>
            </Link>
            <div className="w-80">
              Nivaran is a global force in the fight against poverty and
              inequality. We are recognized for our unwavering dedication to
              empowering communities and upholding the dignity and rights of
              every individual.
            </div>
          </div>
          <div className="flex w-full justify-start px-4">
            <div className="flex w-full justify-center h-fit relative">
              <Image
                src="/utils/hollowCircle.svg"
                width={300}
                height={300}
                alt="HollowCircle"
                className="w-32 h-32 max-h-32 max-w-32 object-cover overflow-visible"
              />
              <div className="absolute inset-0 flex justify-center items-center  font-bold z-50">
                <span>99%</span>
              </div>
            </div>
            <div>
              <span>99% of all our expenses go to program services.</span>
              <div className="flex justify-end">
                <Link
                  href="/docs"
                  className="pb-2 border-b-2 border-primary-main"
                >
                  Lean More
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-end lg:gap-40 w-full sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-[#2c77bb]">
                Our Work
              </h2>
              <ul className="font-normal text-gray-500 dark:text-black">
                {ourWork.map((resource, index) => (
                  <li key={index} className="mb-4">
                    <Link
                      href={resource.link}
                      className="hover:text-[#eb5834] hover:underline"
                    >
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-[#2c77bb]">
                Key Links
              </h2>
              <ul className="font-normal text-gray-500 dark:text-black">
                {others.map((platform, index) => (
                  <li key={index} className="mb-4">
                    <Link
                      href={platform.link}
                      className="hover:text-[#eb5834] hover:underline"
                    >
                      {platform.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-[#2c77bb]" />

        <div className="flex flex-col w-1/3 text-wrap gap-1">
          <div>
            If you need assistance with your donation, please email us at&nbsp;
            <span className="text-primary-main">
              <i>laxman.p@nivaranfoundation.org &nbsp;</i>
            </span>
            or contact us through our supporter services online form.
          </div>
          <div>
            <span className="font-bold text-primary-main">
              NIVARAN FOUNDATION
            </span>{" "}
            is a 501(c)(3) not-for-profit organization.
          </div>
          <div>&copy; 2025 NIVARAN. All rights reserved.</div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-4">
            {footerBottomLinks.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="pb-2 border-b-2 border-primary-main "
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="relative right-0 bottom-1">
            <SocialLinks></SocialLinks>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterUsa;
