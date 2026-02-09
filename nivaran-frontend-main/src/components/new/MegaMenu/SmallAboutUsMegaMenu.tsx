import * as SheetPrimitive from "@radix-ui/react-dialog";
import Link from "next/link";

const ABOUT_US = [
  {
    id: 1,
    label: "Who we are",
    link: "/about",
  },
  {
    id: 2,
    label: "Career",
    link: "/career",
  },
  {
    id: 3,
    label: "Contact Us",
    link: "/contact",
  },
  {
    id: 4,
    label: "Partnerships",
    link: "/partnerships",
  },
  {
    id: 5,
    label: "FAQs",
    link: "/frequently-asked-questions",
  },
  // {
  //   id: 6,
  //   label: "Leadership",
  //   link: "/leadership",
  // },
];

export const SmallAboutUsMegaMenu = () => {
  return (
    <ul className="flex flex-col gap-3 pl-3">
      {ABOUT_US.map((about) => (
        <li key={about.id}>
          <Link href={about.link} className="text-gray-600 text-sm  py-2">
            <SheetPrimitive.Close>{about.label}</SheetPrimitive.Close>
          </Link>
        </li>
      ))}
    </ul>
  );
};
