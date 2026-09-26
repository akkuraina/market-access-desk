"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

interface StepSignInProps {
  onContinue: (userData: { name: string; email: string }) => void;
  onBack?: () => void;
}

export const StepSignIn: React.FC<StepSignInProps> = ({ onContinue, onBack }) => {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Demo simplification: derive a clean, capitalized display name from email's local part
  // (e.g. "akanksha@tradepe.com" -> "Akanksha") so downstream personalized screens have a greeting.
  // Note: In a production environment, this would resolve via real account identity lookup.
  const deriveDisplayName = (emailStr: string): string => {
    const rawLocal = emailStr.split("@")[0] || "Exporter";
    const cleaned = rawLocal.replace(/[^a-zA-Z]/g, " ").trim().split(" ")[0] || rawLocal;
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      newErrors.email = "Please enter your TradePe email address.";
    } else if (!emailRegex.test(cleanEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const displayName = deriveDisplayName(cleanEmail);

    // Note: State is maintained strictly in component/wizard memory for the active session.
    // No values are transmitted over network or saved to localStorage/sessionStorage.
    onContinue({
      name: displayName,
      email: cleanEmail,
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8 sm:py-12">
      {/* Centered Elevated Premium Panel */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-black/[0.08] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
      >
        {/* Headline & Subtext */}
        <div className="mb-6 sm:mb-8 text-left">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight mb-2">
            Welcome back.
          </h1>
          <p className="font-body text-sm sm:text-base text-[#706E6B] font-light">
            Sign in with your TradePe account
          </p>
        </div>

        {/* 2-Field Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email Address */}
          <div>
            <label
              htmlFor="signin-email"
              className="block font-mono-data text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]/90 mb-1.5 text-left"
            >
              Email Address
            </label>
            <input
              id="signin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="name@enterprise.com"
              className={`w-full px-4 py-3.5 rounded-xl bg-[#FAF7F0]/50 border text-[#0A0A0A] placeholder:text-[#706E6B]/40 font-body text-base transition-all duration-200 focus:outline-none focus:bg-white focus:border-[#FF4D1C] focus:ring-2 focus:ring-[#FF4D1C]/20 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-black/15"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600 font-mono-data text-left">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="signin-password"
              className="block font-mono-data text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]/90 mb-1.5 text-left"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="••••••••••••"
                className={`w-full px-4 py-3.5 pr-12 rounded-xl bg-[#FAF7F0]/50 border text-[#0A0A0A] placeholder:text-[#706E6B]/40 font-body text-base transition-all duration-200 focus:outline-none focus:bg-white focus:border-[#FF4D1C] focus:ring-2 focus:ring-[#FF4D1C]/20 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-black/15"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#706E6B] hover:text-[#0A0A0A] p-1.5 rounded-lg transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-600 font-mono-data text-left">{errors.password}</p>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#FF4D1C] hover:bg-[#E03D0F] text-white font-display font-semibold text-base sm:text-lg shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99]"
            >
              <span>Sign In</span>
              <ArrowRight className="h-5 w-5 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Privacy & Demo Disclosure */}
          <p className="pt-1 text-center font-mono-data text-[11px] text-[#706E6B]/80 leading-relaxed">
            This is a demo environment. Nothing you enter here is stored or transmitted.
          </p>
        </form>
      </motion.div>

      {/* Back Link */}
      {onBack && (
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onBack}
            className="font-mono-data text-xs text-[#706E6B] hover:text-[#0A0A0A] transition-colors underline underline-offset-4"
          >
            ← Back to entry screen
          </button>
        </div>
      )}
    </div>
  );
};

