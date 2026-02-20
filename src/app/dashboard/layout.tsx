import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CONTENT_PORTAL_SESSION_COOKIE } from "@/lib/content/constants";
import { verifyContentPortalSession } from "@/lib/content/portal-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || "";
  const contentPortalSession =
    cookieStore.get(CONTENT_PORTAL_SESSION_COOKIE)?.value || "";
  const hasPortalSession = verifyContentPortalSession(contentPortalSession);

  // Enforce auth on the server so dashboard pages are never public.
  if (!authToken && !hasPortalSession) {
    redirect("/content-login?next=/dashboard/content");
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
