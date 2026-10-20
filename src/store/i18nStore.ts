import { create } from "zustand";

export type Locale = "zh" | "en";

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
}

const stored = (typeof window !== "undefined" && localStorage.getItem("toolbox_locale")) as Locale | null;

export const useI18n = create<I18nState>((set, get) => ({
  locale: stored || "zh",
  setLocale: (locale: Locale) => {
    localStorage.setItem("toolbox_locale", locale);
    document.documentElement.lang = locale;
    set({ locale });
  },
  toggle: () => {
    const next = get().locale === "zh" ? "en" : "zh";
    get().setLocale(next);
  },
}));

// Translation dictionary
const zh = {
  // Nav
  "nav.all": "全部",
  "nav.tools": "工具",
  "nav.blog": "博客",
  "nav.about": "关于",
  "nav.pro": "Pro",

  // Nav tool labels
  "tool.password": "密码",
  "tool.qrcode": "二维码",
  "tool.json": "JSON",
  "tool.color": "颜色",
  "tool.uuid": "UUID",
  "tool.timestamp": "时间戳",
  "tool.hash": "哈希",
  "tool.base64": "Base64",
  "tool.jwt": "JWT",
  "tool.regex": "正则",
  "tool.calculator": "计算器",
  "tool.image": "图片",

  // Footer
  "footer.desc": "20+ 免费在线工具，浏览器直接使用。隐私安全，数据不上传。",
  "footer.tools": "工具",
  "footer.moreTools": "更多工具",
  "footer.resources": "资源",
  "footer.rights": "© 2026 ToolBox Pro. All rights reserved. Made with ❤️",
  "footer.sponsor": "☕ 请喝咖啡",
  "footer.sponsor2": "❤️ Sponsor",
  "footer.passwordGen": "密码生成器",
  "footer.qrcodeGen": "二维码生成",
  "footer.jsonFormat": "JSON 格式化",
  "footer.uuidGen": "UUID 生成",
  "footer.base64Codec": "Base64 编解码",
  "footer.jwtDecoder": "JWT 解码器",
  "footer.regexTest": "正则测试",
  "footer.hashCalc": "哈希计算",
  "footer.blog": "技术博客",
  "footer.recommend": "推荐工具",
  "footer.settings": "账户设置",
  "footer.upgrade": "升级 Pro",
  "footer.home": "返回首页",
  "footer.contact": "联系我们",
  "footer.about": "关于我们",
  "footer.privacy": "隐私政策",
  "footer.terms": "服务条款",

  // Landing - Hero
  "hero.badge": "20+ 免费在线工具",
  "hero.title": "一站式在线工具箱",
  "hero.subtitle": "密码生成、JSON 格式化、二维码、UUID、哈希计算等 20+ 工具，浏览器直接使用，数据不上传，隐私零泄露。",
  "hero.cta": "开始使用",
  "hero.cta2": "查看全部工具",

  // Landing - Features
  "features.title": "为什么选择 ToolBox Pro",
  "feature.fast.title": "极速体验",
  "feature.fast.desc": "纯前端运行，毫秒级响应",
  "feature.secure.title": "隐私安全",
  "feature.secure.desc": "数据本地处理，绝不上传",
  "feature.cross.title": "全平台支持",
  "feature.cross.desc": "手机、平板、电脑完美适配",
  "feature.free.title": "免费开始",
  "feature.free.desc": "基础工具永久免费",

  // Landing - Pricing
  "pricing.title": "简单透明的定价",
  "pricing.subtitle": "免费开始，随时升级",
  "pricing.free": "免费版",
  "pricing.free.desc": "适合个人日常使用",
  "pricing.pro.monthly": "月度 Pro",
  "pricing.pro.yearly": "年度 Pro",
  "pricing.pro.desc": "适合专业开发者",
  "pricing.pro.yearly.desc": "省 33%，年付最优",
  "pricing.cta.free": "免费开始",
  "pricing.cta.pro": "升级 Pro",
  "pricing.perMonth": "/月",
  "pricing.perYear": "/年",

  // Landing - Testimonials
  "testimonials.title": "用户评价",
  "testimonial.1": "JSON 格式化和密码生成器是我每天必用的工具。界面简洁，速度极快！",
  "testimonial.1.author": "张伟，前端工程师",
  "testimonial.2": "二维码生成器帮我在营销物料上省了大量时间。Pro 版值得付费！",
  "testimonial.2.author": "李娜，市场经理",
  "testimonial.3": "所有工具都在一个网站搞定，数据不上传，隐私有保障，太棒了！",
  "testimonial.3.author": "王强，自由职业者",

  // Landing - FAQ
  "faq.title": "常见问题",
  "faq.1.q": "免费版有什么限制？",
  "faq.1.a": "免费版可使用所有基础工具，每个工具每天限 5 次。升级 Pro 后无限制。",
  "faq.2.q": "我的数据安全吗？",
  "faq.2.a": "所有数据处理都在浏览器本地完成，绝不上传到任何服务器。",
  "faq.3.q": "Pro 会员如何取消？",
  "faq.3.a": "随时可取消，当前周期内仍可使用 Pro 功能，到期后降级为免费版。",
  "faq.4.q": "支持哪些支付方式？",
  "faq.4.a": "支持信用卡、PayPal、支付宝、微信支付等多种支付方式。",

  // Tools Index
  "tools.title": "全部工具",
  "tools.subtitle": "20 个工具，点击即用，无需注册",
  "tools.search": "搜索工具... (按 / 快捷搜索)",
  "tools.recent": "最近使用",
  "tools.favorites": "我的收藏",
  "tools.noResults": "没有找到匹配的工具，试试其他关键词？",
  "tools.free": "免费",
  "cat.all": "全部",
  "cat.generator": "生成器",
  "cat.codec": "编解码",
  "cat.convert": "转换",
  "cat.text": "文本",
  "cat.pro": "Pro",

  // Tool names (for tools index)
  "t.password.title": "密码生成器",
  "t.password.desc": "加密级随机密码，自定义长度和字符类型",
  "t.qrcode.title": "二维码生成器",
  "t.qrcode.desc": "文本、URL、WiFi 生成二维码",
  "t.uuid.title": "UUID 生成器",
  "t.uuid.desc": "UUID v4/v7 批量生成",
  "t.json.title": "JSON 格式化",
  "t.json.desc": "格式化、压缩、验证 JSON",
  "t.base64.title": "Base64 编解码",
  "t.base64.desc": "Base64 编码解码，支持中文",
  "t.url.title": "URL 编解码",
  "t.url.desc": "URL 编码解码、URI 组件处理",
  "t.jwt.title": "JWT 解码器",
  "t.jwt.desc": "解码 JWT Token，查看 Payload",
  "t.color.title": "颜色工具",
  "t.color.desc": "HEX/RGB/HSL 互转，调色板",
  "t.timestamp.title": "时间戳转换",
  "t.timestamp.desc": "Unix 时间戳 ↔ 日期互转",
  "t.hash.title": "哈希计算",
  "t.hash.desc": "SHA-1/256/384/512 哈希",
  "t.regex.title": "正则表达式测试",
  "t.regex.desc": "实时测试正则匹配",
  "t.nbase.title": "进制转换",
  "t.nbase.desc": "BIN/OCT/DEC/HEX 互转",
  "t.text.title": "文本工具",
  "t.text.desc": "字数统计、大小写转换",
  "t.calc.title": "在线计算器",
  "t.calc.desc": "科学计算、贷款、BMI",
  "t.md.title": "Markdown 预览",
  "t.md.desc": "实时编辑预览 Markdown",
  "t.css.title": "CSS 压缩/美化",
  "t.css.desc": "CSS minify / beautify",
  "t.diff.title": "文本差异对比",
  "t.diff.desc": "逐行比较两段文本差异",
  "t.cron.title": "Cron 解析",
  "t.cron.desc": "Cron 表达式解析和下次运行",
  "t.image.title": "图片工具",
  "t.image.desc": "压缩、格式转换、裁剪、水印",
  "t.pdf.title": "PDF 工具",
  "t.pdf.desc": "PDF 合并、拆分、压缩、转图片",

  // Misc
  "misc.shortcuts": "⌨️ 键盘快捷键",
  "misc.supportTitle": "喜欢 ToolBox Pro？",
  "misc.supportDesc": "支持我们继续开发更多免费工具",
  "misc.coffee": "请喝咖啡",
};

