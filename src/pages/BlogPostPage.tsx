import { useParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/ShareButtons";

const articleContent: Record<string, { title: string; date: string; readTime: string; content: string; description: string }> = {
  "best-online-developer-tools-2026": {
    title: "2026 年最佳在线开发者工具合集",
    date: "2026-10-20",
    readTime: "5 分钟",
    description: "盘点 2026 年最实用的在线开发者工具",
    content: `## 为什么需要在线工具？

作为开发者，我们每天都在处理各种小任务：格式化 JSON、生成密码、解码 JWT、测试正则表达式……这些任务虽然简单，但频繁出现。安装桌面工具太重，命令行工具学习成本高，而在线工具即开即用，完美解决这个痛点。

## ToolBox Pro 16+ 工具推荐

### 1. 密码生成器
使用 Web Crypto API 的 \`crypto.getRandomValues()\` 生成加密级随机密码，支持自定义长度、字符类型。比传统 \`Math.random()\` 更安全。

### 2. JSON 格式化
支持格式化、压缩、验证 JSON 数据，一键转换 CSV。处理嵌套 JSON、大文件也不卡顿。

### 3. UUID 生成器
支持 UUID v4（随机）和 v7（时间戳），批量生成最多 50 个 UUID。

### 4. JWT 解码器
解码 JWT Token 的 Header、Payload、Signature，自动解析过期时间。

### 5. 正则表达式测试
实时匹配高亮，支持所有标志位（g/i/m/s/u/y），即时显示匹配结果。

### 6. 哈希计算
使用 Web Crypto API 计算 SHA-1/256/384/512，数据不离开浏览器。

### 7. 进制转换
BIN/OCT/DEC/HEX 互转，开发者调试必备。

### 8. 时间戳转换
Unix 时间戳与日期互转，显示当前时间多种格式。

## 为什么选择 ToolBox Pro？

- **隐私安全**：所有数据处理在浏览器本地完成，绝不上传
- **免费使用**：16 个工具全部免费，每天 5 次限额
- **极速体验**：纯前端运行，毫秒级响应
- **PWA 支持**：可安装到手机桌面，像原生 App 一样使用`,
  },
  "how-to-generate-secure-passwords": {
    title: "如何生成安全的密码？密码安全完全指南",
    date: "2026-10-19",
    readTime: "8 分钟",
    description: "密码安全最佳实践和强密码生成方法",
    content: `## 密码安全的重要性

2026 年，数据泄露事件频发。弱密码仍然是最大的安全漏洞之一。研究表明，超过 80% 的数据泄露与弱密码有关。

## 什么是强密码？

- 长度至少 16 位
- 包含大小写字母、数字、特殊字符
- 使用加密随机数生成（非 Math.random()
- 每个账户使用不同密码

## Web Crypto API vs Math.random()

\`Math.random()\` 不是加密安全的。正确做法是使用 \`crypto.getRandomValues()\`：

\`\`\`javascript
// ❌ 不安全
const password = Math.random().toString(36).substring(2);

// ✅ 加密安全
const array = new Uint8Array(32);
crypto.getRandomValues(array);
\`\`\`

ToolBox Pro 密码生成器使用 \`crypto.getRandomValues()\`，确保最高安全性。`,
  },
  "json-formatting-best-practices": {
    title: "JSON 格式化最佳实践和常见错误",
    date: "2026-10-18",
    readTime: "6 分钟",
    description: "JSON 格式化、压缩、验证最佳实践",
    content: `## JSON 格式化的重要性

良好的 JSON 格式化让代码更易读、更易调试。

## 常见错误

1. 尾逗号：JSON 不允许尾逗号
2. 单引号：JSON 必须使用双引号
3. 注释：JSON 不支持注释
4. NaN/Infinity：JSON 不支持

## ToolBox Pro JSON 工具

支持格式化、压缩、验证、CSV 转换，一键完成。`,
  },
  "uuid-vs-guid-differences": {
    title: "UUID vs GUID：有什么区别？如何选择？",
    date: "2026-10-17",
    readTime: "7 分钟",
    description: "UUID v4/v7 和 GUID 的区别和使用场景",
    content: `## UUID vs GUID

UUID 和 GUID 本质相同，都是 128 位唯一标识符。主要区别在实现和规范。

## UUID 版本

- **v4**：随机生成，最常用
- **v7**：时间戳+随机，可排序

## 使用场景

- 数据库主键
- 分布式系统 ID
- API 请求追踪

ToolBox Pro 支持批量生成 UUID v4/v7。`,
  },
  "stripe-payment-integration-guide": {
    title: "Stripe 支付集成完整指南：从零到上线",
    date: "2026-10-16",
    readTime: " 分钟",
    description: "Stripe Checkout + Cloudflare Pages Functions 完整流程",
    content: `## Stripe 支付集成

本文介绍如何使用 Stripe Checkout + Cloudflare Pages Functions 实现订阅支付。

## 步骤

1. 创建 Stripe 账户和产品
2. 配置 Webhook 端点
3. 创建 Cloudflare Pages Functions
4. 前端集成 Checkout
5. 处理支付回调

ToolBox Pro 已完整集成，可参考源码。`,
  },
  "web-crypto-api-guide": {
    title: "Web Crypto API 完全指南",
    date: "2026-10-14",
    readTime: "10 分钟",
    description: "浏览器中的加密 API 详解",
    content: "## Web Crypto API 简介\n\nWeb Crypto API 是浏览器内置的加密接口，无需任何外部库即可实现加密操作。\n\n## 常用方法\n\n- crypto.getRandomValues() - 生成随机数\n- crypto.subtle.digest() - 计算哈希\n- crypto.subtle.encrypt() - 加密\n- crypto.subtle.decrypt() - 解密\n\n## 安全性\n\nWeb Crypto API 使用操作系统级别的加密随机数生成器，比 Math.random() 安全得多。",
  },
  "cloudflare-pages-deployment": {
    title: "Cloudflare Pages 部署指南",
    date: "2026-10-13",
    readTime: "8 分钟",
    description: "从构建到上线的完整流程",
    content: "## Cloudflare Pages\n\nCloudflare Pages 是一个免费的静态网站托管服务，支持全球 CDN。\n\n## 部署步骤\n\n1. 构建项目\n2. 使用 wrangler 部署\n3. 配置环境变量\n4. 设置自定义域名\n\n## Functions\n\nCloudflare Pages Functions 支持服务端 API，无需单独部署后端。",
  },
  "regex-cheatsheet": {
    title: "正则表达式速查表",
    date: "2026-10-12",
    readTime: "6 分钟",
    description: "常用正则表达式模式",
    content: "## 常用正则模式\n\n- 邮箱：/^[^@]+@[^@]+\\.[^@]+$/\n- URL：/^https?:\\/\\/.+$/\n- 手机号：/^1[3-9]\\d{9}$/\n- IP 地址：/^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$/\n\n使用 ToolBox Pro 正则测试工具在线测试。",
  },
  "pwa-installation-guide": {
    title: "PWA 安装指南",
    date: "2026-10-11",
    readTime: "7 分钟",
    description: "把网站变成手机 App",
    content: "## PWA 是什么？\n\nPWA (Progressive Web App) 让网站可以安装到手机桌面，像原生 App 一样使用。\n\n## 实现要点\n\n1. manifest.json - 应用配置\n2. Service Worker - 离线缓存\n3. HTTPS - 安全要求\n\nToolBox Pro 已支持 PWA 安装。",
  },
  "qr-code-generator-tips": {
    title: "二维码生成技巧：WiFi、URL、名片二维码",
    date: "2026-10-15",
    readTime: "5 分钟",
    description: "二维码应用技巧和自定义方法",
    content: `## 二维码实用技巧

### WiFi 二维码
格式：\`WIFI:T:WPA;S:网络名;P:密码;;\`

### URL 二维码
直接编码 URL 即可

### 电子名片
使用 vCard 格式编码

ToolBox Pro 二维码工具支持自定义颜色和大小。`,
  },
};

export function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = slug ? articleContent[slug] : null;

  if (!post) {
    return (
      <div className="container mx-auto max-w-2xl px-6 py-20 text-center">
        <SEO title="文章未找到" description="请求的博客文章不存在" />
        <h1 className="mb-4 text-3xl font-bold">文章未找到</h1>
        <p className="mb-6 text-muted-foreground">您访问的文章不存在或已被移除</p>
        <Button onClick={() => navigate("/blog")}>返回博客列表</Button>
      </div>
    );
  }

  return (
    <>
      <SEO title={post.title} description={post.description} keywords="技术博客,开发者工具" />
      <div className="container mx-auto max-w-2xl px-6 py-12">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/blog")}>
          <ArrowLeft className="h-4 w-4" />返回博客
        </Button>

        <h1 className="mb-3 text-3xl font-extrabold">{post.title}</h1>
        <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} className="mt-6 mb-3 text-2xl font-bold">{line.slice(3)}</h2>;
            if (line.startsWith("### ")) return <h3 key={i} className="mt-4 mb-2 text-xl font-semibold">{line.slice(4)}</h3>;
            if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc">{line.slice(2)}</li>;
            if (line.startsWith("```")) return null;
            if (line.trim() === "") return <br key={i} />;
            return <p key={i} className="mb-3 leading-relaxed">{line}</p>;
          })}
        </div>

        <div className="mt-8 border-t pt-6">
          <ShareButtons title={post.title} description={post.description} />
        </div>

        <div className="mt-8 rounded-xl bg-secondary p-6 text-center">
          <h3 className="mb-2 font-bold">喜欢这篇文章？试试相关工具！</h3>
          <Button className="mt-2" onClick={() => navigate("/")}>
            <ArrowRight className="h-4 w-4" />使用 ToolBox Pro 工具
          </Button>
        </div>
      </div>
    </>
  );
}
