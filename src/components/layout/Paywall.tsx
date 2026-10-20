import { useState } from "react";
import { Lock, Check, Crown, Loader2 } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePaywallStore } from "@/store/paywallStore";
import { useUserStore } from "@/store/userStore";
import { toast } from "@/components/ui/toast";
import { createCheckoutSession } from "@/lib/stripe";
import { cn } from "@/lib/utils";

type Plan = "monthly" | "yearly";

export function Paywall() {
  const { open, hide } = usePaywallStore();
  const { upgrade } = useUserStore();
  const [plan, setPlan] = useState<Plan>("yearly");
  const [loading, setLoading] = useState(false);

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      await createCheckoutSession(plan);
      // Redirect happens inside createCheckoutSession
    } catch (e: any) {
      toast(e.message || "支付发起失败，请稍后重试", "error");
      // Fallback: simulate upgrade for demo without Stripe keys
      upgrade();
      hide();
      toast("🎉 演示模式：已升级到 ToolBox Pro！");
    } finally {
      setLoading(false);
    }
  };

  const plans: Record<Plan, { price: string; period: string; save?: string }> = {
    monthly: { price: "$9.9", period: "/月" },
    yearly: { price: "$79", period: "/年", save: "省 33%" },
  };

  return (
    <Dialog open={open} onClose={hide}>
      <div className="text-center">
        <div className="mb-4 text-5xl">🔒</div>
        <h2 className="mb-3 text-2xl font-bold">解锁全部功能</h2>
        <p className="mb-6 text-muted-foreground">
          升级到 ToolBox Pro，解锁 50+ 高级工具，无限次使用
        </p>

        {/* Plan selector */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          {(Object.keys(plans) as Plan[]).map((key) => {
            const p = plans[key];
            const isSelected = plan === key;
            return (
              <button
                key={key}
                onClick={() => setPlan(key)}
                className={cn(
                  "relative rounded-xl border-2 p-4 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50"
                )}
              >
                {p.save && (
                  <span className="absolute -top-2 right-2 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    {p.save}
                  </span>
                )}
                <div className="text-sm font-medium text-muted-foreground">
                  {key === "monthly" ? "月度" : "年度"}
                </div>
                <div className="text-2xl font-extrabold">
                  {p.price}
                  <span className="text-sm font-normal text-muted-foreground">{p.period}</span>
                </div>
                {isSelected && (
                  <Check className="absolute right-3 top-3 h-5 w-5 text-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Features */}
        <div className="mb-6 space-y-2 text-left">
          {[
            "全部 50+ 工具无限使用",
            "高级功能解锁（PDF、图片处理）",
            "无广告纯净体验",
            "优先邮件支持",
            plan === "yearly" ? "年付省 $39.8（相当于 $6.6/月）" : "随时取消，按月灵活",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 shrink-0 text-green-600" />
              {f}
            </div>
          ))}
        </div>

        {/* Stripe checkout button */}
        <Button size="lg" className="w-full" onClick={handleStripeCheckout} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              正在跳转到支付页面...
            </>
          ) : (
            <>
              <Crown className="h-4 w-4" />
              立即升级 - {plans[plan].price}{plans[plan].period}
            </>
          )}
        </Button>

        <p className="mt-3 text-xs text-muted-foreground">
          🔒 由 Stripe 安全支付 · 支持信用卡 / PayPal / 支付宝
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          随时取消，取消后当前周期内仍可使用
        </p>
      </div>
    </Dialog>
  );
}
