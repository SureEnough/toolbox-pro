import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";

const footerLinks = {
  工具: [
    { to: "/tools/password", label: "密码生成器" },
    { to: "/tools/qrcode", label: "二维码生成" },
    { to: "/tools/json", label: "JSON 格式化" },
    { to: "/tools/uuid", label: "UUID 生成" },
  ],
  更多工具: [
    { to: "/tools/base64", label: "Base64 编解码" },
    { to: "/tools/jwt", label: "JWT 解码器" },
    { to: "/tools/regex", label: "正则测试" },
    { to: "/tools/hash", label: "哈希计算" },
  ],
  资源: [
    { to: "/blog", label: "技术博客" },
    { to: "/recommend", label: "推荐工具" },
    { to: "/settings", label: "账户设置" },
    { to: "/#pricing", label: "升级 Pro" },
    { to: "/", label: "返回首页" },
    { to: "/contact", label: "联系我们" },
    { to: "/about", label: "关于我们" },
    { to: "/privacy", label: "隐私政策" },
    { to: "/terms", label: "服务条款" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
              <Wrench className="h-6 w-6 text-primary" />
              <span className="gradient-text">ToolBox Pro</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              16+ 免费在线工具，浏览器直接使用。隐私安全，数据不上传。
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-sm font-bold">{title}</h4>
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block py-1 text-sm text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © 2026 ToolBox Pro. All rights reserved. Made with ❤️
        </div>
      </div>
    </footer>
  );
}