const en: Record<string, string> = {
  // Nav
  "nav.all": "All",
  "nav.tools": "Tools",
  "nav.blog": "Blog",
  "nav.about": "About",
  "nav.pro": "Pro",

  // Nav tool labels
  "tool.password": "Password",
  "tool.qrcode": "QR Code",
  "tool.json": "JSON",
  "tool.color": "Color",
  "tool.uuid": "UUID",
  "tool.timestamp": "Timestamp",
  "tool.hash": "Hash",
  "tool.base64": "Base64",
  "tool.jwt": "JWT",
  "tool.regex": "Regex",
  "tool.calculator": "Calc",
  "tool.image": "Image",

  // Footer
  "footer.desc": "20+ free online tools, runs in your browser. Privacy-safe, no data upload.",
  "footer.tools": "Tools",
  "footer.moreTools": "More Tools",
  "footer.resources": "Resources",
  "footer.rights": "© 2026 ToolBox Pro. All rights reserved. Made with ❤️",
  "footer.sponsor": "☕ Buy Coffee",
  "footer.sponsor2": "❤️ Sponsor",
  "footer.passwordGen": "Password Generator",
  "footer.qrcodeGen": "QR Code Generator",
  "footer.jsonFormat": "JSON Formatter",
  "footer.uuidGen": "UUID Generator",
  "footer.base64Codec": "Base64 Codec",
  "footer.jwtDecoder": "JWT Decoder",
  "footer.regexTest": "Regex Tester",
  "footer.hashCalc": "Hash Calculator",
  "footer.blog": "Tech Blog",
  "footer.recommend": "Recommended",
  "footer.settings": "Settings",
  "footer.upgrade": "Upgrade Pro",
  "footer.home": "Home",
  "footer.contact": "Contact",
  "footer.about": "About",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",

  // Landing - Hero
  "hero.badge": "20+ Free Online Tools",
  "hero.title": "All-in-One Online Toolbox",
  "hero.subtitle": "Password generator, JSON formatter, QR code, UUID, hash calculator and 20+ tools. Runs in browser, no data upload, zero privacy leak.",
  "hero.cta": "Get Started",
  "hero.cta2": "View All Tools",

  // Landing - Features
  "features.title": "Why ToolBox Pro",
  "feature.fast.title": "Lightning Fast",
  "feature.fast.desc": "Pure frontend, millisecond response",
  "feature.secure.title": "Privacy First",
  "feature.secure.desc": "Data processed locally, never uploaded",
  "feature.cross.title": "Cross-Platform",
  "feature.cross.desc": "Works on mobile, tablet, desktop",
  "feature.free.title": "Free Forever",
  "feature.free.desc": "Basic tools always free",

  // Landing - Pricing
  "pricing.title": "Simple Transparent Pricing",
  "pricing.subtitle": "Start free, upgrade anytime",
  "pricing.free": "Free",
  "pricing.free.desc": "For personal daily use",
  "pricing.pro.monthly": "Monthly Pro",
  "pricing.pro.yearly": "Yearly Pro",
  "pricing.pro.desc": "For professional developers",
  "pricing.pro.yearly.desc": "Save 33%, best value",
  "pricing.cta.free": "Start Free",
  "pricing.cta.pro": "Upgrade Pro",
  "pricing.perMonth": "/mo",
  "pricing.perYear": "/yr",

  // Landing - Testimonials
  "testimonials.title": "What Users Say",
  "testimonial.1": "JSON formatter and password generator are tools I use every day. Clean UI, blazing fast!",
  "testimonial.1.author": "Zhang Wei, Frontend Engineer",
  "testimonial.2": "QR code generator saved me tons of time on marketing materials. Pro is worth it!",
  "testimonial.2.author": "Li Na, Marketing Manager",
  "testimonial.3": "All tools in one place, no data upload, privacy guaranteed. Awesome!",
  "testimonial.3.author": "Wang Qiang, Freelancer",

  // Landing - FAQ
  "faq.title": "FAQ",
  "faq.1.q": "What are the free tier limits?",
  "faq.1.a": "Free tier includes all basic tools, 5 uses per tool per day. Upgrade to Pro for unlimited access.",
  "faq.2.q": "Is my data safe?",
  "faq.2.a": "All data processing happens locally in your browser. Nothing is uploaded to any server.",
  "faq.3.q": "How to cancel Pro?",
  "faq.3.a": "Cancel anytime. You keep Pro features until the end of your billing period.",
  "faq.4.q": "What payment methods?",
  "faq.4.a": "Supports credit cards, PayPal, Alipay, WeChat Pay and more.",

  // Tools Index
  "tools.title": "All Tools",
  "tools.subtitle": "20 tools, click to use, no signup",
  "tools.search": "Search tools... (press / to search)",
  "tools.recent": "Recently Used",
  "tools.favorites": "My Favorites",
  "tools.noResults": "No matching tools. Try another keyword?",
  "tools.free": "Free",
  "cat.all": "All",
  "cat.generator": "Generator",
  "cat.codec": "Encode/Decode",
  "cat.convert": "Convert",
  "cat.text": "Text",
  "cat.pro": "Pro",

  // Tool names
  "t.password.title": "Password Generator",
  "t.password.desc": "Cryptographic random passwords, custom length & charset",
  "t.qrcode.title": "QR Code Generator",
  "t.qrcode.desc": "Generate QR codes from text, URL, WiFi",
  "t.uuid.title": "UUID Generator",
  "t.uuid.desc": "UUID v4/v7 batch generation",
  "t.json.title": "JSON Formatter",
  "t.json.desc": "Format, minify, validate JSON",
  "t.base64.title": "Base64 Codec",
  "t.base64.desc": "Base64 encode/decode, supports Unicode",
  "t.url.title": "URL Encoder",
  "t.url.desc": "URL encode/decode, URI component",
  "t.jwt.title": "JWT Decoder",
  "t.jwt.desc": "Decode JWT Token, view payload",
  "t.color.title": "Color Tool",
  "t.color.desc": "HEX/RGB/HSL converter, palette",
  "t.timestamp.title": "Timestamp Converter",
  "t.timestamp.desc": "Unix timestamp ↔ date conversion",
  "t.hash.title": "Hash Calculator",
  "t.hash.desc": "SHA-1/256/384/512 hashing",
  "t.regex.title": "Regex Tester",
  "t.regex.desc": "Test regex patterns in real-time",
  "t.nbase.title": "Number Base Converter",
  "t.nbase.desc": "BIN/OCT/DEC/HEX conversion",
  "t.text.title": "Text Tool",
  "t.text.desc": "Word count, case conversion",
  "t.calc.title": "Calculator",
  "t.calc.desc": "Scientific calc, loan, BMI",
  "t.md.title": "Markdown Previewer",
  "t.md.desc": "Live Markdown editor & preview",
  "t.css.title": "CSS Minifier",
  "t.css.desc": "CSS minify / beautify",
  "t.diff.title": "Diff Checker",
  "t.diff.desc": "Compare text line by line",
  "t.cron.title": "Cron Parser",
  "t.cron.desc": "Parse cron expressions, next run",
  "t.image.title": "Image Tool",
  "t.image.desc": "Compress, convert, crop, watermark",
  "t.pdf.title": "PDF Tool",
  "t.pdf.desc": "PDF merge, split, compress, convert",

  // Misc
  "misc.shortcuts": "⌨️ Keyboard Shortcuts",
  "misc.supportTitle": "Love ToolBox Pro?",
  "misc.supportDesc": "Support us to build more free tools",
  "misc.coffee": "Buy Coffee",
};

const dicts: Record<Locale, Record<string, string>> = { zh, en };

export function t(key: string): string {
  const locale = useI18n.getState().locale;
  return dicts[locale][key] ?? dicts.zh[key] ?? key;
}
