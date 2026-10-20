import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, Clock, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AdSlot } from "@/components/layout/AdSlot";
import { useToolMeta } from "@/store/toolMetaStore";
import { cn } from "@/lib/utils";

const allTools = [
  { title: "密码生成器", desc: "加密级随机密码，自定义长度和字符类型", badge: "free" as const, to: "/tools/password", category: "生成器", keywords: "password 密码 随机" },
  { title: "二维码生成器", desc: "文本、URL、WiFi 生成二维码", badge: "free" as const, to: "/tools/qrcode", category: "生成器", keywords: "qrcode 二维码 qr" },
  { title: "UUID 生成器", desc: "UUID v4/v7 批量生成", badge: "free" as const, to: "/tools/uuid", category: "生成器", keywords: "uuid guid 唯一标识" },
  { title: "JSON 格式化", desc: "格式化、压缩、验证 JSON", badge: "free" as const, to: "/tools/json", category: "编解码", keywords: "json 格式化 format" },
  { title: "Base64 编解码", desc: "Base64 编码解码，支持中文", badge: "free" as const, to: "/tools/base64", category: "编解码", keywords: "base64 编码 解码" },
  { title: "URL 编解码", desc: "URL 编码解码、URI 组件处理", badge: "free" as const, to: "/tools/url-encoder", category: "编解码", keywords: "url encode decode 编码" },
  { title: "JWT 解码器", desc: "解码 JWT Token，查看 Payload", badge: "free" as const, to: "/tools/jwt", category: "编解码", keywords: "jwt token 解码" },
  { title: "颜色工具", desc: "HEX/RGB/HSL 互转，调色板", badge: "free" as const, to: "/tools/color", category: "转换", keywords: "color 颜色 hex rgb hsl" },
  { title: "时间戳转换", desc: "Unix 时间戳 ↔ 日期互转", badge: "free" as const, to: "/tools/timestamp", category: "转换", keywords: "timestamp 时间戳 unix date" },
  { title: "哈希计算", desc: "SHA-1/256/384/512 哈希", badge: "free" as const, to: "/tools/hash", category: "转换", keywords: "hash 哈希 sha256 sha512" },
  { title: "正则表达式测试", desc: "实时测试正则匹配", badge: "free" as const, to: "/tools/regex", category: "转换", keywords: "regex 正则 regexp" },
  { title: "进制转换", desc: "BIN/OCT/DEC/HEX 互转", badge: "free" as const, to: "/tools/number-base", category: "转换", keywords: "进制 binary hex decimal" },
  { title: "文本工具", desc: "字数统计、大小写转换", badge: "free" as const, to: "/tools/text", category: "文本", keywords: "text 文本 统计 转换" },
  { title: "在线计算器", desc: "科学计算、贷款、BMI", badge: "free" as const, to: "/tools/calculator", category: "文本", keywords: "calculator 计算器 calc" },
  { title: "Markdown 预览", desc: "实时编辑预览 Markdown", badge: "free" as const, to: "/tools/markdown", category: "文本", keywords: "markdown md 预览" },
  { title: "CSS 压缩/美化", desc: "CSS minify / beautify", badge: "free" as const, to: "/tools/css-minifier", category: "文本", keywords: "css minify 压缩 美化" },
  { title: "文本差异对比", desc: "逐行比较两段文本差异", badge: "free" as const, to: "/tools/diff", category: "文本", keywords: "diff 对比 差异 compare" },
  { title: "Cron 解析", desc: "Cron 表达式解析和下次运行", badge: "free" as const, to: "/tools/cron", category: "文本", keywords: "cron crontab 定时" },
  { title: "图片工具", desc: "压缩、格式转换、裁剪、水印", badge: "pro" as const, to: "/tools/image", category: "Pro", keywords: "image 图片 压缩 convert" },
  { title: "PDF 工具", desc: "PDF 合并、拆分、压缩、转图片", badge: "pro" as const, to: "/tools/pdf", category: "Pro", keywords: "pdf 合并 拆分" },
];

export function ToolsIndexPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("全部");
  const { favorites, recent, toggleFavorite, addRecent } = useToolMeta();

  const categories = ["全部", "生成器", "编解码", "转换", "文本", "Pro"];

  const filtered = useMemo(() => {
    return allTools.filter((t) => {
      const matchCat = activeCat === "全部" || t.category === activeCat;
      const matchQuery = !query ||
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.desc.toLowerCase().includes(query.toLowerCase()) ||
        t.keywords.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, activeCat]);

  const go = (to: string) => {
    addRecent(to);
    navigate(to);
  };

  return (
    <>
      <SEO title="全部工具 - 20+ 免费在线工具" description="ToolBox Pro 全部 20+ 在线工具，按分类浏览，搜索查找，收藏常用工具。" keywords="在线工具大全,开发者工具,免费工具,在线工具箱" />
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-2 text-4xl font-extrabold">全部工具</h1>
        <p className="mb-6 text-muted-foreground">{allTools.length} 个工具，点击即用，无需注册</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索工具... (按 / 快捷搜索)"
            className="pl-10"
            autoFocus
          />
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
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCat === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-primary/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recent tools */}
        {recent.length > 0 && !query && activeCat === "全部" && (
          <div className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold"><Clock className="h-5 w-5" />最近使用</h2>
            <div className="flex flex-wrap gap-2">
              {recent.slice(0, 6).map((to) => {
                const tool = allTools.find((t) => t.to === to);
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
            <Card
              key={tool.to}
              className="cursor-pointer transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              onClick={() => go(tool.to)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{tool.title}</CardTitle>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.to); }}
                      className="rounded p-1 hover:bg-secondary"
                    >
                      <Star className={cn("h-4 w-4", favorites.includes(tool.to) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
                    </button>
                    <Badge variant={tool.badge}>{tool.badge === "free" ? "免费" : "Pro"}</Badge>
                  </div>
                </div>
                <CardDescription className="text-xs">{tool.desc}</CardDescription>
                <span className="text-xs text-muted-foreground">{tool.category}</span>
              </CardHeader>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            没有找到匹配的工具，试试其他关键词？
          </div>
        )}

        {/* Favorites */}
        {favorites.length > 0 && !query && activeCat === "全部" && (
          <div className="mt-12">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold"><Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />我的收藏</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((to) => {
                const tool = allTools.find((t) => t.to === to);
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
