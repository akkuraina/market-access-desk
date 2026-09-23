import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "gold" | "slate" | "outline" | "phase2";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "green",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-display font-medium rounded-full tracking-wide transition-colors";

  const variants = {
    green: "bg-mad-green/10 text-mad-green border border-mad-green/20",
    gold: "bg-mad-gold/15 text-mad-ink border border-mad-gold/40 font-semibold",
    slate: "bg-mad-slate/10 text-mad-slate border border-mad-slate/20",
    outline: "border border-mad-green/30 text-mad-green bg-transparent",
    phase2: "bg-mad-gold/20 text-mad-ink border border-mad-gold/50 font-mono-data text-xs uppercase font-medium",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
