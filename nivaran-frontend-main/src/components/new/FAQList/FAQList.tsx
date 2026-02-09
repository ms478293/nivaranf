import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQdata } from "@/content/faq";
import { Accordion } from "@radix-ui/react-accordion";

export const FAQList = ({ filteredFAQS }: { filteredFAQS: typeof FAQdata }) => {
  return (
    <div className="md:max-w-full">
      {filteredFAQS.map((faqHead, index) => (
        <div key={index} className="relative">
          <div id={faqHead.title} className=""></div>
          <h2 className="text-lg font-semibold text-gray-950 mb-4 mt-4">
            {faqHead.title}
          </h2>
          <Accordion
            type="single"
            className="space-y-4 flex-1 mb-10 "
            collapsible
          >
            {faqHead.item.map((faq, i) => (
              <div key={faq.question}>
                <AccordionItem
                  value={faq.question}
                  className="border-none -mb-2"
                >
                  <AccordionTrigger className="text-gray-950  text-lg font-light p-4 no-underline data-[state=open]:no-underline bg-gray-50">
                    <p className="flex items-center text-lg gap-3">
                      <span className="font-semibold ">
                        {i < 10 ? `0${i + 1}` : i}
                      </span>
                      <span className="text-base"> {faq.question}</span>{" "}
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="pl-[3.2rem] pr-4 text-gray-400 bg-gray-50">
                    <div
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                      className="[&>a]:text-primary-main "
                    ></div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};
