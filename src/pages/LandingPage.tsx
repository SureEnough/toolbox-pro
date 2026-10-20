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
import { StructuredData } from "@/components/StructuredData";
import { cn } from "@/lib/utils";

const tools = [
  { icon: KeyRound, title: "密码生成器", desc: "生成强随机密码，自定义长度和字符类型", badge: "free" as const, to: "/tools/password" },
  { icon: QrCode, title: "二维码生成器", desc: "文本、URL、WiFi 等生成二维码，自定义颜色", badge: "free" as const, to: "/tools/qrcode" },
  { icon: Braces, title: "JSON 格式化", desc: "格式化、压缩、验证 JSON 数据", badge: "free" as const, to: "/tools/json" },
 { icon: Palette, title: "颜色工具", desc: "HEX/RGB/HSL 互转，调色板，渐变色", badge: "free" as const, to: "/tools/color" },
  { icon: Type, title: "文本工具", desc: "字数统计、大小写转换、Base64 编解码", badge: "free" as const, to: "/tools/text" },
  { icon: CalcIcon, title: "在线计算器", desc: "科学计算、贷款、BMI、单位换算", badge: "free" as const, to: "/tools/calculator" },
  { icon: Fingerprint, title: "UUID 生成器", desc: "生成 UUID v4/v7，支持批量生成", badge: "free" as const, to: "/tools/uuid" },
  { icon: Globe, title: "URL 编解码", desc: "URL 编码解码、URI 组件处理", badge: "free" as const, to: "/tools/url-encoder" },
  { icon: Clock, title: "时间戳转换", desc: "Unix 时间戳与日期时间互转", badge: "free" as const, to: "/tools/timestamp" },
  { icon: Hash, title: "哈希计算", desc: "SHA-1/256/384/512 哈希计算", badge: "free" as const, to: "/tools/hash" },
  { icon: FileCode, title: "Base64 编解码", desc: "Base64 编码解码，支持中文", badge: "free" as const, to: "/tools/base64" },
  { icon: KeyRound, title: "JWT 解码器", desc: "解码 JWT Token，查看 Payload", badge: "free" as const, to: "/tools/jwt" },
  { icon: Type, title: "正则表达式测试", desc: "实时测试正则匹配结果", badge: "free" as const, to: "/tools/regex" },
  { icon: CalcIcon, title: "进制转换", desc: "BIN/OCT/DEC/HEX 互转", badge: "free" as const, to: "/tools/number-base" },
  { icon: FileCode, title: "Markdown 预览", desc: "实时编辑预览 Markdown", badge: "free" as const, to: "/tools/markdown" },
  { icon: Palette, title: "CSS 压缩美化", desc: "CSS minify / beautify", badge: "free" as const, to: "/tools/css-minifier" },
  { icon: Type, title: "文本差异对比", desc: "逐行比较两段文本差异", badge: "free" as const, to: "/tools/diff" },
  { icon: CalcIcon, title: "Cron 解析", desc: "Cron 表达式解析和下次运行", badge: "free" as const, to: "/tools/cron" },
  { icon: ImageIcon, title: "图片工具", desc: "压缩、格式转换、裁剪、水印", badge: "pro" as const, to: "/tools/image" },
  { icon: FileText, title: "PDF 工具", desc: "PDF 合并、拆分、压缩、转图片", badge: "pro" as const, to: "/tools/pdf" },
];

const features = [
  { icon: Zap, title: "极速体验", desc: "纯前端运行，毫秒级响应" },
  { icon: Shield, title: "隐私安全", desc: "数据本地处理，绝不上传" },
  { icon: Smartphone, title: "全平台支持", desc: "手机、平板、电脑完美适配" },
  { icon: Gift, title: "免费开始", desc: "基础工具永久免费" },
];

const testimonials = [
  { text: "JSON 格式化和密码生成器是我每天必用的工具。界面简洁，速度极快！", author: "张伟，前端工程师" },
  { text: "二维码生成器帮我在营销物料上省了大量时间。Pro 版值得付费！", author: "李娜，市场经理" },
  { text: "所有工具都在一个网站搞定，数据不上传，隐私有保障，太棒了！", author: "王强，自由职业者" },
];

const faqs = [
  { q: "免费版有什么限制？", a: "免费版可使用所有基础工具，每个工具每天限 5 次。升级 Pro 后无限制。" },
  { q: "我的数据安全吗？", a: "所有数据处理都在浏览器本地完成，绝不上传到任何服务器。" },
  { q: "Pro 会员如何取消？", a: "随时可取消，当前周期内仍可使用 Pro 功能，到期后降级为免费版。" },
  { q: "支持哪些支付方式？", a: "支持信用卡、PayPal、支付宝、微信支付等多种支付方式。" },
];

