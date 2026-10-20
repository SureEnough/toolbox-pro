import { useState } from "react";
import { Copy, Hash } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Textarea, Input, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

async function digest(text: string, algo: string) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function HashTool() {
  const [input, setInput] = useState("Hello, ToolBox Pro!");
  const [results, setResults] = useState<Record<string, string>>({});

  const compute = async () => {
    const algos = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    const r: Record<string, string> = {};
    for (const a of algos) r[a] = await digest(input, a);
    setResults(r);
    toast("哈希计算完成！");
  };

  return (
    <>
      <SEO title="哈希计算工具" description="在线计算 SHA-1/SHA-256/SHA-384/SHA-512 哈希值，支持文本哈希。开发者安全工具。" keywords="哈希计算,SHA-256,SHA-512,SHA-1,hash,加密哈希" toolD="hash" />
      <ToolPageLayout title="哈希计算" description="SHA-1 / SHA-256 / SHA-384 / SHA-512" icon="#️⃣" toolId="hash">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label>输入文本</Label>
              <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="font-mono" />
            </div>
            <Button className="w-full" size="lg" onClick={compute}>
              <Hash className="h-5 w-5" />计算哈希
            </Button>
            {Object.entries(results).map(([algo, hash]) => (
              <div key={algo}>
                <Label>{algo}</Label>
                <div className="flex gap-2">
                  <Input value={hash} readOnly className="font-mono text-xs" />
                  <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(hash); toast("已复制！"); }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {Object.keys(results).length === 0 && (
              <div className="rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
                💡 点击"计算哈希"按钮，将同时计算 SHA-1、SHA-256、SHA-384、SHA-512 四种哈希值。
              </div>
            )}
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
