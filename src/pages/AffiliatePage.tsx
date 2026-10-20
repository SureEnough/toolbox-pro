import { useNavigate } from "react-router-dom";
import { ExternalLink, Rocket, Cloud, Server, Code, Palette, Shield, Database, Zap } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmailCapture } from "@/components/EmailCapture";
import { toast } from "@/components/ui/toast";

const affiliates = [
  {
    icon: Cloud,
    name: "Cloudflare",
    desc: "全球 CDN + DNS + 安全防护，免费起步",
    url: "https://cloudflare.com",
    tag: "推荐",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Rocket,
    name: "Vercel",
    desc: "前端部署平台，免费部署 React/Next.js",
    url: "https://vercel.com",
    tag: "免费",
    color: "from-black to-gray-700",
  },
  {
    icon: Server,
    name: "DigitalOcean",
    desc: "简单易用的云服务器，$200 免费额度",
    url: "https://digitalocean.com",
    tag: "$200 免费",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Code,
    name: "GitHub Copilot",
    desc: "AI 编程助手，提升开发效率 10 倍",
    url: "https://github.com/features/copilot",
    tag: "AI",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Database,
    name: "Supabase",
    desc: "开源 Firebase 替代方案，PostgreSQL + 实时",
    url: "https://supabase.com",
    tag: "开源",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Palette,
    name: "Figma",
    desc: "在线 UI 设计工具，团队协作",
    url: "https://figma.com",
    tag: "免费",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Shield,
    name: "1Password",
    desc: "密码管理器，安全存储所有密码",
    url: "https://1password.com",
    tag: "安全",
    color: "from-blue-600 to-cyan-500",
  },
  {
    icon: Zap,
    name: "Stripe",
    desc: "在线支付平台，开发者首选",
    url: "https://stripe.com",
    tag: "支付",
    color: "from-indigo-500 to-purple-500",
  },
];

export function AffiliatePage() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="推荐工具 - 开发者必备服务"
        description="精选开发者必备工具和服务：Cloudflare、Vercel、DigitalOcean、GitHub Copilot、Supabase 等。"
        keywords="推荐工具,开发者服务,Cloudflare,Vercel,DigitalOcean,affiliate"
      />
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-2 text-4xl font-extrabold">推荐工具 & 服务</h1>
        <p className="mb-8 text-muted-foreground">
          我们使用并推荐这些优质服务。部分链接为推广链接，不影响您的使用体验。
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {affiliates.map((item) => (
            <Card
              key={item.name}
              className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
              onClick={() => {
                window.open(item.url, "_blank");
                toast(`正在打开 ${item.name}...`);
              }}
            >
              <CardHeader>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color}`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant="pro">{item.tag}</Badge>
                </div>
                <CardDescription>{item.desc}</CardDescription>
                <div className="flex items-center gap-1 pt-2 text-sm text-primary">
                  <ExternalLink className="h-3 w-3" />
                  访问官网
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <EmailCapture />
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate("/")}>
            返回首页
          </Button>
        </div>
      </div>
    </>
  );
}
