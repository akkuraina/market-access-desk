import React from "react";

export interface TradePeWordmarkProps {
  className?: string;
  asLink?: boolean;
  href?: string;
  variant?: "orange" | "white" | "dark";
}

export function TradePeWordmark({
  className = "",
  asLink = true,
  href = "https://tradepe-landing.vercel.app",
  variant = "orange",
}: TradePeWordmarkProps) {
  const colorClasses =
    variant === "white"
      ? "text-white"
      : variant === "dark"
      ? "text-[#0A0A0A]"
      : "text-[#FF4D1C]";

  const content = (
    <>
      <span className={`${colorClasses} font-semibold not-italic`}>Trade</span>
      <span className={`font-italic-accent ${colorClasses} font-normal italic`}>Pe</span>
    </>
  );

  if (asLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-baseline transition-opacity hover:opacity-80 underline-offset-2 ${className}`.trim()}
        title="TradePe - Direct-Clearing Trade Infrastructure"
      >
        {content}
      </a>
    );
  }

  return (
    <span className={`inline-flex items-baseline ${className}`.trim()}>
      {content}
    </span>
  );
}

export default TradePeWordmark;

