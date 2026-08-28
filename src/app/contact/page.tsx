"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import { FlagIcon } from "@/components/ui/flag-icon";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Headphones,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Coins,
  Receipt,
  KeyRound,
  ShoppingBag,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const regionalOffices = [
  {
    country: "Kenya (East Africa Head Office)",
    tag: "Regional Headquarters",
    company: "Crown Paints Kenya PLC",
    address: "Likoni Road, Industrial Area, P.O. Box 78848 - 00507, Nairobi, Kenya",
    callCentre: "0709 887 000",
    landlines: "020 2165703/5/6, 2032751",
    email: "callcentre@crownpaints.co.ke",
    procurementEmail: "procurement@crownpaints.co.ke",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:30 AM - 1:00 PM",
    flag: "KE",
    isPrimary: true,
  },
  {
    country: "Uganda",
    tag: "Uganda Operations",
    company: "Regal Paints Uganda Ltd (Crown Paints Subsidiary)",
    address: "Plot 101/102, 6th Street, Industrial Area, P.O. Box 30978, Kampala, Uganda",
    callCentre: "+256 414 566 800",
    landlines: "+256 312 263 700 / +256 757 744 477",
    email: "info@regalpaints.co.ug",
    procurementEmail: "uganda.procurement@crownpaints.co.ke",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM",
    flag: "UG",
    isPrimary: false,
  },
  {
    country: "Tanzania (Arusha)",
    tag: "Tanzania Operations",
    company: "Crown Paints Tanzania Ltd",
    address: "Themi Industrial Area / Njiro, P.O. Box 2728, Arusha, Tanzania",
    callCentre: "+255 27 250 8200",
    landlines: "+255 768 980 000 / +255 658 980 000",
    email: "tanzania@crownpaints.co.ke",
    procurementEmail: "tz.procurement@crownpaints.co.ke",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM",
    flag: "TZ",
    isPrimary: false,
  },
  {
    country: "Chromex Colourant Division",
    tag: "Colorant Manufacturing",
    company: "Chromex Colourant Limited",
    address: "Likoni Road, Industrial Area, Nairobi, Kenya",
    callCentre: "0709 887 000",
    landlines: "020 2165703/5",
    email: "chromex@crownpaints.co.ke",
    procurementEmail: "chromex.procurement@crownpaints.co.ke",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM",
    flag: "CHROMEX",
    isPrimary: false,
  },
];

const regionSelectOptions: CustomSelectOption[] = [
  { value: "Kenya", label: "Crown Paints Kenya PLC (Head Office)", sublabel: "Nairobi Headquarters", flag: "KE" },
  { value: "Uganda", label: "Regal Paints Uganda Ltd", sublabel: "Kampala Industrial Area Hub", flag: "UG" },
  { value: "Tanzania", label: "Crown Paints Tanzania Ltd", sublabel: "Arusha Operations Hub", flag: "TZ" },
  { value: "Chromex", label: "Chromex Colourant Limited", sublabel: "Specialized Colorant Division", flag: "CHROMEX" },
];

