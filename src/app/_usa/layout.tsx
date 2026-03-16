import { Toaster } from "@/components/ui/sonner";
import FooterUsa from "@/components/usa/common/FooterUsa";
import HeaderUsa from "@/components/usa/common/HeaderUsa";
import { cn } from "@/lib/utils";
import Providers from "@/providers";
import { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Nivaran | United States",
  description: "",
};

const montaga = localFont({
  src: [{ path: "../../fonts/Montaga-400.ttf", weight: "400", style: "normal" }],
  display: "swap",
  preload: true,
});

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
