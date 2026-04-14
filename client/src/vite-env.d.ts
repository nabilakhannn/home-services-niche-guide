/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_SITE_URL?: string;
  /** Pipe-separated lines, e.g. "123 Main St|Branchburg, NJ 08876" */
  readonly VITE_PUBLIC_BUSINESS_ADDRESS?: string;
  readonly VITE_PUBLIC_LEGAL_ENTITY_LINE?: string;
  /** Umami (or compatible) analytics base URL, no trailing slash */
  readonly VITE_ANALYTICS_ENDPOINT?: string;
  readonly VITE_ANALYTICS_WEBSITE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
