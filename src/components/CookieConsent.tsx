import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("toolbox_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("toolbox_cookie_consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("toolbox_cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 p-4 shadow-lg backdrop-blur">
      <div className="container mx-auto flex max-w-4xl items-center gap-4 px-6">
        <Cookie className="h-8 w-8 shrink-0 text-primary" />
        <div className="flex-1 text-sm text-muted-foreground">
          我们使用 Cookie 改善体验和分析流量。继续使用即表示同意我们的{" "}
          <Link to="/privacy" className="text-primary underline">隐私政策</Link>。
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={decline}>拒绝</Button>
          <Button size="sm" onClick={accept}>接受</Button>
        </div>
        <button onClick={decline} className="shrink-0 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
