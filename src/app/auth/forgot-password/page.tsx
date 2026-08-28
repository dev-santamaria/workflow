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
      <header className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="bg-white p-1.5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center">
              <Image
                src="/images/logo/logo.png"
                alt="Crown Paints Logo"
                width={190}
                height={52}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-11 sm:max-h-12"
                priority
              />
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-200" />
            <span className="hidden sm:block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Password Recovery
            </span>
          </Link>

          <Link
            href="/auth/login"
            className="text-xs font-semibold text-slate-600 hover:text-[#32298A] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="text-center pb-6 border-b border-slate-100 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#32298A]/08 text-[#32298A] flex items-center justify-center mx-auto mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Reset Portal Password
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Enter your registered corporate email and entity to receive reset instructions.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-4 space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    Reset Link Dispatched
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If an approved account exists for <strong>{email}</strong> under the selected entity,
                    we have sent a secure password reset link. Please check your inbox and spam folder.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Link href="/auth/login" className="block">
                    <Button className="w-full h-10 bg-[#32298A] hover:bg-[#261e6d] text-white text-xs font-bold gap-1.5 cursor-pointer">
                      <span>Return to Sign In</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-slate-500 hover:text-[#32298A] font-medium cursor-pointer"
                  >
                    Didn&apos;t receive email? Try another address
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-800">
                    Target Operating Entity *
                  </Label>
                  <CustomSelect
                    options={entityOptions}
                    value={selectedEntity}
                    onChange={(val) => setSelectedEntity(val)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold text-slate-800">
                    Registered Corporate Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="procurement@company.co.ke"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      suppressHydrationWarning
                      className="pl-10 h-11 border-slate-200 focus:border-[#32298A] text-sm"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !email}
                  suppressHydrationWarning
                  className="w-full h-11 bg-[#32298A] hover:bg-[#261e6d] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Sending Instructions…</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-2">
              <p className="text-xs text-slate-500">
                Need urgent assistance or account reactivation?
              </p>
              <Link href="/contact" className="text-xs font-bold text-[#32298A] hover:underline inline-block">
                Contact Procurement Helpdesk (+254 709 887 000)
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-200 text-center text-xs text-slate-400 bg-white">
        © 2026 Crown Paints East Africa. All rights reserved.
      </footer>
    </div>
  );
}
