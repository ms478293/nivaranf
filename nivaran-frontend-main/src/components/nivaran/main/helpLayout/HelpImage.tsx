import Image from "next/image";
export const HelpImage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 pt-8 pb-20 justify-center">
      {["oldWomen.jpg", "babyHome.jpg", "girlTree.JPG"].map((image, index) => (
        <div
          key={index}
          className="relative group overflow-hidden rounded-lg shadow-lg flex items-center justify-center"
        >
          <Image
            src={`/images/${image}`}
            alt={`Image ${index + 1}`}
            width={300}
            height={300}
            className="transform transition-transform duration-500 group-hover:scale-105 object-cover w-auto"
          />
        </div>
      ))}
    </div>
  );
};
