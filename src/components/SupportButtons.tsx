import { Coffee, Heart, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SupportButtonsProps {
  className?: string;
  variant?: "buttons" | "banner";
}

export function SupportButtons({ className, variant = "buttons" }: SupportButtonsProps) {
  if (variant === "banner") {
    return (
      <div className={cn("flex flex-col items-center gap-4 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 text-center sm:flex-row sm:text-left", className)}>
        <Heart className="h-10 w-10 shrink-0 text-primary" />
        <div className="flex-1">
          <h3 className="font-bold">喜欢 ToolBox Pro？</h3>
          <p className="text-sm text-muted-foreground">支持我们继续开发更多免费工具</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => window.open("https://www.buymeacoffee.com/toolboxpro", "_blank")}
          >
            <Coffee className="h-4 w-4" />
            请喝咖啡
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open("https://github.com/sponsors/SureEnough", "_blank")}
          >
            <Github className="h-4 w-4" />
            Sponsor
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open("https://www.buymeacoffee.com/toolboxpro", "_blank")}
      >
        <Coffee className="h-4 w-4" />
        请喝咖啡 ☕
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open("https://github.com/sponsors/SureEnough", "_blank")}
      >
        <Heart className="h-4 w-4" />
        Sponsor
      </Button>
    </div>
  );
}
