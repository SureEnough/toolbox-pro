import { useState } from "react";
import { Sparkles, Minimize2, CheckCircle2, Table2, Copy, Download } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function JsonFormatter() {
  const [input, setInput] = useState(`{"name":"ToolBox Pro","version":"1.0.0","tools":["password","qrcode","json"],"users":100000}`);
  const [output, setOutput] = useState("");
  const [alert, setAlert] = useState<{ type: string; msg: string } | null>(null);

  const trackUsage = useUserStore((s) => s.trackUsage);
  const isPro = useUserStore((s) => s.plan === "pro");
  const show = usePaywallStore((s) => s.show);

  const parse = (): any | null => {
    if (!input.trim()) { setAlert({ type: "error", msg: "请输入 JSON 数据" }); return null; }
    try { return JSON.parse(input); }
    catch (e) { setAlert({ type: "error", msg: "JSON 解析错误: " + (e as Error).message }); return null; }
  };

  const format = () => {
    if (!trackUsage("json")) { show(); return; }
    const data = parse();
    if (data === null) return;
    const out = JSON.stringify(data, null, 2);
    setOutput(out);
    setAlert({ type: "success", msg: `✅ 格式化成功！共 ${out.length} 字符` });
  };

  const minify = () => {
    if (!trackUsage("json")) { show(); return; }
    const data = parse();
    if (data === null) return;
    const out = JSON.stringify(data);
    setOutput(out);
    setAlert({ type: "success", msg: `✅ 压缩成功！共 ${out.length} 字符` });
  };

  const validate = () => {
    if (!trackUsage("json")) { show(); return; }
    const data = parse();
    if (data === null) return;
    const type = Array.isArray(data) ? "数组" : "对象";
    const keys = Array.isArray(data) ? data.length : Object.keys(data).length;
    setAlert({ type: "success", msg: `✅ 有效的 JSON ${type}！包含 ${keys} 个${Array.isArray(data) ? "元素" : "键"}` });
  };

  const toCSV = () => {
    if (!isPro) { show(); return; }
    const data = parse();
    if (data === null) return;
    if (!Array.isArray(data)) { setAlert({ type: "error", msg: "CSV 转换需要 JSON 数组格式" }); return; }
    if (!data.length) { setAlert({ type: "error", msg: "数组为空" }); return; }
    const keys = Object.keys(data[0]);
    const csv = [keys.join(","), ...data.map((row) => keys.map((k) => `"${row[k] ?? ""}"`).join(","))];
    setOutput(csv.join("\n"));
    setAlert({ type: "success", msg: "✅ CSV 转换成功！" });
  };

  return (
    <ToolPageLayout title="JSON 格式化工具" description="格式化、压缩、验证 JSON 数据" icon="📋" toolId="json">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label>输入 JSON</Label>
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[200px] font-mono" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Button onClick={format}><Sparkles className="h-4 w-4" />格式化</Button>
            <Button variant="outline" onClick={minify}><Minimize2 className="h-4 w-4" />压缩</Button>
            <Button variant="outline" onClick={validate}><CheckCircle2 className="h-4 w-4" />验证</Button>
            <Button variant="outline" onClick={toCSV}><Table2 className="h-4 w-4" />转 CSV</Button>
          </div>

          {alert && (
            <div className={cn(
              "rounded-md border p-3 text-sm",
              alert.type === "success" ? "border-green-500/30 bg-green-500/10 text-green-600" : "border-red-500/30 bg-red-500/10 text-red-500"
            )}>{alert.msg}</div>
          )}

          <div>
            <Label>输出结果</Label>
            <Textarea value={output} readOnly className="min-h-[200px] font-mono" />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(output); toast("已复制！"); }}>
              <Copy className="h-4 w-4" />复制结果
            </Button>
            <Button variant="outline" onClick={() => {
              const blob = new Blob([output], { type: "application/json" });
              const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "formatted.json"; a.click();
              toast("文件已下载！");
            }}>
              <Download className="h-4 w-4" />下载 JSON
            </Button>
          </div>
        </CardContent>
      </Card>
    </ToolPageLayout>
  );
}
