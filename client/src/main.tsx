import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const analyticsSiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
if (analyticsEndpoint && analyticsSiteId) {
  const s = document.createElement("script");
  s.defer = true;
  s.src = `${String(analyticsEndpoint).replace(/\/$/, "")}/umami`;
  s.dataset.websiteId = analyticsSiteId;
  document.body.appendChild(s);
}

createRoot(document.getElementById("root")!).render(<App />);
