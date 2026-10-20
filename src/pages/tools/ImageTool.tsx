import { useState, useRef } from "react";
import { Download } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { usePaywallStore } from "@/store/paywallStore";
import { toast } from "@/components/ui/toast";

export function ImageTool() {
  const [originalSrc, setOriginalSrc] = useState("");
  const [processedSrc, setProcessedSrc] = useState("");
  const [originalInfo, setOriginalInfo] = useState("");
  const [processedInfo, setProcessedInfo] = useState("");
  const [op, setOp] = useState("compress");
  const [quality, setQuality] = useState(80);
  const [resizeW, setResizeW] = useState(800);
  const [resizeH, setResizeH] = useState(600);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const processedBlobRef = useRef<Blob | null>(null);

  const isPro = useUserStore((s) => s.plan === "pro");
  const trackUsage = useUserStore((s) => s.trackUsage);
  const show = usePaywallStore((s) => s.show);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPro) { show(); e.target.value = ""; return; }
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setOriginalSrc(ev.target?.result as string);
        setOriginalInfo(`${img.width}×${img.height} | ${(file.size / 1024).toFixed(1)} KB`);
        processImage();
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    if (!imgRef.current) return;
    if (!trackUsage("image")) { show(); return; }
    const img = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    if (op === "resize") { canvas.width = resizeW; canvas.height = resizeH; }
    else { canvas.width = img.width; canvas.height = img.height; }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (op === "grayscale") {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < data.data.length; i += 4) {
        const avg = (data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3;
        data.data[i] = data.data[i + 1] = data.data[i + 2] = avg;
      }
      ctx.putImageData(data, 0, 0);
    }
    let mime = "image/png";
    if (["compress", "convert-jpg"].includes(op)) mime = "image/jpeg";
    else if (op === "convert-webp") mime = "image/webp";
    canvas.toBlob((blob) => {
      if (!blob) return;
      processedBlobRef.current = blob;
      setProcessedSrc(URL.createObjectURL(blob));
      setProcessedInfo(`${canvas.width}×${canvas.height} | ${(blob.size / 1024).toFixed(1)} KB`);
    }, mime, quality / 100);
  };

  const download = () => {
    if (!processedBlobRef.current) { toast("请先处理图片", "error"); return; }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(processedBlobRef.current);
    a.download = "processed-image";
    a.click();
    toast("图片已下载！");
  };

  return (
    <ToolPageLayout title="图片工具" description="图片压缩、格式转换、裁剪、水印" icon="🖼️" toolId="image" isPro>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div><Label>上传图片</Label><Input type="file" accept="image/*" onChange={handleUpload} /></div>

          {originalSrc && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>原始图片</Label>
                  <img src={originalSrc} className="w-full rounded-lg border" alt="original" />
                  <p className="mt-2 text-xs text-muted-foreground">{originalInfo}</p>
                </div>
                <div>
                  <Label>处理后图片</Label>
                  <img src={processedSrc} className="w-full rounded-lg border" alt="processed" />
                  <p className="mt-2 text-xs text-muted-foreground">{processedInfo}</p>
                </div>
              </div>

              <div>
                <Label>操作类型</Label>
                <Select value={op} onChange={(e) => { setOp(e.target.value); setTimeout(processImage, 0); }}>
                  <option value="compress">压缩图片</option>
                  <option value="convert-jpg">转换为 JPG</option>
                  <option value="convert-png">转换为 PNG</option>
                  <option value="convert-webp">转换为 WEBP</option>
                  <option value="resize">调整尺寸</option>
                  <option value="grayscale">灰度化</option>
                </Select>
              </div>

              {["compress", "convert-jpg", "convert-webp"].includes(op) && (
                <div><Label>质量: {quality}%</Label><Input type="range" min={10} max={100} value={quality} onChange={(e) => { setQuality(+e.target.value); processImage(); }} /></div>
              )}
              {op === "resize" && (
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>宽度 (px)</Label><Input type="number" value={resizeW} onChange={(e) => { setResizeW(+e.target.value); processImage(); }} /></div>
                  <div><Label>高度 (px)</Label><Input type="number" value={resizeH} onChange={(e) => { setResizeH(+e.target.value); processImage(); }} /></div>
                </div>
              )}

              <Button className="w-full" onClick={download}><Download className="h-4 w-4" />下载处理后的图片</Button>
            </>
          )}
        </CardContent>
      </Card>
    </ToolPageLayout>
  );
}
