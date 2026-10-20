import { useState } from "react";
import { Copy } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { toast } from "@/components/ui/toast";

export function TextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const trackUsage = useUserStore((s) => s.trackUsage);
  const show = usePaywallStore((s) => s.show);

  const stats = {
    chars: input.length,
    words: input.trim() ? input.trim().split(/\s+/).length : 0,
    lines: input ? input.split("\n").length : 0,
    bytes: new Blob([input]).size,
  };

  const op = (fn: (s: string) => string) => {
    if (!trackUsage("text")) { show(); return; }
    setOutput(fn(input));
    toast("操作完成！");
  };

  const ops = [
    { label: "大写", fn: (s: string) => s.toUpperCase() },
    { label: "小写", fn: (s: string) => s.toLowerCase() },
    { label: "首字母大写", fn: (s: string) => s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()) },
    { label: "去首尾空格", fn: (s: string) => s.trim() },
    { label: "行去重", fn: (s: string) => [...new Set(s.split("\n"))].join("\n") },
    { label: "行排序", fn: (s: string) => s.split("\n").sort().join("\n") },
    { label: "反转", fn: (s: string) => s.split("").reverse().join("") },
    { label: "Base64 编码", fn: (s: string) => btoa(unescape(encodeURIComponent(s))) },
    { label: "Base64 解码", fn: (s: string) => { try { return decodeURIComponent(escape(atob(s))); } catch { toast("Base64 解码失败", "error"); return s; } } },
  ];

  return (
    <ToolPageLayout title="文本工具" description="字数统计、大小写转换、Base64 编解码等" icon="📝" toolId="text">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label>输入文本</Label>
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="在此输入文本..." />
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {stats && [
              { label: "字符数", value: stats.chars },
              { label: "单词数", value: stats.words },
              { label: "行数", value: stats.lines },
              { label: "字节数", value: stats.bytes },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-secondary p-3 text-center">
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {ops.map((o) => (
              <Button key={o.label} variant="outline" size="sm" onClick={() => op(o.fn)}>{o.label}</Button>
            ))}
          </div>

          <div>
            <Label>输出结果</Label>
            <Textarea value={output} readOnly />
          </div>

          <Button variant="outline" onClick={() => { navigator.clipboard.writeText(output); toast("已复制！"); }}>
            <Copy className="h-4 w-4" />复制结果
          </Button>
        </CardContent>
      </Card>
    </ToolPageLayout>
  );
}
