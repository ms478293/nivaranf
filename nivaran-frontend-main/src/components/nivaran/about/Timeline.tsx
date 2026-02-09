export const Timeline = () => {
  return (
    <div className="flex  py-6 bg-gray-50 max-w-[1140px] mx-auto">
      <ol className="relative border-s border-secondary-main">
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-secondary-main rounded-full mt-1.5 -start-1.5 border border-secondary-main"></div>
          <time className="mb-1 text-sm font-normal leading-none text-black">
            December 2023
          </time>
          <h4 className="mb-2 text-2xl font-medium tracking-tight text-secondary-main">
            Nivaran Foundation begins operation
          </h4>
          <p className="mb-4 text-base font-normal text-black">
            Budget prepared, team assembled and initiatives launched.
          </p>
        </li>
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-secondary-main rounded-full mt-1.5 -start-1.5 border border-secondary-main"></div>
          <time className="mb-1 text-sm font-normal leading-none text-black">
            February 2025
          </time>
          <h4 className="mb-2 text-2xl font-medium tracking-tight text-secondary-main">
            Mobile Healthclinic run in Zone X
          </h4>
          <p className="text-base font-normal text-black">
            All of the pages and components are first designed in Figma and we
            keep a parity between the two versions even as we update the
            project.
          </p>
          <div className="inline-flex items-center font-medium text-secondary-main hover:text-black">
            Learn More
            <svg
              className="ms-2 h-2.5 w-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </div>
        </li>
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-secondary-main rounded-full mt-1.5 -start-1.5 border border-secondary-main"></div>
          <time className="mb-1 text-sm font-normal leading-none text-black">
            March 2025
          </time>
          <h4 className="mb-2 text-2xl font-medium tracking-tight text-secondary-main">
            Eye surgery for 200 individuals
          </h4>
          <p className="text-base font-normal text-black">
            Get started with dozens of web components and interactive elements
            built on top of Tailwind CSS.
          </p>
          <div className="inline-flex items-center font-medium text-secondary-main hover:text-black">
            Learn More
            <svg
              className="ms-2 h-2.5 w-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </div>
        </li>
      </ol>
    </div>
  );
};
