import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  FileText,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Headphones,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 border-t border-slate-800" suppressHydrationWarning>
      {/* Top subtle brand gold line */}
      <div className="h-0.5 bg-[#DCB353] w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          {/* Col 1: Logo & Official Head Office Information */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="bg-white p-1.5 rounded-lg inline-block">
                <Image
                  src="/images/logo/logo.png"
                  alt="Crown Paints Logo"
                  width={125}
                  height={32}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain max-h-7"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Crown Paints East Africa E-Procurement Portal. Connecting trusted suppliers across Kenya,
              Uganda, Tanzania (Arusha), and Chromex Colourant Limited.
            </p>

            <div className="space-y-1.5 pt-1 text-[11px] text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DCB353] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Crown Paints East Africa HQ:</strong> Likoni Road, Industrial Area, P.O. Box 78848 - 00507, Nairobi, Kenya
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DCB353] flex-shrink-0 mt-0.5" />
                <div>
                  <p>
                    <strong>Call Centre:</strong>{" "}
                    <a href="tel:0709887000" className="hover:text-white transition-colors underline">
                      0709 887 000
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DCB353] flex-shrink-0" />
                <a
                  href="mailto:callcentre@crownpaints.co.ke"
                  className="hover:text-white transition-colors"
                >
                  callcentre@crownpaints.co.ke
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Procurement Navigation */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#DCB353]">
              Portal &amp; Sourcing
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Portal Home
                </Link>
              </li>
              <li>
                <Link href="/#benefits" className="hover:text-white transition-colors">
                  Supplier Directory
                </Link>
              </li>
              <li>
                <Link href="/statements" className="hover:text-white transition-colors">
                  Supplier Statements
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Regional Hubs */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#DCB353]">
              Regional Sourcing Hubs
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCB353]" />
                <span>Crown Paints Kenya PLC (Likoni HQ)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCB353]" />
                <span>Regal Paints Uganda Ltd (Kampala)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCB353]" />
                <span>Crown Paints Tanzania (Arusha Hub)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCB353]" />
                <span>Chromex Colourant Limited</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Supplier Access */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#DCB353]">
              Supplier Access
            </h4>
            <div className="space-y-2">
              <Link href="/auth/login" className="block">
                <button
                  type="button"
                  className="w-full bg-[#32298A] hover:bg-[#261e6d] text-white text-xs font-semibold py-1.5 px-3 rounded-lg border border-indigo-700/60 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
              <Link href="/auth/get-started" className="block">
                <button
                  type="button"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium py-1.5 px-3 rounded-lg border border-slate-700 transition-colors text-center cursor-pointer"
                >
                  Register Profile
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Crown Paints Kenya PLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Contact &amp; Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
