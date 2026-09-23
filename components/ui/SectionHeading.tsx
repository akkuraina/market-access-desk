import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: string;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg" | "xl";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  align = "left",
  size = "lg",
  className,
  ...props
}) => {
  const alignments = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const titleSizes = {
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl",
    xl: "text-4xl sm:text-5xl lg:text-6xl",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl", alignments[align], className)} {...props}>
      {badge && (
        <span className="inline-block px-3 py-1 mb-3 text-xs font-mono-data uppercase tracking-wider text-[#0A0A0A] font-semibold bg-black/5 border border-black/10 rounded-full">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "font-display font-semibold text-[#0A0A0A] tracking-tight leading-[1.15]",
          titleSizes[size]
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-body text-sm sm:text-base text-[#52525B] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

