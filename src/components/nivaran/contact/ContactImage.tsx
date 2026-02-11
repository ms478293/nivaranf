import { cn } from "@/lib/utils";
import Image from "next/image";

export const ContactImage = ({ className }: { className: string }) => {
  return (
    <Image
      src="/infographic/contact.svg"
      alt="Contact"
      width={400}
      height={400}
      className={cn("object-cover w-96 h-96", className)}
    ></Image>
  );
};
