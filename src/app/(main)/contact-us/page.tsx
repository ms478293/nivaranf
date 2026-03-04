import { ContactCardList } from "@/components/new/ContactCardList/ContactCardList";
import ContactForm from "@/components/new/ContactForm/ContactForm";
import { PageTitle } from "@/components/new/PageTitle/PageTitle";
import { SetUserLocationCookie } from "@/components/nivaran/main/utils/setUserLocationCookie";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact Nivaran Foundation | Nepal Healthcare NGO",
  description:
    "Contact Nivaran Foundation for partnership, donation, program, or volunteer inquiries. Email partnerships@nivaranfoundation.org or call +977-01-5354693. We respond within 24 hours.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/contact-us",
  },
  openGraph: {
    title: "Contact Nivaran Foundation | Nepal Healthcare NGO",
    description:
      "Reach Nivaran Foundation for partnerships, donations, programs, or volunteer inquiries. We respond within 24 hours.",
    url: "https://www.nivaranfoundation.org/contact-us",
    type: "website",
    siteName: "Nivaran Foundation",
    images: [
      {
        url: "https://www.nivaranfoundation.org/logo.png",
        width: 1200,
        height: 665,
        alt: "Nivaran Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Nivaran Foundation | Nepal Healthcare NGO",
    description:
      "Reach Nivaran Foundation for partnerships, donations, programs, or volunteer inquiries.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

export default async function ContactUsPage() {
  return (
    <main className="w-full px-4 font-Poppins pb-10">
      <SetUserLocationCookie />
      <section className="max-w-[1320px] mx-auto flex flex-col md:gap-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} className="mb-2" />
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

        {/* Response commitment & Office info */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-semibold text-green-800 text-lg mb-2">⏱ Response Time</h3>
            <p className="text-sm text-green-700">
              We respond to all inquiries within <strong>24 hours</strong> during business days. Urgent matters related to ongoing programs are prioritized and typically addressed within 4 hours.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-800 text-lg mb-2">🕐 Office Hours</h3>
            <p className="text-sm text-blue-700">
              <strong>Nepal Office:</strong> Sun–Fri, 10:00 AM – 5:00 PM NPT<br />
              <strong>US Coordination:</strong> Mon–Fri, 9:00 AM – 5:00 PM EST<br />
              Closed on Nepali public holidays and US federal holidays.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-semibold text-purple-800 text-lg mb-2">📍 Our Office</h3>
            <p className="text-sm text-purple-700">
              Nivaran Foundation<br />
              Kathmandu, Nepal<br />
              <strong>Phone:</strong> +977-01-5354693<br />
              <strong>Email:</strong> partnerships@nivaranfoundation.org
            </p>
          </div>
        </section>

        {/* Contact FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">How can I donate to Nivaran Foundation?</h3>
              <p className="text-sm text-gray-600">
                You can donate online through our <a href="/donate" className="text-primary-500 underline">Donate page</a>. We accept credit cards, debit cards, and bank transfers. All donations are 501(c)(3) tax-deductible.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">How do I volunteer with Nivaran?</h3>
              <p className="text-sm text-gray-600">
                Visit our <a href="/volunteer" className="text-primary-500 underline">Volunteer page</a> to see current opportunities. We offer both in-person programs in Nepal and remote support roles.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Can my company partner with Nivaran?</h3>
              <p className="text-sm text-gray-600">
                Absolutely! We welcome corporate partnerships, CSR collaborations, and employer matching programs. Email us at partnerships@nivaranfoundation.org with details about your organization.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Where does Nivaran Foundation operate?</h3>
              <p className="text-sm text-gray-600">
                We primarily operate across rural districts of Nepal, running mobile health camps, education programs, and community development initiatives. Our US coordination office handles fundraising and partnerships.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
