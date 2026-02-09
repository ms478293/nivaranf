"use client";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { useLocation } from "@/hooks/useLocation";
import { useEffect, useState } from "react";
import ContactCard from "../ContactCard/ContactCard";
import { ContactMap } from "./ContactMap";

const CONTACT_DATA = [
  {
    id: 1,
    address: "CTC Mall, Kathmandu, Nepal",
    contact: "+977 1-5354693",
    email: "profile@nivaranfoundation.org",
    image: "/nepali-flag.png",
    country: "NP",
  },
  {
    id: 2,
    address: "Boston MA, US",
    contact: "+1 8577017471",
    email: "profile@nivaranfoundation.org",
    image: "/usa-flag.png",
    country: "US",
  },
];

export const ContactCardList = () => {
  const [sortedContacts, setSortedContacts] = useState<any[]>(CONTACT_DATA);

  const { isLoaded, userLocation } = useLocation();

  useEffect(() => {
    if (userLocation) {
      const sortedData = [...CONTACT_DATA].sort((a, b) => {
        if (a.country === userLocation) return -1;
        if (b.country === userLocation) return 1;
        return 0;
      });

      setSortedContacts(sortedData);
    }
  }, [userLocation]);

  if (!isLoaded) return <p className="text-gray-600">Loading...</p>;

  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <RenderList
          data={sortedContacts}
          render={(list) => (
            <ContactCard
              contact={list}
              key={list.id}
              userLocation={userLocation}
            />
          )}
        />
      </div>
      <ContactMap />
    </>
  );
};
