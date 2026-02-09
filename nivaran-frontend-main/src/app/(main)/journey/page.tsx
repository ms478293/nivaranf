import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nivaran Foundation | Journey",
  description:
    "Our Journey at Nivaran Started with focus on Healthcare. The disparing reality of health is a matter of life and death and many have suffered, we hope to contribute to lessen the suffering.",
};
export default function OurJourneyPage() {
  return (
    <div className="w-full px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1140px] mx-auto py-12">
        {/* Hero Section */}
        <header className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-main mb-8">
            Our Journey at Nivaran
          </h1>
          <p className="text-gray-700 text-lg lg:text-xl max-w-3xl mx-auto">
            From our humble beginnings to becoming an innovative leader in the
            industry, Nivaran&quot;s journey is shaped by a commitment to
            excellence, integrity, and continuous growth. Here&quot;s how
            we&quot;ve evolved.
          </p>
        </header>

        {/* Timeline Section */}
        <section className="relative mb-16">
          <div className="flex justify-center items-center mb-8">
            <h2 className="text-3xl font-semibold text-primary-main">
              Our Milestones
            </h2>
          </div>
          <div className="">
            <div className="relative">
              <div className="absolute left-1/2 -ml-px bg-secondary-main w-1 h-full"></div>
              <div className="space-y-16">
                {/* Timeline Item 1 */}
                <div className="flex justify-between items-center">
                  <div className="w-1/2 pr-6">
                    <h3 className="text-2xl font-semibold text-primary-main">
                      Foundation of Nivaran
                    </h3>
                    <p className="text-gray-700 text-lg mt-4">
                      Our journey began with a vision to create a company that
                      fosters innovation, integrity, and growth. With these core
                      values in place, we set out to make a meaningful
                      difference in the lives of our clients, partners, and
                      employees.
                    </p>
                  </div>
                  <div className="w-1/2 pl-6">
                    <div className="h-32 w-full bg-primary-main rounded-lg"></div>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex justify-between items-center">
                  <div className="w-1/2 pr-6">
                    <h3 className="text-2xl font-semibold text-primary-main">
                      Expansion and Growth
                    </h3>
                    <p className="text-gray-700 text-lg mt-4">
                      As we expanded, our expertise grew, and we continued to
                      refine our approach to stay ahead of industry trends. Our
                      commitment to excellence was solidified as we tackled more
                      complex challenges and refined our offerings.
                    </p>
                  </div>
                  <div className="w-1/2 pl-6">
                    <div className="h-32 w-full bg-secondary-main rounded-lg"></div>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex justify-between items-center">
                  <div className="w-1/2 pr-6">
                    <h3 className="text-2xl font-semibold text-primary-main">
                      Investing in Talent
                    </h3>
                    <p className="text-gray-700 text-lg mt-4">
                      Hiring and nurturing talent has been one of our
                      cornerstones. By providing resources and support, we
                      enabled our team to grow and thrive personally and
                      professionally, which contributed to our overall success.
                    </p>
                  </div>
                  <div className="w-1/2 pl-6">
                    <div className="h-32 w-full bg-primary-main rounded-lg"></div>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="flex justify-between items-center">
                  <div className="w-1/2 pr-6">
                    <h3 className="text-2xl font-semibold text-primary-main">
                      Leading with Purpose
                    </h3>
                    <p className="text-gray-700 text-lg mt-4">
                      Our reputation for delivering high-quality, innovative
                      solutions continues to grow. We are more committed than
                      ever to our mission of sustainability, innovation, and
                      ethical practices, ensuring that our growth benefits all
                      stakeholders.
                    </p>
                  </div>
                  <div className="w-1/2 pl-6">
                    <div className="h-32 w-full bg-secondary-main rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="text-center py-12 bg-primary-main text-white rounded-lg shadow-lg px-10 md:px-20">
          <h2 className="text-3xl font-bold mb-4">The Road Ahead</h2>
          <p className="text-lg mb-6">
            Our journey is one of constant learning, adapting, and evolving. As
            we look toward the future, we remain dedicated to making a lasting
            impact on the world.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary-main font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            Join Us on Our Journey
          </a>
        </section>
      </div>
    </div>
  );
}
