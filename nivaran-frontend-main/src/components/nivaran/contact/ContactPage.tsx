import Link from "next/link";
import { ContactImage } from "./ContactImage";
import { GoogleMap } from "./GoogleMap";

export const ContactPage = () => {
  return (
    <section className=" flex flex-col lg:flex-row relative overflow-hidden max-w-[1140px] mx-auto mb-10">
      {/* Left Section */}
      <div className="w-full relative pr-4 py-12 lg:w-1/2 space-y-8">
        {/* Header */}
        <div className="space-y-2 z-20">
          {/* <div className="text-sm font-medium text-blue-500 dark:text-blue-400">
            Contact Us
          </div> */}
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Our friendly team would love to hear from you. Reach out anytime!
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 w-fit min-w-fit z-20">
          {/* Email Card */}
          <div className="p-6 bg-white shadow-md rounded-xl dark:bg-gray-800 hover:shadow-lg transition ">
            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100 dark:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </span>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
              Email
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Our team is happy to assist.
            </p>
            <Link
              href="mailto:support@nivaranfoundation.org"
              className="mt-2 text-blue-500 dark:text-blue-400 break-words leading-5 underline cursor-pointer"
            >
              support@nivaranfoundation.org
            </Link>
          </div>

          {/* Headquarters Card */}
          <div className="p-6 bg-white shadow-md rounded-xl dark:bg-gray-800 hover:shadow-lg transition">
            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100 dark:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </span>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
              Headquarters
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              New Road, Kathmandu
            </p>
            <p className="mt-2 text-blue-500 dark:text-blue-400">
              USA Office: Boston MA, USA
            </p>
          </div>

          {/* Phone Card */}
          <div className="p-6 bg-white shadow-md rounded-xl dark:bg-gray-800 hover:shadow-lg transition">
            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100 dark:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </span>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
              Phone
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Mon-Fri, 8am - 5pm
            </p>
            <p className="mt-2 text-blue-500 dark:text-blue-400">
              +1 8577017471, +977 1-5354693
            </p>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute top-0 right-0 lg:w-[50%] w-full h-full -z-10">
        <ContactImage className="w-full h-full object-cover mix-blend-multiply opacity-50" />
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full pl-4 lg:pt-16">
        <GoogleMap />
      </div>
    </section>
  );
};
