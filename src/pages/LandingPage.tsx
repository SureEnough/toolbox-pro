import { useNavigate } from "react-router-dom";
import {
  KeyRound, QrCode, Braces, Palette, Type, Calculator as CalcIcon,
  Image as ImageIcon, FileText, Zap, Shield, Smartphone, Gift,
  Check, Crown, Rocket, Cloud, NotebookPen, Hash, Globe, Clock, Fingerprint, FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/layout/AdSlot";
import { SEO } from "@/components/SEO";
import { usePaywallStore } from "@/store/paywallStore";
import { useUserStore } from "@/store/userStore";
import { toast } from "@/components/ui/toast";
import { EmailCapture } from "@/components/EmailCapture";
import { SupportButtons } from "@/components/SupportButtons";
import { StructuredData } from "@/components/StructuredData";
import { useI18n, t } from "@/store/i18nStore";
import { cn } from "@/lib/utils";

export function LandingPage() {
  const navigate = useNavigate();
  const { show } = usePaywallStore();
  const upgrade = useUserStore((s) => s.upgrade);
  const { locale } = useI18n();
  const isEn = locale === "en";

  const tools = [
    { icon: KeyRound, title: t("t.password.title"), desc: t("t.password.desc"), badge: "free" as const, to: "/tools/password" },
    { icon: QrCode, title: t("t.qrcode.title"), desc: t("t.qrcode.desc"), badge: "free" as const, to: "/tools/qrcode" },
    { icon: Braces, title: t("t.json.title"), desc: t("t.json.desc"), badge: "free" as const, to: "/tools/json" },
    { icon: Palette, title: t("t.color.title"), desc: t("t.color.desc"), badge: "free" as const, to: "/tools/color" },
    { icon: Type, title: t("t.text.title"), desc: t("t.text.desc"), badge: "free" as const, to: "/tools/text" },
    { icon: CalcIcon, title: t("t.calc.title"), desc: t("t.calc.desc"), badge: "free" as const, to: "/tools/calculator" },
    { icon: Fingerprint, title: t("t.uuid.title"), desc: t("t.uuid.desc"), badge: "free" as const, to: "/tools/uuid" },
    { icon: Globe, title: t("t.url.title"), desc: t("t.url.desc"), badge: "free" as const, to: "/tools/url-encoder" },
    { icon: Clock, title: t("t.timestamp.title"), desc: t("t.timestamp.desc"), badge: "free" as const, to: "/tools/timestamp" },
    { icon: Hash, title: t("t.hash.title"), desc: t("t.hash.desc"), badge: "free" as const, to: "/tools/hash" },
    { icon: FileCode, title: t("t.base64.title"), desc: t("t.base64.desc"), badge: "free" as const, to: "/tools/base64" },
    { icon: KeyRound, title: t("t.jwt.title"), desc: t("t.jwt.desc"), badge: "free" as const, to: "/tools/jwt" },
    { icon: Type, title: t("t.regex.title"), desc: t("t.regex.desc"), badge: "free" as const, to: "/tools/regex" },
    { icon: CalcIcon, title: t("t.nbase.title"), desc: t("t.nbase.desc"), badge: "free" as const, to: "/tools/number-base" },
    { icon: FileCode, title: t("t.md.title"), desc: t("t.md.desc"), badge: "free" as const, to: "/tools/markdown" },
    { icon: Palette, title: t("t.css.title"), desc: t("t.css.desc"), badge: "free" as const, to: "/tools/css-minifier" },
    { icon: Type, title: t("t.diff.title"), desc: t("t.diff.desc"), badge: "free" as const, to: "/tools/diff" },
    { icon: CalcIcon, title: t("t.cron.title"), desc: t("t.cron.desc"), badge: "free" as const, to: "/tools/cron" },
    { icon: ImageIcon, title: t("t.image.title"), desc: t("t.image.desc"), badge: "pro" as const, to: "/tools/image" },
    { icon: FileText, title: t("t.pdf.title"), desc: t("t.pdf.desc"), badge: "pro" as const, to: "/tools/pdf" },
  ];

  const features = [
    { icon: Zap, title: t("feature.fast.title"), desc: t("feature.fast.desc") },
    { icon: Shield, title: t("feature.secure.title"), desc: t("feature.secure.desc") },
    { icon: Smartphone, title: t("feature.cross.title"), desc: t("feature.cross.desc") },
    { icon: Gift, title: t("feature.free.title"), desc: t("feature.free.desc") },
  ];

  const testimonials = [
    { text: t("testimonial.1"), author: t("testimonial.1.author") },
    { text: t("testimonial.2"), author: t("testimonial.2.author") },
    { text: t("testimonial.3"), author: t("testimonial.3.author") },
  ];

  const faqs = [
    { q: t("faq.1.q"), a: t("faq.1.a") },
    { q: t("faq.2.q"), a: t("faq.2.a") },
    { q: t("faq.3.q"), a: t("faq.3.a") },
    { q: t("faq.4.q"), a: t("faq.4.a") },
  ];

  const pricingPlans = isEn
    ? [
        { name: "Free", price: "$0", period: "/forever", features: ["20 basic tools", "5 uses per tool/day", "Basic features", "Community support"], featured: false, cta: "Current Plan" },
        { name: "Monthly Pro", price: "$9.9", period: "/mo", features: ["All 50+ tools", "Unlimited usage", "Advanced features", "No ads", "Priority support"], featured: true, cta: "Upgrade Now" },
        { name: "Yearly Pro", price: "$79", period: "/yr", features: ["All 50+ tools", "Unlimited usage", "Advanced features", "No ads", "Save 33% ($6.6/mo)"], featured: false, cta: "Best Value" },
      ]
    : [
        { name: "免费版", price: "$0", period: "/永久", features: ["20 个基础工具", "每个工具每天 5 次", "基础功能", "社区支持"], featured: false, cta: "当前方案" },
        { name: "Pro 月度", price: "$9.9", period: "/月", features: ["全部 50+ 工具", "无限次使用", "高级功能解锁", "无广告体验", "优先邮件支持"], featured: true, cta: "立即升级" },
        { name: "Pro 年度", price: "$79", period: "/年", features: ["全部 50+ 工具", "无限次使用", "高级功能解锁", "无广告体验", "省 33%（$6.6/月）"], featured: false, cta: "超值之选" },
      ];

  const handleUpgrade = () => {
    upgrade();
    toast(isEn ? "🎉 Upgraded to ToolBox Pro!" : "🎉 恭喜！您已升级到 ToolBox Pro！");
  };

  return (
    <div>
      <SEO
        title={isEn ? "ToolBox Pro - Free Online Tools | 20+ Utilities" : "ToolBox Pro - 免费在线工具箱 | 20+ 实用工具"}
        description={isEn ? "ToolBox Pro offers 20+ free online tools: password generator, QR code, JSON formatter, UUID, URL encoder, timestamp converter, hash calculator and more." : "ToolBox Pro 提供 20+ 免费在线工具：密码生成、二维码、JSON格式化、UUID、URL编解码、时间戳、哈希计算等。"}
        keywords={isEn ? "online tools,password generator,QR code,JSON formatter,UUID,URL encoder,timestamp,hash,free tools" : "在线工具,密码生成器,二维码,JSON格式化,UUID,URL编码,时间戳,哈希计算,免费工具"}
      />
      <StructuredData />
      {/* Hero */}
      <section className="hero-bg py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="mx-auto mb-4 max-w-3xl text-5xl font-black leading-tight">
            {isEn ? <>20+ <span className="gradient-text">Online Tools</span><br />All in One Place</> : <>12+ <span className="gradient-text">在线实用工具</span><br />一个网站全搞定</>}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">{t("hero.subtitle")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })}>
              <Rocket className="h-5 w-5" />{t("hero.cta")}
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
              {isEn ? "View Pricing" : "查看价格"}
            </Button>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-6"><AdSlot className="my-6" /></div>
      {/* Tools Grid */}
      <section id="tools" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-2 text-center text-3xl font-extrabold">{t("tools.title")}</h2>
          <p className="mb-10 text-center text-muted-foreground">{isEn ? "Click any tool to start, no signup required" : "点击任意工具立即开始使用，无需注册"}</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Card key={tool.title} className="cursor-pointer transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg" onClick={() => navigate(tool.to)}>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle>{tool.title}</CardTitle>
                    <Badge variant={tool.badge}>{tool.badge === "free" ? t("tools.free") : "Pro"}</Badge>
                  </div>
                  <CardDescription>{tool.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <div className="container mx-auto px-6"><AdSlot className="my-6" /></div>
      {/* Features */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-2 text-center text-3xl font-extrabold">{t("features.title")}</h2>
          <p className="mb-10 text-center text-muted-foreground">{isEn ? "Trusted by 100,000+ users" : "超过 100,000+ 用户正在使用"}</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                    <f.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-2 text-center text-3xl font-extrabold">{t("pricing.title")}</h2>
          <p className="mb-10 text-center text-muted-foreground">{t("pricing.subtitle")}</p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={cn("relative", plan.featured && "border-2 border-primary shadow-lg")}>
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                    {isEn ? "Most Popular" : "最受欢迎"}
                  </span>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="my-4 text-4xl font-extrabold">
                    {plan.price}<span className="text-base font-normal text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-green-600" />{f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.featured ? "default" : "outline"} onClick={plan.name.startsWith("免") || plan.name === "Free" ? undefined : handleUpgrade}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-2 text-center text-3xl font-extrabold">{t("testimonials.title")}</h2>
          <p className="mb-10 text-center text-muted-foreground">{isEn ? "Real user feedback" : "来自真实用户的反馈"}</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((tm) => (
              <Card key={tm.author}>
                <CardContent className="pt-6">
                  <p className="mb-4 text-sm">"{tm.text}"</p>
                  <p className="text-xs text-muted-foreground">— {tm.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Support */}
      <section className="py-8">
        <div className="container mx-auto max-w-2xl px-6"><SupportButtons variant="banner" /></div>
      </section>
      {/* Email Capture */}
      <section className="py-8">
        <div className="container mx-auto max-w-2xl px-6"><EmailCapture /></div>
      </section>
      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center text-3xl font-extrabold">{t("faq.title")}</h2>
          {faqs.map((faq) => (
            <Card key={faq.q} className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
                <CardDescription>{faq.a}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
      {/* Affiliate */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-2 text-3xl font-extrabold">{isEn ? "Recommended Tools" : "推荐工具"}</h2>
          <p className="mb-10 text-muted-foreground">{isEn ? "Services we use and recommend" : "我们使用并推荐这些优质服务"}</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { icon: Rocket, name: isEn ? "Vercel Deploy" : "Vercel 部署", desc: isEn ? "Free frontend hosting" : "免费部署前端项目" },
              { icon: Cloud, name: isEn ? "Huawei OBS" : "华为云 OBS", desc: isEn ? "Low-cost storage" : "低成本对象存储" },
              { icon: NotebookPen, name: "Notion", desc: isEn ? "Team collaboration" : "团队协作工具" },
            ].map((item) => (
              <Card key={item.name} className="cursor-pointer" onClick={() => toast(isEn ? "Redirecting..." : "跳转中...", "info")}>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Keyboard Shortcuts Hint */}
      <section className="py-8">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="rounded-xl border border-border bg-secondary/30 p-6 text-center">
            <h3 className="mb-3 text-lg font-bold">{t("misc.shortcuts")}</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span><kbd className="rounded bg-secondary px-2 py-0.5 font-mono">/</kbd> {isEn ? "Search" : "搜索工具"}</span>
              <span><kbd className="rounded bg-secondary px-2 py-0.5 font-mono">g h</kbd> {isEn ? "Home" : "首页"}</span>
              <span><kbd className="rounded bg-secondary px-2 py-0.5 font-mono">g t</kbd> {isEn ? "Tools" : "工具"}</span>
              <span><kbd className="rounded bg-secondary px-2 py-0.5 font-mono">g b</kbd> {isEn ? "Blog" : "博客"}</span>
              <span><kbd className="rounded bg-secondary px-2 py-0.5 font-mono">g s</kbd> {isEn ? "Settings" : "设置"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
