import { useState } from "react";
import { Copy, ArrowRight } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export function NumberBaseConverter() {
  const [value, setValue] = useState("255");
  const [fromBase, setFromBase] = useState("10");
  const [results, setResults] = useState<Record<string, string>>({});

  const convert = () => {
    try {
      const num = parseInt(value, parseInt(fromBase));
      if (isNaN(num)) throw new Error("无效数字");
      setResults({
        "二进制 (BIN)": num.toString(2),
        "八进制 (OCT)": num.toString(8),
        "十进制 (DEC)": num.toString(10),
        "十六进制 (HEX)": num.toString(16).toUpperCase(),
      });
      toast("转换完成！");
    } catch (e: any) {
      toast(e.message || "转换失败", "error");
    }
  };

  return (
    <>
      <SEO title="进制转换工具" description="二进制、八进制、十进制、十六进制互转。" keywords="进制转换,二进制,十进制,十六进制,八进制,BIN,HEX,DEC,OCT" toolD="number-base" />
      <ToolPageLayout title="进制转换" description="BIN / OCT / DEC / HEX 互转" icon="🔢" toolId="number-base">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>输入值</Label>
                <Input value={value} onChange={(e) => setValue(e.target.value)} className="font-mono" />
              </div>
              <div>
                <Label>源进制</Label>
                <Select value={fromBase} onChange={(e) => setFromBase(e.target.value)}>
                  <option value="2">二进制 (2)</option>
                  <option value="8">八进制 (8)</option>
                  <option value="10">十进制 (10)</option>
                  <option value="16">十六进制 (16)</option>
                </Select>
              </div>
            </div>
            <Button className="w-full" onClick={convert}><ArrowRight className="h-4 w-4" />转换</Button>
            {Object.entries(results).map(([label, val]) => (
              <div key={label} className="flex items-center gap-2">
                <Label className="w-32 shrink-0">{label}</Label>
                <Input value={val} readOnly className="font-mono" />
                <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(val); toast("已复制！"); }}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
