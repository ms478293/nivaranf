"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600">
            We encountered an unexpected error. Please try again or return to
            the homepage.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
