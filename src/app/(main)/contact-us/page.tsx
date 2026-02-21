import { ContactCardList } from "@/components/new/ContactCardList/ContactCardList";
import ContactForm from "@/components/new/ContactForm/ContactForm";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { SetUserLocationCookie } from "@/components/nivaran/main/utils/setUserLocationCookie";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Nivaran Foundation",
  description:
    "Contact Nivaran Foundation for partnership, donation, program, or volunteer inquiries.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/contact-us",
  },
};

export default async function ContactUsPage() {
  return (
    <main className="w-full px-4 font-Poppins pb-10">
      <SetUserLocationCookie />
      <section className="max-w-[1320px] mx-auto flex flex-col md:gap-12">
        <div className="mb-4 md:mb-8 flex flex-col gap-2">
          <PageTitle prefix="We're Here to" suffix="Answer Your Questions" />
          <p className="text-sm text-gray-600">
            For inquiries about our healthcare programs, donations, and
            volunteer opportunities, please use the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <ContactForm />
          <div className="flex flex-col gap-8">
            <ContactCardList />
          </div>
        </div>
      </section>
    </main>
  );
}
