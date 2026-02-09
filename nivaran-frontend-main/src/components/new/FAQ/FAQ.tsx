"use client";

import { FAQdata } from "@/content/faq";
import { useState } from "react";
import { FAQBody } from "./FAQBody";
import { FAQHeader } from "./FAQHeader";

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQ = FAQdata.flatMap((faq) => ({
    ...faq,
    item: faq.item.filter((f) =>
      f.question.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((faq) => faq.item.length > 0);

  return (
    <>
      <div className="md:max-w-[1320px] mx-auto ">
        <FAQHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredFAQ={filteredFAQ}
        />
        <FAQBody filteredFAQ={filteredFAQ} />
      </div>
    </>
  );
};
