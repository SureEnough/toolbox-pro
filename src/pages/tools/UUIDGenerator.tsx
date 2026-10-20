import { useState } from "react";
import { Copy, Dices } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { toast } from "@/components/ui/toast";

export function UUIDGenerator() {
  const [version, setVersion] = useState("v4");
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const trackUsage = useUserStore((s) => s.trackUsage);
  const show = usePaywallStore((s) => s.show);

  const generate = () => {
    if (!trackUsage("uuid")) { show(); return; }
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      if (version === "v4") {
        result.push(crypto.randomUUID());
      } else {
        // Simple UUID v7-like (timestamp-based)
        const ts = Date.now().toString(16).padStart(12, "0");
        const rand = crypto.getRandomValues(new Uint8Array(10));
        const hex = Array.from(rand).map(b => b.toString(16).padStart(2, "0")).join("");
        result.push(`${ts.slice(0,8)}-${ts.slice(8,12)}-7${hex.slice(0,3)}-${hex.slice(3,7)}-${hex.slice(7,19)}`);
      }
    }
    setUuids(result);
    toast(`已生成 ${count} 个 UUID`);
  };

  return (
    <>
      <SEO title="UUID 生成器" description="在线生成 UUID v4/v7，支持批量生成，开发者常用工具。" keywords="UUID生成器,UUID v4,UUID v7,GUID,批量生成" toolD="uuid" />
      <ToolPageLayout title="UUID 生成器" description="生成 UUID v4 / v7，支持批量" icon="🔢" toolId="uuid">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>UUID 版本</Label>
                <Select value={version} onChange={(e) => setVersion(e.target.value)}>
                  <option value="v4">UUID v4 (随机)</option>
                  <option value="v7">UUID v7 (时间戳)</option>
                </Select>
              </div>
              <div>
                <Label>生成数量</Label>
                <Select value={count} onChange={(e) => setCount(+e.target.value)}>
                  <option value={1}>1 个</option>
                  <option value={5}>5 个</option>
                  <option value={10}>10 个</option>
                  <option value={50}>50 个</option>
                </Select>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={generate}>
              <Dices className="h-5 w-5" />生成 UUID
            </Button>
            {uuids.map((u, i) => (
              <div key={i} className="flex gap-2">
                <Input value={u} readOnly className="font-mono text-sm" />
                <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(u); toast("已复制！"); }}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
