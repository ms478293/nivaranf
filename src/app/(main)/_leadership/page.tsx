import { permanentRedirect } from "next/navigation";

export default function LegacyLeadershipPage() {
  permanentRedirect("/leadership");
}
