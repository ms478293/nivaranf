// Donation designations — the ONLY source for designation ids, labels and copy.
// Imported by DonationCard (client), /api/donate/charge (server) and the emails.
// Honesty rule: every sentence below reuses a fact already stated on the site.
// No percentages, totals, donor counts or per-dollar impact claims. No tax-status wording.
// This file must stay import-free so scripts/check-donation-fee.mjs can load it directly.

export type DesignationStatus = "active" | "paused" | "planned";

export type Designation = {
  id: string;
  /** Short label: radio tile, summary panel, admin alert. */
  label: string;
  /** One line under the label on the radio tile. */
  caption: string;
  /** "Designation" row on the receipt. */
  receiptLabel: string;
  /** Where "Explore …" goes on the success screen and the receipt CTA. Site-relative. */
  pageUrl: string;
  exploreLabel: string;
  /** paused = WeatherAdvisory monsoon notice is live. Flip sanjeevani + maternal-child-health
   *  back to "active" when ADVISORY.enabled is set false in WeatherAdvisory.tsx. */
  status: DesignationStatus;
  /** false = not shown on the form and rejected by the server. */
  visible: boolean;
  /** Only repo-sourced figures (programs/health/page.tsx:87). */
  impactLine?: string;
  /** Success screen + receipt. Heartfelt, specific, honest. */
  thankYouNote: string;
};

/** Optional gift dedication. Shared by the form, the charge route and the emails. */
export type Dedication = { type: "honor" | "memory"; name: string };

/** Shown on the form, the success screen and the receipt so the gift is never read as restricted. */
export const VARIANCE_NOTE =
  "If a program is fully funded or cannot be carried out, we direct your gift where the need is greatest.";

export const DESIGNATIONS: readonly Designation[] = [
  {
    id: "general",
    label: "Where it's needed most",
    caption: "Directed by our team to the most urgent need",
    receiptLabel: "General fund — Nivaran's work in Nepal",
    pageUrl: "/programs",
    exploreLabel: "Explore our programs",
    status: "active",
    visible: true,
    thankYouNote:
      "Thank you for trusting us to put your gift where it is needed most. Right now that means keeping Project Sanjeevani ready to return to the field the moment the monsoon roads are safe again, and keeping our education work in Nepal going. We will keep publishing what we do with it.",
  },
  {
    id: "sanjeevani",
    label: "Project Sanjeevani",
    caption: "Free mobile health camps across rural Nepal",
    receiptLabel: "Project Sanjeevani — mobile health camps",
    pageUrl: "/sanjeevani",
    exploreLabel: "Explore Project Sanjeevani",
    status: "paused",
    visible: true,
    impactLine: "16 camps · 17,355 patients logged · 7 provinces (May 2025 – Feb 2026)",
    thankYouNote:
      "Thank you for backing Project Sanjeevani. Our camps are paused because monsoon rain has made the mountain roads to our camp sites unsafe, and we will not send doctors, volunteers or patients over them until they are cleared. Every postponed camp will be held, and your gift is what lets us return the moment the routes are safe.",
  },
  {
    id: "maternal-child-health",
    label: "Maternal & child health",
    caption: "Antenatal screening and care for mothers and children through our camps",
    receiptLabel: "Healthcare — maternal & child health",
    pageUrl: "/maternal-health-nepal",
    exploreLabel: "Explore maternal & child health",
    status: "paused",
    visible: true,
    thankYouNote:
      "Thank you. Your gift goes to the mothers and children our camps reach. In the villages Sanjeevani serves, patients walk for hours to see a doctor, many of them pregnant or carrying a child, which is exactly why our camps carry maternal screening with them. Camps are paused while the monsoon roads are unsafe, and your gift helps us bring that care back the moment they reopen.",
  },
  {
    id: "education",
    label: "Education in Nepal",
    caption: "School access, supplies and teacher support",
    receiptLabel: "Education program — Nepal",
    pageUrl: "/programs/education",
    exploreLabel: "Explore our education work",
    status: "active",
    visible: true,
    thankYouNote:
      "Thank you for investing in a child's classroom. Education is our long-term pillar in Nepal, and it is still early: our most recent recorded initiative was the Equip School Supplies drive (January–February 2025). Gifts like yours are what let it grow, and we will tell you honestly what your support made possible.",
  },
  // Hidden until the owner confirms gifts can be tracked and reported separately.
  // To enable the flood appeal: visible:true here AND set NEPAL_RESPONSE.floodFundUrl to
  // "/donate?designation=nepal-flood-recovery" (internal path — no second processor).
  {
    id: "nepal-flood-recovery",
    label: "Nepal floods 2026 appeal",
    caption: "Pre-deployment appeal for the Bhote Koshi flood districts",
    receiptLabel: "Nepal floods 2026 appeal (pre-deployment)",
    pageUrl: "/campaigns/nepal-flood-recovery",
    exploreLabel: "Read the flood briefing",
    status: "planned",
    visible: false,
    thankYouNote:
      "Thank you for standing with the valleys the Bhote Koshi tore through. We want to be plain with you: we have not deployed yet, and we are raising so that we can. If we cannot mount a credible response, your gift stays with our ongoing healthcare work in Nepal and we will say so publicly.",
  },
  {
    id: "vidya",
    label: "Project Vidya (planned 2027)",
    caption: "Planned technology-enabled learning centers",
    receiptLabel: "Project Vidya — planned education initiative",
    pageUrl: "/vidya",
    exploreLabel: "Explore Project Vidya",
    status: "planned",
    visible: false,
    thankYouNote:
      "Thank you for believing in something that has not started yet. Project Vidya is planned for 2027, so your gift is seed support for the groundwork rather than for classrooms already running. We would rather tell you that plainly than let you imagine otherwise.",
  },
];

export const DEFAULT_DESIGNATION_ID = "general";

/** Unknown, hidden or missing id → general fund. */
export function getDesignation(id?: string | null): Designation {
  return DESIGNATIONS.find((d) => d.id === id && d.visible) ?? DESIGNATIONS[0];
}

export function isSelectableDesignation(id: unknown): id is string {
  return typeof id === "string" && DESIGNATIONS.some((d) => d.id === id && d.visible);
}

export const STATUS_BADGE: Record<DesignationStatus, string | null> = {
  active: null,
  paused: "Paused for monsoon",
  planned: "Not yet started",
};

/**
 * Optional processing-cost cover (default OFF). Server recomputes from the base amount.
 * Rate = GoDaddy Payments published online card rate, 2.7% + 30¢
 * (godaddy.com/payments pricing page, checked 2026-09-12). Poynt Collect/API pricing is
 * per merchant contract — update FEE_BPS if the agreement differs.
 * Integer math (basis points) avoids float edges such as 97.5000001.
 */
export const FEE_BPS = 270;
export const FEE_FIXED_CENTS = 30;
export function feeCentsFor(baseCents: number): number {
  return Math.round((baseCents * FEE_BPS) / 10_000 + FEE_FIXED_CENTS);
}
