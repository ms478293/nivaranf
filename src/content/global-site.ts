export const GLOBAL_SITE_NAV = [
  { label: "Campaigns", href: "/campaigns" },
  { label: "Newsroom", href: "/news" },
  { label: "Stories", href: "/stories" },
  { label: "Briefings", href: "/articles" },
  { label: "Contact", href: "/contact" },
] as const;

export const GLOBAL_HOME_METRICS = [
  {
    value: "1",
    label: "Active campaign",
    note: "A dedicated response environment with separate communication and reporting.",
  },
  {
    value: "3",
    label: "Core functions",
    note: "Campaign delivery, newsroom reporting, and partner-facing briefings.",
  },
  {
    value: "24/7",
    label: "Editorial posture",
    note: "Built for fast-moving situations where clarity matters more than volume.",
  },
] as const;

export const GLOBAL_HOME_PILLARS = [
  {
    title: "Campaign infrastructure",
    body:
      "We build campaign environments that can hold designated-use explanations, partner briefings, timelines, and public accountability without falling into generic fundraising language.",
  },
  {
    title: "Reporting that is usable",
    body:
      "The newsroom layer turns health, education, and conflict developments into material that supporters, journalists, and partners can actually work from.",
  },
  {
    title: "Civilian-centered response",
    body:
      "Every campaign frame is designed around families, health access, continuity of care, and practical civilian needs instead of optics.",
  },
] as const;

export const GLOBAL_OPERATING_PRINCIPLES = [
  "Publish scope before scale so supporters know what the work is actually built to do.",
  "Keep campaign reporting specific, current, and disciplined enough for partners and media to rely on.",
  "Separate each campaign from the main site narrative so accountability and decision-making stay clear.",
  "Use the newsroom to explain what changed, why it matters, and what response conditions now exist.",
] as const;

export const GLOBAL_CAMPAIGNS = [
  {
    slug: "israel",
    title: "Israel Humanitarian Response",
    status: "Live",
    eyebrow: "Featured campaign",
    summary:
      "A dedicated campaign environment for civilian-focused humanitarian response, partner briefings, and disciplined public communication related to Israel.",
    highlights: [
      "civilian protection and continuity of care",
      "family support and trauma-aware response framing",
      "partner-facing accountability and briefing structure",
    ],
  },
] as const;

export const ISRAEL_CAMPAIGN_PILLARS = [
  {
    title: "Emergency health continuity",
    body:
      "Support pathways for urgent medical access, essential supplies, and health continuity planning in moments where disruption moves faster than institutions can adapt.",
  },
  {
    title: "Family and child support",
    body:
      "Keep the campaign anchored in civilian realities: family stability, child wellbeing, trauma-aware communication, and practical protection needs.",
  },
  {
    title: "Public accountability",
    body:
      "Any public ask should be paired with designated-use language, reporting standards, and an operating model that supporters can inspect without guesswork.",
  },
] as const;

export const ISRAEL_CAMPAIGN_GUARDRAILS = [
  "Publish the scope before scaling public fundraising.",
  "Name partner types and reporting expectations before campaign expansion.",
  "Keep public communication tightly aligned to civilian-focused humanitarian priorities.",
  "Separate campaign reporting from general brand storytelling.",
] as const;

export const ISRAEL_CAMPAIGN_FAQ = [
  {
    question: "What is this campaign built to do?",
    answer:
      "It provides a dedicated home for humanitarian response planning, partner communication, and public-facing accountability related to Israel, with a focus on civilian needs.",
  },
  {
    question: "How is this different from a standard donation page?",
    answer:
      "It is structured as a campaign system, not a generic donation shell. The goal is clarity around scope, response priorities, and public reporting before scale.",
  },
  {
    question: "What kind of work does the page support?",
    answer:
      "Emergency health continuity, child and family support, trusted communication, and any partner-coordinated activity that can be explained with discipline and accountability.",
  },
  {
    question: "How should partners engage?",
    answer:
      "Start with a campaign briefing. That lets the operating model, partner roles, and reporting requirements get defined before any public expansion.",
  },
] as const;

export const GLOBAL_CONTACT_CARDS = [
  {
    title: "Campaign Briefings",
    body:
      "Request a structured campaign briefing for partnerships, designated funds, operating scope, or launch planning.",
    href: "mailto:support@global.nivaranfoundation.org?subject=Nivaran%20Global%20Campaign%20Briefing",
    cta: "Email support desk",
  },
  {
    title: "Media & Research",
    body:
      "Reach the editorial and strategy team for interviews, reporting context, or cross-border health and education analysis.",
    href: "mailto:support@global.nivaranfoundation.org?subject=Nivaran%20Global%20Media%20Desk",
    cta: "Contact newsroom",
  },
  {
    title: "Partner Operations",
    body:
      "Use this channel for implementation conversations, accountability frameworks, or partner due-diligence discussions.",
    href: "mailto:support@global.nivaranfoundation.org?subject=Nivaran%20Global%20Partner%20Operations",
    cta: "Open partner channel",
  },
] as const;
