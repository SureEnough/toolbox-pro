import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Check, Loader2, CreditCard, LogOut, Settings } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { createCheckoutSession, getSubscription, openCustomerPortal, clearSubscription } from "@/lib/stripe";
import { toast } from "@/components/ui/toast";

export function SettingsPage() {
  const navigate = useNavigate();
  const { plan, billingCycle, subscriptionEnd, customerId, isPro, cancelSubscription, reset } = useUserStore();
  const { show } = usePaywallStore();
  const [loading, setLoading] = useState(false);

  const sub = getSubscription();
  const pro = isPro();

  const handleUpgrade = async (cycle: "monthly" | "yearly") => {
    setLoading(true);
    try {
      await createCheckoutSession(cycle);
    } catch (e: any) {
      toast(e.message || "支付发起失败", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleManage = async () => {
    if (!customerId && !sub?.customerId) {
      toast("未找到订阅信息", "error");
      return;
    }
    setLoading(true);
    try {
      await openCustomerPortal(customerId || sub?.customerId || "");
    } catch (e: any) {
      toast(e.message || "无法打开管理页面", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    cancelSubscription();
    clearSubscription();
    reset();
    toast("已取消订阅，降级为免费版");
  };

  return (
    <>
      <SEO title="账户设置" description="管理您的 ToolBox Pro 订阅和账户" />
      <div className="container mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-8 flex items-center gap-2 text-3xl font-extrabold">
          <Settings className="h-8 w-8" />
          账户设置
        </h1>

        {/* Current Plan */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              当前方案
              <Badge variant={pro ? "pro" : "free"}>{pro ? "Pro" : "免费"}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pro ? (
              <>
                <div className="space-y-2 rounded-lg bg-secondary p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">计划</span>
                    <span className="font-medium">ToolBox Pro {billingCycle === "yearly" ? "年度" : "月度"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">价格</span>
                    <span className="font-medium">{billingCycle === "yearly" ? "$79/年" : "$9.9/月"}</span>
                  </div>
                  {subscriptionEnd && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">到期时间</span>
                      <span className="font-medium">{new Date(subscriptionEnd * 1000).toLocaleDateString("zh-CN")}</span>
                    </div>
                  )}
                  {sub?.email && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">邮箱</span>
                      <span className="font-medium">{sub.email}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleManage} disabled={loading}>
                    <CreditCard className="h-4 w-4" />
                    {loading ? "加载中..." : "管理订阅 (Stripe)"}
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleCancel}>
                    <LogOut className="h-4 w-4" />
                    取消订阅
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">您当前使用免费版，每个工具每天限 5 次。升级 Pro 解锁全部功能。</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="flex-1" onClick={() => handleUpgrade("monthly")} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crown className="h-4 w-4" />}
                    月度 $9.9/月
                  </Button>
                  <Button className="flex-1" variant="outline" onClick={() => handleUpgrade("yearly")} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crown className="h-4 w-4" />}
                    年度 $79/年
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pro Benefits */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pro 会员权益</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                "全部 50+ 工具无限使用",
                "高级功能解锁（PDF、图片处理）",
                "无广告纯净体验",
                "优先邮件支持",
                "Stripe 安全支付，随时取消",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  {f}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card>
          <CardHeader>
            <CardTitle>使用统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {["password", "qrcode", "json", "color", "uuid", "hash"].map((tool) => {
                const remaining = useUserStore.getState().getRemaining(tool);
                return (
                  <div key={tool} className="flex justify-between rounded-lg bg-secondary p-2">
                    <span className="capitalize">{tool}</span>
                    <span className="font-medium">{pro ? "无限" : `${remaining} 次剩余`}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
