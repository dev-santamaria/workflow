"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import { FlagIcon } from "@/components/ui/flag-icon";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
  Coins,
  BadgeCheck,
} from "lucide-react";

const entityOptions: CustomSelectOption[] = [
  { value: "CP_KE", label: "Crown Paints Kenya PLC", sublabel: "Nairobi HQ · Likoni Road", flag: "KE", badge: "Kenya HQ" },
  { value: "CP_UG", label: "Regal Paints Uganda Ltd", sublabel: "Kampala Hub · 6th Street", flag: "UG" },
  { value: "CP_TZ", label: "Crown Paints Tanzania Ltd", sublabel: "Arusha Operations · Themi", flag: "TZ" },
  { value: "CHROMEX", label: "Chromex Colourant Limited", sublabel: "Colorant & Pigment Division", flag: "CHROMEX", badge: "Subsidiary" },
];

const entityHighlights: Record<string, { city: string; currencies: string[]; rfqs: number }> = {
  CP_KE: { city: "Nairobi Head Office, Likoni Road", currencies: ["KES", "USD", "EUR", "GBP"], rfqs: 14 },
  CP_UG: { city: "Kampala Hub, 6th Street Industrial Area", currencies: ["UGX", "USD", "KES"], rfqs: 8 },
  CP_TZ: { city: "Arusha Hub, Themi Industrial Area", currencies: ["TZS", "USD", "KES"], rfqs: 6 },
  CHROMEX: { city: "Colorant & Pigment Unit, Nairobi", currencies: ["KES", "USD"], rfqs: 5 },
};

export default function LoginPage() {
  const [selectedEntity, setSelectedEntity] = useState("CP_KE");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingAlert, setPendingAlert] = useState<{ title: string; message: string; email: string } | null>(null);

  const activeEntityObj = entityOptions.find((e) => e.value === selectedEntity);
  const highlight = entityHighlights[selectedEntity] || entityHighlights.CP_KE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPendingAlert(null);

    setTimeout(() => {
      setLoading(false);
      // If email contains "pending" or user entered an unapproved test account
      if (
        email.toLowerCase().includes("pending") ||
        email.toLowerCase().includes("review") ||
        email.toLowerCase().includes("unapproved")
      ) {
        setPendingAlert({
          title: "Supplier Application Under Compliance Review",
          message: `Your supplier account application for ${activeEntityObj?.label} is currently undergoing KYC and Tax compliance verification. You will be notified via email (${email}) once approved.`,
          email: email,
        });
      } else {
        // Approved credentials -> proceed to MFA verification
        window.location.href = "/auth/mfa/verify";
      }
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between" suppressHydrationWarning>
      {/* Top Header with High-Visibility Logo */}
      <header className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* Highly Visible Logo Container */}
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
            <div className="hidden md:block h-8 w-px bg-slate-200" />
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-slate-900 tracking-tight">Supplier E-Procurement Portal</span>
              <span className="text-[10px] text-slate-500 font-medium">East Africa · Kenya · Uganda · Tanzania · Chromex</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-[#32298A] transition-colors"
            >
              ← Portal Home
            </Link>
            <Link href="/auth/get-started">
              <Button
                size="sm"
                variant="outline"
                className="border-slate-300 text-[#32298A] hover:bg-slate-50 font-bold text-xs gap-1.5 h-9 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Become a Supplier</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Clean White Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 py-10 lg:py-14 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Clean White Enterprise Overview */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-bold text-[#32298A] shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#DCB353]" />
              <span>Crown Paints East Africa Supplier Gateway</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Sign In to Your Verified Supplier Portal
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Access open RFQs, submit cryptographic sealed bids, track Purchase Orders, upload e-invoices, and monitor multi-currency ledger balances across East Africa.
              </p>
            </div>

            {/* Entity Sourcing Status Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  {activeEntityObj?.flag && (
                    <FlagIcon country={activeEntityObj.flag} className="w-6 h-4 rounded-[2px] shadow-2xs" />
                  )}
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{activeEntityObj?.label}</h3>
                    <p className="text-[11px] text-slate-500">{highlight.city}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Portal Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-medium">Active Open Tenders</span>
                  <span className="text-sm font-black text-slate-900">{highlight.rfqs} Opportunities</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-medium">Settlement Currencies</span>
                  <span className="text-xs font-bold text-[#32298A]">{highlight.currencies.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Trust Checklist */}
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>256-bit SSL encrypted sealed-bid pricing confidentiality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Mandatory Two-Factor Authentication (2FA) identity protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Automated multi-currency sub-ledger reconciliation</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Clean White Login Card */}
          <div className="lg:col-span-6 max-w-md mx-auto w-full">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
              
              {/* Header inside Card */}
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#32298A]/08 text-[#32298A] flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#32298A] bg-[#32298A]/08 px-2 py-0.5 rounded">
                    Supplier Login
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Supplier Portal Sign In
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter your registered corporate credentials to access your vendor account.
                </p>
              </div>

              {/* Pending Review Warning Alert */}
              {pendingAlert && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-amber-900">
                      <Clock className="w-4 h-4 text-amber-700 flex-shrink-0" />
                      <span>{pendingAlert.title}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                      Pending
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {pendingAlert.message}
                  </p>
                  <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
                    <Link href="/contact" className="text-[#32298A] font-bold hover:underline">
                      Contact Procurement Desk →
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPendingAlert(null)}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Entity Selector */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-800">
                    Target Regional Entity *
                  </Label>
                  <CustomSelect
                    options={entityOptions}
                    value={selectedEntity}
                    onChange={(val) => setSelectedEntity(val)}
                  />
                </div>

                {/* 2. Email Address */}
                <div className="space-y-1.5">
                  <Label htmlFor="login-email" className="text-xs font-bold text-slate-800">
                    Registered Corporate Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="login-email"
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

                {/* 3. Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-xs font-bold text-slate-800">
                      Password *
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-[11px] font-semibold text-[#32298A] hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      suppressHydrationWarning
                      className="pl-10 pr-10 h-11 border-slate-200 focus:border-[#32298A] text-sm"
                    />
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="login-remember"
                      checked={remember}
                      onCheckedChange={(checked) => setRemember(Boolean(checked))}
                    />
                    <label
                      htmlFor="login-remember"
                      className="text-xs text-slate-600 cursor-pointer font-medium"
                    >
                      Remember device for 30 days
                    </label>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">2FA Protected</span>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  suppressHydrationWarning
                  className="w-full h-11 bg-[#32298A] hover:bg-[#261e6d] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Authenticating Credentials…</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Supplier Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Bottom Register CTA */}
              <div className="pt-4 border-t border-slate-100 text-center space-y-2.5">
                <p className="text-xs text-slate-600">
                  New supplier seeking pre-qualification?
                </p>
                <Link href="/auth/get-started" className="block">
                  <Button
                    variant="outline"
                    suppressHydrationWarning
                    className="w-full h-10 border-slate-300 text-[#32298A] hover:bg-slate-50 font-bold text-xs gap-1.5 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Start Supplier Onboarding Wizard</span>
                  </Button>
                </Link>
              </div>

              {/* Help & Support */}
              <div className="text-center text-xs text-slate-500 pt-1">
                <p>
                  Need assistance?{" "}
                  <Link href="/contact" className="text-[#32298A] font-semibold hover:underline">
                    Contact Procurement Desk
                  </Link>{" "}
                  or view{" "}
                  <Link href="/faqs" className="text-[#32298A] font-semibold hover:underline">
                    FAQs
                  </Link>
                </p>
              </div>
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
