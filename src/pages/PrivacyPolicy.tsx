import { SEO } from "@/components/SEO";

export function PrivacyPolicy() {
  return (
    <>
      <SEO title="隐私政策" description="ToolBox Pro 隐私政策 - 我们尊重您的隐私" keywords="隐私政策,privacy policy,GDPR" />
      <div className="container mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-extrabold">隐私政策</h1>
        <div className="prose dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p className="text-base text-foreground">最后更新：2026 年 10 月 20 日</p>

          <h2 className="text-xl font-bold text-foreground">1. 数据收集</h2>
          <p>ToolBox Pro 是一个纯前端应用，所有工具的数据处理都在您的浏览器本地完成。我们不会将您的工具输入、输出或文件上传到任何服务器。</p>

          <h2 className="text-xl font-bold text-foreground">2. 本地存储</h2>
          <p>我们使用浏览器的 localStorage 存储以下信息：</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>用户方案（免费/Pro）和使用次数统计</li>
            <li>主题偏好（深色/浅色模式）</li>
            <li>订阅状态（Stripe 客户 ID、订阅到期时间）</li>
            <li>邮件订阅地址（仅当您主动订阅时）</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground">3. Stripe 支付数据</h2>
          <p>支付处理由 Stripe 安全处理。我们不存储您的信用卡信息或支付详情。Stripe 隐私政策请访问 <a href="https://stripe.com/privacy" className="text-primary underline">stripe.com/privacy</a>。</p>

          <h2 className="text-xl font-bold text-foreground">4. Google Analytics</h2>
          <p>我们使用 Google Analytics 4 收集匿名使用统计（页面浏览量、访问来源等），用于改进产品。不收集个人身份信息。</p>

          <h2 className="text-xl font-bold text-foreground">5. Google AdSense</h2>
          <p>免费版页面可能展示 Google AdSense 广告。Google 可能使用 Cookie 来展示相关广告。您可以在 Google 广告设置中管理 Cookie 偏好。</p>

          <h2 className="text-xl font-bold text-foreground">6. Cookie</h2>
          <p>我们使用 Cookie 和类似技术来：存储偏好设置、分析流量、展示广告。您可以通过浏览器设置或我们的 Cookie 同意横幅管理这些。</p>

          <h2 className="text-xl font-bold text-foreground">7. 第三方服务</h2>
          <ul className="ml-6 list-disc space-y-1">
            <li>Stripe - 支付处理</li>
            <li>Google Analytics - 使用统计</li>
            <li>Google AdSense - 广告展示</li>
            <li>Cloudflare - 网站托管和 CDN</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground">8. 您的权利</h2>
          <p>根据 GDPR 和类似法规，您有权：访问您的数据、删除您的数据、撤回同意。如需行使这些权利，请联系我们。</p>

          <h2 className="text-xl font-bold text-foreground">9. 联系方式</h2>
          <p>如有隐私相关问题，请访问我们的 <a href="/contact" className="text-primary underline">联系页面</a>。</p>
        </div>
      </div>
    </>
  );
}
