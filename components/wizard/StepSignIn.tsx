"use client";

import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight, ShieldCheck, User } from "lucide-react";

interface StepSignInProps {
  onContinue: (userData: { name: string; pan: string; email: string }) => void;
  onBack?: () => void;
}

export const StepSignIn: React.FC<StepSignInProps> = ({ onContinue, onBack }) => {
  const [name, setName] = useState("");
  const [pan, setPan] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    pan?: string;
    email?: string;
    password?: string;
  }>({});

  // PAN format: 5 uppercase letters, 4 numbers, 1 uppercase letter (e.g. ABCDE1234F)
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (rawVal.length <= 10) {
      setPan(rawVal);
      if (errors.pan && (rawVal.length === 10 ? panRegex.test(rawVal) : true)) {
        setErrors((prev) => ({ ...prev, pan: undefined }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    const cleanName = name.trim();
    if (!cleanName) {
      newErrors.name = "Please enter your full name.";
    }

    const cleanPan = pan.trim().toUpperCase();
    if (!cleanPan) {
      newErrors.pan = "Please enter your 10-character PAN number.";
    } else if (!panRegex.test(cleanPan)) {
      newErrors.pan = "Invalid PAN format. Must match ABCDE1234F (5 letters, 4 digits, 1 letter).";
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      newErrors.email = "Please enter your business email.";
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

    onContinue({
      name: cleanName,
      pan: cleanPan,
      email: cleanEmail,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Editorial Headline & Clear Hierarchy */}
      <div className="w-full text-left mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 mb-4">
          <ShieldCheck className="h-3.5 w-3.5 text-[#FF4D1C]" />
          <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#0A0A0A]">
            TradePe Direct-Clearing Verification
          </span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.1] mb-3">
          Hi — a few details to get you set up.
        </h1>
        <p className="font-body text-base sm:text-lg text-[#706E6B] font-light leading-relaxed">
          Verify your entity credentials to unlock your live trade telemetry and multi-currency rails.
        </p>
      </div>

      {/* Vertical Verification Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="full-name"
            className="block font-mono-data text-xs uppercase tracking-wider font-semibold text-[#0A0A0A] mb-1.5"
          >
            Full Name
          </label>
          <input
            id="full-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="e.g. Vikramaditya Sharma"
            className={`w-full px-4 py-3.5 rounded-xl bg-white border-2 text-[#0A0A0A] placeholder:text-[#706E6B]/50 font-body text-base transition-all focus:outline-none ${
              errors.name
                ? "border-red-500 focus:border-red-500"
                : "border-black/10 focus:border-[#0A0A0A]"
            }`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600 font-mono-data">{errors.name}</p>
          )}
        </div>

        {/* PAN Number */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="pan-number"
              className="block font-mono-data text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]"
            >
              Entity PAN Number
            </label>
            <span className="font-mono-data text-[11px] text-[#706E6B]">
              FORMAT: 5 LETTERS, 4 DIGITS, 1 LETTER
            </span>
          </div>
          <input
            id="pan-number"
            type="text"
            value={pan}
            onChange={handlePanChange}
            placeholder="ABCDE1234F"
            maxLength={10}
            className={`w-full px-4 py-3.5 rounded-xl bg-white border-2 text-[#0A0A0A] placeholder:text-[#706E6B]/50 font-mono-data uppercase tracking-wider text-base transition-all focus:outline-none ${
              errors.pan
                ? "border-red-500 focus:border-red-500"
                : "border-black/10 focus:border-[#0A0A0A]"
            }`}
          />
          {errors.pan && (
            <p className="mt-1.5 text-xs text-red-600 font-mono-data">{errors.pan}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="business-email"
            className="block font-mono-data text-xs uppercase tracking-wider font-semibold text-[#0A0A0A] mb-1.5"
          >
            Business Email
          </label>
          <input
            id="business-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="vikram@enterprise-exports.in"
            className={`w-full px-4 py-3.5 rounded-xl bg-white border-2 text-[#0A0A0A] placeholder:text-[#706E6B]/50 font-body text-base transition-all focus:outline-none ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-black/10 focus:border-[#0A0A0A]"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600 font-mono-data">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="account-password"
            className="block font-mono-data text-xs uppercase tracking-wider font-semibold text-[#0A0A0A] mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="account-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="••••••••••••"
              className={`w-full px-4 py-3.5 pr-12 rounded-xl bg-white border-2 text-[#0A0A0A] placeholder:text-[#706E6B]/50 font-body text-base transition-all focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-black/10 focus:border-[#0A0A0A]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#706E6B] hover:text-[#0A0A0A] p-1 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600 font-mono-data">{errors.password}</p>
          )}
        </div>

        {/* Single Continue Button */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Continue</span>
            <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        {onBack && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onBack}
              className="font-mono-data text-xs text-[#706E6B] hover:text-[#0A0A0A] transition-colors underline underline-offset-4"
            >
              ← Back to entry screen
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
