"use client";

import DropDownIcon from "@/assets/new/icons/DropDownIcon";
import HamBurgerMenuIcon from "@/assets/new/icons/HamBurgerMenuIcon";
import RenderList from "@/components/nivaran/common/renderList/RenderList";
import { AppButton } from "@/components/ui/app-button";
import { useOutsideEventListener } from "@/hooks/useOutsideEventListeners";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import { useMegaMenuStore } from "@/store/useMegamenuStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { SidebarProvider } from "../../ui/sidebar";
import MegaMenuLayout from "../MegaMenu/MegaMenuLayout";
import { Search } from "lucide-react";
import { LanguageToggle } from "../LanguageToggle/LanguageToggle";

const SearchModal = dynamic(() => import("../SearchModal/SearchModal"), { ssr: false });
const Sidebar = dynamic(() => import("../../nivaran/common/header/SidebarComponent").then(m => ({ default: m.Sidebar })), { ssr: false });

const ProjectsMegaMenu = dynamic(() => import("../MegaMenu/ProjectsMegaMenu"), { ssr: false });
const NewsAndStoriesMegaMenu = dynamic(() => import("../MegaMenu/NewsAndStoriesMegaMenu"), { ssr: false });
const AboutUsMegaMenu = dynamic(() => import("../MegaMenu/AboutUsMegaMenu"), { ssr: false });

const NAVBAR_LIST = [
  {
    id: 1,
    label: "Projects",
    component: <ProjectsMegaMenu />,
  },
  {
    id: 2,
    label: "News & Stories",
    component: <NewsAndStoriesMegaMenu />,
  },
  {
    id: 3,
    label: "About us",
    component: <AboutUsMegaMenu />,
  },
];

