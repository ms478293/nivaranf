import BuyButtonComponent from "@/components/nivaran/common/BuyButtonComponent";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteData } from "@/content/site-data";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavBarUsa } from "./NavBarUsa";

const HeaderUsa = () => {
  return (
    <div className=" w-full   bg-white/15 border-b ">
      <div className=" flex  items-center justify-between p-4">
        <div className="flex items-center justify-center gap-4">
          <Link href="/">
            <Image
              src={"/usa/NivaranLogoUSA.svg"}
              className=""
              alt="Logo"
              height={107}
              width={213}
            />
          </Link>

          {/* <span className="flex justify-center items-center text-4xl font-semibold dark:text-[#2c77bb]">
            {siteData.foundationName}
          </span> */}
        </div>
        <div className="hidden lg:block">
          <NavBarUsa />
        </div>
        <div className="lg:hidden ">
          <Sheet>
            <SheetTrigger>
              <MenuIcon></MenuIcon>
            </SheetTrigger>

            <SheetContent>
              <NavBarUsa />
              <Link href="/live">Live Update</Link>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden gap-3 lg:flex lg:flex-row">
          <Link href="/volunteer">
            <Button className="rounded-lg bg-primary-main px-4 py-3 text-lg text-white hover:bg-secondary-main">
              {siteData.buttons.volunteer}
            </Button>
          </Link>
          <BuyButtonComponent></BuyButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default HeaderUsa;
