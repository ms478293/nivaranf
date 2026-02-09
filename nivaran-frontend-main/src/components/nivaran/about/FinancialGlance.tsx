export const FinancialGlance = () => {
  return (
    <div className="flex mb-4 max-w-[1140px] mx-auto py-6  gap-7">
      <div className="w-3/4">
        <h4 className="mb-2 text-2xl font-medium tracking-tight text-secondary-main">
          Nivaran Foundation At A Glance
        </h4>
        <p className="mb-3 text-black">
          Get the latest facts and figures on Nivaran Foundation as an
          organization. From health clinic servies distribution statistics to
          the number of current healthcare centers, Facts at a Glance is your
          one-stop shop for all things Nivaran. Looking for financial reports?
          You’re in the right place. Follow the link below to see detailed
          financial reports from AHF.
        </p>
        <a
          href="#"
          className="inline-flex items-center font-medium text-secondary-main hover:text-black"
        >
          View PDF
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
        </a>
      </div>
    </div>
  );
};
