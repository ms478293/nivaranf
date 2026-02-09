import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteData } from "@/content/site-data";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BuyButtonComponent from "../BuyButtonComponent";
import { NavBar } from "./NavBar";
import { Sidebar } from "./SidebarComponent";

const Header = () => {
  return (
    <header className="max-w-[1140px] mx-auto bg-white border-b z-10 px-4 ">
      <div className=" flex justify-end items-center right-0 gap-1">
        <label htmlFor="lang" className="text-sm">
          Select Language{" "}
        </label>
        <select
          id="lang"
          className="border-primary-main border bg-white  px-2 py-0.5 text-sm rounded-sm "
        >
          <option>En-US</option>
          {/* <option>Española</option>
          <option>Français</option>
          <option>Nepali</option>
          <option>Hindi</option> */}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src={siteData.logo}
            alt="Logo"
            height={100}
            width={200}
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent>
                <Sidebar></Sidebar>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden lg:block relative">
            <NavBar />
          </div>
          <div className="hidden gap-3 lg:flex">
            <BuyButtonComponent />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
