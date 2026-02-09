import { RefObject, useEffect, useState } from "react";

interface NumberAnimationOption {
  start?: number;
  end?: number;
  duration?: number;
  ref?: RefObject<HTMLDivElement> | null;
}

export const useNumberCountAnimation = ({
  start = 0,
  end = 100,
  duration = 2000,
}: // ref,
NumberAnimationOption = {}) => {
  const [count, setCount] = useState(0);
  // const [hasAnimated, setHasAnimated] = useState(false);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries: IntersectionObserverEntry[]) => {
  //       entries.forEach((el) => {
  //         if (el.isIntersecting && !hasAnimated) {
  //           setHasAnimated(true);

  //           const step = duration / end;

  //           const timer = setInterval(() => {
  //             start++;
  //             setCount(start);
  //             if (start === end) clearInterval(timer);
  //           }, step);

  //           return () => clearInterval(timer);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.5,
  //     }
  //   );

  //   observer.observe(ref.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const step = duration / end;

    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, step);

    return () => clearInterval(timer);
  }, []);

  return { count };
};
