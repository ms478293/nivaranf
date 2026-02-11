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
      title: "Community Health Camps",
      description:
        "304 health camps operated — bringing eye care, dental care, and screenings to remote communities.",
    },
    {
      imageSrc: "/images/healthcare.JPG",
      title: "Maternal & Child Health",
      description: "Ensuring every mother and child has access to essential medical care and nutrition.",
    },
    {
      imageSrc: "/images/childrenStudy.JPG",
      title: "Quality Education Access",
      description: "Teacher training, scholarships, and school infrastructure for underserved children.",
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
