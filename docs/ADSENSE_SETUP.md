# Google AdSense 申请指南

## 申请前检查清单

✅ 网站已上线 (https://toolbox-pro-4lq.pages.dev)
✅ 有高质量原创内容 (10 篇博客 + 20 个工具)
✅ 有隐私政策页面 (/privacy)
✅ 有服务条款页面 (/terms)
✅ 有联系页面 (/contact)
✅ 有关于页面 (/about)
✅ 清晰的网站导航
✅ 移动端适配
✅ HTTPS 安全连接
⚠️ 需要自定义域名 (AdSense 不接受 .pages.dev 子域名)

## 申请步骤

### 1. 绑定自定义域名（必需）

AdSense 不接受免费的子域名（如 *.pages.dev）。需要绑定自定义域名：

```bash
# 在 Cloudflare 添加自定义域名
npx wrangler pages deployment --project-name=toolbox-pro --domain=yourdomain.com
```

或在 Cloudflare Dashboard → Pages → toolbox-pro → Custom domains → 添加域名

### 2. 申请 AdSense

1. 访问 https://www.google.com/adsense/start/
2. 使用 Google 账号登录
3. 输入你的网站域名（自定义域名）
4. 选择内容语言为「中文」
5. 点击「保存并继续」

### 3. 添加 AdSense 代码到网站

获得 AdSense 代码后：

1. 获取 Publisher ID（格式：`ca-pub-XXXXXXXXXXXXXXXX`）
2. 修改 `src/components/layout/AdSlot.tsx`：
   - `ADSENSE_CLIENT` = 你的 Publisher ID
   - `ADSENSE_ENABLED` = `true`
3. 修改 `public/ads.txt`：
   - 替换 `pub-XXXXXXXXXXXXXXXX` 为你的 Publisher ID
4. 在 `index.html` 的 `<head>` 中添加 AdSense 脚本：
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
5. 重新构建部署

### 4. 等待审核

- 审核时间：通常 1-14 天
- 审核期间保持网站正常运营
- 持续发布新内容有助于通过审核
- 审核通过后会收到邮件通知

### 5. 创建广告单元

审核通过后：

1. AdSense Dashboard → Ads → By ad unit → Create new ad unit
2. 选择广告类型（推荐：Display ads）
3. 获取广告单元 ID（格式：`1234567890`）
4. 在 AdSlot 组件中传入 `slot` prop：
   ```tsx
   <AdSlot slot="1234567890" />
   ```

## 广告位布局

| 位置 | 尺寸 | 说明 |
|------|------|------|
| 落地页中部 | Responsive | 首页主要广告位 |
| 落地页底部 | Responsive | 首页底部广告位 |
| 工具页顶部 | 728×90 | 工具使用前 |
| 工具页底部 | Responsive | 工具使用后 |
| 博客列表 | Responsive | 文章列表间 |
| 博客文章内 | In-article | 文章内容中间 |

## 收入预估

| 流量级别 | 月 UV | 预估月收入 |
|----------|-------|-----------|
| 小型 | 10K | $20-50 |
| 中型 | 50K | $100-300 |
| 大型 | 100K | $300-800 |
| 大型 | 500K+ | $1,500-5,000+ |

*收入取决于流量、广告位、点击率、地区等因素

## 注意事项

- Pro 用户不显示广告（已实现）
- 不要点击自己的广告（会被封号）
- 不要鼓励用户点击广告
- 保持内容质量，持续更新
- 遵守 Google AdSense 政策
