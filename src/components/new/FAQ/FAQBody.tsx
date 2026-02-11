import { FAQdata } from "@/content/faq";
import { FAQList } from "../FAQList/FAQList";
import { FAQTitle } from "../FAQList/FAQTitle";

export const FAQBody = ({ filteredFAQ }: { filteredFAQ: typeof FAQdata }) => {
  return (
    <div className=" block">
      {filteredFAQ.length === 0 ? (
        <p className="text-gray-600 text-center py-12">No Results Found</p>
      ) : (
        <section className="flex   mt-12 max-w-[1320px] mx-auto font-Poppins justify-between gap-12 ">
          <div className="md:block hidden  h-[85vh] overflow-y-auto sticky top-[70px] mb-8">
            <FAQTitle filteredFAQS={filteredFAQ} />
          </div>

          <FAQList filteredFAQS={filteredFAQ} />
        </section>
      )}
    </div>
  );
};
