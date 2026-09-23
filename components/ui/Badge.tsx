import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "gold" | "slate" | "outline" | "phase2" | "subtle" | "orange" | "black" | "zinc";
  size?: "xs" | "sm" | "md";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "subtle",
  size = "sm",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-mono-data rounded-full tracking-wide transition-colors";

  const variants = {
    subtle: "bg-[#0A0A0A]/5 text-[#0A0A0A] border border-[#0A0A0A]/10 font-medium",
    green: "bg-[#0A0A0A] text-white border border-[#0A0A0A] font-semibold",
    gold: "bg-[#FF4D1C]/10 text-[#0A0A0A] border border-[#FF4D1C]/30 font-semibold",
    slate: "bg-black/5 text-[#52525B] border border-black/10 font-medium",
    zinc: "bg-black/5 text-[#52525B] border border-black/10 font-medium",
    outline: "border border-[#0A0A0A]/20 text-[#0A0A0A] bg-transparent font-medium",
    phase2: "bg-[#FF4D1C]/10 text-[#0A0A0A] border border-dashed border-[#FF4D1C]/50 uppercase tracking-wider font-semibold",
    orange: "bg-[#FF4D1C] text-white border border-[#FF4D1C] font-semibold",
    black: "bg-[#0A0A0A] text-white border border-[#0A0A0A] font-semibold",
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

