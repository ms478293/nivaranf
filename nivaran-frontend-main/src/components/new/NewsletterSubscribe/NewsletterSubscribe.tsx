"use client";

import { AppButton } from "@/components/ui/app-button";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { subscribe } from "@/app/actions/subscribe";

type NewsletterVariant = "inline" | "banner" | "compact";

interface NewsletterSubscribeProps {
  variant?: NewsletterVariant;
  className?: string;
}

const NewsletterSubscribe = ({
  variant = "banner",
  className,
}: NewsletterSubscribeProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await subscribe(email);

      if (res.success) {
        setStatus("success");
        setMessage("Thank you for subscribing! We'll keep you updated.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(res.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  if (variant === "compact") {
    return (
      <div className={cn("w-full", className)}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-grow">
            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="Your email"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main transition-colors"
            />
          </div>
          <AppButton
            type="submit"
            variant="primary"
            className="text-sm px-4 py-2 whitespace-nowrap"
            disabled={status === "loading"}
          >
            {status === "loading" ? "..." : "Subscribe"}
          </AppButton>
        </form>
        {status === "success" && (
          <p className="text-green-600 text-xs mt-1.5">{message}</p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-xs mt-1.5">{message}</p>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "w-full bg-gray-50 rounded-xl p-6 md:p-8",
          className
        )}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-900">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Get the latest stories and updates from Nivaran Foundation
              delivered to your inbox.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 flex-shrink-0 md:w-auto w-full"
          >
            <div className="relative flex-grow md:w-64">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="Enter your email"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main transition-colors"
              />
            </div>
            <AppButton
              type="submit"
              variant="primary"
              className="text-sm px-5 py-2.5 whitespace-nowrap"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </AppButton>
          </form>
        </div>
        {(status === "success" || status === "error") && (
          <p
            className={cn(
              "text-xs mt-3",
              status === "success" ? "text-green-600" : "text-red-500"
            )}
          >
            {message}
          </p>
        )}
      </div>
    );
  }

  // Banner variant (default)
  return (
    <section
      className={cn(
        "w-full px-4 font-Poppins",
        className
      )}
    >
      <div className="max-w-[1320px] mx-auto bg-gradient-to-r from-primary-main to-[#3777BC] rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <div className="flex-grow">
            <h2 className="text-white text-xl md:text-2xl font-semibold">
              Never Miss an Update
            </h2>
            <p className="text-white/80 text-sm mt-2 max-w-md">
              Subscribe to our newsletter for the latest news on health camps,
              education programs, and ways you can help.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 flex-shrink-0 sm:items-start"
          >
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="Enter your email address"
                className="w-full sm:w-72 pl-9 pr-3 py-3 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-colors"
              />
            </div>
            <AppButton
              type="submit"
              variant="secondary"
              className="text-sm px-6 py-3 whitespace-nowrap font-medium"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </AppButton>
          </form>
        </div>
        {(status === "success" || status === "error") && (
          <p
            className={cn(
              "text-xs mt-3 relative z-10",
              status === "success" ? "text-green-200" : "text-red-200"
            )}
          >
            {message}
          </p>
        )}

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full" />
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
