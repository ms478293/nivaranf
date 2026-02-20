import { NavItem } from "@/app/types/navItem";
import {
  BookUserIcon,
  BriefcaseIcon,
  FilePenLine,
  Handshake,
  PlusIcon,
  UserRoundSearchIcon,
} from "lucide-react";

const navItems: NavItem[] = [
  // {
  //   label: "Dashboard",
  //   icon: LayoutDashboard,
  // },

  {
    label: "Application Management",
    icon: BookUserIcon,

    children: [
      {
        label: "Volunteer",
        href: "/dashboard/volunteer/list",
        // href: "/dashboard/job/create-job",
        icon: Handshake,
      },

      {
        label: "Career",
        href: "/dashboard/job/view-jobs",
        icon: BriefcaseIcon,
      },

      {
        label: "Job Applicant",
        href: "/dashboard/job/view-applicants",
        icon: UserRoundSearchIcon,
      },
    ],
  },
  {
    label: "Program Management",
    icon: BookUserIcon,
    children: [
      {
        label: "Programs ",
        href: "/dashboard/programs/view-programs",
        icon: PlusIcon,
      },
    ],
  },
  {
    label: "Content Management",
    icon: BookUserIcon,
    children: [
      {
        label: "Publishing Portal",
        href: "/dashboard/content",
        icon: FilePenLine,
      },
    ],
  },
  // {
  //   label: "Donation Management",
  //   icon: BookUserIcon,
  //   children: [
  //     {
  //       label: "Donation ",
  //       href: "/dashboard/donation/view",
  //       icon: PlusIcon,
  //     },
  //     {
  //       label: "Donor ",
  //       href: "/dashboard/donor/view",
  //       icon: PlusIcon,
  //     },
  //   ],
  // },

  // {
  //   label: "Finance Management",
  //   icon: BookUserIcon,
  //   children: [
  //     {
  //       label: "Add New Volunteer ",
  //       href: "/dashboard/finance/expense",
  //       icon: PlusIcon,
  //     },
  //   ],
  // },

  // {
  //   label: "Finance Management",
  //   icon: BadgeDollarSignIcon,
  //   children: [
  //     {
  //       label: "Add Expense Entry",
  //       href: "/dashboard/finance/expense",
  //       icon: PlusIcon,
  //     },
  //     {
  //       label: "Add Income Entry",
  //       href: "/dashboard/finance/income",
  //       icon: PlusIcon,
  //     },
  //     {
  //       label: "View Finance Report",
  //       href: "/dashboard/finance/finance-report",
  //       icon: ViewIcon,
  //     },
  //   ],
  // },

  // {
  //   label: "Projects",
  //   icon: WheatIcon,

  //   children: [
  //     {
  //       label: "Add Projects",
  //       href: "/dashboard/projects",
  //       icon: PlusIcon,
  //     },
  //   ],
  // },

  // {
  //   label: "Impact Report",
  //   icon: WheatIcon,

  //   children: [
  //     {
  //       label: "Add Programs",
  //       href: "/dashboard/impact/programs",
  //       icon: PlusIcon,
  //     },

  //     {
  //       label: "Make new Impact Report",
  //       href: "/dashboard/impact/new",
  //       icon: PlusIcon,
  //     },
  //     {
  //       label: "View Impact Report",
  //       href: "/dashboard/impact/view",
  //       icon: MountainIcon,
  //     },
  //   ],
  // },
  // {
  //   label: "Donation",
  //   icon: HandCoinsIcon,
  //   children: [
  //     {
  //       label: "View Donations",
  //       href: "/dashboard/donation/view",
  //       icon: WalletIcon,
  //     },
  //     {
  //       label: "Add Donation",
  //       href: "/dashboard/donation/new",
  //       icon: DollarSignIcon,
  //     },
  //   ],
  // },
  // {
  //   label: "Donor",
  //   icon: HandCoinsIcon,
  //   children: [
  //     {
  //       label: "Add Donors",
  //       href: "/dashboard/donor/new",
  //       icon: PlusIcon,
  //     },
  //     {
  //       label: "View Donors",
  //       href: "/dashboard/donor/view",
  //       icon: DollarSignIcon,
  //     },
  //   ],
  // },
];

export { navItems };
