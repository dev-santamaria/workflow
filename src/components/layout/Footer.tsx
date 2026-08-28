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
      <div className="h-1 bg-[#DCB353] w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Logo & Official Head Office Information */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg inline-block">
                <Image
                  src="/images/logo/logo.png"
                  alt="Crown Paints Logo"
                  width={150}
                  height={40}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain max-h-9"
                />
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Crown Paints East Africa E-Procurement Portal. Connecting trusted suppliers across Kenya,
              Uganda, Tanzania (Arusha), and Chromex Colourant Limited.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DCB353] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Crown Paints East Africa Head Office</strong>
                  <br />
                  Likoni Road, Industrial Area, P.O. Box 78848 - 00507, Nairobi, Kenya
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#DCB353] flex-shrink-0 mt-0.5" />
                <div>
                  <p>
                    <strong>Call Centre:</strong>{" "}
                    <a href="tel:0709887000" className="hover:text-white transition-colors underline">
                      0709 887 000
                    </a>
                  </p>
                  <p className="text-slate-400">
                    <strong>Tel:</strong> 020 2165703/5/6, 2032751
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DCB353] flex-shrink-0" />
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
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DCB353]">
              Portal &amp; Sourcing
            </h4>
            <ul className="space-y-2 text-sm">
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
                <Link href="/#currency-notice" className="hover:text-white transition-colors">
                  Multi-Currency Policy
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors font-medium text-white flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#DCB353]" />
                  <span>FAQs &amp; Help</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors font-medium text-white flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-[#DCB353]" />
                  <span>Contact &amp; Helpdesk</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Regional Entities (East Africa) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DCB353]">
              East Africa Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block">
                  <strong className="text-slate-200">Kenya:</strong> Nairobi Head Office
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block">
                  <strong className="text-slate-200">Uganda:</strong> Regal Paints Kampala
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block">
                  <strong className="text-slate-200">Tanzania:</strong> Arusha Operations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block">
                  <strong className="text-slate-200">Chromex:</strong> Colourant Division
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/contact"
                className="text-[11px] font-bold text-[#DCB353] hover:underline flex items-center gap-1"
              >
                <span>View Regional Contacts</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Col 4: Compliance & Privacy */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DCB353]">
              Legal &amp; Supplier Access
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/auth/get-started"
                  className="text-white font-semibold hover:text-[#DCB353] transition-colors flex items-center gap-1"
                >
                  <span>Become a Supplier</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  Supplier Login
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-white font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-[#DCB353]" />
                  <span>Privacy Notice (View Online)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#DCB353]" />
                  <span>Encrypted Enterprise Portal</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-tight">
                  256-bit SSL secured. Data processed in accordance with East African Data Protection frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p suppressHydrationWarning>© 2026 Crown Paints East Africa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faqs" className="hover:text-slate-300 transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
            <Link href="/auth/login" className="hover:text-slate-300 transition-colors">
              Portal Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
