import { useState } from "react";
import { Copy, ArrowRight } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export function UrlEncoder() {
  const [input, setInput] = useState("https://example.com/search?q=在线工具&lang=zh");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const convert = () => {
    try {
      if (mode === "encode") setOutput(encodeURIComponent(input));
      else if (mode === "decode") setOutput(decodeURIComponent(input));
      else if (mode === "encode-uri") setOutput(encodeURI(input));
      else if (mode === "decode-uri") setOutput(decodeURI(input));
      toast("转换完成！");
    } catch(e) { toast("解码失败：格式错误", "error"); }
  };

  return (
    <>
      <SEO title="URL 编解码工具" description="在线 URL 编码解码，支持 encodeURIComponent/decodeURIComponent/encodeURI/decodeURI。" keywords="URL编码,URL解码,encodeURIComponent,decodeURIComponent,URI编码" toolD="url-encoder" />
      <ToolPageLayout title="URL 编解码" description="URL 编码、解码、URI 组件处理" icon="🌐" toolId="url-encoder">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label>操作模式</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  ["encode", "encodeURIComponent"],
                  ["decode", "decodeURIComponent"],
                  ["encode-uri", "encodeURI"],
                  ["decode-uri", "decodeURI"],
                ].map(([v, label]) => (
                  <Button key={v} size="sm" variant={mode === v ? "default" : "outline"} onClick={() => { setMode(v); }}>{label}</Button>
                ))}
              </div>
            </div>
            <div>
              <Label>输入</Label>
              <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="font-mono" />
            </div>
            <Button className="w-full" onClick={convert}>
              <ArrowRight className="h-4 w-4" />转换
            </Button>
            <div>
              <Label>输出</Label>
              <Textarea value={output} readOnly className="font-mono" />
            </div>
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(output); toast("已复制！"); }}>
              <Copy className="h-4 w-4" />复制结果
            </Button>
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
