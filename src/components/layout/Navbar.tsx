import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Crown, Wrench, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/themeStore";
import { usePaywallStore } from "@/store/paywallStore";
import { useI18n, t } from "@/store/i18nStore";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/tools/password", key: "tool.password" },
  { to: "/tools/qrcode", key: "tool.qrcode" },
  { to: "/tools/json", key: "tool.json" },
  { to: "/tools/color", key: "tool.color" },
  { to: "/tools/uuid", key: "tool.uuid" },
  { to: "/tools/timestamp", key: "tool.timestamp" },
  { to: "/tools/hash", key: "tool.hash" },
  { to: "/tools/base64", key: "tool.base64" },
  { to: "/tools/jwt", key: "tool.jwt" },
  { to: "/tools/regex", key: "tool.regex" },
  { to: "/tools", key: "nav.all" },
  { to: "/tools/calculator", key: "tool.calculator" },
  { to: "/tools/image", key: "tool.image" },
];

export function Navbar() {
  const { theme, toggle } = useThemeStore();
  const { show } = usePaywallStore();
  const { locale, toggle: toggleLocale } = useI18n();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="gradient-text">ToolBox Pro</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.to
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-primary"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleLocale} title="Switch language">
            <Languages className="h-5 w-5" />
            <span className="ml-1 text-xs font-bold">{locale === "zh" ? "EN" : "中"}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggle}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button size="sm" onClick={show}>
            <Crown className="h-4 w-4" />
            Pro
          </Button>
        </div>
      </div>
    </nav>
  );
}
