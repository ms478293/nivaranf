"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useUrlQuery = () => {
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      return params.toString();
    },
    [searchParams]
  );

  return { createQueryString };
};
