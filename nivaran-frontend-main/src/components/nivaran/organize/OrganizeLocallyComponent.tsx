"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const OrganizeLocallyCompoenent = () => {
  const [healthCamps] = useState([
    {
      id: 1,
      name: "Tapro Health Camp",
      location: "Tapro Village, Nepal",
      date: "March 15, 2025",
      description:
        "Providing free medical check-ups and essential medicines to the local community in Tapro Village.",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Kathmandu Health Camp",
      location: "Kathmandu, Nepal",
      date: "February 10, 2025",
      description:
        "A large-scale medical camp offering dental, eye, and general health check-ups in the capital.",
      status: "Planned",
    },
    {
      id: 3,
      name: "Pokhara Wellness Camp",
      location: "Pokhara, Nepal",
      date: "January 25, 2025",
      description:
        "Focused on mental health awareness and counseling for families in Pokhara.",
      status: "Ongoing",
    },
  ]);
  return (
    <div className="pt-12 pb-8 max-w-[1140px] mx-auto min-h-screen">
      <header className="text-start mb-4">
        <h1 className="text-4xl font-bold text-primary-main mb-4">
          Organize Locally: Health Camps Across Nepal
        </h1>
        <p className="text-gray-600 text-lg">
          Join us in our mission to provide accessible healthcare to every
          corner of Nepal. Below are the ongoing and upcoming health camps you
          can be a part of.
        </p>
      </header>

      <div className="space-y-8">
        {healthCamps.map((camp) => (
          <section
            key={camp.id}
            className="bg-white rounded-lg shadow-md p-6 transition hover:shadow-lg"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-primary-main">
                  {camp.name}
                </h2>
                <p className="text-sm text-secondary-main mb-2">
                  Location: {camp.location}
                </p>
                <p className="text-sm text-gray-600 mb-2">Date: {camp.date}</p>
                <p className="text-gray-700 mb-4">{camp.description}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                {camp.status === "Upcoming" || camp.status === "Planned" ? (
                  <Button variant="outline" className="w-full sm:w-auto">
                    Volunteer Now
                  </Button>
                ) : (
                  <span className="text-green-600 font-semibold">
                    {camp.status}
                  </span>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-16 text-center">
        <p className="text-gray-600">
          Want to organize a health camp in your local area?{" "}
          <a
            href="/contact"
            className="text-secondary-main font-semibold hover:underline"
          >
            Get in touch with us
          </a>
        </p>
      </footer>
    </div>
  );
};
