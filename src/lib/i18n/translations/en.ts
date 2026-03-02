const en = {
  // Navigation
  "nav.projects": "Projects",
  "nav.newsStories": "News & Stories",
  "nav.aboutUs": "About us",
  "nav.volunteer": "Volunteer",
  "nav.donateNow": "Donate now",
  "nav.search": "Search",
  "nav.searchPlaceholder": "Search pages, programs, blogs...",

  // Hero
  "hero.title": "Empowering Future",
  "hero.subtitle": "Free Healthcare & Education in Rural Nepal",

  // About
  "about.prefix": "About",
  "about.suffix": "Nivaran",
  "about.description":
    "Nivaran Foundation is a 501(c)(3) non-profit delivering healthcare to Nepal's most underserved communities. With 304 health camps operated and 61,200+ patients targeted through Project Sanjeevani, every dollar you give saves lives.",

  // Stats / Happiness
  "stats.healthCamps": "Health Camps Operated",
  "stats.patients": "Patients Targeted (Phase-I)",
  "stats.volunteers": "Volunteers Worldwide",
  "stats.programs": "Active Programs",

  // Donation
  "donate.title": "Be the Change You Want to See",
  "donate.subtitle":
    "Every dollar you give saves lives. 85% of your donation goes directly to healthcare and education programs in Nepal.",
  "donate.taxInfo": "501(c)(3) Tax-Exempt Organization | EIN: 41-2656587",
  "donate.taxDeductible":
    "Your donation is 100% tax-deductible. You will receive a tax receipt via email.",
  "donate.seeImpact": "See the Impact of Your Giving",
  "donate.whyTrust": "Why Donors Trust Nivaran",

  // Donation Progress
  "donationProgress.title": "2025 Annual Campaign",
  "donationProgress.subtitle":
    "Help us reach our goal and expand life-saving healthcare and education programs",
  "donationProgress.amountRaised": "Amount Raised",
  "donationProgress.ourGoal": "Our Goal",
  "donationProgress.campaignStatus": "Campaign Status",
  "donationProgress.funded": "funded",
  "donationProgress.progress": "Progress",
  "donationProgress.complete": "Complete",
  "donationProgress.generousDonors": "Generous Donors",
  "donationProgress.daysRemaining": "Days Remaining",
  "donationProgress.toGoal": "To Goal",
  "donationProgress.donateNow": "Donate Now",

  // Impact Calculator
  "impact.title": "See Your Impact",
  "impact.subtitle":
    "Every dollar you donate directly helps save lives and transform communities in Nepal. Select any amount to see the real-world impact your generosity creates.",
  "impact.chooseAmount": "Choose Your Donation",
  "impact.amount": "Amount (USD)",
  "impact.quickSelect": "Quick Select",
  "impact.donateThis": "Donate This Amount",
  "impact.taxDeductible": "100% tax-deductible",
  "impact.directToPrograms": "85% goes directly to programs",

  // Projects
  "projects.prefix": "Our",
  "projects.suffix": "Projects",

  // Newsletter
  "newsletter.title": "Stay Updated",
  "newsletter.subtitle":
    "Subscribe to our newsletter for the latest news on health camps, community programs, and ways to help.",
  "newsletter.placeholder": "Enter your email",
  "newsletter.subscribe": "Subscribe",

  // Footer
  "footer.ourWorks": "Our Works",
  "footer.usefulLinks": "Useful Links",
  "footer.nonprofit": "501(c)(3) Nonprofit | EIN: 41-2656587",
  "footer.location": "Boston, MA USA",
  "footer.copyright": "All rights reserved.",

  // Common
  "common.learnMore": "Learn More",
  "common.readMore": "Read More",
  "common.viewAll": "View All",
  "common.loading": "Loading...",
  "common.home": "Home",
  "common.donate": "Donate",

  // Cookie Consent
  "cookie.message":
    "We use cookies to enhance your experience. By continuing, you agree to our use of cookies.",
  "cookie.accept": "Accept",
  "cookie.decline": "Decline",

  // 404
  "notFound.title": "Page Not Found",
  "notFound.message":
    "The page you are looking for could not be found. Return to the Nivaran Foundation homepage.",
  "notFound.goHome": "Go to Homepage",

  // Language
  "lang.toggle": "नेपाली",
  "lang.current": "EN",
} as const;

export type TranslationKey = keyof typeof en;
export default en;
