import { useState } from "react";
import { GitCompareArrows, Plus, Minus } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export function DiffChecker() {
  const [text1, setText1] = useState("Hello World\nLine 2\nLine 3\nLine 4");
  const [text2, setText2] = useState("Hello World\nLine 2 modified\nLine 3\nLine 4\nLine 5 new");

  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");
  const maxLen = Math.max(lines1.length, lines2.length);
  const diffs: { type: "same" | "add" | "del" | "mod"; line1?: string; line2?: string; num: number }[] = [];

  for (let i = 0; i < maxLen; i++) {
    const l1 = lines1[i];
    const l2 = lines2[i];
    if (l1 === undefined && l2 !== undefined) diffs.push({ type: "add", line2: l2, num: i + 1 });
    else if (l1 !== undefined && l2 === undefined) diffs.push({ type: "del", line1: l1, num: i + 1 });
    else if (l1 === l2) diffs.push({ type: "same", line1: l1, num: i + 1 });
    else diffs.push({ type: "mod", line1: l1, line2: l2, num: i + 1 });
  }

  const added = diffs.filter(d => d.type === "add").length;
  const removed = diffs.filter(d => d.type === "del").length;
  const modified = diffs.filter(d => d.type === "mod").length;

  return (
    <>
      <SEO title="文本差异对比" description="在线文本对比工具，逐行比较两段文本的差异。" keywords="文本对比,diff,text diff,文本差异,比较" toolD="diff" />
      <ToolPageLayout title="文本差异对比" description="逐行比较两段文本，高亮差异" icon="📋" toolId="diff">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <Label>原始文本</Label>
              <Textarea value={text1} onChange={(e) => setText1(e.target.value)} className="mt-2 font-mono text-sm" rows={10} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Label>修改后文本</Label>
              <Textarea value={text2} onChange={(e) => setText2(e.target.value)} className="mt-2 font-mono text-sm" rows={10} />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold"><GitCompareArrows className="h-5 w-5" />差异结果</h3>
              <div className="flex gap-3 text-sm">
                <span className="text-green-600">+{added} 新增</span>
                <span className="text-red-600">-{removed} 删除</span>
                <span className="text-yellow-600">~{modified} 修改</span>
              </div>
            </div>
            <div className="space-y-1 font-mono text-sm">
              {diffs.map((d, i) => (
                <div key={i} className={`flex gap-2 rounded p-1 ${d.type === "same" ? "" : d.type === "add" ? "bg-green-600/10" : d.type === "del" ? "bg-red-600/10" : "bg-yellow-600/10"}`}>
                  <span className="w-8 text-right text-muted-foreground">{d.num}</span>
                  {d.type === "same" && <span className="text-muted-foreground"> {d.line1}</span>}
                  {d.type === "add" && <span className="text-green-600"><Plus className="inline h-3 w-3" /> {d.line2}</span>}
                  {d.type === "del" && <span className="text-red-600"><Minus className="inline h-3 w-3" /> {d.line1}</span>}
                  {d.type === "mod" && (
                    <>
                      <span className="text-red-600 line-through"><Minus className="inline h-3 w-3" /> {d.line1}</span>
                      <span className="text-green-600"><Plus className="inline h-3 w-3" /> {d.line2}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
