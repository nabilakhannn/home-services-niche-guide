import { useLocation } from "wouter";
import { useCallback, useEffect, useLayoutEffect } from "react";

const NAV_EVENTS = ["popstate", "hashchange", "pushState", "replaceState"] as const;

function scrollToHashOrTop() {
  const raw = window.location.hash.slice(1);
  if (raw) {
    const id = decodeURIComponent(raw.replace(/\+/g, " "));
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return true;
      }
      return false;
    };
    if (!tryScroll()) {
      requestAnimationFrame(() => {
        if (!tryScroll()) {
          setTimeout(tryScroll, 50);
        }
      });
    }
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

/**
 * After client-side navigation: scroll to `#fragment` when present (e.g. `/services#ai-phone-assistant`),
 * otherwise reset scroll so a new route does not keep the previous page’s offset.
 * Listens for history updates so same-path hash changes still scroll.
 */
export default function ScrollToTop() {
  const [pathname] = useLocation();

  const scroll = useCallback(() => {
    scrollToHashOrTop();
  }, []);

  useLayoutEffect(() => {
    scroll();
  }, [pathname, scroll]);

  useEffect(() => {
    NAV_EVENTS.forEach((ev) => window.addEventListener(ev, scroll));
    return () => NAV_EVENTS.forEach((ev) => window.removeEventListener(ev, scroll));
  }, [scroll]);

  return null;
}
