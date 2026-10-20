import { useState } from "react";
import { Copy, KeySquare } from "lucide-react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Textarea, Input, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = str.length % 4;
  if (pad) str += "=".repeat(4 - pad);
  return decodeURIComponent(escape(atob(str)));
}

export function JwtDecoder() {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpmeJf36POk6yJV_adQssw5c");
  const [decoded, setDecoded] = useState<{ header: any; payload: any; signature: string } | null>(null);

  const decode = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("JWT 格式错误");
      setDecoded({
        header: JSON.parse(base64UrlDecode(parts[0])),
        payload: JSON.parse(base64UrlDecode(parts[1])),
        signature: parts[2],
      });
      toast("JWT 解码成功！");
    } catch (e: any) {
      toast(e.message || "解码失败", "error");
    }
  };

  return (
    <>
      <SEO title="JWT 解码器" description="在线解码 JWT Token，查看 header、payload 和 signature。" keywords="JWT,decode,token,JSON Web Token,JWT解码" toolD="jwt" />
      <ToolPageLayout title="JWT 解码器" description="解码 JWT Token，查看 Header / Payload / Signature" icon="🔑" toolId="jwt">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label>JWT Token</Label>
              <Textarea value={token} onChange={(e) => setToken(e.target.value)} className="font-mono text-xs" rows={4} />
            </div>
            <Button className="w-full" onClick={decode}><KeySquare className="h-4 w-4" />解码 JWT</Button>
            {decoded && (
              <>
                <div>
                  <Label>Header</Label>
                  <pre className="overflow-x-auto rounded-lg bg-secondary p-3 text-xs font-mono">{JSON.stringify(decoded.header, null, 2)}</pre>
                </div>
                <div>
                  <Label>Payload</Label>
                  <pre className="overflow-x-auto rounded-lg bg-secondary p-3 text-xs font-mono">{JSON.stringify(decoded.payload, null, 2)}</pre>
                  {decoded.payload.exp && (
                    <p className="mt-1 text-xs text-muted-foreground">过期时间: {new Date(decoded.payload.exp * 1000).toLocaleString("zh-CN")}</p>
                  )}
                </div>
                <div>
                  <Label>Signature</Label>
                  <Input value={decoded.signature} readOnly className="font-mono text-xs" />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </ToolPageLayout>
    </>
  );
}
