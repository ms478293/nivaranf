import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HelpFooter = () => {
  return (
    <div className="flex  flex-col  justify-center gap-16   text-black px-4 sm:px-36 md:px-64 mx-auto max-w-[1140px] py-16">
      {[
        {
          title: "Become a Monthly Donor",
          description:
            "When you give to NIVARAN, you stand against the barriers that women and girls face every day.",
          cta: "Start donating today",
          link: "/donate",
        },
        // {
        //   title: "Speak Out!",
        //   description:
        //     "Globally, 1.2 billion people live in extreme poverty, and most of them are women and girls. You have the power to change this.",
        //   cta: "Learn More",
        //   link: "/contact",
        // },
        {
          title: "Give a Gift",
          description:
            "Support those facing conflict and hunger around the world. Your gift can mean a lot.",
          cta: "Gift Today",
          link: "/donate",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col  items-center gap-1 w-full   sm:text-left px-2"
        >
          <Link
            href={item.link}
            aria-label={item.title}
            className="w-full rounded-lg px-4 py-2 text-2xl text-black transition hover:scale-105 border text-center border-gray-400"
          >
            {/* <Button
              className=" "
              variant="outline"
            > */}
            {item.title}
            {/* </Button> */}
          </Link>
          <p className="text-gray-700 lg:pl-4 text-center mt-2">
            {item.description}
          </p>
          <Link href={item.link} aria-label={item.cta}>
            <Button
              variant="ghost"
              className="text-sm text-justify font-bold border-b-2 border-primary-main w-fit hover:text-primary-main rounded-b-none"
            >
              {item.cta}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};
