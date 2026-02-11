"use client";

import { cn } from "@/lib/utils";
import { SetStateAction } from "react";
import { DonationLink } from "../DonationCard/DonationCard";

const DonatePriceTag = ({
  price,
  selectedPayment,
  setSelectedPayment,
}: {
  price: DonationLink;
  selectedPayment: DonationLink;
  setSelectedPayment: React.Dispatch<SetStateAction<DonationLink>>;
}) => {
  return (
    <button
      aria-label={`Donate amount ${price.value}`}
      className={cn(
        `font-semibold p-[1.5rem] text-gray-600 border border-gray-600 rounded-md flex items-center justify-center flex-grow ${
          selectedPayment === price
            ? "bg-primary-100 border-primary-500 border text-primary-500"
            : ""
        }`
      )}
      onClick={() =>
        setSelectedPayment((donate) => (donate !== price ? price : null))
      }
    >
      {typeof price.value === "number"
        ? `$${price.value}`
        : (price.value as string).toUpperCase()}
    </button>
  );
};

export default DonatePriceTag;
