import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import NewsletterSubscribe from "@/components/new/NewsletterSubscribe/NewsletterSubscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Subscribe to our Newsletter",
  description:
    "Stay updated with Nivaran Foundation's latest news, impact stories, and opportunities to get involved. Join our community today.",
  alternates: {
    canonical: "https://nivaranfoundation.org/subscribe",
  },
};

export default function SubscribePage() {
  return (
    <main className="w-full px-4 font-Poppins pb-20 pt-10">
      <div className="max-w-[800px] mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col items-center text-center gap-4">
          <PageTitle prefix="Stay Connected with" suffix="Nivaran Foundation" />
          <p className="text-gray-600 max-w-lg">
            Join our community to receive updates on our latest projects, volunteer opportunities, and success stories. We promise not to spam you.
          </p>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
           <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-900">Subscribe to our Newsletter</h2>
                <p className="text-sm text-gray-500">Get the latest updates delivered directly to your inbox.</p>
              </div>
              <NewsletterSubscribe variant="inline" className="!p-0 !bg-transparent shadow-none" />
           </div>
        </div>
      </div>
    </main>
  );
}
