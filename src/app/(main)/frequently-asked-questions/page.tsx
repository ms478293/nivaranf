import { FAQ } from "@/components/new/FAQ/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation |  FAQ - Frequently Asked Questions about Nivaran Foundation",
  description:
    "Find answers to common questions about Nivaran Foundation's services, data protection, and more on our FAQ page. Get the information you need quickly",
  alternates: {
    canonical: "https://nivaranfoundation.org/frequently-asked-questions",
  },
};

export default function FAQPage() {
  return (
    <>
      <div className="font-Poppins w-full px-4 scroll-smooth ">
        <FAQ />
      </div>
    </>
  );
}
