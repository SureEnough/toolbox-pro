import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Crown, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/themeStore";
import { usePaywallStore } from "@/store/paywallStore";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/tools/password", label: "密码" },
  { to: "/tools/qrcode", label: "二维码" },
  { to: "/tools/json", label: "JSON" },
  { to: "/tools/color", label: "颜色" },
  { to: "/tools/uuid", label: "UUID" },
  { to: "/tools/timestamp", label: "时间戳" },
  { to: "/tools/hash", label: "哈希" },
  { to: "/tools/calculator", label: "计算器" },
  { to: "/tools/image", label: "图片" },
];

export function Navbar() {
  const { theme, toggle } = useThemeStore();
  const { show } = usePaywallStore();
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
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
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
