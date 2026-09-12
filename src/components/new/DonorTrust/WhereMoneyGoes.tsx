import Link from "next/link";

export default function WhereMoneyGoes() {
  return (
    <section className="w-full px-4 py-12 bg-white font-Poppins">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold text-gray-950">Understand your contribution</h2>
        <div className="my-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-medium text-gray-950">Healthcare in Nepal</h3>
            <p className="mt-3 leading-7 text-gray-600">
              Project Sanjeevani is Nivaran&rsquo;s active healthcare program. You can direct your gift to it on the
              form above; its activity records are on the tracking page.
            </p>
            <Link href="/sanjeevani" className="mt-4 inline-block underline underline-offset-4">
              Explore Sanjeevani
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-950">Financial reporting</h3>
            <p className="mt-3 leading-7 text-gray-600">
              Verified spending percentages and campaign totals are not yet published here. Review reporting status or
              request financial information from the team.
            </p>
            <Link href="/financial-reports" className="mt-4 inline-block underline underline-offset-4">
              View financial reports
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
