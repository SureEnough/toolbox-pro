import { SEO } from "@/components/SEO";

export function TermsOfService() {
  return (
    <>
      <SEO title="服务条款" description="ToolBox Pro 服务条款和使用协议" keywords="服务条款,terms of service" />
      <div className="container mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-extrabold">服务条款</h1>
        <div className="prose dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p className="text-base text-foreground">最后更新：2026 年 10 月 20 日</p>

          <h2 className="text-xl font-bold text-foreground">1. 服务描述</h2>
          <p>ToolBox Pro 提供免费和付费在线工具。免费版每个工具每天限 5 次使用，Pro 版提供无限使用和高级功能。</p>

          <h2 className="text-xl font-bold text-foreground">2. 订阅条款</h2>
          <ul className="ml-6 list-disc space-y-1">
            <li>月度订阅：$9.9/月，按月自动续费</li>
            <li>年度订阅：$79/年，按年自动续费</li>
            <li>可随时取消，取消后当前周期内仍可使用 Pro 功能</li>
            <li>支付由 Stripe 处理，支持信用卡、PayPal 等</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground">3. 使用限制</h2>
          <ul className="ml-6 list-disc space-y-1">
            <li>不得用于违法用途</li>
            <li>不得尝试绕过使用限制或付费墙</li>
            <li>不得对服务进行自动化批量调用（超出正常使用范围）</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground">4. 知识产权</h2>
          <p>ToolBox Pro 的所有代码和设计版权归我们所有。源代码在 GitHub 上以开源形式发布。</p>

          <h2 className="text-xl font-bold text-foreground">5. 免责声明</h2>
          <p>工具结果按"原样"提供，我们不保证结果的准确性。对于因使用本服务造成的任何损失，我们不承担责任。</p>

          <h2 className="text-xl font-bold text-foreground">6. 服务变更</h2>
          <p>我们保留随时修改、暂停或终止服务的权利。对于付费用户，如因服务终止造成损失，将按比例退款。</p>

          <h2 className="text-xl font-bold text-foreground">7. 联系方式</h2>
          <p>如有问题，请访问 <a href="/contact" className="text-primary underline">联系页面</a>。</p>
        </div>
      </div>
    </>
  );
}
