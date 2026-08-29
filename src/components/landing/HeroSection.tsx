import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Lock,
  Globe2,
  FileText,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section id="overview" className="relative bg-white border-b border-slate-200 overflow-hidden">
      {/* Subtle enterprise background accents */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50/80 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-4">
            {/* Enterprise Tag */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-[#32298A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DCB353]" />
              <span>Crown Paints East Africa · Kenya · Uganda · Tanzania</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Welcome to Our
              <span className="block text-[#32298A]">
                Procurement Portal Home
              </span>
            </h1>

            {/* Portal Copy */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              Our website is your gateway to a streamlined and efficient procurement process.
              Whether you&apos;re a supplier looking to showcase your products or services, or a buyer seeking
              the best solutions, our platform connects you seamlessly across East Africa.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <Link href="/auth/get-started">
                <Button
                  size="default"
                  className="w-full sm:w-auto bg-[#32298A] hover:bg-[#261e6d] text-white font-bold px-5 h-9 text-xs shadow-2xs gap-1.5 cursor-pointer rounded-lg"
                >
                  <span>Become a Supplier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="default"
                  variant="outline"
                  className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-[#32298A] font-semibold px-4 h-9 text-xs cursor-pointer rounded-lg"
                >
                  <Lock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  Supplier / Buyer Login
                </Button>
              </Link>
              <Link href="/privacy-policy">
                <Button
                  size="default"
                  variant="ghost"
                  className="w-full sm:w-auto text-slate-500 hover:text-slate-900 font-medium px-3 h-9 text-xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  Privacy Notice
                </Button>
              </Link>
            </div>

            {/* Trust points */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px] font-medium text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#32298A] flex-shrink-0" />
                <span>Verified Supplier Network</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#32298A] flex-shrink-0" />
                <span>Multi-Currency Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#32298A] flex-shrink-0" />
                <span>Encrypted &amp; MFA Protected</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Sleek Enterprise Workflow Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 relative space-y-3">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#32298A] text-white flex items-center justify-center font-bold text-[10px]">
                    CP
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Procurement Command Feed</h3>
                    <p className="text-[10px] text-slate-400">Live East African Supply Pipeline</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live System
                </span>
              </div>

              {/* Workflow Pipeline Steps (Compact) */}
              <div className="space-y-2 text-xs">
                {/* Step 1: RFQ */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="space-y-0.2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold bg-slate-200 text-slate-800 px-1 py-0.2 rounded">
                        RFQ-2026-0810
                      </span>
                      <span className="text-[11px] font-semibold text-slate-900">Acrylic Polymer Resins</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Crown Paints Kenya PLC · Likoni HQ</p>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-900 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/80">
                    Awaiting Quote
                  </span>
                </div>

                {/* Step 2: LPO */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="space-y-0.2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold bg-[#32298A]/10 text-[#32298A] px-1 py-0.2 rounded">
                        LPO-2026-9710
                      </span>
                      <span className="text-[11px] font-semibold text-slate-900">20L Metal Paint Cans</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Regal Paints Uganda Ltd · Kampala</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#32298A] bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200/80">
                    UGX 64,000,000
                  </span>
                </div>

                {/* Step 3: Settled Remittance */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="space-y-0.2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded">
                        REM-2026-8492
                      </span>
                      <span className="text-[11px] font-semibold text-slate-900">Chromex Colourant Surfactants</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Direct RTGS Wire Settlement · KRA WHT Cleared</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/80">
                    KES 2,042,500
                  </span>
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Auto 3-Way Audit Matching</span>
                <Link href="/auth/login" className="text-[#32298A] font-semibold hover:underline">
                  Launch Portal →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
