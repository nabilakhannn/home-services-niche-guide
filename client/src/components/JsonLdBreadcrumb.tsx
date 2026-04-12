import { useEffect } from "react";
import { Link } from "wouter";
import { SITE_ORIGIN } from "@/content/articles";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path: string };

type Props = {
  items: readonly Crumb[];
  /** Show visible breadcrumb trail (recommended for local/service sites per SEO templates). */
  showVisual?: boolean;
};

/**
 * BreadcrumbList JSON-LD (Agentic SEO / schema skill: internal hierarchy + rich context).
 */
export default function JsonLdBreadcrumb({ items, showVisual = true }: Props) {
  const full = [{ name: "Home", path: "/" }, ...items];

  useEffect(() => {
    const chain = [{ name: "Home", path: "/" }, ...items];
    const structured = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: chain.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${SITE_ORIGIN}${c.path === "/" ? "" : c.path}`,
      })),
    };
    const id = "jsonld-breadcrumb";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(structured);
    return () => {
      el?.remove();
    };
  }, [items]);

  if (!showVisual) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>
        {full.map((c, i) => (
          <li key={c.path + i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} className="opacity-50 shrink-0" aria-hidden />}
            {i === full.length - 1 ? (
              <span className="text-slate-800 font-medium" aria-current="page">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="hover:text-[#D4622A] no-underline">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
