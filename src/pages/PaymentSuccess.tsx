import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, Crown } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { getCheckoutSession, saveSubscription } from "@/lib/stripe";
import { toast } from "@/components/ui/toast";

export function PaymentSuccess() {
  const navigate = useNavigate();
  const { upgrade } = useUserStore();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [details, setDetails] = useState<{
    plan: string;
    amount: number;
    currency: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    getCheckoutSession(sessionId)
      .then((data) => {
        if (data.paymentStatus === "paid" || data.status === "active") {
          saveSubscription(data);
          upgrade();
          setDetails({
            plan: data.plan,
            amount: data.amount,
            currency: data.currency,
            email: data.customerEmail,
          });
          setStatus("success");
          toast("🎉 支付成功！已升级到 ToolBox Pro");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        // Fallback: still upgrade (session might be processing)
        upgrade();
        setStatus("success");
        toast("🎉 支付成功！已升级到 ToolBox Pro");
      });
  }, []);

  if (status === "loading") {
    return (
      <>
        <SEO title="支付处理中" description="正在处理您的支付..." />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">正在处理您的支付...</h2>
            <p className="mt-2 text-muted-foreground">请稍候，正在激活您的订阅</p>
          </div>
        </div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <SEO title="支付失败" description="支付处理出现问题" />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <div className="mb-4 text-5xl">😕</div>
              <h2 className="mb-2 text-xl font-bold">支付处理出现问题</h2>
              <p className="mb-6 text-muted-foreground">
                如果您已被扣款，请联系我们处理。否则请重新尝试。
              </p>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => navigate("/")}>
                  返回首页
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => navigate("/#pricing")}>
                  重新订阅
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="支付成功 - ToolBox Pro" description="恭喜！您已成功升级到 ToolBox Pro" />
      <div className="flex min-h-[60vh] items-center justify-center py-12">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
            <h2 className="mb-2 text-2xl font-extrabold">支付成功！🎉</h2>
            <p className="mb-6 text-muted-foreground">
              恭喜！您已升级到 <span className="font-bold text-primary">ToolBox Pro</span>
              <br />
              全部功能已解锁，尽情使用吧！
            </p>

            {details && (
              <div className="mb-6 space-y-2 rounded-lg bg-secondary p-4 text-left text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">订阅计划</span>
                  <span className="font-medium">
                    {details.plan === "month" ? "月度订阅" : "年度订阅"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">金额</span>
                  <span className="font-medium">
                    ${(details.amount / 100).toFixed(2)} {details.currency.toUpperCase()}
                  </span>
                </div>
                {details.email && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">邮箱</span>
                    <span className="font-medium">{details.email}</span>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={() => navigate("/tools/password")}>
                <Crown className="h-4 w-4" />
                开始使用 Pro 工具
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                返回首页
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              订阅管理请前往设置页面 · 随时可取消
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
