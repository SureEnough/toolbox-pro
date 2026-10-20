import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { Button } from "@/components/ui/button";
import { FREE_LIMIT } from "@/store/userStore";

// Replace with your AdSense Publisher ID after approval
const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";
const ADSENSE_ENABLED = false; // Set to true after AdSense approval

interface AdSlotProps {
  className?: string;
  slot?: string;
  format?: string;
}

export function AdSlot({ className, slot = "1234567890", format = "auto" }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const isPro = useUserStore((s) => s.plan === "pro");

  // Don't show ads to Pro users
  if (isPro) return null;

  useEffect(() => {
    if (!ADSENSE_ENABLED) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  if (!ADSENSE_ENABLED) {
    // Placeholder before AdSense approval
    return (
      <div
        className={cn(
          "rounded-xl border-2 border-dashed border-border bg-secondary/50 p-5 text-center text-sm text-muted-foreground",
          className
        )}
      >
        <span className="block font-semibold">📢 广告位</span>
        <span className="text-xs">Google AdSense 审核通过后显示</span>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
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
