"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

interface LanguageToggleProps {
  className?: string;
  variant?: "pill" | "minimal";
}

export function LanguageToggle({
  className = "",
  variant = "pill",
}: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage();

  const toggle = () => {
    setLocale(locale === "en" ? "ne" : "en");
  };

  if (variant === "minimal") {
    return (
      <button
        onClick={toggle}
        className={`text-sm font-medium transition-colors hover:text-primary-500 ${className}`}
        aria-label={`Switch to ${locale === "en" ? "Nepali" : "English"}`}
        title={`Switch to ${locale === "en" ? "नेपाली" : "English"}`}
      >
        {locale === "en" ? "ने" : "EN"}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
        border transition-all duration-200 hover:shadow-sm
        ${
          locale === "en"
            ? "bg-white border-gray-200 text-gray-700 hover:border-primary-500 hover:text-primary-500"
            : "bg-primary-50 border-primary-200 text-primary-700 hover:bg-primary-100"
        }
        ${className}
      `}
      aria-label={`Switch to ${locale === "en" ? "Nepali" : "English"}`}
      title={`Switch to ${locale === "en" ? "नेपाली" : "English"}`}
    >
      <span className="leading-none">{locale === "en" ? "🇳🇵" : "🇺🇸"}</span>
      <span className="leading-none">
        {locale === "en" ? "नेपाली" : "English"}
      </span>
    </button>
  );
}
