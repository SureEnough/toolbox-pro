import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";
import { t } from "@/store/i18nStore";

export function Footer() {
  const footerLinks = {
    [t("footer.tools")]: [
      { to: "/tools/password", label: t("footer.passwordGen") },
      { to: "/tools/qrcode", label: t("footer.qrcodeGen") },
      { to: "/tools/json", label: t("footer.jsonFormat") },
      { to: "/tools/uuid", label: t("footer.uuidGen") },
    ],
    [t("footer.moreTools")]: [
      { to: "/tools/base64", label: t("footer.base64Codec") },
      { to: "/tools/jwt", label: t("footer.jwtDecoder") },
      { to: "/tools/regex", label: t("footer.regexTest") },
      { to: "/tools/hash", label: t("footer.hashCalc") },
    ],
    [t("footer.resources")]: [
      { to: "/blog", label: t("footer.blog") },
      { to: "/recommend", label: t("footer.recommend") },
      { to: "/settings", label: t("footer.settings") },
      { to: "/#pricing", label: t("footer.upgrade") },
      { to: "/", label: t("footer.home") },
      { to: "/contact", label: t("footer.contact") },
      { to: "/about", label: t("footer.about") },
      { to: "/privacy", label: t("footer.privacy") },
      { to: "/terms", label: t("footer.terms") },
    ],
  };

  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
              <Wrench className="h-6 w-6 text-primary" />
              <span className="gradient-text">ToolBox Pro</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("footer.desc")}
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-sm font-bold">{title}</h4>
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block py-1 text-sm text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <div className="mt-4 flex justify-center gap-3">
            <a href="https://www.buymeacoffee.com/toolboxpro" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">{t("footer.sponsor")}</a>
            <span className="text-muted-foreground">·</span>
            <a href="https://github.com/sponsors/SureEnough" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">{t("footer.sponsor2")}</a>
          </div>
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