const NivaranHeader = () => {
  const [isWhite, setIsWhite] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { openActiveMegaMenu, activeMegaMenu } = useMegaMenuStore();
  const navRef = useOutsideEventListener(() => openActiveMegaMenu(null));

  const screenSize = useScreenSize();

  const path = usePathname();

  useEffect(() => {
    const handleScroll = () =>
      setIsWhite(window.scrollY > 25 || path.startsWith("/"));
    window.addEventListener("scroll", handleScroll);

    if (activeMegaMenu !== null) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [activeMegaMenu, path]);

  // Handle Cmd+K / Ctrl+K keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div
        className={activeMegaMenu !== null ? "no-scroll" : ""}
        ref={navRef as never}
      >
        <header
          className={`h-[64px] ${
            isWhite || activeMegaMenu
              ? "bg-neutral-50  "
              : "bg-black/30 [backdrop-filter:blur(10px)]"
          } ${isWhite && !activeMegaMenu ? "shadow-sm" : ""} ${
            activeMegaMenu ? "border-b border-gray-300" : ""
          }  py-3   w-full flex items-center font-Poppins fixed top-0 z-[50] px-4`}
        >
          <div className="flex w-full items-center justify-between max-w-[1320px] mx-auto">
            <Link
              href={"/"}
              onClick={() => openActiveMegaMenu(null)}
              aria-label="Nivaran Logo- Select to navigate to home page"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/NivaranLogo.svg"
                alt="Nivaran Foundation Logo"
                width={100}
                height={40}
              />
            </Link>
            {screenSize !== "864px" ? (
              <div className="flex min-[864px]:hidden items-center justify-center gap-2 relative z-[200]">
                <LanguageToggle
                  className={`${
                    isWhite || activeMegaMenu
                      ? "text-gray-800"
                      : "text-white border-white/30"
                  }`}
                  variant="pill"
                />
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-2 rounded-lg transition-colors ${
                    isWhite || activeMegaMenu
                      ? "hover:bg-gray-100 text-gray-800"
                      : "hover:bg-white/10 text-white"
                  }`}
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <SidebarProvider>
                  <Sheet>
                    <SheetTrigger aria-label="Open navigation menu">
                      <HamBurgerMenuIcon
                        className={`w-6 h-6 ${
                          isWhite ? "stroke-black " : "stroke-white"
                        }`}
                      />
                    </SheetTrigger>
                    <SheetContent showCrossIcon>
                      <Sidebar></Sidebar>
                    </SheetContent>
                  </Sheet>
                </SidebarProvider>
              </div>
            ) : null}
            {screenSize !== "sm" ? (
              <nav
                className="gap-2 items-center hidden min-[864px]:flex"
                role="navigation"
                aria-label="Main"
              >
                <ul className="px-3 flex items-center gap-4">
                  <RenderList
                    data={NAVBAR_LIST}
                    render={(list) => (
                      <li
                        key={list.id}
                        className={`text-sm flex items-center gap-2 cursor-pointer transition-colors duration-700 text-nowrap ${
                          isWhite || activeMegaMenu
                            ? "text-gray-800 "
                            : "text-neutral-50"
                        }  ${
                          activeMegaMenu === list.id
                            ? "text-primary-500 [&>button>svg]:stroke-primary-500 [&>sbutton>vg]:fill-none"
                            : ""
                        } `}
                      >
                        <button
                          aria-label={`Open ${list.label} menu`}
                          aria-expanded={activeMegaMenu === list.id}
                          aria-haspopup="true"
                          onClick={() => {
                            openActiveMegaMenu(list.id);
                          }}
                          className="flex items-center gap-2"
                        >
                          {list.label}
                          <DropDownIcon
                            className={`w-5 h-5 transition-transform duration-700 ${
                              isWhite || activeMegaMenu
                                ? "stroke-gray-600"
                                : "stroke-white"
                            } fill-none`}
                          />
                        </button>
                      </li>
                    )}
                  />
                </ul>

                <div className="h-[20px] w-[1px] bg-gray-200"></div>
                <div className="flex items-center gap-4 ">
                  {/* Language Toggle */}
                  <LanguageToggle
                    className={`${
                      isWhite || activeMegaMenu
                        ? ""
                        : "border-white/30 text-white bg-white/10"
                    }`}
                    variant="pill"
                  />
                  {/* Search Button */}
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className={`p-2 rounded-lg transition-colors ${
                      isWhite || activeMegaMenu
                        ? "hover:bg-gray-100 text-gray-800"
                        : "hover:bg-white/10 text-white"
                    }`}
                    aria-label="Open search"
                    title="Search (Cmd+K)"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  <Link
                    href="/volunteer"
                    onClick={() => openActiveMegaMenu(null)}
                  >
                    <AppButton
                      variant="primary-outline"
                      className="ml-4 text-sm border border-primary-500 text-primary-500  hover:bg-primary-200 hover:text-primary-500 hover:border-transparent font-normal"
                      size="sm"
                    >
                      Volunteer
                    </AppButton>
                  </Link>
                  <Link href="/donate" onClick={() => openActiveMegaMenu(null)}>
                    <AppButton
                      variant="primary"
                      // className="ml-4 text-base hover:text-primary-500"
                      className="text-sm font-normal hover:border-transparent hover:bg-primary-200 hover:text-primary-500"
                      size="sm"
                    >
                      Donate now
                    </AppButton>
                  </Link>
                </div>
              </nav>
            ) : null}
          </div>
        </header>

        {screenSize !== "sm" ? (
          <RenderList
            data={NAVBAR_LIST}
            render={(list) => (
              <div
                role="menu"
                aria-labelledby={`menu-${list.id}`}
                className={`fixed w-full duration-1000 transition-transform z-[40] top-16 ${
                  activeMegaMenu === list.id
                    ? "translate-y-0 visible"
                    : "-translate-y-[564px] invisible"
                } `}
                key={list.id}
              >
                <MegaMenuLayout>{list.component}</MegaMenuLayout>
              </div>
            )}
          />
        ) : null}
      </div>
      <div
        className={`z-[35] fixed hidden min-[864px]:block transition-opacity duration-1000  w-full h-screen bg-[linear-gradient(to_top,_#000000a0_80%,transparent)] top-0 ${
          activeMegaMenu !== null
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      ></div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default NivaranHeader;
