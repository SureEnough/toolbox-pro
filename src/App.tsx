import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useThemeStore } from "@/store/themeStore";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Paywall } from "@/components/layout/Paywall";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ToastContainer } from "@/components/ui/toast";
import { LandingPage } from "@/pages/LandingPage";
import { PaymentSuccess } from "@/pages/PaymentSuccess";
import { PaymentCancel } from "@/pages/PaymentCancel";
import { SettingsPage } from "@/pages/SettingsPage";
import { PasswordGenerator } from "@/pages/tools/PasswordGenerator";
import { QRCodeGenerator } from "@/pages/tools/QRCodeGenerator";
import { JsonFormatter } from "@/pages/tools/JsonFormatter";
import { ColorTool } from "@/pages/tools/ColorTool";
import { TextTool } from "@/pages/tools/TextTool";
import { Calculator } from "@/pages/tools/Calculator";
import { ImageTool } from "@/pages/tools/ImageTool";
import { PdfTool } from "@/pages/tools/PdfTool";
import { UUIDGenerator } from "@/pages/tools/UUIDGenerator";
import { UrlEncoder } from "@/pages/tools/UrlEncoder";
import { TimestampConverter } from "@/pages/tools/TimestampConverter";
import { HashTool } from "@/pages/tools/HashTool";
import { Base64Tool } from "@/pages/tools/Base64Tool";
import { JwtDecoder } from "@/pages/tools/JwtDecoder";
import { RegexTester } from "@/pages/tools/RegexTester";
import { NumberBaseConverter } from "@/pages/tools/NumberBaseConverter";

function Layout({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Paywall />
      <ToastContainer />
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
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/settings" element={<SettingsPage />} />
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
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
