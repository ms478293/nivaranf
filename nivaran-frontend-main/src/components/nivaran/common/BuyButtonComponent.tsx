// "use client";

// import { Button } from "@/components/ui/button";

// export default function BuyButtonComponent() {

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function BuyButtonComponent({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push("https://www.nivaranfoundation.org/donate"); // Navigate to the donation page
  };

  return (
    <Button
      aria-label="Donate Now"
      onClick={handleClick}
      className={cn(
        `px-4 py-3 border-2 border-primary-main bg-primary-main rounded-lg  text-white  hover:border-primary-main text-lg hover:bg-transparent hover:text-black `,
        className
      )}
    >
      Donate now
    </Button>
  );
}
