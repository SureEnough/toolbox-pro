import { useNavigate } from "react-router-dom";
import { AdSlot } from "@/components/layout/AdSlot";
import { Calendar, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/ShareButtons";

const posts = [
  {
    slug: "best-online-developer-tools-2026",
    title: "2026 年最佳在线开发者工具合集",
    excerpt: "盘点 2026 年最实用的在线开发者工具，包括密码生成器、JSON 格式化、UUID 生成、正则表达式测试等。所有工具浏览器直接使用，无需安装。",
    date: "2026-10-20",
    readTime: "5 分钟",
    tags: ["开发者工具", "在线工具", "效率"],
  },
  {
    slug: "how-to-generate-secure-passwords",
    title: "如何生成安全的密码？密码安全完全指南",
    excerpt: "了解密码安全最佳实践：使用加密随机数生成强密码、避免常见密码模式、启用双因素认证。ToolBox Pro 密码生成器使用 Web Crypto API 确保最高安全性。",
    date: "2026-10-19",
    readTime: "8 分钟",
    tags: ["密码安全", "网络安全", "Crypto API"],
  },
  {
    slug: "json-formatting-best-practices",
    title: "JSON 格式化最佳实践和常见错误",
    excerpt: "JSON 是现代 Web 开发的数据交换标准。本文介绍 JSON 格式化、压缩、验证的最佳实践，以及常见错误和解决方案。",
    date: "2026-10-18",
    readTime: "6 分钟",
    tags: ["JSON", "数据格式", "前端"],
  },
  {
    slug: "uuid-vs-guid-differences",
    title: "UUID vs GUID：有什么区别？如何选择？",
    excerpt: "UUID 和 GUID 是分布式系统中唯一标识符的两种常见方案。本文深入对比 UUID v4/v7 和 GUID 的区别、性能和使用场景。",
    date: "2026-10-17",
    readTime: "7 分钟",
    tags: ["UUID", "GUID", "分布式"],
  },
  {
    slug: "stripe-payment-integration-guide",
    title: "Stripe 支付集成完整指南：从零到上线",
    excerpt: "详细介绍如何使用 Stripe Checkout 实现订阅支付，包括产品创建、Webhook 配置、Cloudflare Pages Functions 部署等完整流程。",
    date: "2026-10-16",
    readTime: "12 分钟",
    tags: ["Stripe", "支付", "Cloudflare"],
  },
  {
      slug: "web-crypto-api-guide",
      title: "Web Crypto API 完全指南：浏览器中的加密",
      excerpt: "深入介绍 Web Crypto API，包括 getRandomValues、digest、encrypt/decrypt 等方法。了解如何在浏览器中安全地进行加密操作，无需任何外部库。",
      date: "2026-10-14",
      readTime: "10 分钟",
      tags: ["Web Crypto", "加密", "安全"],
    },
    {
      slug: "cloudflare-pages-deployment",
      title: "Cloudflare Pages 部署指南：从构建到上线",
      excerpt: "详细介绍如何使用 Cloudflare Pages 部署前端应用，包括 Functions、环境变量、自定义域名、安全 Headers 等配置。",
      date: "2026-10-13",
      readTime: "8 分钟",
      tags: ["Cloudflare", "部署", "DevOps"],
    },
    {
      slug: "regex-cheatsheet",
      title: "正则表达式速查表：常用模式和技巧",
      excerpt: "整理常用的正则表达式模式：邮箱、URL、手机号、IP 地址等。每个模式附带解释和测试用例，方便快速查阅。",
      date: "2026-10-12",
      readTime: "6 分钟",
      tags: ["正则表达式", "Regex", "速查表"],
    },
    {
      slug: "pwa-installation-guide",
      title: "PWA 安装指南：把网站变成手机 App",
      excerpt: "PWA (Progressive Web App) 让用户可以把网站安装到手机桌面，像原生 App 一样使用。本文介绍 PWA 的原理和实现方法。",
      date: "2026-10-11",
      readTime: "7 分钟",
      tags: ["PWA", "移动端", "Web App"],
    },
    {
      slug: "qr-code-generator-tips",
    title: "二维码生成技巧：WiFi、URL、名片二维码",
    excerpt: "二维码已广泛应用于日常生活。本文介绍如何生成 WiFi 二维码、URL 二维码、电子名片二维码，以及自定义颜色和样式的技巧。",
    date: "2026-10-15",
    readTime: "5 分钟",
    tags: ["二维码", "QR Code", "实用技巧"],
  },
];

export function BlogPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="技术博客 - 工具使用指南和开发技巧"
        description="ToolBox Pro 技术博客：开发者工具使用指南、密码安全、JSON 格式化、UUID、Stripe 支付集成等技术文章。"
        keywords="技术博客,开发者工具,使用指南,密码安全,JSON,UUID,Stripe,二维码"
      />
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-2 text-4xl font-extrabold">技术博客</h1>
        <p className="mb-8 text-muted-foreground">工具使用指南、开发技巧和技术分享</p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.slug} className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg" onClick={() => navigate(`/blog/${post.slug}`)}>
              <CardHeader>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between rounded-xl bg-secondary p-6">
          <div>
        <AdSlot className="mt-8" />

            <h3 className="font-bold">觉得有用？分享给朋友！</h3>
            <p className="text-sm text-muted-foreground">支持我们继续开发更多免费工具</p>
          </div>
          <ShareButtons title="ToolBox Pro - 16+ 免费在线工具箱" description="密码生成、二维码、JSON格式化等 16+ 工具" />
        </div>

        <div className="mt-8 text-center">
          <Button size="lg" onClick={() => navigate("/")}>
            <ArrowRight className="h-4 w-4" />
            返回首页使用工具
          </Button>
        </div>
      </div>
    </>
  );
}
