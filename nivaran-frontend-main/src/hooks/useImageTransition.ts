import { useEffect, useState } from "react";

interface ImageTransitionType {
  data: { avif: string; webp: string }[] | string[];
  transitionTime?: number;
}

export const useImageTransition = ({
  data,
  transitionTime = 8000,
}: ImageTransitionType) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, transitionTime);
    return () => clearInterval(interval);
  }, [data.length, transitionTime]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return { currentIndex, goToPrevious, goToNext, setCurrentIndex };
};
