import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-display font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mad-green focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl";

    const variants = {
      primary:
        "bg-mad-green text-mad-cream hover:bg-mad-green-light active:bg-mad-green shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 border border-mad-green-light/30",
      secondary:
        "border-2 border-mad-green text-mad-green bg-transparent hover:bg-mad-green/5 hover:border-mad-green-light active:bg-mad-green/10 hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
      gold:
        "bg-mad-gold text-mad-ink hover:bg-mad-gold-light active:bg-mad-gold font-bold shadow-sm hover:shadow hover:-translate-y-0.5",
      outline:
        "border border-mad-slate/25 text-mad-ink bg-transparent hover:bg-mad-cream-alt hover:border-mad-green/40 hover:text-mad-green",
      ghost:
        "text-mad-green hover:bg-mad-green/10 active:bg-mad-green/20",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5 shadow-sm",
      xl: "text-base sm:text-lg px-8 py-4 gap-3 shadow-md rounded-2xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
