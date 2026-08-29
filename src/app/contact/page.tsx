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
  const [ticketId, setTicketId] = useState("");

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
    const generatedId = `CP-PRC-${Math.floor(100000 + Math.random() * 900000)}`;
    setTimeout(() => {
      setLoading(false);
      setTicketId(generatedId);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white" suppressHydrationWarning>
      <Navbar />

      {/* Hero Header (Compact) */}
      <section className="bg-[#F8FAFC] border-b border-slate-200 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-[#32298A] uppercase tracking-wider mb-2">
              <Headphones className="w-3 h-3 text-[#DCB353]" />
              Crown Paints East Africa Support Hubs
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Contact Procurement Helpdesk
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Have questions regarding supplier registration, active tenders, multi-currency compliance,
              or payment processing? Our regional teams across Kenya, Uganda, and Tanzania are here to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5">
              <div className="pb-3 border-b border-slate-100 mb-4">
                <h2 className="text-base font-bold text-slate-900">
                  Submit a Procurement Helpdesk Ticket
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Fill in the details below and our regional procurement officer will respond within 24 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Inquiry Successfully Received
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{form.name}</strong>. A support ticket has been opened under ticket ID{" "}
                    <span className="font-mono font-bold text-[#32298A]">{ticketId || "CP-PRC-849201"}</span>.
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
                    className="h-8 text-xs font-semibold cursor-pointer mt-2"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="contact-name" className="text-xs font-semibold text-slate-800">
                        Your Full Name *
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder="e.g. David Mwangi"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        required
                        suppressHydrationWarning
                        className="h-8 text-xs border-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="contact-company" className="text-xs font-semibold text-slate-800">
                        Company / Organization *
                      </Label>
                      <Input
                        id="contact-company"
                        placeholder="e.g. Apex Industrial Solutions"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        required
                        suppressHydrationWarning
                        className="h-8 text-xs border-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="contact-email" className="text-xs font-semibold text-slate-800">
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
                        className="h-8 text-xs border-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="contact-phone" className="text-xs font-semibold text-slate-800">
                        Phone Number *
                      </Label>
                      <Input
                        id="contact-phone"
                        placeholder="+254 7XX XXX XXX"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        required
                        suppressHydrationWarning
                        className="h-8 text-xs border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-slate-800">
                        Target Regional Entity *
                      </Label>
                      <CustomSelect
                        options={regionSelectOptions}
                        value={form.region}
                        onChange={(val) => update("region", val)}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-slate-800">
                        Inquiry Category *
                      </Label>
                      <CustomSelect
                        options={categorySelectOptions}
                        value={form.category}
                        onChange={(val) => update("category", val)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="contact-subject" className="text-xs font-semibold text-slate-800">
                      Subject *
                    </Label>
                    <Input
                      id="contact-subject"
                      placeholder="e.g. Invoicing Clarification on LPO-2026-9842"
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      required
                      suppressHydrationWarning
                      className="h-8 text-xs border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="contact-message" className="text-xs font-semibold text-slate-800">
                      Detailed Message *
                    </Label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="Describe your inquiry with relevant purchase order or quotation reference numbers..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      required
                      suppressHydrationWarning
                      className="w-full rounded-md border border-slate-200 p-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-[#32298A]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    suppressHydrationWarning
                    className="w-full h-8 bg-[#32298A] hover:bg-[#261e6d] text-white font-bold text-xs shadow-2xs gap-1.5 cursor-pointer rounded-lg"
                  >
                    {loading ? (
                      <span>Dispatching Ticket…</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Ticket to Procurement Desk</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Regional Hubs (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Regional Operating Offices
            </h3>

            <div className="space-y-2.5 text-xs">
              {regionalOffices.map((office) => (
                <div
                  key={office.country}
                  className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <FlagIcon country={office.flag} className="w-3.5 h-2.5 rounded-[1px] shadow-2xs" />
                      <h4 className="font-bold text-slate-900 text-xs">{office.company}</h4>
                    </div>
                    {office.isPrimary && (
                      <span className="text-[9px] font-bold text-[#32298A] bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                        Primary HQ
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-slate-600 text-[11px]">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3 h-3 text-[#DCB353] flex-shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-[#DCB353] flex-shrink-0" />
                      <span>{office.callCentre}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#DCB353] flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-[#32298A] underline">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
