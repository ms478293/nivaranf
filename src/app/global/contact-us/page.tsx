import { permanentRedirect } from "next/navigation";

export default function GlobalContactUsRedirectPage() {
  permanentRedirect("/contact");
}
