"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  QrCode,
} from "lucide-react";

export default function MfaSetupPage() {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const secretKey = "CRWN-9482-EPRO-8812";

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/auth/mfa/verify";
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between" suppressHydrationWarning>
      {/* Top Header */}
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
              Two-Factor Authentication Setup
            </span>
          </Link>

          <Link
            href="/auth/login"
            className="text-xs font-semibold text-slate-600 hover:text-[#32298A] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Cancel &amp; Return
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-10">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="text-center pb-5 border-b border-slate-100">
              <div className="w-12 h-12 rounded-lg bg-[#32298A]/08 text-[#32298A] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Setup Two-Factor Authentication
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Protect your procurement bids, quotations, and banking information.
              </p>
            </div>

            {/* Instruction Steps */}
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="w-5 h-5 rounded-full bg-[#32298A] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-bold text-slate-800">Download Authenticator App</p>
                  <p className="text-slate-500 mt-0.5">
                    Install Microsoft Authenticator, Google Authenticator, or Twilio Authy on your smartphone.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#32298A] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <p className="font-bold text-slate-800">Scan QR Code or Enter Setup Key</p>
                    <p className="text-slate-500 mt-0.5">
                      Open your authenticator app and point your camera at this QR code:
                    </p>
                  </div>
                </div>

                {/* QR Code Box & Key */}
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-md border border-slate-200">
                  <div className="w-32 h-32 bg-slate-900 rounded-lg p-2 flex items-center justify-center text-white flex-shrink-0">
                    <QrCode className="w-24 h-24 text-white" />
                  </div>
                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Manual Setup Key
                    </p>
                    <div className="flex items-center gap-1.5 p-2 bg-slate-100 rounded border border-slate-200 font-mono text-xs text-[#32298A] font-bold justify-between">
                      <span>{secretKey}</span>
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={handleCopy}
                        className="text-slate-500 hover:text-slate-900 p-1 cursor-pointer"
                        title="Copy Key"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">Account: Crown Paints Kenya Portal</p>
                  </div>
                </div>
              </div>

              {/* Step 3: Enter 6 digit code */}
              <form onSubmit={handleVerify} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="code" className="text-xs font-bold text-slate-800">
                      Step 3: Enter the 6-Digit Code from your Authenticator
                    </Label>
                  </div>
                  <Input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    placeholder="000 000"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    required
                    suppressHydrationWarning
                    className="h-12 text-center text-xl font-bold tracking-[0.3em] font-mono border-slate-300 focus:border-[#32298A]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  suppressHydrationWarning
                  className="w-full h-11 bg-[#32298A] hover:bg-[#261e6d] text-white font-bold text-sm shadow-xs gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Verifying Token…</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm 2FA Setup</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-200 text-center text-xs text-slate-400 bg-white">
        © 2026 Crown Paints Kenya PLC. All rights reserved.
      </footer>
    </div>
  );
}
