import { useState } from "react";
import { Copy, ArrowRight, FileCode } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export function Base64Tool() {
  const [input, setInput] = useState("Hello, ToolBox Pro!");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const convert = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      toast("转换完成！");
    } catch {
      toast("转换失败：输入格式错误", "error");
    }
  };

  return (
    <>
      <SEO title="Base64 编解码" description="在线 Base64 编码解码工具，支持中文。" keywords="Base64,编码,解码,base64 encode decode" toolD="base64" />
      <ToolPageLayout title="Base64 编解码" description="Base64 编码 / 解码，支持中文" icon="🔐" toolId="base64">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="flex gap-2">
              <Button size="sm" variant={mode === "encode" ? "default" : "outline"} onClick={() => setMode("encode")}>编码</Button>
              <Button size="sm" variant={mode === "decode" ? "default" : "outline"} onClick={() => setMode("decode")}>解码</Button>
            </div>
            <div>
              <Label>输入</Label>
              <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="font-mono" />
            </div>
            <Button className="w-full" onClick={convert}><ArrowRight className="h-4 w-4" />{mode === "encode" ? "编码" : "解码"}</Button>
            <div>
              <Label>输出</Label>
              <Textarea value={output} readOnly className="font-mono" />
            </div>
            <Button variant="outline" className="w-full" onClick={() => { navigator.clipboard.writeText(output); toast("已复制！"); }}>
              <Copy className="h-4 w-4" />复制结果
            </Button>
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
