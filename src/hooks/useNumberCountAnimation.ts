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
  const [count, setCount] = useState(start);
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
    if (end <= start) {
      setCount(end);
      return;
    }

    setCount(start);

    let current = start;
    const totalSteps = Math.max(end - start, 1);
    const stepDuration = Math.max(Math.floor(duration / totalSteps), 16);

    const timer = setInterval(() => {
      current += 1;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
        return;
      }

      setCount(current);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [duration, end, start]);

  return { count };
};
