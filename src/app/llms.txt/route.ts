import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { detectSiteVariantFromHost } from "@/lib/site-variant";

const MAIN_LLMS_TXT = `# Nivaran Foundation

> Nivaran Foundation is a Nepal-focused foundation delivering free mobile health camps, maternal care, and education support to underserved communities across rural Nepal. Founded in 2024, Nivaran’s published program figures report 17,355 patients across 16 completed camps in 7 provinces, as of February 2026. EIN: 41-2656587.

## About
- [About Nivaran Foundation](https://www.nivaranfoundation.org/about): Mission, vision, founding story, and organizational overview
- [Leadership & Governance](https://www.nivaranfoundation.org/leadership): Board, management, governance, and verification reference
- [Editorial Standards](https://www.nivaranfoundation.org/editorial-standards): Public standards for sourcing, corrections, and healthcare content boundaries
- [Advisory Board](https://www.nivaranfoundation.org/advisory-board): External expertise priorities, review focus, and governance context
- [Care Model & Quality Standards](https://www.nivaranfoundation.org/care-model): Public reference for screening, referral, training, and safeguarding expectations
- [Impact Fact Sheet](https://www.nivaranfoundation.org/impact-fact-sheet): Key statistics, reach, and measurable outcomes
- [Accountability & Transparency](https://www.nivaranfoundation.org/accountability-and-transparency): Governance and financial stewardship
- [Financial Reports](https://www.nivaranfoundation.org/financial-reports): Reporting status, organization details, and diligence pathways

## Programs
- [Project Sanjeevani](https://www.nivaranfoundation.org/sanjeevani): Flagship mobile health camp program serving rural Nepal
- [Sanjeevani Tracking](https://www.nivaranfoundation.org/sanjeevani/tracking): Published health camp records and district-level reporting
- [Project Vidya](https://www.nivaranfoundation.org/vidya): Planned education initiative for underserved children, scheduled for 2027 — not yet launched
- [Health Programs](https://www.nivaranfoundation.org/programs/health): Comprehensive healthcare program overview
- [Education Programs](https://www.nivaranfoundation.org/programs/education): Education access and scholarship programs

## Healthcare Coverage
- [Healthcare Coverage Nepal](https://www.nivaranfoundation.org/healthcare-coverage-nepal): Province-by-province healthcare delivery map
- [Mobile Health Camps Nepal](https://www.nivaranfoundation.org/mobile-health-camps-nepal): How mobile health camps work in rural areas
- [Rural Healthcare Nepal](https://www.nivaranfoundation.org/rural-healthcare-nepal): Challenges and solutions in rural healthcare delivery
- [Maternal Health Nepal](https://www.nivaranfoundation.org/maternal-health-nepal): Maternal and child health initiatives
- [Free Health Camp Nepal](https://www.nivaranfoundation.org/free-health-camp-nepal): Free screening and treatment camp information

## Current Appeals
- [Nepal Flood Recovery Appeal](https://www.nivaranfoundation.org/donate/nepal-flood-recovery): Fundraising for Nivaran’s planned flood response before deployment
- [Nepal Flood Briefing](https://www.nivaranfoundation.org/campaigns/nepal-flood-recovery): Dated official sources, reported needs and Nivaran’s response status
- [Donation Campaigns](https://www.nivaranfoundation.org/campaigns): Healthcare, maternal and child health, education and flood appeals with current giving status

## Get Involved
- [Donate](https://www.nivaranfoundation.org/donate): Donations — See financial reporting status
- [Volunteer](https://www.nivaranfoundation.org/volunteer): Field opportunities in Nepal and remote support; confirm availability with the team
- [Corporate Partnerships](https://www.nivaranfoundation.org/corporate): CSR and corporate partnership programs

## Content
- [Blog](https://www.nivaranfoundation.org/blogs): Health news, field reports, and organizational updates
- [Stories](https://www.nivaranfoundation.org/stories): Beneficiary stories and impact narratives
- [News](https://www.nivaranfoundation.org/news): Nepal health news and policy updates
- [Press Kit](https://www.nivaranfoundation.org/press): Media resources, brand assets, and organizational background

## Contact
- Email: partnerships@nivaranfoundation.org
- Phone: +977-01-5354693
- Address: Kathmandu, Nepal (Operations) | Arlington, MA 02476, USA (Registered)
- [Contact Page](https://www.nivaranfoundation.org/contact-us)

## FAQ
- [Frequently Asked Questions](https://www.nivaranfoundation.org/frequently-asked-questions)
`;

const GLOBAL_LLMS_TXT = `# Nivaran Global

> Nivaran Global is the international platform of Nivaran Foundation for humanitarian campaigns, crisis reporting, and public-interest response coordination.

## Content
- [News](https://global.nivaranfoundation.org/news): Field reporting and humanitarian analysis
- [Articles](https://global.nivaranfoundation.org/articles): In-depth humanitarian articles
- [Stories](https://global.nivaranfoundation.org/stories): Impact narratives from the field
- [Campaigns](https://global.nivaranfoundation.org/campaigns): Active humanitarian campaigns

## Contact
- Email: support@global.nivaranfoundation.org
- [Contact Page](https://global.nivaranfoundation.org/contact)
`;

const USA_LLMS_TXT = `# Nivaran | United States

> Nivaran's United States presence for community partnerships, fundraising, storytelling, and civic engagement.

## Content
- [Homepage](https://usa.nivaranfoundation.org): U.S. presence and partnership overview
- [Live](https://usa.nivaranfoundation.org/live): Current activity and updates
- [Blog](https://usa.nivaranfoundation.org/blogs): U.S.-focused stories and commentary

## Contact
- Email: partnerships@nivaranfoundation.org
`;

export async function GET() {
  const headerStore = await headers();
  const host =
    headerStore.get("x-forwarded-host") ||
    headerStore.get("host") ||
    "";

  const variant = detectSiteVariantFromHost(host);
  const content =
    variant === "global"
      ? GLOBAL_LLMS_TXT
      : variant === "usa"
        ? USA_LLMS_TXT
        : MAIN_LLMS_TXT;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
