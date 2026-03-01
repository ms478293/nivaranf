import Link from "next/link";

interface RelatedLink {
  title: string;
  href: string;
  description: string;
}

interface RelatedContentProps {
  heading?: string;
  links: RelatedLink[];
  className?: string;
}

export function RelatedContent({
  heading = "Related Pages",
  links,
  className = "",
}: RelatedContentProps) {
  if (!links.length) return null;

  return (
    <section
      className={`py-10 border-t border-gray-200 ${className}`}
      aria-label={heading}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group block p-4 rounded-lg border border-gray-200 hover:border-primary-main/40 hover:shadow-sm transition-all"
          >
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-main transition-colors">
              {link.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
