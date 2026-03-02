import { Breadcrumbs } from "@/components/new/Breadcrumbs/Breadcrumbs";
import MainTitle from "@/components/new/MainTitle/MainTitle";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Our Projects | Nivaran Foundation - Transforming Lives Through Innovation",
  description:
    "Explore Nivaran Foundation's flagship projects: Project Sanjeevani transforms healthcare across Nepal, and Project Vidya revolutionizes education through technology. See how we're making a difference.",
  alternates: {
    canonical: "https://www.nivaranfoundation.org/projects",
  },
  openGraph: {
    title: "Our Projects | Nivaran Foundation",
    description:
      "Discover how Nivaran Foundation is transforming healthcare and education through Project Sanjeevani and Project Vidya.",
    url: "https://www.nivaranfoundation.org/projects",
    siteName: "Nivaran Foundation",
    type: "website",
    images: [{ url: '/NivaranLogo.svg', width: 1200, height: 630, alt: 'Nivaran Foundation' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Projects | Nivaran Foundation",
    description:
      "Transforming lives through healthcare and education — Project Sanjeevani & Project Vidya.",
    site: "@NivaranOrg",
    creator: "@NivaranOrg",
  },
};

const PROJECTS = [
  {
    slug: "sanjeevani",
    name: "Sanjeevani",
    category: "Healthcare",
    categoryColor: "bg-emerald-100 text-emerald-800",
    tagline:
      "Empowering lives by bridging gaps in healthcare access and education through community-driven solutions.",
    description:
      "Project Sanjeevani is Nivaran Foundation's most ambitious initiative — a phased, multi-year effort to transform healthcare across Nepal. From hygiene education and early disease detection to building a nationwide hospital network, Sanjeevani bridges the gap between advanced medical care and underserved communities.",
    image: "/sanjeevani/sanjeevani-1.png",
    stats: [
      { value: "$18M", label: "Phase-I Budget" },
      { value: "20,000+", label: "Population Treated" },
      { value: "83", label: "Villages Covered" },
      { value: "4", label: "Phased Rollout" },
    ],
    status: "Active",
    statusColor: "bg-green-500",
    startYear: "2025",
    href: "/sanjeevani",
  },
  {
    slug: "vidya",
    name: "Vidya",
    category: "Education",
    categoryColor: "bg-blue-100 text-blue-800",
    tagline:
      "Transforming global education through innovation, technology, and community empowerment.",
    description:
      "Project Vidya bridges global education gaps through technology-driven learning, teacher training, and skill development programs. With AI-powered learning, STEM education, and vocational training, Vidya shapes a future where quality education is accessible to all.",
    image: "/projects/images/projectVidyaHero.jpg",
    stats: [
      { value: "100+", label: "Digital Learning Centers" },
      { value: "1,000", label: "Teacher Training Programs" },
      { value: "5M", label: "Target Enrollment" },
      { value: "3", label: "Phased Rollout" },
    ],
    status: "Upcoming",
    statusColor: "bg-amber-500",
    startYear: "2027",
    href: "/vidya",
  },
];

export default function ProjectsPage() {
  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Our Projects | Nivaran Foundation",
    description:
      "Explore Nivaran Foundation's flagship projects transforming healthcare and education.",
    url: "https://www.nivaranfoundation.org/projects",
    mainEntity: PROJECTS.map((p) => ({
      "@type": "Project",
      name: `Project ${p.name}`,
      description: p.description,
      url: `https://www.nivaranfoundation.org${p.href}`,
    })),
  };

  return (
    <main className="pt-10 font-Poppins">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />

      {/* Hero Section */}
      <section className="w-full px-4">
        <div className="max-w-[1320px] mx-auto flex flex-col items-center gap-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects" },
            ]}
            className="self-start"
          />

          <div className="text-center flex flex-col items-center gap-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gray-800">Our </span>
              <span className="text-primary-500">Projects</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              We believe lasting change comes from the ground up. Our projects
              tackle healthcare and education — empowering communities to build
              brighter, healthier futures.
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="w-full max-w-3xl mt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { value: "2", label: "Active Projects" },
                { value: "83+", label: "Villages Reached" },
                { value: "$18M+", label: "Committed Funds" },
                { value: "5M+", label: "Lives Targeted" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 rounded-xl p-4 text-center"
                >
                  <p className="text-xl sm:text-2xl font-bold text-primary-500">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full px-4 py-16 md:py-20">
        <div className="max-w-[1320px] mx-auto">
          <MainTitle suffix="Flagship" prefix="Initiatives" as="h2" />
          <p className="text-gray-500 text-sm sm:text-base mt-1 mb-10 ml-4">
            Explore the programs driving real-world impact across Nepal and
            beyond.
          </p>

          <div className="flex flex-col gap-16 lg:gap-20">
            {PROJECTS.map((project, index) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                reversed={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 pb-16 md:pb-24">
        <div className="max-w-[1320px] mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-8 sm:p-12 md:p-16 text-center">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Be Part of the Change
              </h2>
              <p className="text-white/85 text-base sm:text-lg max-w-xl leading-relaxed">
                Whether you donate, volunteer, or spread the word — every action
                brings us closer to a world where healthcare and education are
                accessible to all.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-neutral-50 transition-colors shadow-lg"
                >
                  Donate Now
                </Link>
                <Link
                  href="/volunteer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white/15 text-white font-semibold rounded-lg hover:bg-white/25 transition-colors border border-white/30"
                >
                  Volunteer With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Project Showcase Card ─── */

function ProjectShowcase({
  project,
  reversed,
}: {
  project: (typeof PROJECTS)[number];
  reversed: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } gap-8 lg:gap-12 items-center`}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2">
        <Link href={project.href} className="group block">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={project.image}
              alt={`Project ${project.name} — ${project.tagline}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Status badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${project.statusColor} animate-pulse`}
              />
              <span className="text-sm font-medium text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                {project.status}
              </span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-4 left-4 right-4">
              <span
                className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${project.categoryColor}`}
              >
                {project.category}
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col gap-5">
        <div>
          <p className="text-sm text-primary-500 font-medium uppercase tracking-wider mb-1">
            Since {project.startYear}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Project {project.name}
          </h3>
        </div>

        <p className="text-gray-600 leading-relaxed">{project.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 sm:p-4"
            >
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={project.href}
          className="group inline-flex items-center gap-2 text-primary-500 font-semibold hover:text-primary-600 transition-colors w-fit mt-1"
        >
          Learn more about {project.name}
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
