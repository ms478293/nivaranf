import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Advisory Board",
  description:
    "Nivaran Foundation is building a global advisory board of healthcare and education experts to guide our mission in Nepal.",
};

export default function AdvisoryBoardPage() {
  return (
    <div className="w-full px-4 bg-white font-Poppins">
      <div className="py-16 min-h-[60vh] max-w-[800px] mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Advisory Board
        </h1>
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-gray-600 leading-7 mb-6">
            We are currently assembling a distinguished advisory board of
            healthcare professionals, education experts, and nonprofit leaders
            who share our vision of transforming lives in Nepal. Our advisory
            board members will provide strategic guidance on program design,
            impact measurement, and organizational growth.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Interested in joining our advisory board? We welcome experts in
            public health, education policy, nonprofit management, and
            international development.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Express Interest
          </Link>
        </div>
      </div>
    </div>
  );
}
