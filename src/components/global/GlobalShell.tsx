import { getSubdomainPathPrefix } from "@/lib/subdomain-prefix";
import GlobalFooter from "./GlobalFooter";
import GlobalHeader from "./GlobalHeader";

export default async function GlobalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefix = await getSubdomainPathPrefix("global");

  return (
    <div className="min-h-screen bg-neutral-50 font-Poppins text-gray-800">
      <GlobalHeader prefix={prefix} />
      <main id="main-content" className="relative pt-[90px]">
        {children}
      </main>
      <GlobalFooter prefix={prefix} />
    </div>
  );
}
