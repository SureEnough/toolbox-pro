import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = "G-XXXXXXXXXX"; // Replace with your GA4 Measurement ID

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!document.getElementById("ga-script")) {
      const script = document.createElement("script");
      script.id = "ga-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: any[]) {
        window.dataLayer.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_ID);
    }

    if (window.gtag) {
      window.gtag("config", GA_ID, { page_path: location.pathname });
    }
  }, [location.pathname]);
}
