import Link from "next/link";
import { AlertCircle, ArrowRight, Coins, Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const supportedCurrencies = [
  { code: "KES", name: "Kenya Shillings", symbol: "KSh" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
];

export default function MultiCurrencyBanner() {
  return (
    <section id="currency-notice" className="py-8 sm:py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-[#FBFBFD] p-4 sm:p-6 relative shadow-2xs">
          {/* Subtle gold top border accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#DCB353] rounded-t-xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#DCB353]/15 text-[#92600a] text-[10px] font-bold uppercase tracking-wider">
                  <Coins className="w-3 h-3 text-[#DCB353]" />
                  Multi-Currency Policy
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Mandatory Compliance Rule
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Operating in Multiple Currencies?
              </h3>

              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-slate-800 space-y-0.5">
                <p className="font-semibold text-amber-950 flex items-center gap-1.5 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                  <span>Important Registration Notice:</span>
                </p>
                <p className="text-slate-700 text-xs pl-5">
                  <strong>Any supplier using multi currencies has to register an account for each currency.</strong>
                  &nbsp;Quotations, purchase orders, and payment settlements are processed per currency.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-xs text-slate-600">
                <span className="font-semibold text-slate-700 text-[11px]">Supported Rails:</span>
                {supportedCurrencies.map((c) => (
                  <span
                    key={c.code}
                    className="px-2 py-0.5 rounded bg-white border border-slate-200 font-medium text-slate-800 flex items-center gap-1 shadow-2xs text-[11px]"
                  >
                    <span className="text-[#32298A] font-bold">{c.code}</span>
                    <span className="text-slate-400">({c.symbol})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Single Entity · Multiple Portals</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Use your primary organization tax PIN and company registration details when setting up each currency account.
              </p>
              <Link href="/auth/get-started" className="block">
                <Button className="w-full bg-[#32298A] hover:bg-[#261e6d] text-white font-semibold text-xs h-8 gap-1.5 shadow-2xs rounded-lg">
                  <span>Register Currency Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <div className="text-center">
                <Link
                  href="/privacy-policy"
                  className="text-[10px] text-slate-500 hover:text-[#32298A] underline-offset-2 hover:underline"
                >
                  Read terms &amp; data privacy notice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
