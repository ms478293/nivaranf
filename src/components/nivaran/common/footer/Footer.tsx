import { FooterBottom } from "./FooterBottom";
import { FooterTop } from "./FooterTop";

const Footer = () => {
  return (
    <footer className=" bg-white max-w-[1140px] mx-auto">
      <div className="w-full pb-6">
        {/* <hr className="my-6 sm:mx-auto lg:my-8 " /> */}
        <FooterTop></FooterTop>
        {/* <FooterMiddle></FooterMiddle> */}
        <FooterBottom></FooterBottom>
      </div>
    </footer>
  );
};

export default Footer;
