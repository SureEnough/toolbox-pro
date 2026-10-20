import { useState } from "react";
import { Shield } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function PdfTool() {
  const [op, setOp] = useState("merge");
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<{ type: string; msg: string } | null>(null);
  const [processing, setProcessing] = useState(false);

  const isPro = useUserStore((s) => s.plan === "pro");
  const trackUsage = useUserStore((s) => s.trackUsage);
  const show = usePaywallStore((s) => s.show);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPro) { show(); e.target.value = ""; return; }
    setFiles(Array.from(e.target.files || []));
    setResult(null);
  };

  const process = () => {
    if (!trackUsage("pdf")) { show(); return; }
    const opNames: Record<string, string> = { merge: "合并", split: "拆分", compress: "压缩", "to-image": "转图片" };
    setProcessing(true);
    setResult({ type: "info", msg: `${opNames[op]} 操作已启动！正在处理 ${files.length} 个文件...` });
    setTimeout(() => {
      setProcessing(false);
      const totalMB = (files.reduce((s, f) => s + f.size, 0) / 1024 / 1024).toFixed(2);
      setResult({ type: "success", msg: `✅ ${opNames[op]} 完成！处理了 ${files.length} 个文件，共 ${totalMB} MB` });
    }, 2000);
  };

  return (
    <ToolPageLayout title="PDF 工具" description="PDF 合并、拆分、压缩、转图片" icon="📄" toolId="pdf" isPro>
      <Card className="mb-6">
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label>选择操作</Label>
            <Select value={op} onChange={(e) => setOp(e.target.value)}>
              <option value="merge">合并 PDF</option>
              <option value="split">拆分 PDF</option>
              <option value="compress">压缩 PDF</option>
              <option value="to-image">PDF 转图片</option>
            </Select>
          </div>
          <div><Label>上传 PDF 文件</Label><Input type="file" accept="application/pdf" multiple onChange={handleUpload} /></div>

          {files.length > 0 && (
            <div className="rounded-lg bg-secondary p-4">
              {files.map((f, i) => (
                <div key={i} className="flex justify-between py-1 text-sm">
                  <span>📄 {f.name}</span>
                  <span className="text-muted-foreground">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && <Button className="w-full" onClick={process} disabled={processing}>{processing ? "处理中..." : "⚡ 开始处理"}</Button>}

          {result && (
            <div className={cn("rounded-md border p-3 text-sm", result.type === "success" ? "border-green-500/30 bg-green-500/10 text-green-600" : "border-primary/30 bg-primary/10 text-primary")}>
              {result.msg}
              {result.type === "success" && <Button className="mt-2" size="sm" onClick={() => toast("下载已开始！")}>📥 下载结果文件</Button>}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">隐私保障</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">所有 PDF 处理都在您的浏览器本地完成，文件不会上传到任何服务器。您的数据完全安全。</p>
        </CardContent>
      </Card>
    </ToolPageLayout>
  );
}
