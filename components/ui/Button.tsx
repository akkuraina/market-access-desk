import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-display font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mad-green focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl";

    const variants = {
      primary:
        "bg-mad-green text-mad-cream hover:bg-mad-green-light active:bg-mad-green shadow-sm hover:shadow",
      secondary:
        "border-2 border-mad-green text-mad-green bg-transparent hover:bg-mad-green/5 active:bg-mad-green/10",
      gold:
        "bg-mad-gold text-mad-ink hover:bg-mad-gold-light active:bg-mad-gold font-bold shadow-sm",
      outline:
        "border border-mad-slate/30 text-mad-ink bg-transparent hover:bg-mad-cream-alt hover:border-mad-green/40",
      ghost:
        "text-mad-green hover:bg-mad-green/10 active:bg-mad-green/20",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5",
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
