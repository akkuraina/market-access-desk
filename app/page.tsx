import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FiveTierSection } from "@/components/home/FiveTierSection";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      <HeroSection />
      <FiveTierSection />
    </div>
  );
}
