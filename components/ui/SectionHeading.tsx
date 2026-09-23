import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
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
        <span className="inline-block px-3 py-1 mb-3 text-xs font-mono-data uppercase tracking-wider text-mad-gold font-bold bg-mad-green/10 border border-mad-green/20 rounded-full">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "font-display font-bold text-mad-green tracking-tight leading-tight",
          titleSizes[size]
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-body text-base sm:text-lg text-mad-slate leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
