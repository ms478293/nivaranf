import { ContactCardList } from "@/components/new/ContactCardList/ContactCardList";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { SetUserLocationCookie } from "@/components/nivaran/main/utils/setUserLocationCookie";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nivaran Foundation | Contact Nivaran Foundation - Get in Touch with Us",
  description:
    "Reach out to Nivaran Foundation for inquiries or support. Connect with us to learn more about how we’re making a global impact through our initiatives",
  alternates: {
    canonical: "https://nivaranfoundation.org/contact",
  },
};

export default async function page() {
  return (
    <main className="w-full px-4 font-Poppins  pb-10">
      <SetUserLocationCookie />
      <section
        className="max-w-[1320px] mx-auto  flex flex-col md:gap-12"
        style={{
          backgroundPosition: "top 10% left 40%",
        }}
      >
        <div className="mb-4 md:mb-8 flex flex-col gap-2">
          <PageTitle prefix="We're Here to" suffix="Answer Your Questions" />

          <p className="text-sm text-gray-600">
            For inquiries regarding partnerships, media, or programs, please
            contact us
          </p>
        </div>
        <ContactCardList />
      </section>
    </main>
  );
}
