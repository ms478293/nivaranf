import Image from "next/image";

const HeroImage = ({
  images,
  currentImageIndex,
}: {
  images: { avif: string; webp: string; alt: string }[];
  currentImageIndex: number;
}) => {
  return (
    <div className="absolute w-full h-full">
      {images.map((image, index) =>
        index === currentImageIndex ||
        index === (currentImageIndex + 1) % images.length ? (
          <Image
            key={index}
            src={image.webp}
            alt={image.alt || `Slide ${index + 1}`}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className={`absolute w-full h-full transition-opacity duration-700 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "low"}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ) : null
      )}
    </div>
  );
};

export default HeroImage;
