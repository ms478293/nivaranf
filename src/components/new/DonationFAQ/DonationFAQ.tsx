import MoveUpRightArrowIcon from "@/assets/icons/MoveUpRightArrowIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AppButton } from "@/components/ui/app-button";
import { DONOR_FAQS } from "@/content/donor-information";
import Link from "next/link";
import MainTitle from "../MainTitle/MainTitle";

export const DonationFAQ = () => {
  return (
    <div className="flex flex-col md:flex-row gap-3 my-10">
      <div className="bg-primary-50 flex flex-col md:justify-between md:gap-3 items-start p-4">
        <div className="">
          <MainTitle suffix="Frequently asked" prefix="Questions" />
          <p className="text-gray-800 ">
            Common questions about donating and how we handle your information.
          </p>
        </div>
        <Link href="/frequently-asked-questions">
          <AppButton variant="ghost" className="px-0 relative mt-4" asChild>
            <div className="flex items-center gap-1">
              <span className="font-normal text-sm">Browse donation FAQs</span>
              <MoveUpRightArrowIcon className="w-4 h-4 fill-primary-500" />
            </div>
          </AppButton>
        </Link>
      </div>

      <Accordion type="single" className="space-y-4 flex-1" collapsible>
        {DONOR_FAQS.map((faqHead, index) => (
          <AccordionItem
            value={faqHead.question}
            key={index}
            className="border-none"
          >
            <AccordionTrigger className="text-gray-950  text-lg font-light  px-3 py-2 no-underline data-[state=open]:no-underline bg-gray-50">
              <p className="flex items-center text-lg gap-3">
                <span className="font-semibold ">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>
                <span className="text-base"> {faqHead.question}</span>{" "}
              </p>
            </AccordionTrigger>
            <AccordionContent className="pl-10 text-gray-600 bg-gray-50">
              <p className="leading-7">{faqHead.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