const categorySelectOptions: CustomSelectOption[] = [
  { value: "kyc", label: "Supplier Registration & KYC", sublabel: "Pre-qualification, PIN, TCC compliance", icon: FileCheck },
  { value: "tender", label: "Active Tender & RFQ Clarification", sublabel: "Bidding deadlines & specifications", icon: Building2 },
  { value: "currency", label: "Multi-Currency Account Setup", sublabel: "KES, USD, EUR, GBP segregated profiles", icon: Coins },
  { value: "invoice", label: "Invoicing & Payment Query", sublabel: "eTIMS, GRN, remittance advice", icon: Receipt },
  { value: "2fa", label: "Portal Access & 2FA Security", sublabel: "Lost authenticator, password reset", icon: KeyRound },
  { value: "buyer", label: "Institutional Buyer Services", sublabel: "Corporate orders & requisitions", icon: ShoppingBag },
  { value: "general", label: "General Procurement Feedback", sublabel: "Whistleblowing & inquiries", icon: MessageSquare },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    region: "Kenya",
    category: "kyc",
    subject: "",
    message: "",
  });

  const update = (key: string, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white" suppressHydrationWarning>
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#F8FAFC] border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-bold text-[#32298A] uppercase tracking-wider mb-3">
              <Headphones className="w-3.5 h-3.5 text-[#DCB353]" />
              Crown Paints East Africa Support Hubs
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Contact Procurement Helpdesk
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Have questions regarding supplier registration, active tenders, multi-currency compliance,
              or payment processing? Our regional procurement teams across Kenya, Uganda, and Tanzania (Arusha) are here to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="pb-5 border-b border-slate-100 mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Submit a Procurement Helpdesk Ticket
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in the details below and our regional procurement officer will respond within 24 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Inquiry Successfully Received
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{form.name}</strong>. A support ticket has been opened under ticket ID{" "}
                    <span className="font-mono font-bold text-[#32298A]">CP-PRC-{Math.floor(100000 + Math.random() * 900000)}</span>.
                    Our team will reach out to <strong>{form.email}</strong> shortly.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        region: "Kenya",
                        category: "kyc",
                        subject: "",
                        message: "",
                      });
                    }}
                    variant="outline"
                    className="mt-4 text-xs font-semibold cursor-pointer"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name" className="text-xs font-bold text-slate-800">
                        Your Full Name *
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder="e.g. David Mwangi"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        required
                        suppressHydrationWarning
                        className="h-10 border-slate-200 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-company" className="text-xs font-bold text-slate-800">
                        Company / Organization *
                      </Label>
                      <Input
                        id="contact-company"
                        placeholder="e.g. Apex Industrial Solutions"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        required
                        suppressHydrationWarning
                        className="h-10 border-slate-200 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email" className="text-xs font-bold text-slate-800">
                        Corporate Email *
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="name@company.co.ke"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        required
                        suppressHydrationWarning
                        className="h-10 border-slate-200 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-phone" className="text-xs font-bold text-slate-800">
                        Telephone Number *
                      </Label>
                      <Input
                        id="contact-phone"
                        placeholder="+254 7XX XXX XXX"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        required
                        maxLength={16}
                        suppressHydrationWarning
                        className="h-10 border-slate-200 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-800">
                        Target Operating Entity *
                      </Label>
                      <CustomSelect
                        options={regionSelectOptions}
                        value={form.region}
                        onChange={(val) => update("region", val)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-slate-800">
                        Inquiry Category *
                      </Label>
                      <CustomSelect
                        options={categorySelectOptions}
                        value={form.category}
                        onChange={(val) => update("category", val)}
                        searchable
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-subject" className="text-xs font-bold text-slate-800">
                      Subject / Tender Reference *
                    </Label>
                    <Input
                      id="contact-subject"
                      placeholder="e.g. Clarification on RFQ/CP/2026/088"
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      required
                      suppressHydrationWarning
                      className="h-10 border-slate-200 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message" className="text-xs font-bold text-slate-800">
                      Detailed Message *
                    </Label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Please provide specifics of your inquiry, vendor number (if already registered), or tender queries…"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      required
                      suppressHydrationWarning
                      className="w-full p-3 text-sm border border-slate-200 rounded-md focus:border-[#32298A] outline-none text-slate-800"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    suppressHydrationWarning
                    className="w-full h-11 bg-[#32298A] hover:bg-[#261e6d] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>Sending Ticket…</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Procurement Inquiry</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Quick Links Banner */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#32298A]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Looking for immediate answers?</h4>
                  <p className="text-[11px] text-slate-500">Check our comprehensive Frequently Asked Questions</p>
                </div>
              </div>
              <Link href="/faqs">
                <Button size="sm" variant="outline" className="text-xs font-semibold h-9 gap-1 cursor-pointer">
                  <span>View FAQs</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Detailed Regional Office Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Regional Hub Locations
              </h2>
              <p className="text-xs text-slate-500 mb-5">
                Reach out directly to any of our East African operational &amp; procurement hubs.
              </p>
            </div>

            <div className="space-y-4">
              {regionalOffices.map((office) => (
                <div
                  key={office.country}
                  className={`p-5 rounded-xl border transition-all ${
                    office.isPrimary
                      ? "border-[#32298A]/40 bg-white shadow-xs"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FlagIcon country={office.flag} className="w-4 h-3 rounded-[1px] shadow-2xs" />
                      <h3 className="text-sm font-black text-slate-900">
                        {office.country}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                      {office.tag}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-[#32298A] mb-3">
                    {office.company}
                  </p>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p>
                          <strong>Call Centre / Landline:</strong>{" "}
                          <a href={`tel:${office.callCentre.replace(/\s+/g, "")}`} className="hover:text-[#32298A] underline">
                            {office.callCentre}
                          </a>
                        </p>
                        {office.landlines && (
                          <p className="text-slate-500">
                            <strong>Tel:</strong> {office.landlines}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p>
                          <a href={`mailto:${office.email}`} className="hover:text-[#32298A] underline">
                            {office.email}
                          </a>
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          Procurement: {office.procurementEmail}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance Guarantee Card */}
            <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DCB353]" />
                <span className="font-bold text-white">Whistleblowing &amp; Ethics Hotline</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Crown Paints maintains strict anti-corruption and fair tendering policies.
                To report procurement irregularities confidentially, email:{" "}
                <a href="mailto:ethics@crownpaints.co.ke" className="text-[#DCB353] underline">
                  ethics@crownpaints.co.ke
                </a>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
