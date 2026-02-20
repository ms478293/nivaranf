import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value || "";

  // Enforce auth on the server so dashboard pages are never public.
  if (!authToken) {
    redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6 bg-[#fafafa] mt-20 font-Poppins">
        <SidebarTrigger className="sm:hidden">
          <button className="text-gray-800" aria-label="Toggle Sidebar">
            <span className="font-bold">Toggle Sidebar</span>
          </button>
        </SidebarTrigger>

        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
