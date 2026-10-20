import { cn } from "@/lib/utils";
import { useUserStore, FREE_LIMIT } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { Button } from "@/components/ui/button";

export function AdSlot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed border-border bg-secondary/50 p-5 text-center text-sm text-muted-foreground",
        className
      )}
    >
      <span className="block font-semibold">📢 广告位 (Google AdSense)</span>
      <span className="text-xs">728 × 90</span>
    </div>
  );
}

export function UsageCounter({ toolId }: { toolId: string }) {
  const isPro = useUserStore((s) => s.plan === "pro");
  const getRemaining = useUserStore((s) => s.getRemaining);
  const show = usePaywallStore((s) => s.show);

  if (isPro) {
    return (
      <span className="inline-block rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-600">
        PRO 会员 ∞
      </span>
    );
  }

  const remaining = getRemaining(toolId);
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        免费剩余: <strong className="text-foreground">{remaining}</strong>/{FREE_LIMIT} 次
      </span>
      <Button size="sm" variant="accent" onClick={show}>升级 Pro</Button>
    </div>
  );
}
