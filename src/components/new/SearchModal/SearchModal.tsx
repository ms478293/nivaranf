"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const SITE_PAGES = [
  { title: "Donate", url: "/donate", description: "Support our mission" },
  { title: "Volunteer", url: "/volunteer", description: "Join our team" },
  {
    title: "Programs",
    url: "/programs",
    description: "Our health & education programs",
  },
  {
    title: "Projects",
    url: "/projects",
    description: "Current and completed projects",
  },
  { title: "About Us", url: "/about", description: "Our story and mission" },
  {
    title: "Leadership",
    url: "/leadership",
    description: "Board, governance, and management team",
  },
  {
    title: "Advisory Board",
    url: "/advisory-board",
    description: "External expertise, review priorities, and governance context",
  },
  {
    title: "Care Model & Quality Standards",
    url: "/care-model",
    description: "How outreach care, quality control, and referral logic are described",
  },
  { title: "News & Stories", url: "/news", description: "Latest updates" },
  { title: "Blogs", url: "/blogs", description: "Articles and insights" },
  { title: "Contact Us", url: "/contact-us", description: "Get in touch" },
  { title: "Career", url: "/career", description: "Job opportunities" },
  {
    title: "FAQ",
    url: "/frequently-asked-questions",
    description: "Common questions",
  },
  {
    title: "Financial Reports",
    url: "/financial-reports",
    description: "Transparency reports",
  },
  {
    title: "Sanjeevani",
    url: "/sanjeevani",
    description: "Mobile health camp program",
  },
  {
    title: "Mobile Health Camps Nepal",
    url: "/mobile-health-camps-nepal",
    description: "How rural medical outreach works",
  },
  {
    title: "Rural Healthcare Nepal",
    url: "/rural-healthcare-nepal",
    description: "Access barriers and field delivery",
  },
  {
    title: "Maternal Health Nepal",
    url: "/maternal-health-nepal",
    description: "Screening, outreach, and referral",
  },
  {
    title: "Health NGO Nepal",
    url: "/health-ngo-nepal",
    description: "What credible rural health delivery requires",
  },
  {
    title: "Free Health Camp Nepal",
    url: "/free-health-camp-nepal",
    description: "How a real free health camp works",
  },
  {
    title: "Nivaran Fact Sheet",
    url: "/impact-fact-sheet",
    description: "Citation-ready organization profile",
  },
  {
    title: "Coverage in Nepal",
    url: "/healthcare-coverage-nepal",
    description: "Province-by-province Sanjeevani footprint",
  },
  { title: "Vidya", url: "/vidya", description: "Education program" },
  { title: "Terra", url: "/terra", description: "Environment program" },
  { title: "Nurture", url: "/nurture", description: "Women health program" },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(SITE_PAGES);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  // Handle search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults(SITE_PAGES);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = SITE_PAGES.filter((page) => {
      const titleMatch = page.title.toLowerCase().includes(query);
      const descriptionMatch = page.description.toLowerCase().includes(query);
      return titleMatch || descriptionMatch;
    });

    setResults(filtered);
  }, [searchQuery]);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle navigation
  const handleNavigate = (url: string) => {
    router.push(url);
    onClose();
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl mx-auto px-4 max-h-[80vh] overflow-hidden">
        {/* Search Container */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="border-b border-gray-200 p-6">
            <div className="relative flex items-center">
              <svg
                className="absolute left-4 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg bg-gray-50 border-0 outline-none focus:ring-0 focus:bg-white transition-colors"
              />
              <button
                onClick={onClose}
                className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="overflow-y-auto max-h-[calc(80vh-180px)]">
            {results.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {results.map((page) => (
                  <li key={page.url}>
                    <button
                      onClick={() => handleNavigate(page.url)}
                      className="w-full px-6 py-4 text-left hover:bg-teal-50 transition-colors duration-150 flex flex-col"
                    >
                      <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        {page.title}
                        <span className="text-xs font-normal text-gray-500 ml-auto">
                          {page.url}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {page.description}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">No pages found matching your search.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Try searching for different keywords
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">
                  ↵
                </kbd>
                to select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">
                  Esc
                </kbd>
                to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