const pricingPlans = [
  { name: "免费版", price: "$0", period: "/永久", features: ["20 个基础工具", "每个工具每天 5 次", "基础功能", "社区支持"], featured: false, cta: "当前方案" },
  { name: "Pro 月度", price: "$9.9", period: "/月", features: ["全部 50+ 工具", "无限次使用", "高级功能解锁", "无广告体验", "优先邮件支持"], featured: true, cta: "立即升级" },
  { name: "Pro 年度", price: "$79", period: "/年", features: ["全部 50+ 工具", "无限次使用", "高级功能解锁", "无广告体验", "省 33%（$6.6/月）"], featured: false, cta: "超值之选" },
];

export function LandingPage() {
  const navigate = useNavigate();
  const { show } = usePaywallStore();
  const upgrade = useUserStore((s) => s.upgrade);

  const handleUpgrade = () => {
    upgrade();
    toast("🎉 恭喜！您已升级到 ToolBox Pro！");
  };

  return (
    <div>
      <SEO title="ToolBox Pro - 免费在线工具箱 | 12+ 实用工具" description="ToolBox Pro 提供 20+ 免费在线工具：密码生成、二维码、JSON格式化、颜色工具、UUID、URL编解码、时间戳、哈希计算等。浏览器直接使用。" keywords="在线工具,密码生成器,二维码,JSON格式化,UUID,URL编码,时间戳,哈希计算,免费工具" />

      <StructuredData />
      {/* Hero */}
      <section className="hero-bg py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="mx-auto mb-4 max-w-3xl text-5xl font-black leading-tight">
            12+ <span className="gradient-text">在线实用工具</span>
            <br />一个网站全搞定
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            密码生成、二维码、JSON格式化、UUID、URL编解码、时间戳、哈希计算……
            <br />所有工具浏览器直接使用，无需下载安装
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })}>
              <Rocket className="h-5 w-5" />
              开始使用
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
              查看价格
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <AdSlot className="my-6" />
      </div>

      {/* Tools Grid */}
      <section id="tools" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-2 text-center text-3xl font-extrabold">全部工具</h2>
          <p className="mb-10 text-center text-muted-foreground">点击任意工具立即开始使用，无需注册</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Card
                key={tool.title}
                className="cursor-pointer transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                onClick={() => navigate(tool.to)}
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle>{tool.title}</CardTitle>
                    <Badge variant={tool.badge}>{tool.badge === "free" ? "免费" : "Pro"}</Badge>
                  </div>
                  <CardDescription>{tool.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <AdSlot className="my-6" />
      </div>

      {/* Features */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-2 text-center text-3xl font-extrabold">为什么选择 ToolBox Pro</h2>
          <p className="mb-10 text-center text-muted-foreground">超过 100,000+ 用户正在使用</p>
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
          <h2 className="mb-2 text-center text-3xl font-extrabold">简单透明的价格</h2>
          <p className="mb-10 text-center text-muted-foreground">先免费使用，满意再升级</p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={cn("relative", plan.featured && "border-2 border-primary shadow-lg")}>
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                    最受欢迎
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
                        <Check className="h-4 w-4 text-green-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.featured ? "default" : "outline"}
                    onClick={plan.name === "免费版" ? undefined : handleUpgrade}
                  >
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
          <h2 className="mb-2 text-center text-3xl font-extrabold">用户评价</h2>
          <p className="mb-10 text-center text-muted-foreground">来自真实用户的反馈</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.author}>
                <CardContent className="pt-6">
                  <p className="mb-4 text-sm">"{t.text}"</p>
                  <p className="text-xs text-muted-foreground">— {t.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-8">
        <div className="container mx-auto max-w-2xl px-6">
          <EmailCapture />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center text-3xl font-extrabold">常见问题</h2>
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
          <h2 className="mb-2 text-3xl font-extrabold">推荐工具</h2>
          <p className="mb-10 text-muted-foreground">我们使用并推荐这些优质服务</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { icon: Rocket, name: "Vercel 部署", desc: "免费部署前端项目" },
              { icon: Cloud, name: "华为云 OBS", desc: "低成本对象存储" },
              { icon: NotebookPen, name: "Notion", desc: "团队协作工具" },
            ].map((item) => (
              <Card key={item.name} className="cursor-pointer" onClick={() => toast("Affiliate 链接跳转中...", "info")}>
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
    </div>
  );
}
