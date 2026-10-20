import { type ReactNode } from "react";
import { AdSlot, UsageCounter } from "@/components/layout/AdSlot";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  icon: string;
  toolId: string;
  isPro?: boolean;
  children: ReactNode;
}

export function ToolPageLayout({ title, description, icon, toolId, isPro, children }: ToolPageLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8 text-center">
        <h1 className="flex items-center justify-center gap-3 text-3xl font-extrabold">
          <span>{icon}</span>
          {title}
          {isPro && (
            <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-600">
              PRO
            </span>
          )}
        </h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <div className="mt-3">
          <UsageCounter toolId={toolId} />
        </div>
      </div>

      <AdSlot className="mb-6" />

      {children}

      <AdSlot className="mt-6" />
    </div>
  );
}
