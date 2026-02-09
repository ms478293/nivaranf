export const HelpHeader = () => {
  return (
    <div className="relative text-center py-16 ">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover h-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl lg:text-6xl font-extrabold font-serif">
          Here’s how you can help!
        </h1>
        <p className="mt-4 text-base lg:text-lg text-gray-300 px-2">
          From advocacy, to donating money, volunteering, and more, there are
          many ways you can help.
        </p>
      </div>
    </div>
  );
};
