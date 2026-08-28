"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Shield, Home, Download, Lock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PdfViewer = dynamic(() => import("@/components/pdf/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-slate-200 text-slate-500 gap-3">
      <div className="w-8 h-8 border-3 border-[#32298A]/20 border-t-[#32298A] rounded-full animate-spin" />
      <span className="text-xs font-semibold text-slate-700">
        Loading Crown Paints Kenya Privacy Notice…
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
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
            <div className="hidden md:block h-8 w-px bg-slate-200" />
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-slate-800">Privacy Notice</span>
              <span className="text-[10px] text-slate-500 font-medium">Compliance &amp; Data Protection</span>
            </div>
          </Link>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                suppressHydrationWarning
                className="text-xs font-semibold text-slate-700 hover:text-[#32298A] gap-1.5 h-9 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Portal Home</span>
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="sm"
                suppressHydrationWarning
                className="text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 h-9 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth/get-started">
              <Button
                size="sm"
                suppressHydrationWarning
                className="bg-[#32298A] hover:bg-[#261e6d] text-white text-xs font-bold h-9 gap-1 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Become a Supplier</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Corporate Metadata Sub-Bar */}
      <div className="bg-slate-900 text-slate-300 py-2.5 px-4 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#DCB353]" />
            <span className="font-semibold text-white">
              Crown Paints Kenya PLC · Official Privacy Notice
            </span>
          </div>
          <span className="text-slate-400 text-[11px]">
            P.O. Box 78848 – 00507, Viwandani, Nairobi - Kenya · Tel: 254-20 6533603-12
          </span>
        </div>
      </div>

      {/* Main Document Viewer */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div>
            <h1 className="text-lg font-black text-slate-900">
              Procurement &amp; Supplier Privacy Notice
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Document Reference: Crown Paints Kenya Data Protection Policy
            </p>
          </div>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-400 text-xs font-bold cursor-not-allowed opacity-65 w-fit"
            title="Download is disabled for protected document"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Download Disabled</span>
          </button>
        </div>

        {/* PDF Reader */}
        <div className="w-full">
          <PdfViewer
            url="/documents/privacynotice.pdf"
            fileName="Crown-Paints-Privacy-Notice.pdf"
          />
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p suppressHydrationWarning>© 2026 Crown Paints Kenya PLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#32298A]">Home</Link>
            <Link href="/auth/login" className="hover:text-[#32298A]">Sign In</Link>
            <Link href="/auth/get-started" className="hover:text-[#32298A]">Supplier Registration</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
