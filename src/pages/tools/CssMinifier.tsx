import { useState } from "react";
import { Copy, Minimize2, Maximize2 } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export function CssMinifier() {
  const [input, setInput] = useState(`.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.button {\n  background: #6366f1;\n  color: white;\n  border-radius: 8px;\n  padding: 12px 24px;\n}`);
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"minify" | "beautify">("minify");

  const process = () => {
    let css = input;
    if (mode === "minify") {
      css = css
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}:;,])\s*/g, "$1")
        .replace(/;}/g, "}")
        .trim();
    } else {
      css = css
        .replace(/\{/g, " {\n  ")
        .replace(/\}/g, "\n}\n")
        .replace(/;/g, ";\n  ")
        .replace(/\n\s*\n/g, "\n")
        .replace(/\n  \}/g, "\n}")
        .trim();
    }
    setOutput(css);
    const saved = input.length - css.length;
    toast(`${mode === "minify" ? "压缩" : "美化"}完成！${mode === "minify" ? `节省 ${saved} 字符 (${((saved/input.length)*100).toFixed(1)}%)` : ""}`);
  };

  return (
    <>
      <SEO title="CSS 压缩美化" description="在线 CSS 压缩和美化工具，减小文件体积。" keywords="CSS压缩,CSS美化,CSS minify,beautify,样式优化" toolD="css-minifier" />
      <ToolPageLayout title="CSS 压缩/美化" description="压缩 CSS 减小体积，或美化便于阅读" icon="🎨" toolId="css-minifier">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="flex gap-2">
              <Button size="sm" variant={mode === "minify" ? "default" : "outline"} onClick={() => setMode("minify")}><Minimize2 className="h-4 w-4" />压缩</Button>
              <Button size="sm" variant={mode === "beautify" ? "default" : "outline"} onClick={() => setMode("beautify")}><Maximize2 className="h-4 w-4" />美化</Button>
            </div>
            <div>
              <Label>输入 CSS</Label>
              <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="font-mono text-sm" rows={10} />
            </div>
            <Button className="w-full" onClick={process}>{mode === "minify" ? "压缩" : "美化"}</Button>
            <div>
              <Label>输出 ({output.length} 字符)</Label>
              <Textarea value={output} readOnly className="font-mono text-sm" rows={10} />
            </div>
            <Button variant="outline" className="w-full" onClick={() => { navigator.clipboard.writeText(output); toast("已复制！"); }}><Copy className="h-4 w-4" />复制</Button>
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
