import { LucideProps } from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
  icon: IconType;
}
type IconType = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export { type NavItem };
