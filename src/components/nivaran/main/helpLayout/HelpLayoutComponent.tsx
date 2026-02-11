import { HelpFooter } from "./HelpFooter";
import { HelpHeader } from "./HelpHeader";
import { HelpImage } from "./HelpImage";

const HelpLayout = () => {
  return (
    <div className="  text-white">
      {/* Header Section */}
      <div className=" bg-[#1a1a3c] w-full px-4  ">
        <div className="max-w-[1140px] mx-auto ">
          <HelpHeader></HelpHeader>

          {/* Image Section */}
          <HelpImage></HelpImage>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        <HelpFooter></HelpFooter>
      </div>
    </div>
  );
};

export default HelpLayout;
