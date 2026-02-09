"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useAuth from "@/lib/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  // Handle loading or redirecting state
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optionally add a spinner or skeleton loader
  }

  // Render dashboard if authenticated
  if (isAuthenticated) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-6 bg-[#fafafa] mt-20 font-Poppins">
          {/* Sidebar trigger for mobile view */}
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

  return null; // Prevent rendering if not authenticated and redirecting
}
