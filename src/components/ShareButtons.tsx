import { Twitter, Facebook, Linkedin, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
}

export function ShareButtons({ title, url, description = "" }: ShareButtonsProps) {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const shares = [
    {
      icon: Twitter,
      label: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      icon: Facebook,
      label: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast("链接已复制！");
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: shareUrl });
      } catch {}
    } else {
      copyLink();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">分享：</span>
      {shares.map((s) => (
        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="icon" title={s.label}>
            <s.icon className="h-4 w-4" />
          </Button>
        </a>
      ))}
      <Button variant="outline" size="icon" onClick={copyLink} title="复制链接">
        <Link2 className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={nativeShare} title="分享">
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
