import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="支付已取消" description="您的支付已取消，未产生任何费用" />
      <div className="flex min-h-[60vh] items-center justify-center py-12">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <XCircle className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-extrabold">支付已取消</h2>
            <p className="mb-6 text-muted-foreground">
              您的支付已取消，未产生任何费用。
              <br />
              免费工具仍可继续使用，随时欢迎回来升级。
            </p>
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={() => navigate("/#pricing")}>
                重新查看价格
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                返回首页
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
