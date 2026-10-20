import { Helmet } from "react-helmet-async";

// FAQ Schema for rich snippets in Google search results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ToolBox Pro 有哪些免费工具？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ToolBox Pro 提供 20+ 免费在线工具，包括密码生成器、二维码生成器、JSON 格式化、UUID 生成器、URL 编解码、时间戳转换、哈希计算、Base64 编解码、JWT 解码器、正则表达式测试、进制转换、Markdown 预览、CSS 压缩、文本差异对比、Cron 解析等。",
      },
    },
    {
      "@type": "Question",
      name: "ToolBox Pro 的数据安全吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "所有工具的数据处理都在浏览器本地完成，绝不上传到任何服务器。我们使用 Web Crypto API 确保密码生成和哈希计算的安全性。",
      },
    },
    {
      "@type": "Question",
      name: "免费版有什么限制？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "免费版可使用所有基础工具，每个工具每天限 5 次。升级 Pro 后无限制使用全部工具，月度 $9.9，年度 $79。",
      },
    },
    {
      "@type": "Question",
      name: "如何升级到 Pro 版？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "点击页面上的 Pro 升级按钮，选择月度或年度计划，通过 Stripe 安全支付。支持信用卡、PayPal 等多种支付方式。随时可取消。",
      },
    },
    {
      "@type": "Question",
      name: "ToolBox Pro 支持手机使用吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ToolBox Pro 完全响应式设计，支持手机、平板、电脑。还支持 PWA 安装到手机桌面，像原生 App 一样使用。",
      },
    },
  ],
};

// WebApp Schema
const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolBox Pro",
  description: "20+ 免费在线工具箱：密码生成、二维码、JSON格式化、UUID、哈希计算等",
  url: "https://toolbox-pro-4lq.pages.dev",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1200",
  },
};

export function StructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
    </Helmet>
  );
}
