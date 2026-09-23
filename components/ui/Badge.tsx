import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "gold" | "slate" | "outline" | "phase2" | "subtle";
  size?: "xs" | "sm" | "md";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "green",
  size = "sm",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-display rounded-full tracking-wide transition-colors";

  const variants = {
    subtle: "bg-mad-green/5 text-mad-green/90 border border-mad-green/15 font-medium",
    green: "bg-mad-green/10 text-mad-green border border-mad-green/25 font-semibold",
    gold: "bg-mad-gold/15 text-mad-ink border border-mad-gold/40 font-semibold",
    slate: "bg-mad-slate/10 text-mad-slate border border-mad-slate/20 font-medium",
    outline: "border border-mad-green/30 text-mad-green bg-transparent font-medium",
    phase2: "bg-mad-gold/10 text-mad-ink/90 border border-dashed border-mad-gold/60 font-mono-data uppercase tracking-wider font-semibold",
  };

  const sizes = {
    xs: "text-[10px] px-2 py-0.5 gap-1",
    sm: "text-[11px] px-2.5 py-0.5 gap-1.5",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
