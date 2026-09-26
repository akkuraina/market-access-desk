"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, Building2, User, Mail } from "lucide-react";

interface StepNewCustomerInfoProps {
  onContinue: (userData: { name: string; company: string; email: string }) => void;
  onBack?: () => void;
}

export const StepNewCustomerInfo: React.FC<StepNewCustomerInfoProps> = ({
  onContinue,
  onBack,
}) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    company?: string;
    email?: string;
  }>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    const cleanName = name.trim();
    if (!cleanName) {
      newErrors.name = "Please enter your full name.";
    }

    const cleanCompany = company.trim();
    if (!cleanCompany) {
      newErrors.company = "Please enter your enterprise or company name.";
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      newErrors.email = "Please enter your business email.";
    } else if (!emailRegex.test(cleanEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onContinue({
      name: cleanName,
      company: cleanCompany,
      email: cleanEmail,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Editorial Headline & Hierarchy */}
      <div className="w-full text-left mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 mb-4">
          <Sparkles className="h-3.5 w-3.5 text-[#FF4D1C]" />
          <span className="font-mono-data text-[11px] uppercase tracking-wider font-semibold text-[#0A0A0A]">
            TradePe Account Setup
          </span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-[1.1] mb-3">
          Hi, a few details to get started.
        </h1>
        <p className="font-body text-base sm:text-lg text-[#706E6B] font-light leading-relaxed">
          Let&apos;s personalize your global direct-clearing readiness journey.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="new-user-name"
            className="block font-mono-data text-xs uppercase tracking-wider font-semibold text-[#0A0A0A] mb-1.5"
          >
            Your Full Name
          </label>
          <div className="relative">
            <input
              id="new-user-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="e.g. Ananya Singhania"
              className={`w-full px-4 py-3.5 pl-11 rounded-xl bg-white border-2 text-[#0A0A0A] placeholder:text-[#706E6B]/50 font-body text-base transition-all focus:outline-none ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-black/10 focus:border-[#0A0A0A]"
              }`}
            />
            <User className="h-5 w-5 text-[#706E6B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600 font-mono-data">{errors.name}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label
            htmlFor="new-user-company"
            className="block font-mono-data text-xs uppercase tracking-wider font-semibold text-[#0A0A0A] mb-1.5"
          >
            Company / Export Enterprise
          </label>
          <div className="relative">
            <input
              id="new-user-company"
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
              }}
              placeholder="e.g. Singhania Global Apparel"
              className={`w-full px-4 py-3.5 pl-11 rounded-xl bg-white border-2 text-[#0A0A0A] placeholder:text-[#706E6B]/50 font-body text-base transition-all focus:outline-none ${
                errors.company
                  ? "border-red-500 focus:border-red-500"
                  : "border-black/10 focus:border-[#0A0A0A]"
              }`}
            />
            <Building2 className="h-5 w-5 text-[#706E6B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {errors.company && (
            <p className="mt-1.5 text-xs text-red-600 font-mono-data">{errors.company}</p>
          )}
        </div>

        {/* Business Email */}
        <div>
          <label
            htmlFor="new-user-email"
            className="block font-mono-data text-xs uppercase tracking-wider font-semibold text-[#0A0A0A] mb-1.5"
          >
            Business Email
          </label>
          <div className="relative">
            <input
              id="new-user-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="ananya@singhaniaglobal.com"
              className={`w-full px-4 py-3.5 pl-11 rounded-xl bg-white border-2 text-[#0A0A0A] placeholder:text-[#706E6B]/50 font-body text-base transition-all focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-black/10 focus:border-[#0A0A0A]"
              }`}
            />
            <Mail className="h-5 w-5 text-[#706E6B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600 font-mono-data">{errors.email}</p>
          )}
        </div>

        {/* Single Continue Button */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#0A0A0A] text-white font-display font-semibold text-lg border-2 border-[#0A0A0A] hover:border-[#FF4D1C] shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Continue to Corridor Selection</span>
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
