"use client";

const FAQSearch = (props: React.ComponentProps<"input">) => {
  return (
    <input
      type="text"
      placeholder="Search FAQ..."
      className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
};

export default FAQSearch;
