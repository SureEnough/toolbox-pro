import * as React from "react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastState {
  message: string;
  type: ToastType;
  id: number;
}

let toastId = 0;
const listeners: ((toast: ToastState) => void)[] = [];

export function toast(message: string, type: ToastType = "success") {
  const t = { message, type, id: ++toastId };
  listeners.forEach((fn) => fn(t));
}

export function ToastContainer() {
  const [toasts, setToasts] = React.useState<ToastState[]>([]);

  React.useEffect(() => {
    const listener = (t: ToastState) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== t.id)), 3000);
    };
    listeners.push(listener);
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }, []);

  const colors: Record<ToastType, string> = {
    success: "bg-green-600",
    error: "bg-red-500",
    info: "bg-primary",
  };

  return (
    <div className="fixed right-6 top-20 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn("rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg", colors[t.type])}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
