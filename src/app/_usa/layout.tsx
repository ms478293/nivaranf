import { Toaster } from "@/components/ui/sonner";
import FooterUsa from "@/components/usa/common/FooterUsa";
import HeaderUsa from "@/components/usa/common/HeaderUsa";
import { cn } from "@/lib/utils";
import Providers from "@/providers";
import { Metadata } from "next";
import { Montaga } from "next/font/google";

export const metadata: Metadata = {
  title: "Nivaran | United States",
  description: "",
};

// Load Google Font
const montaga = Montaga({ subsets: ["latin"], weight: "400" });

export default function UsaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Toaster closeButton richColors theme="light" />
          <HeaderUsa />
          <main
            className={cn(`antialiased`, montaga.className, "flex-1")}
            style={{
              backgroundImage: "url('/usa/flag.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {children}
          </main>
          <FooterUsa />
        </Providers>
      </body>
    </html>
  );
}
