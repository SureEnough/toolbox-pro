import { useState } from "react";
import { Eye, FileText } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

function renderMarkdown(md: string): string {
  let html = md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-extrabold mt-4 mb-2">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-2">');
  return '<p class="mb-2">' + html + '</p>';
}

export function MarkdownPreviewer() {
  const [md, setMd] = useState("# Hello ToolBox Pro\n\n这是一个 **Markdown** 预览工具。\n\n## 功能\n- 实时预览\n- 支持常见语法\n- `代码` 高亮\n\n[访问官网](https://toolbox.pro)");

  return (
    <>
      <SEO title="Markdown 预览器" description="在线 Markdown 编辑器和实时预览工具。" keywords="Markdown,预览,编辑器,md,实时预览" toolD="markdown" />
      <ToolPageLayout title="Markdown 预览" description="实时编辑和预览 Markdown" icon="📝" toolId="markdown">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <Label>编辑器</Label>
              <Textarea value={md} onChange={(e) => setMd(e.target.value)} className="mt-2 font-mono text-sm" rows={20} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Label className="flex items-center gap-1"><Eye className="h-4 w-4" />预览</Label>
              <div className="mt-2 min-h-[400px] rounded-lg border p-4" dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }} />
            </CardContent>
          </Card>
        </div>
      </ToolPageLayout>
    </>
  );
}
