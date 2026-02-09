import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const indexContent = [
  {
    text: "Every Child Deserves A Better Future",
    explore: "/programs/childwelfare",
  },
  {
    text: "Transforming Communities Through Healthcare",
    explore: "/programs/health",
  },
  {
    text: "Empowering Education For All",
    explore: "/programs/education",
  },
  {
    text: "Building Stronger Communities Together",
    explore: "/programs/community",
  },
  {
    text: "Protecting Our Environment, Securing Our Future",
    explore: "/programs/environment",
  },
];

export const CarouselContentComponent = ({
  currentIndex,
}: {
  currentIndex: number;
}) => {
  const content = indexContent[currentIndex];
  const router = useRouter();

  return (
    <div className="  text-white z-50 absolute  ">
      <h2 className="text-2xl lg:text-5xl font-bold md:mb-4 max-w-[300px] md:max-w-[500px]">
        {content.text}
      </h2>
      <p className="mb-2  relative max-w-[310px] md:max-w-[600px] leading-6">
        Your monthly gift means a sick child gets medicine, a struggling family
        finds care, & hope is never out of reach.
      </p>
      <div className="flex items-center justify-start gap-4">
        <Button
          variant="outline"
          className="border-white hover:border-white text-black hover:bg-black  hover:text-white transition-colors"
          onClick={() => {
            router.push(content.explore);
          }}
        >
          Explore More
        </Button>
        <Button
          variant="outline"
          className=" hover:border-white  hover:bg-black  hover:text-white transition-colors bg-primary-main border border-primary-main text-white"
        >
          Give Now
        </Button>
      </div>
      {/* <Button
        variant="outline"
        className="lg:hidden  text-xl t ext-primary-main hover:bg-secondary-main hover:text-white"
      >
        Give Now
      </Button> */}
      {/* <div className="hidden lg:flex absolute bottom-0 gap-8 items-center"> */}
      {/* <DownloadFileComponent></DownloadFileComponent> */}
      {/* <Button
          variant="outline"
          className="text-2xl px-4 py-6 text-primary-main hover:bg-secondary-main hover:text-white"
        >
          Give Now
        </Button>
      </div> */}
    </div>
  );
};
