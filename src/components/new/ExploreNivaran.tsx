import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const guides = [
  { title: "How does Nivaran bring healthcare to rural Nepal?", text: "Project Sanjeevani brings consultations, screening and essential care closer to communities through mobile health camps.", href: "/sanjeevani", label: "Explore our health camps" },
  { title: "How can I support Nepal’s flood recovery?", text: "Our flood appeal is raising funds for a planned response before deployment. Read the appeal, its priorities and the dated situation briefing before giving.", href: "/donate/nepal-flood-recovery", label: "Review the flood appeal" },
  { title: "Can I volunteer in Nepal or remotely?", text: "Share your experience in healthcare, logistics, research or communications. Check current opportunities and confirm availability with our team.", href: "/volunteer", label: "Find ways to volunteer" },
  { title: "Where can I review Nivaran’s work?", text: "Explore our leadership, published program figures and financial reporting status. Contact the team if you need further information about a program.", href: "/accountability-and-transparency", label: "Review our accountability" },
];

export default function ExploreNivaran() {
  return (
    <section aria-labelledby="explore-nivaran-title" className="w-full bg-[#faf8f4] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-sm font-medium uppercase tracking-wider text-primary-500">Care, community and a way to help</p>
        <h2 id="explore-nivaran-title" className="mt-3 max-w-2xl scroll-mt-32 text-2xl font-semibold text-gray-900 md:text-3xl">Connect with Nivaran’s work in Nepal.</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <article key={guide.href} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
              <p className="mb-5 mt-3 text-sm leading-7 text-gray-600">{guide.text}</p>
              <Link href={guide.href} className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary-600 underline underline-offset-4">{guide.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-gray-600">
          From our program updates: <Link href="/stories/sanjeevani-bringing-care-closer-to-rural-nepal" className="font-medium text-primary-600 underline underline-offset-4">bringing care closer to rural Nepal</Link>.
          {" "}For maternal and child health, <Link href="/maternal-health-nepal" className="font-medium text-primary-600 underline underline-offset-4">explore our outreach approach</Link>.
        </p>
      </div>
    </section>
  );
}
