import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Global keyboard shortcuts
// / → focus search on tools page
// g h → go home
// g t → go to tools
// g b → go to blog
// g s → go to settings
export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    let lastKey = "";
    let lastKeyTime = 0;

    const handler = (e: KeyboardEvent) => {
      // Skip if typing in input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;

      const now = Date.now();
      const key = e.key.toLowerCase();

      // Single key shortcuts
      if (key === "/" ) {
        e.preventDefault();
        navigate("/tools");
        setTimeout(() => {
          const input = document.querySelector("input[placeholder*='搜索']") as HTMLInputElement;
          input?.focus();
        }, 100);
        return;
      }

      // Two-key shortcuts (g + key)
      if (now - lastKeyTime < 500) {
        if (lastKey === "g") {
          switch (key) {
            case "h": navigate("/"); break;
            case "t": navigate("/tools"); break;
            case "b": navigate("/blog"); break;
            case "s": navigate("/settings"); break;
            case "r": navigate("/recommend"); break;
          }
          lastKey = "";
          return;
        }
      }

      lastKey = key;
      lastKeyTime = now;
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);
}
