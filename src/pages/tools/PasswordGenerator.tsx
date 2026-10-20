import { useState } from "react";
import { KeyRound, Copy, Dices } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Slider, Checkbox, Select } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { toast } from "@/components/ui/toast";

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);

  const trackUsage = useUserStore((s) => s.trackUsage);
  const show = usePaywallStore((s) => s.show);

  const generate = () => {
    if (!trackUsage("password")) { show(); return; }

    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { toast("请至少选择一种字符类型", "error"); return; }

    const crypto = window.crypto;
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const arr = new Uint32Array(length);
      crypto.getRandomValues(arr);
      let pwd = "";
      for (let j = 0; j < length; j++) pwd += chars[arr[j] % chars.length];
      result.push(pwd);
    }
    setPasswords(result);
    toast(`已生成 ${count} 个密码`);
  };

  return (
    <ToolPageLayout title="密码生成器" description="生成强随机密码，保护您的账户安全" icon="🔐" toolId="password">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label>密码长度: {length}</Label>
            <Slider value={length} min={4} max={64} onChange={(e) => setLength(+e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 text-sm"><Checkbox checked={upper} onChange={(e) => setUpper(e.target.checked)} /> 大写字母 (A-Z)</label>
            <label className="flex items-center gap-2 text-sm"><Checkbox checked={lower} onChange={(e) => setLower(e.target.checked)} /> 小写字母 (a-z)</label>
            <label className="flex items-center gap-2 text-sm"><Checkbox checked={numbers} onChange={(e) => setNumbers(e.target.checked)} /> 数字 (0-9)</label>
            <label className="flex items-center gap-2 text-sm"><Checkbox checked={symbols} onChange={(e) => setSymbols(e.target.checked)} /> 特殊符号 (!@#$)</label>
          </div>

          <div>
            <Label>生成数量</Label>
            <Select value={count} onChange={(e) => setCount(+e.target.value)}>
              <option value={1}>1 个</option>
              <option value={5}>5 个</option>
              <option value={10}>10 个</option>
            </Select>
          </div>

          <Button className="w-full" size="lg" onClick={generate}>
            <Dices className="h-5 w-5" />
            生成密码
          </Button>

          {passwords.map((pwd, i) => (
            <div key={i} className="flex gap-2">
              <Input value={pwd} readOnly className="font-mono" />
              <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(pwd); toast("已复制！"); }}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </ToolPageLayout>
  );
}
