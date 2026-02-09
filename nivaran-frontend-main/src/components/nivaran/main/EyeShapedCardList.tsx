import Image from "next/image";

const EyeShapeCard = ({ imageSrc, title, description }) => {
  return (
    <div className="flex flex-col items-center max-w-[200px] my-8 ">
      {/* Oval Image with 3D Effect */}
      <div
        className="relative w-[200px] h-[200px] rounded-full flex items-center justify-center overflow-hidden"
        style={{
          border: "1px solid #d1d5db",
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* <div className="lg:w-[190px] lg:h-[110px]  w-[145px] h-[85px] overflow-hidden rounded-md"> */}
        <Image
          src={imageSrc}
          alt={title}
          width={200}
          height={120}
          className="object-cover block w-full h-full"
        />
        {/* </div> */}
      </div>

      {/* Title and Description */}
      <h3 className="mt-2  font-semibold text-center leading-6">{title}</h3>
      <p className="mt-1 lg:text-sm text-center text-gray-600 text-xs">
        {description}
      </p>
    </div>
  );
};

const EyeShapeCardList = () => {
  const cards = [
    {
      imageSrc: "/images/healthGroup.jpg",
      title: "Improving Health for Families",
      description:
        "Good health is the foundation of a prosperous and equitable world.",
    },
    {
      imageSrc: "/images/childrenStudy.JPG",
      title: "Empowering Future Through Education",
      description: "Education is the key to breaking the cycle of poverty.",
    },
    {
      imageSrc: "/images/babyHome.jpg",
      title: "A Safe Home for Every Child",
      description:
        "Every child deserves a safe, nurturing environment to grow.",
    },
    {
      imageSrc: "/images/childPlant.JPG",
      title: "Nurturing Environment for Future Generations",
      description: "Safeguarding the planet ensures sustainable livelihoods.",
    },
    {
      imageSrc: "/images/girlTree.JPG",
      title: "Building Stronger, Resilient Communities",
      description: "Strong communities are the foundation of lasting change.",
    },
  ];

  return (
    <div className="flex flex-wrap  py-6 max-w-[1140px] mx-auto justify-center  space-x-12 space-y-8 items-center">
      {cards.map((card, index) => (
        <EyeShapeCard
          key={index}
          imageSrc={card.imageSrc}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default EyeShapeCardList;
