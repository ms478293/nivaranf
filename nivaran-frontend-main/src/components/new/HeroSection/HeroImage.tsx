import Image from "next/image";

const HeroImage = ({
  images,
  currentImageIndex,
}: {
  images: { avif: string; webp: string }[];
  currentImageIndex: number;
}) => {
  return (
    <div className="absolute  w-full h-full">
      {images.map((image, index) =>
        index === currentImageIndex ||
        index === (currentImageIndex + 1) % images.length ? (
          <picture key={index} className="absolute w-full h-full">
            <source srcSet={image.webp} type="image/webp" />
            <source srcSet={image.avif} type="image/avif" />
            <Image
              src={image.webp}
              alt={`Slide ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              style={{ objectFit: "cover" }}
              className={`absolute w-full h-full transition-opacity duration-700 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === currentImageIndex}
              loading={index === currentImageIndex ? "eager" : "lazy"}
            />
          </picture>
        ) : null
      )}
    </div>
  );
};

export default HeroImage;
