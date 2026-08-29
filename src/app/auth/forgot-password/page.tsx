"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import {
  KeyRound,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const entityOptions: CustomSelectOption[] = [
  { value: "CP_KE", label: "Crown Paints Kenya PLC", sublabel: "Kenya Head Office", flag: "KE" },
  { value: "CP_UG", label: "Regal Paints Uganda Ltd", sublabel: "Uganda Operations", flag: "UG" },
  { value: "CP_TZ", label: "Crown Paints Tanzania Ltd", sublabel: "Arusha Operations Hub", flag: "TZ" },
  { value: "CHROMEX", label: "Chromex Colourant Limited", sublabel: "Colorant Division", flag: "CHROMEX" },
];

export default function ForgotPasswordPage() {
  const [selectedEntity, setSelectedEntity] = useState("CP_KE");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between" suppressHydrationWarning>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/images/logo/logo.png"
              alt="Crown Paints Logo"
              width={140}
              height={36}
              style={{ width: "auto", height: "auto" }}
              className="object-contain max-h-8 sm:max-h-9"
              priority
            />
            <div className="hidden sm:block h-6 w-px bg-slate-200" />
            <span className="hidden sm:block text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Password Recovery
            </span>
          </Link>

          <Link
            href="/auth/login"
            className="text-xs font-semibold text-slate-600 hover:text-[#32298A] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </header>

      {/* Main Compact Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-8">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-3.5">
            <div className="text-center pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded bg-[#32298A]/08 text-[#32298A] flex items-center justify-center mx-auto mb-2">
                <KeyRound className="w-4 h-4" />
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Reset Portal Password
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Enter registered corporate email and entity to receive reset instructions.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-3 space-y-2.5 animate-in fade-in duration-200">
                <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-slate-900">
                    Reset Link Dispatched
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    If an account exists for <strong>{email}</strong>, we have sent password reset instructions.
                  </p>
                </div>
                <Link href="/auth/login" className="block pt-1">
                  <Button className="w-full h-8 bg-[#32298A] hover:bg-[#261e6d] text-white font-semibold text-xs rounded-lg">
                    Return to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-slate-800">
                    Target Regional Entity *
                  </Label>
                  <CustomSelect
                    options={entityOptions}
                    value={selectedEntity}
                    onChange={(val) => setSelectedEntity(val)}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="reset-email" className="text-xs font-semibold text-slate-800">
                    Registered Corporate Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="procurement@company.co.ke"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      suppressHydrationWarning
                      className="pl-8 h-8 text-xs border-slate-200 focus:border-[#32298A]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  suppressHydrationWarning
                  className="w-full h-8 bg-[#32298A] hover:bg-[#261e6d] text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer rounded-lg mt-1"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Sending Instructions…</span>
                    </>
                  ) : (
                    <>
                      <span>Send Recovery Link</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <div className="pt-2 border-t border-slate-100 text-center">
              <Link
                href="/auth/login"
                className="text-[11px] font-semibold text-[#32298A] hover:underline"
              >
                Remember your password? Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-2.5 border-t border-slate-200 text-center text-[10px] text-slate-400 bg-white">
        © 2026 Crown Paints East Africa. All rights reserved.
      </footer>
    </div>
  );
}
