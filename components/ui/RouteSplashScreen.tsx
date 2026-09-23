"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

export const RouteSplashScreen: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Smooth, lightweight initial load presentation
    const timer = setTimeout(() => {
      setVisible(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="route-splash-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAF7F0]"
          aria-live="polite"
          aria-busy="true"
        >
          <LoadingIndicator statusText="INITIALIZING DIRECT-CLEARING DESK" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteSplashScreen;
