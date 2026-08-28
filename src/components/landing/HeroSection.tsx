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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Enterprise Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-[#32298A]">
              <ShieldCheck className="w-4 h-4 text-[#DCB353]" />
              <span>Crown Paints East Africa · Kenya · Uganda · Tanzania</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Welcome to Our
              <span className="block text-[#32298A] mt-1">
                Procurement Portal Home
              </span>
            </h1>

            {/* Exact Portal Copy from Prompt */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Our website is your gateway to a streamlined and efficient procurement process.
              Whether you&apos;re a supplier looking to showcase your products or services, or a buyer seeking
              the best solutions, our platform is designed to connect you seamlessly across East Africa.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link href="/auth/get-started">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#32298A] hover:bg-[#261e6d] text-white font-bold px-7 h-12 text-sm shadow-sm gap-2 cursor-pointer"
                >
                  <span>Become a Supplier</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-[#32298A] font-semibold px-6 h-12 text-sm cursor-pointer"
                >
                  <Lock className="w-4 h-4 mr-1.5 text-slate-400" />
                  Supplier / Buyer Login
                </Button>
              </Link>
              <Link href="/privacy-policy">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto text-slate-500 hover:text-slate-900 font-medium px-4 h-12 text-sm cursor-pointer"
                >
                  <FileText className="w-4 h-4 mr-1.5 text-slate-400" />
                  Privacy Notice
                </Button>
              </Link>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#32298A] flex-shrink-0" />
                <span>Verified Supplier Network</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#32298A] flex-shrink-0" />
                <span>Multi-Currency Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#32298A] flex-shrink-0" />
                <span>Encrypted &amp; MFA Protected</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Sleek Enterprise Workflow Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-7 relative">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#32298A]/08 flex items-center justify-center text-[#32298A]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Procurement Operations</h3>
                    <p className="text-xs text-slate-500">Live Supplier &amp; RFQ Status</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Portal Active
                </span>
              </div>

              {/* Status List */}
              <div className="py-4 space-y-3.5">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[#32298A]">
                      <BadgeCheck className="w-4 h-4 text-[#32298A]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Supplier Onboarding</p>
                      <p className="text-[11px] text-slate-500">KYC, Tax PIN &amp; Sector Verification</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#32298A] bg-[#32298A]/08 px-2 py-0.5 rounded">
                    Open
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[#DCB353]">
                      <Globe2 className="w-4 h-4 text-[#DCB353]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Currency Accounts</p>
                      <p className="text-[11px] text-slate-500">KES, USD, EUR, GBP segregated balances</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    Multi-Account
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-indigo-600">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Direct Tendering &amp; RFQ</p>
                      <p className="text-[11px] text-slate-500">Automated evaluation &amp; awards</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">
                    Real-time
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">New supplier registration?</span>
                <Link
                  href="/auth/get-started"
                  className="text-xs font-bold text-[#32298A] hover:text-[#261e6d] hover:underline flex items-center gap-1"
                >
                  Start Verification
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
