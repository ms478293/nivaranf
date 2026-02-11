import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { useMegaMenuStore } from "@/store/useMegamenuStore";
import Link from "next/link";

const ABOUT_US_LINK = [
  // {
  //   id: 5,
  //   label: "Leadership",
  //   link: "/leadership",
  // },
  {
    id: 4,
    label: "FAQ",
    link: "/frequently-asked-questions",
  },
  {
    id: 2,
    label: "Contact",
    link: "/contact",
  },
  {
    id: 1,
    label: "Career",
    link: "/career",
  },
];

const AboutUsMegaMenu = () => {
  const { openActiveMegaMenu } = useMegaMenuStore();

  return (
    <div className="flex   justify-between">
      <AboutDescription />
      <div className="grid grid-cols-2 items-center gap-x-4 ">
        <RenderList
          data={ABOUT_US_LINK}
          render={(about) => (
            <Link
              href={about.link}
              key={about.id}
              className="  text-sm border border-gray-200 hover:bg-primary-100 rounded-md overflow-hidden flex flex-col justify-between items-start gap-1 min-w-[180px] p-3 bg-gray-100  group "
              onClick={() => openActiveMegaMenu(null)}
            >
              <p className="text-sm text-gray-950 flex justify-between w-full items-center ">
                <span>{about.label}</span>
                <span className="w-2 h-2 bg-gray-400 block rounded-full group-hover:bg-primary-500"></span>
              </p>
              {/* <div className=" w-[180px]  overflow-hidden">
                <Image
                  src={about.image}
                  alt={about.label}
                  width={800}
                  height={800}
                  // className="w-full h-full block  object-cover"
                />
              </div> */}
            </Link>
          )}
        />
      </div>
    </div>
  );
};

const AboutDescription = () => {
  const { openActiveMegaMenu } = useMegaMenuStore();
  return (
    <div className="max-w-[315px] self-end gap-6 flex flex-col justify-between text-sm">
      <p className="text-gray-600 ">
        NIVARAN FOUNDATION is a 501(c)(3) not-for-profit organization fight
        against poverty and inequality. We are recognized for our unwavering
        dedication to empowering.
      </p>
      {/*NOTE: Provide a link */}
      <Link
        href="/about"
        className="text-primary-500"
        onClick={() => openActiveMegaMenu(null)}
      >
        View more about NIVARAN
      </Link>
    </div>
  );
};
export default AboutUsMegaMenu;
