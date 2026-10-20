import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!email || !email.includes("@")) {
      toast("请输入有效邮箱", "error");
      return;
    }
    setLoading(true);
    try {
      // Store locally (in production, send to API / newsletter service)
      const list = JSON.parse(localStorage.getItem("toolbox_emails") || "[]");
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem("toolbox_emails", JSON.stringify(list));
      }
      setDone(true);
      toast("🎉 订阅成功！我们会定期分享新工具和技巧");
    } catch {
      toast("订阅失败，请稍后重试", "error");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl bg-green-600/10 p-4 text-green-600">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">订阅成功！感谢关注 🎉</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6">
      <div className="mb-4 flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="font-bold">订阅更新通知</h3>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        新工具上线、使用技巧、独家优惠，每周一封，绝不打扰
      </p>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <Button onClick={submit} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "订阅"}
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        🔒 邮箱安全存储，随时可退订
      </p>
    </div>
  );
}
