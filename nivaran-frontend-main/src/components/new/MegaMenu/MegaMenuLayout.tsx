const MegaMenuLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="bg-white bg-no-repeat bg-left font-Poppins px-4 pt-10"
      style={{
        backgroundImage: "url('/navbar-bg.png')",
        backgroundSize: "contain", // Ensures the image maintains aspect ratio and fits within the div
        backgroundPosition: "top left", // Adjusts the position of the image
        backgroundRepeat: "no-repeat", // Prevents repeating the image
        height: "auto", // Adjust height based on content or you can set a fixed height here
      }}
      role="menuitem"
    >
      <div className="max-w-[1320px] mx-auto">
        <main className="pb-6">{children}</main>
        <MegaMenuFooter />
      </div>
    </div>
  );
};

const MegaMenuFooter = () => {
  return (
    <footer>
      <div className="w-full h-[1.5px] gradient-border  "></div>
      <div className="w-full flex justify-between items-center text-xsm text-gray-800 py-6">
        <p>profile@nivaranfoundation.org</p>
        <div className="flex gap-16">
          <p>+1 8577017471, +977 1-5312555</p>
          <p className="flex gap-6 items-center">
            <span>Newroad, Kathmandu</span>
            <span>USA Office: Boston MA, US</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MegaMenuLayout;
