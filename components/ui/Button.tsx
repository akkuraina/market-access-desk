import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost" | "orange";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-body font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1C] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl";

    const variants = {
      primary:
        "bg-[#0A0A0A] text-white hover:bg-[#27272A] active:bg-[#0A0A0A] shadow-sm hover:-translate-y-0.5 active:translate-y-0 border border-black",
      orange:
        "bg-[#FF4D1C] text-white hover:bg-[#E03E0F] active:bg-[#FF4D1C] shadow-sm hover:shadow-orange hover:-translate-y-0.5 active:translate-y-0 border border-[#FF4D1C]",
      secondary:
        "border border-[#0A0A0A] text-[#0A0A0A] bg-transparent hover:bg-[#0A0A0A] hover:text-white active:bg-[#0A0A0A]/90 hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
      gold:
        "bg-[#FF4D1C] text-white hover:bg-[#E03E0F] active:bg-[#FF4D1C] font-semibold shadow-sm hover:shadow-orange hover:-translate-y-0.5",
      outline:
        "border border-black/15 text-[#0A0A0A] bg-white hover:bg-[#F4F2EC] hover:border-black/30",
      ghost:
        "text-[#0A0A0A] hover:bg-black/5 active:bg-black/10",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-sm sm:text-base px-6 py-3 gap-2.5 shadow-sm",
      xl: "text-base px-7 py-3.5 gap-3 shadow-md rounded-2xl",
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

