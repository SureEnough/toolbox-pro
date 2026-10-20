import { useState } from "react";
import { Mail, MessageSquare, Send, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (!name || !email || !message) {
      toast("请填写所有字段", "error");
      return;
    }
    setLoading(true);
    // Store feedback locally (in production, send to API or email service)
    const feedback = JSON.parse(localStorage.getItem("toolbox_feedback") || "[]");
    feedback.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem("toolbox_feedback", JSON.stringify(feedback));
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast("消息已发送！我们会尽快回复");
    }, 800);
  };

  return (
    <>
      <SEO title="联系我们" description="联系 ToolBox Pro 团队，反馈建议或问题报告" keywords="联系,反馈,建议,contact" />
      <div className="container mx-auto max-w-lg px-6 py-12">
        <h1 className="mb-2 text-3xl font-extrabold">联系我们</h1>
        <p className="mb-8 text-muted-foreground">反馈建议、问题报告或合作意向</p>

        {sent ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mb-4 text-5xl">✅</div>
              <h2 className="mb-2 text-xl font-bold">消息已发送！</h2>
              <p className="text-muted-foreground">感谢您的反馈，我们会尽快回复</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div>
                <Label>姓名</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="您的姓名" />
              </div>
              <div>
                <Label>邮箱</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
              </div>
              <div>
                <Label>消息内容</Label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="您的反馈或问题..." rows={5} />
              </div>
              <Button className="w-full" size="lg" onClick={submit} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                发送消息
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Card className="cursor-pointer" onClick={() => window.open("https://github.com/SureEnough/toolbox-pro/issues", "_blank")}>
            <CardContent className="flex items-center gap-3 pt-6">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">GitHub Issues</span>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={() => window.open("mailto:contact@toolbox.pro")}>
            <CardContent className="flex items-center gap-3 pt-6">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">直接邮件</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
