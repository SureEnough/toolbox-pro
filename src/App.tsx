import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useThemeStore } from "@/store/themeStore";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Paywall } from "@/components/layout/Paywall";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { ToastContainer } from "@/components/ui/toast";
import { CookieConsent } from "@/components/CookieConsent";
import { LandingPage } from "@/pages/LandingPage";

// Lazy load all secondary pages for code splitting
const SettingsPage = lazy(() => import("@/pages/SettingsPage").then(m => ({ default: m.SettingsPage })));
const BlogPage = lazy(() => import("@/pages/BlogPage").then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage").then(m => ({ default: m.BlogPostPage })));
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess").then(m => ({ default: m.PaymentSuccess })));
const PaymentCancel = lazy(() => import("@/pages/PaymentCancel").then(m => ({ default: m.PaymentCancel })));
const AffiliatePage = lazy(() => import("@/pages/AffiliatePage").then(m => ({ default: m.AffiliatePage })));

const PasswordGenerator = lazy(() => import("@/pages/tools/PasswordGenerator").then(m => ({ default: m.PasswordGenerator })));
const QRCodeGenerator = lazy(() => import("@/pages/tools/QRCodeGenerator").then(m => ({ default: m.QRCodeGenerator })));
const JsonFormatter = lazy(() => import("@/pages/tools/JsonFormatter").then(m => ({ default: m.JsonFormatter })));
const ColorTool = lazy(() => import("@/pages/tools/ColorTool").then(m => ({ default: m.ColorTool })));
const TextTool = lazy(() => import("@/pages/tools/TextTool").then(m => ({ default: m.TextTool })));
const Calculator = lazy(() => import("@/pages/tools/Calculator").then(m => ({ default: m.Calculator })));
const ImageTool = lazy(() => import("@/pages/tools/ImageTool").then(m => ({ default: m.ImageTool })));
const PdfTool = lazy(() => import("@/pages/tools/PdfTool").then(m => ({ default: m.PdfTool })));
const UUIDGenerator = lazy(() => import("@/pages/tools/UUIDGenerator").then(m => ({ default: m.UUIDGenerator })));
const UrlEncoder = lazy(() => import("@/pages/tools/UrlEncoder").then(m => ({ default: m.UrlEncoder })));
const TimestampConverter = lazy(() => import("@/pages/tools/TimestampConverter").then(m => ({ default: m.TimestampConverter })));
const HashTool = lazy(() => import("@/pages/tools/HashTool").then(m => ({ default: m.HashTool })));
const Base64Tool = lazy(() => import("@/pages/tools/Base64Tool").then(m => ({ default: m.Base64Tool })));
const JwtDecoder = lazy(() => import("@/pages/tools/JwtDecoder").then(m => ({ default: m.JwtDecoder })));
const RegexTester = lazy(() => import("@/pages/tools/RegexTester").then(m => ({ default: m.RegexTester })));
const NumberBaseConverter = lazy(() => import("@/pages/tools/NumberBaseConverter").then(m => ({ default: m.NumberBaseConverter })));
const MarkdownPreviewer = lazy(() => import("@/pages/tools/MarkdownPreviewer").then(m => ({ default: m.MarkdownPreviewer })));
const CssMinifier = lazy(() => import("@/pages/tools/CssMinifier").then(m => ({ default: m.CssMinifier })));
const DiffChecker = lazy(() => import("@/pages/tools/DiffChecker").then(m => ({ default: m.DiffChecker })));
const CronParser = lazy(() => import("@/pages/tools/CronParser").then(m => ({ default: m.CronParser })));
const ToolsIndexPage = lazy(() => import("@/pages/ToolsIndexPage").then(m => ({ default: m.ToolsIndexPage })));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy").then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import("@/pages/TermsOfService").then(m => ({ default: m.TermsOfService })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then(m => ({ default: m.ContactPage })));
const AboutPage = lazy(() => import("@/pages/AboutPage").then(m => ({ default: m.AboutPage })));

function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  useAnalytics();
useKeyboardShortcuts();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Paywall />
      <ToastContainer />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/recommend" element={<AffiliatePage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
              <Route path="/tools/password" element={<PasswordGenerator />} />
              <Route path="/tools/qrcode" element={<QRCodeGenerator />} />
              <Route path="/tools/json" element={<JsonFormatter />} />
              <Route path="/tools/color" element={<ColorTool />} />
              <Route path="/tools/text" element={<TextTool />} />
              <Route path="/tools/calculator" element={<Calculator />} />
              <Route path="/tools/image" element={<ImageTool />} />
              <Route path="/tools/pdf" element={<PdfTool />} />
              <Route path="/tools/uuid" element={<UUIDGenerator />} />
              <Route path="/tools/url-encoder" element={<UrlEncoder />} />
              <Route path="/tools/timestamp" element={<TimestampConverter />} />
              <Route path="/tools/hash" element={<HashTool />} />
              <Route path="/tools/base64" element={<Base64Tool />} />
              <Route path="/tools/jwt" element={<JwtDecoder />} />
              <Route path="/tools/regex" element={<RegexTester />} />
              <Route path="/tools/number-base" element={<NumberBaseConverter />} />
              <Route path="/tools/markdown" element={<MarkdownPreviewer />} />
              <Route path="/tools/css-minifier" element={<CssMinifier />} />
              <Route path="/tools/diff" element={<DiffChecker />} />
              <Route path="/tools/cron" element={<CronParser />} />
              <Route path="/tools" element={<ToolsIndexPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
