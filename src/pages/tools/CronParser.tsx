import { useState } from "react";
import { Clock, Info } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Input, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

function parseCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length < 5 || parts.length > 6) return "无效的 Cron 表达式（需要 5-6 个字段）";

  const [min, hour, dom, mon, dow, sec] = parts;
  const desc: string[] = [];

  const fieldDesc = (val: string, name: string, unit: string) => {
    if (val === "*") return `每${unit}`;
    if (val.startsWith("*/")) return `每 ${val.slice(2)} ${unit}`;
    if (val.includes(",")) return `在 ${val} ${unit}`;
    if (val.includes("-")) return `${val.split("-")[0]} 到 ${val.split("-")[1]} ${unit}`;
    return `在第 ${val} ${unit}`;
  };

  desc.push(fieldDesc(min, "minute", "分钟"));
  desc.push(fieldDesc(hour, "hour", "小时"));
  desc.push(fieldDesc(dom, "day", "日"));
  desc.push(fieldDesc(mon, "month", "月"));
  desc.push(fieldDesc(dow, "weekday", "周"));

  return desc.join("，");
}

function nextRuns(expr: string, count: number): Date[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length < 5) return [];
  const [min, hour, dom, mon, dow] = parts;

  const matches = (val: string, n: number, max: number): boolean => {
    if (val === "*") return true;
    if (val.startsWith("*/")) return n % parseInt(val.slice(2)) === 0;
    return val.split(",").some(v => {
      if (v.includes("-")) { const [a, b] = v.split("-").map(Number); return n >= a && n <= b; }
      return parseInt(v) === n;
    });
  };

  const runs: Date[] = [];
  const now = new Date();
  const test = new Date(now.getTime() + 60000);
  test.setSeconds(0, 0);

  while (runs.length < count && test.getTime() < now.getTime() + 365 * 24 * 3600 * 1000) {
    if (
      matches(min, test.getMinutes(), 59) &&
      matches(hour, test.getHours(), 23) &&
      matches(dom, test.getDate(), 31) &&
      matches(mon, test.getMonth() + 1, 12) &&
      matches(dow, test.getDay(), 7)
    ) {
      runs.push(new Date(test));
    }
    test.setMinutes(test.getMinutes() + 1);
  }
  return runs;
}

export function CronParser() {
  const [expr, setExpr] = useState("*/5 * * * *");
  const description = parseCron(expr);
  const runs = nextRuns(expr, 5);

  return (
    <>
      <SEO title="Cron 表达式解析" description="在线 Cron 表达式解析工具，显示执行描述和下次运行时间。" keywords="cron,crontab,定时任务,cron解析,表达式" toolD="cron" />
      <ToolPageLayout title="Cron 表达式解析" description="解析 Cron 表达式，显示描述和下次运行时间" icon="⏰" toolId="cron">
        <Card className="mb-4">
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label>Cron 表达式</Label>
              <Input value={expr} onChange={(e) => setExpr(e.target.value)} className="font-mono text-lg" placeholder="*/5 * * * *" />
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm font-medium">{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["*/5 * * * *", "0 * * * *", "0 9 * * 1-5", "0 0 * * *", "0 0 1 * *", "*/30 * * * *"].map(ex => (
                <button key={ex} onClick={() => setExpr(ex)} className="rounded-full bg-secondary px-3 py-1 text-xs font-mono hover:bg-primary/10">
                  {ex}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 flex items-center gap-2 font-bold"><Clock className="h-5 w-5" />下次运行时间</h3>
            {runs.length > 0 ? (
              <div className="space-y-2">
                {runs.map((d, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                    <span className="text-sm text-muted-foreground">第 {i + 1} 次</span>
                    <span className="font-mono text-sm font-medium">{d.toLocaleString("zh-CN")}</span>
                    <span className="text-xs text-muted-foreground">{Math.round((d.getTime() - Date.now()) / 60000)} 分钟后</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">无法计算运行时间，请检查表达式</p>
            )}
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
