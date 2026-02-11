import Image from "next/image";

export const Introduction = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 px-6 md:px-12 xl:px-40 py-8 border justify-center items-center border-white bg-white">
      <div className="w-full md:w-1/4 px-6">
        <Image
          className="w-full max-w-xs sm:max-w-md md:max-w-full h-auto rounded-lg"
          src="https://i.ibb.co/WDy6Kr9/cover.jpg"
          alt="Cover"
          width={1000}
          height={1000}
        ></Image>
      </div>
      <div className="w-full md:w-3/4 px-6">
        <p className="mb-4 text-left text-black">
          Nivaran Foundation is passionate about unlocking the potential of
          communities worldwide to drive meaningful change through
          collaboration. By working together, we can transform lives and address
          critical challenges such as limited access to healthcare and
          education, inadequate child protection, environmental decline, and low
          community engagement. At the heart of our mission is a vision to
          tackle the root causes of these global issues and build a brighter
          future for all.
        </p>
        <p className="mb-4 text-left text-black">
          Our approach is holistic, focusing on five key areas: healthcare,
          education, child welfare, environmental sustainability, and community
          development. We aim to make a tangible difference by setting up
          community clinics, organizing medical camps, supporting education
          programs, fostering child welfare initiatives, and empowering families
          in need.
        </p>
        <p className="mb-4 text-left text-black">
          Thanks to these efforts, we’ve witnessed remarkable progress across
          communities: improved literacy rates, better maternal and child health
          outcomes, environmental restoration, and greater empowerment for
          marginalized groups. The Nivaran Foundation invites individuals,
          organizations, and supporters from across the globe to join us in our
          mission to create positive, lasting change. Together, we can make a
          global impact!
        </p>
      </div>
    </div>
  );
};
