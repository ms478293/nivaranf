import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { navItems } from "@/content/sidebarData";
import { useGetFoundation } from "@/lib/helpers/useFoundation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FoundationComponent from "./dashboard/actions/changeFoundation";
import LogoutButton from "./dashboard/actions/logout";

export function AppSidebar() {
  const foundationName = useGetFoundation();

  const path = usePathname();

  const isActive = (pathName: string) => {
    return path === pathName;
  };

  return (
    <Sidebar collapsible="icon" className="font-Poppins">
      <SidebarHeader className="text-black rounded-3xl p-4 bg-white flex justify-center items-center">
        <Link className="text-xl font-bold" href="/dashboard">
          Dashboard
        </Link>
        <FoundationComponent></FoundationComponent>
      </SidebarHeader>
      <SidebarSeparator></SidebarSeparator>

      <SidebarContent className="text-black bg-white">
        {navItems.map((item) => (
          <SidebarGroup key={item.label}>
            <SidebarMenu className="my-2">
              <SidebarMenuItem>
                <div className=" text-gray-600 font-light uppercase flex gap-2 text-xsm">
                  {/* <item.icon className="" /> */}
                  {item.label}
                </div>
              </SidebarMenuItem>

              {/* Check if item has children and render SidebarMenu */}
              {item.children &&
                item.children.map((childItem) => (
                  <SidebarMenuSubItem key={childItem.label} className="">
                    <Link
                      href={childItem.href ?? ""}
                      className={`flex w-full h-fit  ${
                        isActive(childItem.href)
                          ? "bg-primary-100 text-primary-500 "
                          : ""
                      }`}
                    >
                      <SidebarMenuButton
                        className={`px-4  flex gap-2 text-sm py-2 w-full h-fit `}
                      >
                        <childItem.icon
                          className={`w-12 h-12 size-16  ${
                            isActive(childItem.href) ? "stroke-primary-500" : ""
                          }`}
                        />
                        <span
                          className={`text-gray-600  ${
                            isActive(childItem.href) ? "text-primary-500" : ""
                          } `}
                        >
                          {childItem.label}
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuSubItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarSeparator></SidebarSeparator>
      <SidebarFooter className="text-blackwhite p-4 bg-white flex justify-center items-center">
        <p>{foundationName} Foundation</p>
        <LogoutButton></LogoutButton>
      </SidebarFooter>
    </Sidebar>
  );
}
