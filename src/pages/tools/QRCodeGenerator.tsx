import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { toast } from "@/components/ui/toast";

export function QRCodeGenerator() {
  const [type, setType] = useState("text");
  const [content, setContent] = useState("https://toolbox.pro");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiEnc, setWifiEnc] = useState("WPA");
  const [email, setEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [smsNum, setSmsNum] = useState("");
  const [smsMsg, setSmsMsg] = useState("");
  const [size, setSize] = useState(256);
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const svgRef = useRef<HTMLDivElement>(null);

  const trackUsage = useUserStore((s) => s.trackUsage);
  const show = usePaywallStore((s) => s.show);

  const qrContent = (() => {
    switch (type) {
      case "wifi": return `WIFI:T:${wifiEnc};S:${wifiSsid};P:${wifiPass};;`;
      case "email": return `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;
      case "sms": return `SMSTO:${smsNum}:${smsMsg}`;
      default: return content;
    }
  })();

  useEffect(() => {
    if (qrContent) trackUsage("qrcode");
  }, [qrContent]);

  const download = () => {
    const svg = svgRef.current?.querySelector("svg");
    if (!svg) { toast("请先生成二维码", "error"); return; }
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      canvas.width = size; canvas.height = size;
      ctx.fillStyle = bg; ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "qrcode.png";
      a.click();
      toast("二维码已下载！");
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <ToolPageLayout title="二维码生成器" description="将文本、URL、WiFi 等信息生成二维码" icon="📱" toolId="qrcode">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label>二维码类型</Label>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="text">文本 / URL</option>
              <option value="wifi">WiFi 信息</option>
              <option value="email">电子邮件</option>
              <option value="sms">短信</option>
            </Select>
          </div>

          {type === "text" && (
            <div>
              <Label>输入内容</Label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="输入文本或 URL" />
            </div>
          )}
          {type === "wifi" && (
            <>
              <div><Label>WiFi 名称 (SSID)</Label><Input value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} /></div>
              <div><Label>WiFi 密码</Label><Input value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} /></div>
              <div><Label>加密方式</Label><Select value={wifiEnc} onChange={(e) => setWifiEnc(e.target.value)}><option value="WPA">WPA/WPA2</option><option value="WEP">WEP</option><option value="nopass">无密码</option></Select></div>
            </>
          )}
          {type === "email" && (
            <>
              <div><Label>邮箱地址</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" /></div>
              <div><Label>邮件主题</Label><Input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} /></div>
            </>
          )}
          {type === "sms" && (
            <>
              <div><Label>手机号码</Label><Input value={smsNum} onChange={(e) => setSmsNum(e.target.value)} type="tel" /></div>
              <div><Label>短信内容</Label><Textarea value={smsMsg} onChange={(e) => setSmsMsg(e.target.value)} /></div>
            </>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>尺寸: {size}px</Label>
              <Input type="range" min={128} max={512} value={size} onChange={(e) => setSize(+e.target.value)} />
            </div>
            <div><Label>前景色</Label><Input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10" /></div>
            <div><Label>背景色</Label><Input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10" /></div>
          </div>

          <div className="flex justify-center">
            <div ref={svgRef} className="rounded-lg border bg-white p-4">
              {qrContent && <QRCodeSVG value={qrContent} size={size} fgColor={fg} bgColor={bg} level="H" />}
            </div>
          </div>

          <Button className="w-full" onClick={download}>
            <Download className="h-4 w-4" />
            下载二维码 PNG
          </Button>
        </CardContent>
      </Card>
    </ToolPageLayout>
  );
}
