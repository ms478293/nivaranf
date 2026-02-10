"use client";

import ContactIcon from "@/assets/icons/ContactIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import MailIcon from "@/assets/icons/MailIcon";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { useLocation } from "@/hooks/useLocation";

export const CareerSidebar = () => {
  const { isLoaded, userLocation } = useLocation();

  const CONTACT_DATA = [
    {
      id: 1,
      title: "Phone",
      label: userLocation === "NP" ? "+977 1-5312555" : "+1 8577017471",
      icon: <ContactIcon className="w-6 h-6 stroke-secondary-800 " />,
    },
    {
      id: 2,
      title: "Email",
      label: "partnerships@nivaranfoundation.org",
      icon: <MailIcon className="w-6 h-6 stroke-secondary-800" />,
    },
    {
      id: 3,
      title: "Headquarters",
      label:
        userLocation === "NP"
          ? "Newroad, Kathmandu"
          : "USA Office: Boston MA, US",
      icon: <LocationIcon className="w-6 h-6 stroke-secondary-800" />,
    },
  ];

  if (!isLoaded) return <p className="text-gray-600">Loading...</p>;

  return (
    <div className="bg-secondary-50 rounded-md p-5 flex flex-col gap-4">
      <h3 className="text-secondary-800 font-semibold text-xl">
        For more details
      </h3>

      <ul className=" flex flex-wrap gap-x-4 gap-y-4 md:gap-y-6">
        <RenderList
          data={CONTACT_DATA}
          render={(contact) => (
            <li key={contact.id}>
              <div className="flex items-center gap-2">
                <div className="bg-secondary-100 p-3 rounded-full [&>svg]:stroke-1 [&>svg]:w-5 [&>svg]:h-5">
                  {contact.icon}
                </div>
                <div className="flex flex-wrap items-end gap-2">
                  <p className="text-gray-800 text-sm font-light">
                    {contact.label}
                  </p>
                </div>
              </div>
            </li>
          )}
        />
      </ul>
    </div>
  );
};
