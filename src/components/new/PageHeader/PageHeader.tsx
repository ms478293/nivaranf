export const PageHeader = ({
  prefix,
  suffix,
}: {
  prefix: string;
  suffix: string;
}) => {
  return (
    <h1 className="flex flex-col  items-center ">
      <span className="text-gray-800 text-xl md:text-2xl/8 font-medium">
        {prefix}
      </span>
      <span className="text-primary-500 text-3xl md:text-5xl font-medium font-Poppins uppercase">
        {suffix}
      </span>
    </h1>
  );
};
