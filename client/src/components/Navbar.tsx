// ScaleBuds Marketing: Navbar with ColdIQ-style mega menus
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  X,
  ChevronDown,
  Bot,
  Zap,
  Search,
  TrendingUp,
  Facebook,
  Star,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { SERVICE_NAV_ITEMS } from "@/content/serviceSections";
import { articles } from "@/content/articles";

const LOGO_URL = "/logo-scalebuds.png";

const resourcePreviews = articles.slice(0, 4);

const serviceIcons = [Bot, Zap, Search, TrendingUp, Facebook, Star];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [location] = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileResourcesOpen(false);
  }, [location]);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 no-underline shrink-0">
          <img
            src={LOGO_URL}
            alt="ScaleBuds Marketing logo: SB initials with orange character and growth arrow"
            className="h-11 w-auto md:h-12"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))" }}
            width={120}
            height={48}
          />
          <span
            className="hidden sm:inline"
            style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#0F172A" }}
          >
            Scale<span style={{ color: "oklch(0.60 0.18 42)" }}>Buds</span>
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          <Link
            href="/"
            className={`px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
              location === "/" ? "text-[oklch(0.60_0.18_42)] bg-orange-50/80" : "text-slate-700 hover:bg-slate-50"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Home
          </Link>

          <div className="relative group">
            <span className="flex items-center rounded-lg has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-400/40">
              <Link
                href="/services"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                  location.startsWith("/services") ? "text-[oklch(0.60_0.18_42)] bg-orange-50/80" : "text-slate-700 hover:bg-slate-50"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Services
                <ChevronDown size={16} className="opacity-50 hidden sm:inline" aria-hidden />
              </Link>
            </span>
            <div
              className="absolute left-0 top-full pt-2 w-[min(100vw-2rem,520px)] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-[opacity,visibility] duration-150"
              role="menu"
            >
              <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 p-4 grid grid-cols-2 gap-2">
                  {SERVICE_NAV_ITEMS.map((item, i) => {
                    const Icon = serviceIcons[i] ?? Bot;
                    return (
                      <Link
                        key={item.id}
                        href={`/services#${item.id}`}
                        role="menuitem"
                        className="flex gap-3 rounded-xl p-3 no-underline hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-orange-50 text-[oklch(0.60_0.18_42)]">
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0">
                          <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#0F172A" }}>{item.label}</div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#64748B", lineHeight: 1.35 }}>{item.blurb}</div>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="col-span-2 pt-2 border-t border-slate-100 mt-1">
                    <Link
                      href="/services"
                      className="flex items-center justify-center gap-2 text-sm font-semibold text-[oklch(0.60_0.18_42)] no-underline py-2 rounded-lg hover:bg-orange-50/80"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    >
                      View all services <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
          </div>

          <div className="relative group">
            <span className="flex items-center rounded-lg has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-400/40">
              <Link
                href="/resources"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                  location.startsWith("/resources") ? "text-[oklch(0.60_0.18_42)] bg-orange-50/80" : "text-slate-700 hover:bg-slate-50"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Resources
                <ChevronDown size={16} className="opacity-50 hidden sm:inline" aria-hidden />
              </Link>
            </span>
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[min(100vw-2rem,440px)] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-[opacity,visibility] duration-150"
              role="menu"
            >
              <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 p-2">
                {resourcePreviews.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/resources/${a.slug}`}
                    role="menuitem"
                    className="block rounded-xl p-3 no-underline hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <BookOpen size={18} className="text-[oklch(0.60_0.18_42)] shrink-0 mt-0.5" />
                      <div>
                        <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#0F172A", lineHeight: 1.3 }}>{a.title}</div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#64748B", lineHeight: 1.35 }} className="line-clamp-2">{a.description}</div>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  href="/resources"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-[oklch(0.60_0.18_42)] no-underline py-3 rounded-xl hover:bg-orange-50/80 mt-1 border-t border-slate-100"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  All guides <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className={`px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
              location === "/about" ? "text-[oklch(0.60_0.18_42)] bg-orange-50/80" : "text-slate-700 hover:bg-slate-50"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            About
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link href="/contact">
            <button className="btn-orange text-sm">Free Strategy Call</button>
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-md text-slate-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-5 flex flex-col gap-1 shadow-lg max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <Link
            href="/"
            className={`text-base font-medium no-underline py-2 px-2 rounded-lg ${
              location === "/" ? "text-[oklch(0.60_0.18_42)] bg-orange-50" : "text-slate-700"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Home
          </Link>
          <button
            type="button"
            className="flex items-center justify-between text-base font-medium text-slate-700 py-2 px-2 rounded-lg hover:bg-slate-50 w-full text-left"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            aria-expanded={mobileServicesOpen}
          >
            Services
            <ChevronDown size={18} className={mobileServicesOpen ? "rotate-180" : ""} />
          </button>
          {mobileServicesOpen && (
            <div className="pl-2 pb-2 flex flex-col gap-1 border-l-2 border-orange-100 ml-2">
              {SERVICE_NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={`/services#${item.id}`}
                  className="text-sm text-slate-600 py-1.5 no-underline hover:text-[oklch(0.60_0.18_42)]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/services" className="text-sm font-semibold text-[oklch(0.60_0.18_42)] py-2 no-underline">
                View all services →
              </Link>
            </div>
          )}
          <button
            type="button"
            className="flex items-center justify-between text-base font-medium text-slate-700 py-2 px-2 rounded-lg hover:bg-slate-50 w-full text-left"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
            aria-expanded={mobileResourcesOpen}
          >
            Resources
            <ChevronDown size={18} className={mobileResourcesOpen ? "rotate-180" : ""} />
          </button>
          {mobileResourcesOpen && (
            <div className="pl-2 pb-2 flex flex-col gap-1 border-l-2 border-orange-100 ml-2">
              {resourcePreviews.map((a) => (
                <Link key={a.slug} href={`/resources/${a.slug}`} className="text-sm text-slate-600 py-1.5 no-underline hover:text-[oklch(0.60_0.18_42)] line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {a.title}
                </Link>
              ))}
              <Link href="/resources" className="text-sm font-semibold text-[oklch(0.60_0.18_42)] py-2 no-underline">
                All guides →
              </Link>
            </div>
          )}
          <Link
            href="/about"
            className={`text-base font-medium no-underline py-2 px-2 rounded-lg ${
              location === "/about" ? "text-[oklch(0.60_0.18_42)] bg-orange-50" : "text-slate-700"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            About
          </Link>
          <Link href="/contact">
            <button className="btn-orange w-full justify-center mt-2">Free Strategy Call</button>
          </Link>
        </div>
      )}
    </header>
  );
}
