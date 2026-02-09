"use client";

import { useLocation } from "@/hooks/useLocation";
import Image from "next/image";

const PartnershipContactPerson = () => {
  const { isLoaded } = useLocation();

  if (!isLoaded) return <p className="text-gray-600">Loading...</p>;

  return (
    <div className="grid mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-xs dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
      <figure className="flex flex-col items-center justify-center py-2 md:p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
        <Image
          width={500}
          height={500}
          className="rounded-full  object-cover object-center w-8  h-10"
          src="/small_logo.png"
          alt="Nivaran Logo"
        />

        <h2 className="text-md font-medium text-gray-900 mt-4">
          Nivaran Foundation
        </h2>
        <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500  dark:text-gray-400 mt-4 px-2">
          <p>
            Reach out to us directly for partnership inquiries, collaborations,
            and business opportunities. Our team will get back to you promptly.
          </p>
        </blockquote>
        <figcaption className="flex flex-wrap gap-x-2 px-2">
          <blockquote className=" mx-auto  text-gray-500  dark:text-gray-400">
            <h3 className="text-md font-medium text-gray-600">Email:</h3>
          </blockquote>
          <p className="space-y-0.5 font-light text-gray-800 text-center text-md text-wrap ">
            partnerships@nivaranfoundation.org
          </p>
        </figcaption>
      </figure>
      {/* <figure className="flex flex-col items-center justify-center py-2 md:p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
        {userLocation !== "NP" ? (
          <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
        ) : (
          <Image
            width={500}
            height={500}
            className="rounded-full  object-cover object-center w-10  h-10"
            src="/partners/deeparshan_khadka.jpeg"
            alt="Nivaran Logo"
          />
        )}

        <h2 className="text-md font-medium text-gray-900 mt-4">
          {userLocation !== "NP" ? null : "Deeparshan Khadka"}
        </h2>
        <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500  dark:text-gray-400 mt-4 px-2">
          <p>
            Have specific questions or need personalized assistance? Contact our
            dedicated representative for a more direct and detailed response.
          </p>
        </blockquote>
        <figcaption
          className="flex items-center justify-center gap-2
    "
        >
          {userLocation !== "NP" ? (
            <p className="space-y-0.5 font-light text-gray-800 text-left text-md  ">
              emily.a@nivaranfoundation.org
            </p>
          ) : (
            <>
              <blockquote className=" mx-auto  text-gray-500  dark:text-gray-400">
                <h3 className="text-md font-medium text-gray-600  ">
                  Contact:
                </h3>
              </blockquote>
              <p className="space-y-0.5 font-light text-gray-800 text-left text-md  ">
                +977 9709119869
              </p>
            </>
          )}
        </figcaption>
      </figure> */}
    </div>
  );
};

export default PartnershipContactPerson;
