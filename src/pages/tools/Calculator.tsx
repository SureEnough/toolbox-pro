import { useState } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function Calculator() {
  const [tab, setTab] = useState("sci");
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");

  // Loan
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanRate, setLoanRate] = useState(4.9);
  const [loanYears, setLoanYears] = useState(30);
  const [loanResult, setLoanResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  // BMI
  const [bmiH, setBmiH] = useState(170);
  const [bmiW, setBmiW] = useState(65);
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  // Unit
  const [unitType, setUnitType] = useState("length");
  const [unitValue, setUnitValue] = useState(1);
  const [unitFrom, setUnitFrom] = useState("米");
  const [unitTo, setUnitTo] = useState("千米");

  const trackUsage = useUserStore((s) => s.trackUsage);
  const show = usePaywallStore((s) => s.show);

  const calcSci = () => {
    if (!trackUsage("calculator")) { show(); return; }
    try { setResult(String(Function("return " + expr)())); }
    catch { toast("表达式错误", "error"); }
  };

  const calcLoan = () => {
    if (!trackUsage("calculator")) { show(); return; }
    const r = loanRate / 100 / 12;
    const n = loanYears * 12;
    const monthly = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setLoanResult({ monthly, total: monthly * n, interest: monthly * n - loanAmount });
  };

  const calcBMI = () => {
    if (!trackUsage("calculator")) { show(); return; }
    const bmi = bmiW / Math.pow(bmiH / 100, 2);
    let category = "", color = "";
    if (bmi < 18.5) { category = "偏瘦"; color = "#f59e0b"; }
    else if (bmi < 24) { category = "正常"; color = "#10b981"; }
    else if (bmi < 28) { category = "超重"; color = "#f59e0b"; }
    else { category = "肥胖"; color = "#ef4444"; }
    setBmiResult({ bmi, category, color });
  };

  const unitData: Record<string, [string, number][]> = {
    length: [["米", 1], ["千米", 1000], ["厘米", 0.01], ["毫米", 0.001], ["英寸", 0.0254], ["英尺", 0.3048], ["英里", 1609.34]],
    weight: [["千克", 1], ["克", 0.001], ["磅", 0.453592], ["盎司", 0.0283495], ["吨", 1000]],
    area: [["平方米", 1], ["平方千米", 1000000], ["平方英尺", 0.092903], ["英亩", 4046.86], ["公顷", 10000]],
    temp: [["摄氏度", 0], ["华氏度", 1], ["开尔文", 2]],
  };

  const convertUnit = () => {
    if (!trackUsage("calculator")) { show(); return; }
    if (unitType === "temp") {
      let c: number;
      if (unitFrom === "摄氏度") c = unitValue;
      else if (unitFrom === "华氏度") c = (unitValue - 32) * 5 / 9;
      else c = unitValue - 273.15;
      let r: number;
      if (unitTo === "摄氏度") r = c;
      else if (unitTo === "华氏度") r = c * 9 / 5 + 32;
      else r = c + 273.15;
      return r.toFixed(6);
    }
    const fromF = unitData[unitType].find(([n]) => n === unitFrom)![1];
    const toF = unitData[unitType].find(([n]) => n === unitTo)![1];
    return (unitValue * fromF / toF).toFixed(6);
  };

  const tabs = [
    { id: "sci", label: "科学计算" },
    { id: "loan", label: "贷款计算" },
    { id: "bmi", label: "BMI 计算" },
    { id: "unit", label: "单位换算" },
  ];

  const sciButtons = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","","+","(",")"];

  return (
    <ToolPageLayout title="在线计算器" description="科学计算、贷款计算、BMI、单位换算" icon="🧮" toolId="calculator">
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Button key={t.id} size="sm" variant={tab === t.id ? "default" : "outline"} onClick={() => setTab(t.id)}>{t.label}</Button>
        ))}
      </div>

      {tab === "sci" && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div><Label>表达式</Label><Input value={expr} onChange={(e) => setExpr(e.target.value)} onKeyDown={(e) => e.key === "Enter" && calcSci()} placeholder="例如：2 + 3 * 4" /></div>
            <div className="grid grid-cols-4 gap-2">
              {sciButtons.map((b) => (
                <Button key={b} variant="outline" onClick={() => setExpr(expr + b)}>{b}</Button>
              ))}
              <Button variant="outline" onClick={() => setExpr(expr + "Math.sqrt(")}>√</Button>
              <Button variant="outline" onClick={() => setExpr(expr + "Math.pow(")}>x²</Button>
              <Button variant="outline" onClick={() => setExpr(expr + "Math.sin(")}>sin</Button>
              <Button variant="outline" onClick={() => setExpr(expr + "Math.cos(")}>cos</Button>
            </div>
            <Button className="w-full" onClick={calcSci}>= 计算</Button>
            {result && <div className="text-center text-2xl font-bold">= {result}</div>}
          </CardContent>
        </Card>
      )}

      {tab === "loan" && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>贷款金额 (元)</Label><Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(+e.target.value)} /></div>
              <div><Label>年利率 (%)</Label><Input type="number" value={loanRate} onChange={(e) => setLoanRate(+e.target.value)} step="0.01" /></div>
            </div>
            <div><Label>贷款期限 (年)</Label><Input type="number" value={loanYears} onChange={(e) => setLoanYears(+e.target.value)} /></div>
            <Button className="w-full" onClick={calcLoan}>计算月供</Button>
            {loanResult && (
              <div className="rounded-lg bg-secondary p-4">
                <div className="text-center text-3xl font-extrabold text-primary">¥{loanResult.monthly.toFixed(2)}</div>
                <div className="mt-3 grid grid-cols-2 gap-4 text-center">
                  <div><div className="text-xs text-muted-foreground">还款总额</div><div className="font-bold">¥{loanResult.total.toFixed(2)}</div></div>
                  <div><div className="text-xs text-muted-foreground">利息总额</div><div className="font-bold">¥{loanResult.interest.toFixed(2)}</div></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {tab === "bmi" && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>身高 (cm)</Label><Input type="number" value={bmiH} onChange={(e) => setBmiH(+e.target.value)} /></div>
              <div><Label>体重 (kg)</Label><Input type="number" value={bmiW} onChange={(e) => setBmiW(+e.target.value)} /></div>
            </div>
            <Button className="w-full" onClick={calcBMI}>计算 BMI</Button>
            {bmiResult && (
              <div className="text-center">
                <div className="text-5xl font-extrabold" style={{ color: bmiResult.color }}>{bmiResult.bmi.toFixed(1)}</div>
                <div className="text-xl" style={{ color: bmiResult.color }}>{bmiResult.category}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {tab === "unit" && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div><Label>转换类型</Label><Select value={unitType} onChange={(e) => { setUnitType(e.target.value); setUnitFrom(unitData[e.target.value][0][0]); setUnitTo(unitData[e.target.value][1][0]); }}>
              <option value="length">长度</option><option value="weight">重量</option><option value="temp">温度</option><option value="area">面积</option>
            </Select></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>从</Label><Input type="number" value={unitValue} onChange={(e) => setUnitValue(+e.target.value)} /><Select value={unitFrom} onChange={(e) => setUnitFrom(e.target.value)} className="mt-2">{unitData[unitType].map(([n]) => <option key={n} value={n}>{n}</option>)}</Select></div>
              <div><Label>到</Label><Input value={convertUnit()} readOnly /><Select value={unitTo} onChange={(e) => setUnitTo(e.target.value)} className="mt-2">{unitData[unitType].map(([n]) => <option key={n} value={n}>{n}</option>)}</Select></div>
            </div>
          </CardContent>
        </Card>
      )}
    </ToolPageLayout>
  );
}
