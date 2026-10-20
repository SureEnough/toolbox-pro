import { useState } from "react";
import { Copy, ArrowRight, Clock } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export function TimestampConverter() {
  const [ts, setTs] = useState(Math.floor(Date.now() / 1000).toString());
  const [date, setDate] = useState(new Date().toISOString().slice(0, 19));
  const [tz, setTz] = useState("UTC");

  const tsToDate = () => {
    const t = parseInt(ts);
    if (isNaN(t)) { toast("无效时间戳", "error"); return; }
    const d = new Date(t < 1e12 ? t * 1000 : t);
    setDate(d.toISOString().slice(0, 19));
    toast("转换完成！");
  };

  const dateToTs = () => {
    const d = new Date(date);
    if (isNaN(d.getTime())) { toast("无效日期", "error"); return; }
    setTs(Math.floor(d.getTime() / 1000).toString());
    toast("转换完成！");
  };

  const now = Date.now();
  const formats = {
    "Unix (秒)": Math.floor(now / 1000),
    "Unix (毫秒)": now,
    "ISO 8601": new Date(now).toISOString(),
    "本地时间": new Date(now).toLocaleString("zh-CN"),
  };

  return (
    <>
      <SEO title="时间戳转换工具" description="Unix 时间戳与日期时间互转，支持多种格式，时区转换。开发者常用工具。" keywords="时间戳转换,Unix timestamp,日期转换,时区转换,timestamp" toolD="timestamp" />
      <ToolPageLayout title="时间戳转换" description="Unix 时间戳 ↔ 日期时间互转" icon="📅" toolId="timestamp">
        <Card className="mb-6">
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <Label>Unix 时间戳</Label>
                <Input value={ts} onChange={(e) => setTs(e.target.value)} className="font-mono" />
              </div>
              <div>
                <Label>日期时间 (UTC)</Label>
                <Input value={date} onChange={(e) => setDate(e.target.value)} className="font-mono" type="datetime-local" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={tsToDate}><ArrowRight className="h-4 w-4" />时间戳 → 日期</Button>
              <Button className="flex-1" variant="outline" onClick={dateToTs}><ArrowRight className="h-4 w-4 rotate-180" />日期 → 时间戳</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold"><Clock className="h-5 w-5" />当前时间</h3>
            <div className="space-y-2">
              {Object.entries(formats).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <span className="text-sm text-muted-foreground">{k}</span>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono">{String(v)}</code>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { navigator.clipboard.writeText(String(v)); toast("已复制！"); }}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 pt-6">
            <h3 className="font-semibold">💡 常见时间戳</h3>
            {[
              ["2026-01-01 00:00:00", 1767225600],
              ["2026-06-01 00:00:00", 1748736000],
              ["2026-12-31 23:59:59", 1798761599],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between rounded-lg bg-secondary p-3 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <code className="font-mono">{val}</code>
              </div>
            ))}
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
