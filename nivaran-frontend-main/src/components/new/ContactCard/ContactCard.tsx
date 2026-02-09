"use client";
import ContactIcon from "@/assets/icons/ContactIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import MailIcon from "@/assets/icons/MailIcon";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ContactCard = ({
  contact,
  userLocation,
}: {
  contact: any;
  userLocation: any;
}) => {
  return (
    <div
      className={cn(
        `border border-gray-100 rounded-lg flex-col flex gap-2 md:flex-row overflow-hidden   h-[200px] md:h-auto relative min-h-[220px] ${
          userLocation === contact.country ? "bg-secondary-100 " : ""
        }
        `
      )}
    >
      <div className="flex flex-col justify-between gap-2 p-2 px-4  md:gap-3 h-full relative z-10 ">
        <div className=" rounded-full  w-fit flex items-start justify-center gap-2">
          <span
            className={`p-1 rounded-sm  ${
              userLocation === contact.country
                ? "bg-neutral-50"
                : "bg-secondary-100"
            }`}
          >
            <LocationIcon className="w-6 h-6 stroke-secondary-800 stroke-1" />
          </span>
          <h3 className="text-secondary-800 text-lg md:text-xl font-semibold leading-8 ">
            {contact.address}
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          <p
            className="text-secondary-800 flex gap-2 items-center
          "
          >
            <ContactIcon className="w-5 h-5 stroke-secondary-800 stroke-1" />
            <span>{contact.contact}</span>
          </p>
          <p className="text-secondary-800 flex gap-2 items-center">
            <MailIcon className="w-5 h-5 stroke-secondary-800 stroke-1" />
            <span>{contact.email}</span>
          </p>
        </div>
      </div>

      <div className="  h-auto hidden md:block top-0 ">
        <Image
          src={contact.image}
          alt={contact.address}
          width={2000}
          height={2000}
          className="w-full object-cover object-center  h-full"
        />
      </div>
    </div>
  );
};

export default ContactCard;
