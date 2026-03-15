import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { detectSiteVariantFromHost } from "@/lib/site-variant";

const MAIN_LLMS_TXT = `# Nivaran Foundation

> Nivaran Foundation is a 501(c)(3) nonprofit organization delivering free mobile health camps, maternal care, and education support to underserved communities across rural Nepal. Founded in 2020, Nivaran has served 17,000+ patients through 16+ health camps across all 7 provinces of Nepal. EIN: 41-2656587.

## About
- [About Nivaran Foundation](https://www.nivaranfoundation.org/about): Mission, vision, founding story, and organizational overview
- [Leadership & Governance](https://www.nivaranfoundation.org/leadership): Board, management, governance, and verification reference
- [Impact Fact Sheet](https://www.nivaranfoundation.org/impact-fact-sheet): Key statistics, reach, and measurable outcomes
- [Accountability & Transparency](https://www.nivaranfoundation.org/accountability-and-transparency): Governance and financial stewardship
- [Financial Reports](https://www.nivaranfoundation.org/financial-reports): Annual reports and Form 990 filings

## Programs
- [Project Sanjeevani](https://www.nivaranfoundation.org/sanjeevani): Flagship mobile health camp program serving rural Nepal
- [Sanjeevani Tracking](https://www.nivaranfoundation.org/sanjeevani/tracking): Real-time health camp data with district-level tracking
- [Project Vidya](https://www.nivaranfoundation.org/vidya): Education support initiative for underserved children
- [Health Programs](https://www.nivaranfoundation.org/programs/health): Comprehensive healthcare program overview
- [Education Programs](https://www.nivaranfoundation.org/programs/education): Education access and scholarship programs

## Healthcare Coverage
- [Healthcare Coverage Nepal](https://www.nivaranfoundation.org/healthcare-coverage-nepal): Province-by-province healthcare delivery map
- [Mobile Health Camps Nepal](https://www.nivaranfoundation.org/mobile-health-camps-nepal): How mobile health camps work in rural areas
- [Rural Healthcare Nepal](https://www.nivaranfoundation.org/rural-healthcare-nepal): Challenges and solutions in rural healthcare delivery
- [Maternal Health Nepal](https://www.nivaranfoundation.org/maternal-health-nepal): Maternal and child health initiatives
- [Free Health Camp Nepal](https://www.nivaranfoundation.org/free-health-camp-nepal): Free screening and treatment camp information

## Get Involved
- [Donate](https://www.nivaranfoundation.org/donate): Tax-deductible donations — 96% goes directly to programs
- [Volunteer](https://www.nivaranfoundation.org/volunteer): Volunteer opportunities in Nepal and the US
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
