import type { RouteComponentProps } from "wouter";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticleBySlug, SITE_ORIGIN } from "@/content/articles";
import { usePageSeo } from "@/hooks/usePageSeo";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import type { Crumb } from "@/components/JsonLdBreadcrumb";
import { useEffect, useMemo } from "react";
import NotFound from "@/pages/NotFound";
import { ArrowLeft } from "lucide-react";

type Params = { slug: string };

export default function ArticlePage({ params }: RouteComponentProps<Params>) {
  const article = getArticleBySlug(params.slug);

  usePageSeo(
    article
      ? {
          title: article.title,
          description: article.description,
          path: `/resources/${article.slug}`,
          keywords: article.keywords.join(", "),
        }
      : {
          title: "Article not found",
          description: "The requested guide could not be found.",
          path: `/resources/${params.slug}`,
          noIndex: true,
        }
  );

  useEffect(() => {
    if (!article) return;
    const structured = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.published,
      dateModified: article.modified,
      author: {
        "@type": "Organization",
        name: "ScaleBuds Marketing",
        url: SITE_ORIGIN,
      },
      publisher: {
        "@type": "Organization",
        name: "ScaleBuds Marketing",
        url: SITE_ORIGIN,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}/logo-scalebuds.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/resources/${article.slug}`,
      },
      keywords: article.keywords.join(", "),
    };
    const id = `jsonld-article-${article.slug}`;
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
  }, [article]);

  const articleBreadcrumbs = useMemo((): Crumb[] => {
    if (!article) return [];
    return [
      { name: "Resources", path: "/resources" },
      {
        name:
          article.title.length > 72
            ? `${article.title.slice(0, 69).trimEnd()}…`
            : article.title,
        path: `/resources/${article.slug}`,
      },
    ];
  }, [article]);

  if (!article) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
      <article className="pt-28 pb-16">
        <div className="container max-w-3xl">
          <JsonLdBreadcrumb items={articleBreadcrumbs} />
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#D4622A] hover:underline mb-8 no-underline"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
          >
            <ArrowLeft size={16} /> All resources
          </Link>

          <header className="mb-10">
            <p className="text-sm text-slate-500 mb-2" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Updated {article.modified} · {article.readMinutes} min read
            </p>
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight"
              style={{ fontFamily: "'Sora',sans-serif" }}
            >
              {article.title}
            </h1>
            <p
              className="mt-4 text-lg text-slate-600 leading-relaxed"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              {article.description}
            </p>
          </header>

          <div className="prose prose-slate max-w-none">
            {article.sections.map((sec) => (
              <section key={sec.heading} className="mb-10">
                <h2
                  className="text-xl sm:text-2xl font-bold text-slate-900 mb-4"
                  style={{ fontFamily: "'Sora',sans-serif" }}
                >
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-slate-700 leading-relaxed mb-4 text-base sm:text-[1.05rem]"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <aside
            className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6"
            aria-label="Get help"
          >
            <h3
              className="text-lg font-bold text-slate-900 mb-2"
              style={{ fontFamily: "'Sora',sans-serif" }}
            >
              Want this implemented for your business?
            </h3>
            <p className="text-slate-600 mb-4" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Book a free strategy call. We audit your funnel, ads, and call
              coverage, then map a practical plan.
            </p>
            <Link href="/contact">
              <button className="btn-orange text-sm px-6 py-3 rounded-md font-semibold">
                Book free strategy call
              </button>
            </Link>
          </aside>
        </div>
      </article>
      </main>
      <Footer />
    </div>
  );
}
