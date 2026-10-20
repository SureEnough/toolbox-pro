import { Lock, Check } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePaywallStore } from "@/store/paywallStore";
import { useUserStore } from "@/store/userStore";
import { toast } from "@/components/ui/toast";

export function Paywall() {
  const { open, hide } = usePaywallStore();
  const { upgrade } = useUserStore();

  const handleUpgrade = () => {
    upgrade();
    hide();
    toast("🎉 恭喜！您已升级到 ToolBox Pro，全部功能已解锁！");
  };

  return (
    <Dialog open={open} onClose={hide}>
      <div className="text-center">
        <div className="mb-4 text-5xl">🔒</div>
        <h2 className="mb-3 text-2xl font-bold">解锁全部功能</h2>
        <p className="mb-6 text-muted-foreground">
          升级到 ToolBox Pro，解锁 50+ 高级工具，无限次使用
        </p>
        <div className="mb-6 text-4xl font-extrabold text-primary">
          $9.9<span className="text-base font-normal text-muted-foreground">/月</span>
        </div>
        <div className="mb-6 space-y-2 text-left">
          {["全部 50+ 工具无限使用", "高级功能解锁（PDF、图片处理）", "无广告纯净体验", "优先邮件支持"].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-green-600" />
              {f}
            </div>
          ))}
        </div>
        <Button size="lg" className="w-full" onClick={handleUpgrade}>
          <Lock className="h-4 w-4" />
          立即升级 - $9.9/月
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          支持信用卡 / PayPal / 支付宝 / 微信支付
        </p>
      </div>
    </Dialog>
  );
}
