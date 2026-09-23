import React from "react";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

export default function Loading() {
  return (
    <div className="flex-1 min-h-[70vh] flex items-center justify-center bg-[#FAF7F0] px-4 py-16">
      <LoadingIndicator statusText="LOADING CORRIDOR TELEMETRY" />
    </div>
  );
}
