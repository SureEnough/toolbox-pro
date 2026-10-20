import { useNavigate } from "react-router-dom";
import { Wrench, Users, Target, Heart, Github, Mail } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="关于我们 - ToolBox Pro"
        description="ToolBox Pro 是一个免费在线工具箱，提供 20+ 实用工具，致力于让开发者更高效。"
        keywords="关于,about,ToolBox Pro,在线工具,开发者工具"
      />
      <div className="container mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 text-4xl font-extrabold">关于 ToolBox Pro</h1>

        <div className="mb-12 space-y-4 text-muted-foreground">
          <p className="text-lg text-foreground">
            ToolBox Pro 是一个免费在线工具箱，提供 20+ 实用工具，帮助开发者和普通用户高效完成日常任务。
          </p>
          <p>
            我们相信好的工具应该是：简单、快速、安全、免费。所有工具在浏览器本地运行，
            数据不上传任何服务器，隐私零泄露。
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            { icon: Target, title: "我们的使命", desc: "让每个人都能免费使用高质量的工具" },
            { icon: Users, title: "服务用户", desc: "超过 100,000+ 开发者和用户" },
            { icon: Heart, title: "开源精神", desc: "源代码在 GitHub 开源" },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold">技术栈</h2>
        <div className="mb-12 flex flex-wrap gap-3">
          {["Vite 5", "React 18", "TypeScript 5", "Tailwind CSS 3", "shadcn/ui", "Zustand", "React Router 6", "Cloudflare Pages", "Stripe", "PWA"].map((tech) => (
            <span key={tech} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium">{tech}</span>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold">数据统计</h2>
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { num: "20+", label: "在线工具" },
            { num: "6", label: "博客文章" },
            { num: "100K+", label: "用户使用" },
            { num: "0", label: "数据上传" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-extrabold text-primary">{s.num}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="rounded-xl bg-secondary p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">联系我们</h2>
          <p className="mb-6 text-muted-foreground">有问题或建议？随时联系我们</p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate("/contact")}>
              <Mail className="h-4 w-4" /> 联系页面
            </Button>
            <Button variant="outline" onClick={() => window.open("https://github.com/SureEnough/toolbox-pro", "_blank")}>
              <Github className="h-4 w-4" /> GitHub
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
