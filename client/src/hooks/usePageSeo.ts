import { useEffect } from "react";
import { SITE_ORIGIN } from "@/content/articles";

type PageSeoOptions = {
  title: string;
  description: string;
  path: string;
  ogImagePath?: string;
  keywords?: string;
  noIndex?: boolean;
};

/**
 * Updates document title and core meta tags for SPA navigation (SEO + social).
 */
export function usePageSeo({
  title,
  description,
  path,
  ogImagePath = "/logo-scalebuds.png",
  keywords,
  noIndex,
}: PageSeoOptions) {
  useEffect(() => {
    const brand = "ScaleBuds Marketing";
    const fullTitle = title.includes(brand) ? title : `${title} | ${brand}`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: "content", value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    if (keywords) setMeta('meta[name="keywords"]', "content", keywords);

    const canonical = `${SITE_ORIGIN}${path === "/" ? "" : path}`;
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) link.href = canonical;

    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    const ogImg = `${SITE_ORIGIN}${ogImagePath}`;
    let ogImageTag = document.querySelector('meta[property="og:image"]');
    if (!ogImageTag) {
      ogImageTag = document.createElement("meta");
      ogImageTag.setAttribute("property", "og:image");
      document.head.appendChild(ogImageTag);
    }
    ogImageTag.setAttribute("content", ogImg);

    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    let twImg = document.querySelector('meta[name="twitter:image"]');
    if (!twImg) {
      twImg = document.createElement("meta");
      twImg.setAttribute("name", "twitter:image");
      document.head.appendChild(twImg);
    }
    twImg.setAttribute("content", ogImg);

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", noIndex ? "noindex, nofollow" : "index, follow");
  }, [title, description, path, ogImagePath, keywords, noIndex]);
}
