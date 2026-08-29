"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Shield, Home, Download, Lock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PdfViewer = dynamic(() => import("@/components/pdf/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-80 bg-white rounded-xl border border-slate-200 text-slate-500 gap-2.5">
      <div className="w-6 h-6 border-2 border-[#32298A]/20 border-t-[#32298A] rounded-full animate-spin" />
      <span className="text-xs font-semibold text-slate-700">
        Loading Crown Paints Privacy Notice…
      </span>
    </div>
  ),
});

export default function PrivacyPolicyPage() {
  return (
    <div
      className="min-h-screen flex flex-col bg-[#F8FAFC] select-none"
      suppressHydrationWarning
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
    >
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          {/* Logo */}
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
            <div className="hidden md:block h-6 w-px bg-slate-200" />
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-slate-800">Privacy Notice</span>
              <span className="text-[9px] text-slate-500 font-medium">Compliance &amp; Data Protection</span>
            </div>
          </Link>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                suppressHydrationWarning
                className="text-xs font-semibold text-slate-700 hover:text-[#32298A] gap-1 h-7.5 cursor-pointer px-2.5"
              >
                <Home className="w-3 h-3" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="sm"
                suppressHydrationWarning
                className="text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 h-7.5 cursor-pointer px-2.5"
              >
                <Lock className="w-3 h-3 mr-1 text-slate-400" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth/get-started">
              <Button
                size="sm"
                suppressHydrationWarning
                className="bg-[#32298A] hover:bg-[#261e6d] text-white text-xs font-bold h-7.5 gap-1 cursor-pointer px-3"
              >
                <Building2 className="w-3 h-3" />
                <span>Register</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Corporate Metadata Sub-Bar */}
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px]">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#DCB353]" />
            <span className="font-semibold text-white">
              Crown Paints Kenya PLC · Official Privacy Notice
            </span>
          </div>
          <span className="text-slate-400 text-[10px]">
            Likoni Road, Industrial Area, Nairobi · Tel: 0709 887 000
          </span>
        </div>
      </div>

      {/* PDF View Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6" suppressHydrationWarning>
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Corporate Data Privacy Notice</span>
              <span className="text-[10px] text-slate-400 font-mono">KENYA DATA PROTECTION ACT 2019</span>
            </div>
            <a
              href="/documents/privacynotice.pdf"
              download="Crown-Paints-Privacy-Notice.pdf"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#32298A] hover:underline"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Notice</span>
            </a>
          </div>

          <div className="p-2 sm:p-4">
            <PdfViewer url="/documents/privacynotice.pdf" fileName="Crown-Paints-Privacy-Notice.pdf" />
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
