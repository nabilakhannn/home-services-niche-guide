import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import type { Crumb } from "@/components/JsonLdBreadcrumb";
import { articles, SITE_ORIGIN } from "@/content/articles";
import { usePageSeo } from "@/hooks/usePageSeo";
import { useEffect } from "react";
import { ArrowRight, BookOpen } from "lucide-react";

const RESOURCES_BREADCRUMB: Crumb[] = [{ name: "Resources", path: "/resources" }];

export default function Resources() {
  usePageSeo({
    title: "Marketing Guides for Home Service Contractors",
    description:
      "Articles on HVAC and plumbing marketing, Local Service Ads, speed to lead, AI call answering, and Google Business Profile for trades.",
    path: "/resources",
    keywords:
      "home services marketing, HVAC marketing, contractor leads, Local Service Ads, speed to lead, AI phone assistant",
  });

  useEffect(() => {
    const structured = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "ScaleBuds Marketing Resources",
      description:
        "Guides for contractors on lead generation, ads, and call capture.",
      url: `${SITE_ORIGIN}/resources`,
      isPartOf: { "@type": "WebSite", name: "ScaleBuds Marketing", url: SITE_ORIGIN },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: articles.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_ORIGIN}/resources/${a.slug}`,
          name: a.title,
        })),
      },
    };
    const id = "jsonld-resources-page";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structured);
    return () => {
      script?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="pt-28 pb-16" tabIndex={-1}>
        <div className="container max-w-3xl">
          <JsonLdBreadcrumb items={RESOURCES_BREADCRUMB} />
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <BookOpen size={18} className="text-[#D4622A]" />
            <span style={{ fontFamily: "'DM Sans',sans-serif" }}>Resources</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "'Sora',sans-serif" }}
          >
            Marketing guides for home service contractors
          </h1>
          <p
            className="text-lg text-slate-600 leading-relaxed mb-12"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
          >
            Search-focused articles on lead generation, Google and Meta ads, local
            SEO, speed to lead, and AI call coverage. Written so people (and answer
            engines) can scan headings and pull direct answers.
          </p>

          <ul className="flex flex-col gap-4">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/resources/${a.slug}`}
                  className="group block rounded-xl border border-slate-200 bg-slate-50/80 p-6 hover:border-[#D4622A]/40 hover:shadow-md transition-all no-underline"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h2
                      className="text-lg font-bold text-slate-900 group-hover:text-[#D4622A] transition-colors"
                      style={{ fontFamily: "'Sora',sans-serif" }}
                    >
                      {a.title}
                    </h2>
                    <span className="text-xs text-slate-500 shrink-0">
                      {a.readMinutes} min read
                    </span>
                  </div>
                  <p
                    className="text-slate-600 text-sm leading-relaxed mb-3"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    {a.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#D4622A]"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    Read guide <ArrowRight size={14} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
