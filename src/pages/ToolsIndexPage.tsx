import { useNavigate } from "react-router-dom";
import { KeyRound, QrCode, Braces, Palette, Type, Calculator as CalcIcon, Image as ImageIcon, FileText, Fingerprint, Globe, Clock, Hash, FileCode, KeySquare, Regex, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/layout/AdSlot";

const categories = [
  {
    title: "生成器工具",
    tools: [
      { icon: KeyRound, title: "密码生成器", desc: "加密级随机密码，自定义长度和字符类型", badge: "free" as const, to: "/tools/password" },
      { icon: QrCode, title: "二维码生成器", desc: "文本、URL、WiFi 生成二维码", badge: "free" as const, to: "/tools/qrcode" },
      { icon: Fingerprint, title: "UUID 生成器", desc: "UUID v4/v7 批量生成", badge: "free" as const, to: "/tools/uuid" },
    ],
  },
  {
    title: "格式化 & 编解码",
    tools: [
      { icon: Braces, title: "JSON 格式化", desc: "格式化、压缩、验证 JSON", badge: "free" as const, to: "/tools/json" },
      { icon: FileCode, title: "Base64 编解码", desc: "Base64 编码解码，支持中文", badge: "free" as const, to: "/tools/base64" },
      { icon: Globe, title: "URL 编解码", desc: "URL 编码解码、URI 组件处理", badge: "free" as const, to: "/tools/url-encoder" },
      { icon: KeySquare, title: "JWT 解码器", desc: "解码 JWT Token，查看 Payload", badge: "free" as const, to: "/tools/jwt" },
    ],
  },
  {
    title: "转换工具",
    tools: [
      { icon: Palette, title: "颜色工具", desc: "HEX/RGB/HSL 互转，调色板", badge: "free" as const, to: "/tools/color" },
      { icon: Clock, title: "时间戳转换", desc: "Unix 时间戳 ↔ 日期互转", badge: "free" as const, to: "/tools/timestamp" },
      { icon: Hash, title: "哈希计算", desc: "SHA-1/256/384/512 哈希", badge: "free" as const, to: "/tools/hash" },
      { icon: Regex, title: "正则表达式测试", desc: "实时测试正则匹配", badge: "free" as const, to: "/tools/regex" },
      { icon: CalcIcon, title: "进制转换", desc: "BIN/OCT/DEC/HEX 互转", badge: "free" as const, to: "/tools/number-base" },
    ],
  },
  {
    title: "文本 & 计算",
    tools: [
      { icon: Type, title: "文本工具", desc: "字数统计、大小写转换", badge: "free" as const, to: "/tools/text" },
      { icon: CalcIcon, title: "在线计算器", desc: "科学计算、贷款、BMI", badge: "free" as const, to: "/tools/calculator" },
    ],
  },
  {
    title: "Pro 高级工具",
    tools: [
      { icon: ImageIcon, title: "图片工具", desc: "压缩、格式转换、裁剪、水印", badge: "pro" as const, to: "/tools/image" },
      { icon: FileText, title: "PDF 工具", desc: "PDF 合并、拆分、压缩、转图片", badge: "pro" as const, to: "/tools/pdf" },
    ],
  },
];

export function ToolsIndexPage() {
  const navigate = useNavigate();
  const totalTools = categories.reduce((sum, c) => sum + c.tools.length, 0);

  return (
    <>
      <SEO
        title="全部工具 - 20+ 免费在线工具"
        description="ToolBox Pro 全部 20+ 在线工具：密码生成、二维码、JSON格式化、UUID、Base64、JWT解码、正则测试、哈希计算、时间戳转换等。按分类浏览，点击即用。"
        keywords="在线工具大全,开发者工具,免费工具,在线工具箱"
      />
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-2 text-4xl font-extrabold">全部工具</h1>
        <p className="mb-8 text-muted-foreground">{totalTools} 个工具，点击即用，无需注册</p>

        <AdSlot className="mb-8" />

        {categories.map((cat) => (
          <div key={cat.title} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">{cat.title}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.tools.map((tool) => (
                <Card
                  key={tool.title}
                  className="cursor-pointer transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                  onClick={() => navigate(tool.to)}
                >
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
                      <tool.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{tool.title}</CardTitle>
                      <Badge variant={tool.badge}>{tool.badge === "free" ? "免费" : "Pro"}</Badge>
                    </div>
                    <CardDescription className="text-xs">{tool.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <AdSlot className="mt-8" />
      </div>
    </>
  );
}
