import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Resources from "./pages/Resources";
import ArticlePage from "./pages/ArticlePage";
import ScrollToTop from "./components/ScrollToTop";
import SkipLink from "./components/SkipLink";

function Router() {
  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/resources/:slug" component={ArticlePage} />
      <Route path="/resources" component={Resources} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
