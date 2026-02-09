import { CustomHeading } from "@/components/nivaran/common/CustomHeading";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Nivaran Foundation | Advisory Board",
  description:
    "The Experts Aligned with Nivaran Foundation have used their expertise and advise in core issues relating to health, education, welfare, environment and community.",
};
const advisoryBoardMembers = [
  {
    name: "Prof. Michael Carter",
    role: "Global Health Expert",
    image: "/images/advisory-board/michael-carter.jpg", // Replace with actual image paths
    bio: "Prof. Michael has over 25 years of experience in global health policy and has been instrumental in advising organizations on effective healthcare delivery models.",
    linkedin: "https://www.linkedin.com/in/michael-carter",
  },
  {
    name: "Dr. Priya Kapoor",
    role: "Sustainability Advocate",
    image: "/images/advisory-board/priya-kapoor.jpg",
    bio: "Dr. Kapoor specializes in sustainable development initiatives, focusing on environmental conservation and community-led solutions worldwide.",
    linkedin: "https://www.linkedin.com/in/priya-kapoor",
  },
  {
    name: "Mr. James Wilson",
    role: "Education Strategist",
    image: "/images/advisory-board/james-wilson.jpg",
    bio: "James has advised several NGOs and international organizations on innovative education programs, particularly in underserved regions.",
    linkedin: "https://www.linkedin.com/in/james-wilson",
  },
  {
    name: "Ms. Amara Singh",
    role: "Child Welfare Advocate",
    image: "/images/advisory-board/amara-singh.jpg",
    bio: "Amara has dedicated her career to protecting children's rights and ensuring access to education and healthcare in conflict zones.",
    linkedin: "https://www.linkedin.com/in/amara-singh",
  },
];

export default function AdvisoryBoardPage() {
  return (
    <div className="w-full px-4 bg-white">
      <div className="py-888  min-h-screen max-w-[1140px] mx-auto">
        <header className="text-center mb-12">
          <CustomHeading className="lg:ml-0">Our Advisory Board</CustomHeading>
          <p className="text-gray-600 text-lg text-left">
            Meet the esteemed experts and advisors who provide strategic
            guidance to the Nivaran Foundation, helping us achieve our global
            mission.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advisoryBoardMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center transition hover:shadow-lg"
            >
              <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-primary-main mb-2">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-gray-500 mb-4">
                {member.role}
              </p>
              <p className="text-gray-600 text-center mb-4">{member.bio}</p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-main font-semibold hover:underline"
                >
                  View on LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center">
          <p className="text-gray-600">
            Interested in partnering with us or learning more?{" "}
            <a
              href="/contact"
              className="text-primary-main font-semibold hover:underline"
            >
              Contact Us
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
