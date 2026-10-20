import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, Clock, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AdSlot } from "@/components/layout/AdSlot";
import { useToolMeta } from "@/store/toolMetaStore";
import { useI18n, t } from "@/store/i18nStore";
import { cn } from "@/lib/utils";

export function ToolsIndexPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const { favorites, recent, toggleFavorite, addRecent } = useToolMeta();
  const { locale } = useI18n();
  const isEn = locale === "en";

  const allTools = [
    { title: t("t.password.title"), desc: t("t.password.desc"), badge: "free" as const, to: "/tools/password", cat: "generator", kw: "password 密码 随机" },
    { title: t("t.qrcode.title"), desc: t("t.qrcode.desc"), badge: "free" as const, to: "/tools/qrcode", cat: "generator", kw: "qrcode 二维码 qr" },
    { title: t("t.uuid.title"), desc: t("t.uuid.desc"), badge: "free" as const, to: "/tools/uuid", cat: "generator", kw: "uuid guid" },
    { title: t("t.json.title"), desc: t("t.json.desc"), badge: "free" as const, to: "/tools/json", cat: "codec", kw: "json format" },
    { title: t("t.base64.title"), desc: t("t.base64.desc"), badge: "free" as const, to: "/tools/base64", cat: "codec", kw: "base64 encode decode" },
    { title: t("t.url.title"), desc: t("t.url.desc"), badge: "free" as const, to: "/tools/url-encoder", cat: "codec", kw: "url encode decode" },
    { title: t("t.jwt.title"), desc: t("t.jwt.desc"), badge: "free" as const, to: "/tools/jwt", cat: "codec", kw: "jwt token" },
    { title: t("t.color.title"), desc: t("t.color.desc"), badge: "free" as const, to: "/tools/color", cat: "convert", kw: "color hex rgb hsl" },
    { title: t("t.timestamp.title"), desc: t("t.timestamp.desc"), badge: "free" as const, to: "/tools/timestamp", cat: "convert", kw: "timestamp unix date" },
    { title: t("t.hash.title"), desc: t("t.hash.desc"), badge: "free" as const, to: "/tools/hash", cat: "convert", kw: "hash sha256 sha512" },
    { title: t("t.regex.title"), desc: t("t.regex.desc"), badge: "free" as const, to: "/tools/regex", cat: "convert", kw: "regex regexp" },
    { title: t("t.nbase.title"), desc: t("t.nbase.desc"), badge: "free" as const, to: "/tools/number-base", cat: "convert", kw: "binary hex decimal" },
    { title: t("t.text.title"), desc: t("t.text.desc"), badge: "free" as const, to: "/tools/text", cat: "text", kw: "text 统计 转换" },
    { title: t("t.calc.title"), desc: t("t.calc.desc"), badge: "free" as const, to: "/tools/calculator", cat: "text", kw: "calculator calc" },
    { title: t("t.md.title"), desc: t("t.md.desc"), badge: "free" as const, to: "/tools/markdown", cat: "text", kw: "markdown md" },
    { title: t("t.css.title"), desc: t("t.css.desc"), badge: "free" as const, to: "/tools/css-minifier", cat: "text", kw: "css minify" },
    { title: t("t.diff.title"), desc: t("t.diff.desc"), badge: "free" as const, to: "/tools/diff", cat: "text", kw: "diff compare" },
    { title: t("t.cron.title"), desc: t("t.cron.desc"), badge: "free" as const, to: "/tools/cron", cat: "text", kw: "cron crontab" },
    { title: t("t.image.title"), desc: t("t.image.desc"), badge: "pro" as const, to: "/tools/image", cat: "pro", kw: "image 图片 compress" },
    { title: t("t.pdf.title"), desc: t("t.pdf.desc"), badge: "pro" as const, to: "/tools/pdf", cat: "pro", kw: "pdf merge split" },
  ];

  const categories = [
    { id: "all", label: t("cat.all") },
    { id: "generator", label: t("cat.generator") },
    { id: "codec", label: t("cat.codec") },
    { id: "convert", label: t("cat.convert") },
    { id: "text", label: t("cat.text") },
    { id: "pro", label: t("cat.pro") },
  ];

  const filtered = useMemo(() => {
    return allTools.filter((tool) => {
      const matchCat = activeCat === "all" || tool.cat === activeCat;
      const matchQuery = !query ||
        tool.title.toLowerCase().includes(query.toLowerCase()) ||
        tool.desc.toLowerCase().includes(query.toLowerCase()) ||
        tool.kw.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, activeCat, locale]);

  const go = (to: string) => {
    addRecent(to);
    navigate(to);
  };

  return (
    <>
      <SEO
        title={isEn ? "All Tools - 20+ Free Online Utilities" : "全部工具 - 20+ 免费在线工具"}
        description={isEn ? "Browse 20+ free online tools by category. Search, favorite, and use instantly." : "ToolBox Pro 全部 20+ 在线工具，按分类浏览，搜索查找，收藏常用工具。"}
        keywords={isEn ? "online tools,developer tools,free tools,web utilities" : "在线工具大全,开发者工具,免费工具,在线工具箱"}
      />
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-2 text-4xl font-extrabold">{t("tools.title")}</h1>
        <p className="mb-6 text-muted-foreground">{t("tools.subtitle")}</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("tools.search")} className="pl-10" autoFocus />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCat === cat.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-primary/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Recent tools */}
        {recent.length > 0 && !query && activeCat === "all" && (
          <div className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold"><Clock className="h-5 w-5" />{t("tools.recent")}</h2>
            <div className="flex flex-wrap gap-2">
              {recent.slice(0, 6).map((to) => {
                const tool = allTools.find((tl) => tl.to === to);
                if (!tool) return null;
                return (
                  <button key={to} onClick={() => go(to)} className="rounded-lg bg-secondary px-4 py-2 text-sm hover:bg-primary/10">
                    {tool.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <AdSlot className="mb-8" />

        {/* Tools grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <Card key={tool.to} className="cursor-pointer transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg" onClick={() => go(tool.to)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{tool.title}</CardTitle>
                  <div className="flex items-center gap-1">
                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.to); }} className="rounded p-1 hover:bg-secondary">
                      <Star className={cn("h-4 w-4", favorites.includes(tool.to) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
                    </button>
                    <Badge variant={tool.badge}>{tool.badge === "free" ? t("tools.free") : "Pro"}</Badge>
                  </div>
                </div>
                <CardDescription className="text-xs">{tool.desc}</CardDescription>
                <span className="text-xs text-muted-foreground">{categories.find((c) => c.id === tool.cat)?.label}</span>
              </CardHeader>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">{t("tools.noResults")}</div>
        )}

        {/* Favorites */}
        {favorites.length > 0 && !query && activeCat === "all" && (
          <div className="mt-12">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold"><Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />{t("tools.favorites")}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((to) => {
                const tool = allTools.find((tl) => tl.to === to);
                if (!tool) return null;
                return (
                  <Card key={to} className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg" onClick={() => go(to)}>
                    <CardHeader>
                      <CardTitle className="text-base">{tool.title}</CardTitle>
                      <CardDescription className="text-xs">{tool.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <AdSlot className="mt-8" />
      </div>
    </>
  );
}
