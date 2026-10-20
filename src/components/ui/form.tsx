import * as React from "react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

const Slider = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      type="range"
      ref={ref}
      className={cn("w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary", className)}
      {...props}
    />
  )
);
Slider.displayName = "Slider";

const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={cn("h-4 w-4 rounded border border-input accent-primary", className)}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox";

export { Select, Slider, Checkbox };
