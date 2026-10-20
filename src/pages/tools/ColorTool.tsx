import { useState } from "react";
import { Copy } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function hslToRgb(h: number, s: number, l: number) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}
function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function ColorTool() {
  const [hex, setHex] = useState("#6366f1");
  const [gradStart, setGradStart] = useState("#6366f1");
  const [gradEnd, setGradEnd] = useState("#f59e0b");
  const [gradDir, setGradDir] = useState("to right");

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const palette = [-40, -30, -20, -10, 0, 10, 20, 30, 40].map((s) => {
    const l = Math.max(5, Math.min(95, hsl.l + s));
    const r = hslToRgb(hsl.h, hsl.s, l);
    return rgbToHex(r.r, r.g, r.b);
  });

  const gradCss = gradDir === "circle"
    ? `background: radial-gradient(circle, ${gradStart}, ${gradEnd});`
    : `background: linear-gradient(${gradDir}, ${gradStart}, ${gradEnd});`;

  return (
    <ToolPageLayout title="颜色工具" description="HEX / RGB / HSL 互转，调色板生成" icon="🎨" toolId="color">
      <Card className="mb-6">
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-wrap gap-6">
            <div>
              <Label>颜色选择器</Label>
              <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-32 w-48 cursor-pointer rounded-lg border" />
            </div>
            <div className="flex-1 space-y-3">
              <div><Label>HEX</Label><Input value={hex} onChange={(e) => { if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) setHex(e.target.value); }} /></div>
              <div><Label>RGB</Label><Input value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} readOnly /></div>
              <div><Label>HSL</Label><Input value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} readOnly /></div>
            </div>
          </div>
          <div><Label>预览</Label><div className="h-20 rounded-lg border" style={{ background: hex }} /></div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(hex); toast("已复制！"); }}><Copy className="h-4 w-4" />复制 HEX</Button>
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`); toast("已复制！"); }}><Copy className="h-4 w-4" />复制 RGB</Button>
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`); toast("已复制！"); }}><Copy className="h-4 w-4" />复制 HSL</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <h3 className="mb-4 font-semibold">🌈 调色板</h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
            {palette.map((c) => (
              <div key={c} className="cursor-pointer rounded-lg p-2 text-center text-xs font-semibold" style={{ background: c, color: rgbToHsl(...Object.values(hexToRgb(c)) as [number, number, number]).l > 50 ? "#000" : "#fff" }} onClick={() => { navigator.clipboard.writeText(c); setHex(c); toast(`已复制 ${c}`); }}>
                {c}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <h3 className="font-semibold">🎭 CSS 渐变色</h3>
          <div className="grid grid-cols-3 gap-4">
            <div><Label>方向</Label><Select value={gradDir} onChange={(e) => setGradDir(e.target.value)}>
              <option value="to right">→ 水平</option><option value="to bottom">↓ 垂直</option><option value="45deg">↘ 对角</option><option value="circle">⭕ 径向</option>
            </Select></div>
            <div><Label>起始色</Label><Input type="color" value={gradStart} onChange={(e) => setGradStart(e.target.value)} className="h-10" /></div>
            <div><Label>结束色</Label><Input type="color" value={gradEnd} onChange={(e) => setGradEnd(e.target.value)} className="h-10" /></div>
          </div>
          <div className="h-32 rounded-lg" style={{ background: gradDir === "circle" ? `radial-gradient(circle, ${gradStart}, ${gradEnd})` : `linear-gradient(${gradDir}, ${gradStart}, ${gradEnd})` }} />
          <div><Label>CSS 代码</Label><Input value={gradCss} readOnly className="font-mono" /></div>
          <Button variant="outline" onClick={() => { navigator.clipboard.writeText(gradCss); toast("已复制 CSS！"); }}><Copy className="h-4 w-4" />复制 CSS</Button>
        </CardContent>
      </Card>
    </ToolPageLayout>
  );
}
