import { useState } from "react";
import { Regex, Check, X } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export function RegexTester() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("ToolBox Pro has 12 tools and 999 users in 2026.");
  const [matches, setMatches] = useState<string[]>([]);

  const test = () => {
    try {
      const re = new RegExp(pattern, flags);
      const result: string[] = [];
      if (flags.includes("g")) {
        let m;
        while ((m = re.exec(text)) !== null) { result.push(m[0]); }
      } else {
        const m = re.exec(text);
        if (m) result.push(m[0]);
      }
      setMatches(result);
      toast(`找到 ${result.length} 个匹配`);
    } catch (e: any) {
      toast(e.message || "正则表达式错误", "error");
    }
  };

  return (
    <>
      <SEO title="正则表达式测试" description="在线正则表达式测试工具，实时匹配高亮。" keywords="正则表达式,regex,regexp,正则测试,regular expression" toolD="regex" />
      <ToolPageLayout title="正则表达式测试" description="实时测试正则表达式匹配结果" icon="🔍" toolId="regex">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Label>正则表达式</Label>
                <Input value={pattern} onChange={(e) => setPattern(e.target.value)} className="font-mono" placeholder="\\d+" />
              </div>
              <div>
                <Label>标志</Label>
                <Input value={flags} onChange={(e) => setFlags(e.target.value)} className="font-mono" placeholder="g" />
              </div>
            </div>
            <div>
              <Label>测试文本</Label>
              <Textarea value={text} onChange={(e) => setText(e.target.value)} className="font-mono" rows={4} />
            </div>
            <Button className="w-full" onClick={test}><Regex className="h-4 w-4" />执行匹配</Button>
            {matches.length > 0 && (
              <div>
                <Label>匹配结果 ({matches.length})</Label>
                <div className="space-y-1">
                  {matches.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-secondary p-2 font-mono text-sm">
                      <Check className="h-4 w-4 text-green-600" />{m}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {matches.length === 0 && pattern && (
              <div className="flex items-center gap-2 rounded-lg bg-secondary p-3 text-sm text-muted-foreground">
                <X className="h-4 w-4" />无匹配结果
              </div>
            )}
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
