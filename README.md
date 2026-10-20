# 🧰 ToolBox Pro React - 在线工具箱 SaaS

> Vite + React + TypeScript + shadcn/ui + Tailwind CSS

## 🛠️ 技术栈

- **构建工具**: Vite 5
- **框架**: React 18 + TypeScript 5
- **UI 组件**: shadcn/ui 风格组件 + Tailwind CSS 3
- **路由**: React Router DOM 6
- **状态管理**: Zustand 4
- **图标**: Lucide React
- **二维码**: qrcode.react

## 📁 项目结构

```
src/
├── main.tsx                    # 入口
├── App.tsx                     # 路由配置
├── index.css                   # Tailwind + CSS 变量
├── lib/
│   └── utils.ts                # cn() 工具函数
├── components/
│   ├── ui/                     # shadcn/ui 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx            # Select, Slider, Checkbox
│   │   └── toast.tsx
│   └── layout/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── Paywall.tsx
│       ├── AdSlot.tsx          # 广告位 + 使用计数器
│       └── ToolPageLayout.tsx  # 工具页共享布局
├── store/
│   ├── userStore.ts            # 用户/订阅状态 (Zustand)
│   ├── themeStore.ts           # 暗色/亮色主题
│   └── paywallStore.ts         # 付费墙弹窗状态
└── pages/
    ├── LandingPage.tsx         # 落地页
    └── tools/
        ├── PasswordGenerator.tsx
        ├── QRCodeGenerator.tsx
        ├── JsonFormatter.tsx
        ├── ColorTool.tsx
        ├── TextTool.tsx
        ├── Calculator.tsx
        ├── ImageTool.tsx       # Pro
        └── PdfTool.tsx         # Pro
```

## 🚀 开发

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # 生产构建
npm run preview  # 预览构建
```

## 💰 盈利模式

| 渠道 | 说明 | 预估月收入 |
|------|------|-----------|
| Google AdSense | 每页 2 个广告位 | $1,000 |
| Pro 订阅 | $9.9/月 或 $79/年 | $19,800 |
| Affiliate | 推荐云服务佣金 | $200-500 |

**综合预估月收入：$21,000+**（基于 10万 UV）

## ☁️ 部署

```bash
npm run build
# dist/ 目录部署到 Vercel / 华为云 OBS / Nginx
```

SPA 需配置所有路由 fallback 到 index.html。
