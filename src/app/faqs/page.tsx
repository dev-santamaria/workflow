"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Phone,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

const faqData: FaqItem[] = [
  // Category 1: Supplier Registration & KYC
  {
    id: "reg-1",
    category: "Supplier Registration & KYC",
    question: "What mandatory documents are required for supplier onboarding?",
    answer:
      "To complete verification, suppliers must upload: (1) Certificate of Incorporation / Business Registration, (2) Valid Tax Compliance Certificate (TCC / KRA / URA / TRA), (3) CR12 Form or List of Directors (issued within the last 6 months), (4) Company PIN / TIN Certificate, (5) Bank Reference / Cancelled Cheque, and (6) Relevant industry licenses (e.g., environmental/chemical handling permits for raw materials).",
    tags: ["documents", "requirements", "kra", "tin", "registration", "pin"],
  },
  {
    id: "reg-2",
    category: "Supplier Registration & KYC",
    question: "How long does the supplier verification and approval process take?",
    answer:
      "Our Procurement Compliance Team reviews submitted KYC documentation within 2 to 3 business days. Once approved, you will receive an official approval notification via email and immediate access to view active RFQs and tenders matching your industry category across East Africa.",
    tags: ["timeline", "approval", "verification", "kyc"],
  },
  {
    id: "reg-3",
    category: "Supplier Registration & KYC",
    question: "Can international and cross-border suppliers register on the portal?",
    answer:
      "Yes. International suppliers across East Africa and globally (including Kenya, Uganda, Tanzania, and global chemical/machinery manufacturers) can register by selecting their classification and submitting their corporate registration certificates, tax identifiers, and USD/EUR/GBP account details.",
    tags: ["international", "foreign", "uganda", "tanzania", "kenya", "chromex"],
  },

  // Category 2: Multi-Currency Compliance
  {
    id: "curr-1",
    category: "Multi-Currency Compliance",
    question: "Why is it mandatory to register a separate account for each currency?",
    answer:
      "Crown Paints East Africa operates segregated financial ledgers for KES, USD, EUR, GBP, UGX, and TZS. To eliminate foreign exchange discrepancies, comply with regional withholding tax laws, and ensure accurate purchase order settlements, suppliers who transact in multiple currencies have dedicated sub-ledgers provisioned under their master vendor profile.",
    tags: ["currency", "multi-currency", "kes", "usd", "eur", "gbp", "policy"],
  },
  {
    id: "curr-2",
    category: "Multi-Currency Compliance",
    question: "Can I use the same company name and Tax PIN for multiple currency accounts?",
    answer:
      "Yes. You will use your primary Company Name and National Tax PIN / TIN across all profiles, but each profile will be assigned a currency-specific Vendor Code (e.g., VEND-KES-1049 vs. VEND-USD-1049) to ensure payments and Purchase Orders are routed into the correct designated bank account.",
    tags: ["vendor code", "tax pin", "bank", "multiple profiles"],
  },
  {
    id: "curr-3",
    category: "Multi-Currency Compliance",
    question: "How are currency conversion rates handled during quotation evaluation?",
    answer:
      "For cross-currency tender evaluations, quotations are normalized using the official Central Bank prevailing mean exchange rate published on the date of tender closure. However, contracted Purchase Orders and settlements remain strictly in the quoted currency.",
    tags: ["exchange rate", "central bank", "settlement", "quotation"],
  },

  // Category 3: Tenders, RFQs & Bidding
  {
    id: "tend-1",
    category: "Tenders, RFQs & Bidding",
    question: "How do I access and submit bids for active Crown Paints tenders?",
    answer:
      "Once logged into your verified vendor dashboard, navigate to 'Active Tenders & RFQs'. You can download technical specifications, submit commercial pricing, and upload compliance documents. All bids must be submitted before the countdown deadline.",
    tags: ["rfq", "tenders", "bidding", "quotation"],
  },
  {
    id: "tend-2",
    category: "Tenders, RFQs & Bidding",
    question: "What is Crown Paints' sealed-bid policy and encryption standard?",
    answer:
      "All commercial quotations submitted through the portal are cryptographically sealed and encrypted. Neither procurement officers nor internal buyers can open or inspect bids prior to the official public tender opening deadline. This guarantees 100% transparency and fair competition.",
    tags: ["sealed bid", "encryption", "transparency", "security"],
  },
  {
    id: "tend-3",
    category: "Tenders, RFQs & Bidding",
    question: "Can I modify or withdraw a quotation after submission?",
    answer:
      "Yes. You can edit, revise pricing, or withdraw your bid at any time before the stated tender closing date and time. Once the deadline passes, no further edits or submissions are permitted.",
    tags: ["modify", "withdraw", "revision", "deadline"],
  },

  // Category 4: Invoicing, POs & Payments
  {
    id: "inv-1",
    category: "Invoicing, POs & Payments",
    question: "How do I submit electronic invoices for payment?",
    answer:
      "Upon fulfilling a Purchase Order, navigate to 'Invoicing', enter the approved PO number, and upload the fiscalized tax invoice (eTIMS / EFRIS / EFD with QR code) alongside signed delivery notes / Good Receipt Notes (GRN). The portal automatically performs the three-way document match for accounts payable clearance.",
    tags: ["etims", "efris", "invoice", "payment", "grn", "delivery note"],
  },
  {
    id: "inv-2",
    category: "Invoicing, POs & Payments",
    question: "What are the standard payment settlement terms?",
    answer:
      "Standard payment terms are 30 to 60 days from the date of verified invoice acceptance, subject to the specific contract agreement. Direct Electronic Funds Transfer (EFT / RTGS) or SWIFT transfers are processed into your verified bank account.",
    tags: ["payment terms", "settlement", "eft", "rtgs", "swift"],
  },
  {
    id: "inv-3",
    category: "Invoicing, POs & Payments",
    question: "How do I receive remittance advice and track payment status?",
    answer:
      "You can track the status of all submitted invoices in real-time under 'Financial Ledger'. Automatic email notifications and downloadable PDF Remittance Advice slips are issued the moment payment is cleared by the finance department.",
    tags: ["remittance", "tracking", "ledger", "status"],
  },

  // Category 5: Security & Two-Factor Authentication (2FA)
  {
    id: "sec-1",
    category: "Security & Two-Factor Authentication (2FA)",
    question: "Why is Two-Factor Authentication (2FA) mandatory for all portal users?",
    answer:
      "2FA ensures enterprise-grade protection for commercial bids, pricing secrets, and banking details. By requiring a dynamic 6-digit code from your authenticator app, we eliminate unauthorized access and identity fraud.",
    tags: ["2fa", "mfa", "authenticator", "security", "protection"],
  },
  {
    id: "sec-2",
    category: "Security & Two-Factor Authentication (2FA)",
    question: "What should I do if I lose my phone or cannot generate 2FA codes?",
    answer:
      "If you lose your authenticator device, contact our Helpdesk at callcentre@crownpaints.co.ke or call 0709 887 000 with your registered corporate email and Company PIN/TIN. Following security verification, our system administrators will issue a secure 2FA reset link.",
    tags: ["lost phone", "reset 2fa", "recovery", "helpdesk"],
  },

  // Category 6: Buyer & Institutional Purchasing
  {
    id: "buy-1",
    category: "Buyer & Institutional Purchasing",
    question: "How do internal Crown Paints requisitioners and institutional buyers use the portal?",
    answer:
      "Approved buyers can generate Purchase Requisitions (PR), initiate supplier catalog RFQs, compare automated technical and commercial matrices, and route purchase orders through multi-tier internal approval matrices across East Africa.",
    tags: ["buyer", "requisition", "institutional", "approval"],
  },
];

const categories = [
  "All Categories",
  "Supplier Registration & KYC",
  "Multi-Currency Compliance",
  "Tenders, RFQs & Bidding",
  "Invoicing, POs & Payments",
  "Security & Two-Factor Authentication (2FA)",
  "Buyer & Institutional Purchasing",
];

export default function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveItemId(null);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setActiveItemId(null);
  };

  const toggleItem = (id: string) => {
    setActiveItemId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory =
        activeCategory === "All Categories" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-white" suppressHydrationWarning>
      <Navbar />

      {/* Hero Header & Search (Compact) */}
      <section className="bg-slate-50/70 border-b border-slate-200/80 py-8 sm:py-10" suppressHydrationWarning>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-2.5" suppressHydrationWarning>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-[#32298A] uppercase tracking-wider">
            <HelpCircle className="w-3 h-3 text-[#32298A]" />
            <span>Help Center &amp; Documentation</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-xs text-slate-500 leading-relaxed max-w-xl mx-auto">
            Find answers to common questions about supplier pre-qualification, multi-currency accounts, tendering procedures, and electronic invoicing.
          </p>

          {/* Search Box */}
          <div className="pt-1.5 max-w-md mx-auto relative" suppressHydrationWarning>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. KYC, PIN, Currency, Invoicing)…"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              suppressHydrationWarning
              className="w-full pl-8 pr-14 h-8.5 rounded-lg border border-slate-200 bg-white text-xs font-normal text-slate-800 placeholder:text-slate-400 focus:border-[#32298A] outline-none shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                suppressHydrationWarning
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 hover:text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-4" suppressHydrationWarning>
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1.5 no-scrollbar border-b border-slate-100 text-xs" suppressHydrationWarning>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                suppressHydrationWarning
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? "bg-[#32298A] text-white shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500" suppressHydrationWarning>
          <p className="text-[11px]">
            Showing <span className="font-semibold text-slate-800">{filteredFaqs.length}</span> questions
            {searchQuery && (
              <span> for &ldquo;<span className="text-[#32298A] font-medium">{searchQuery}</span>&rdquo;</span>
            )}
          </p>
          {activeItemId !== null && (
            <button
              type="button"
              onClick={() => setActiveItemId(null)}
              suppressHydrationWarning
              className="text-[11px] text-[#32298A] hover:underline font-medium cursor-pointer"
            >
              Close all
            </button>
          )}
        </div>

        {/* FAQ Accordion List (Compact) */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-2" suppressHydrationWarning>
            {filteredFaqs.map((faq) => {
              const isOpen = activeItemId === faq.id;
              return (
                <div
                  key={faq.id}
                  suppressHydrationWarning
                  className={`rounded-xl border transition-all duration-150 bg-white ${
                    isOpen
                      ? "border-[#32298A]/40 shadow-2xs"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    suppressHydrationWarning
                    className="w-full p-3 sm:p-3.5 text-left flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <span className="inline-block text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-100 px-1.5 py-0.2 rounded">
                        {faq.category}
                      </span>
                      <h2 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                        {faq.question}
                      </h2>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${
                        isOpen ? "bg-[#32298A] text-white" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-3 pb-3.5 sm:px-3.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5 space-y-2">
                      <p>{faq.answer}</p>

                      <div className="flex flex-wrap items-center gap-1 pt-1.5 border-t border-slate-100/80">
                        <span className="text-[9px] text-slate-400 font-medium">Topics:</span>
                        {faq.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] bg-slate-50 text-slate-500 border border-slate-200/60 px-1.5 py-0.2 rounded font-mono"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 max-w-sm mx-auto space-y-2" suppressHydrationWarning>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-semibold text-slate-900">
              No matching questions found
            </h3>
            <p className="text-[11px] text-slate-500">
              Try searching with different keywords or browse through our category tabs above.
            </p>
            <Button
              variant="outline"
              size="sm"
              suppressHydrationWarning
              onClick={() => {
                handleSearchChange("");
                handleCategoryChange("All Categories");
              }}
              className="text-[11px] font-medium border-slate-200 rounded-lg cursor-pointer h-7 px-3 mt-1"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Support Banner (Compact) */}
        <div className="mt-8 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-3" suppressHydrationWarning>
          <div className="space-y-0.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#32298A]">
              <Phone className="w-3 h-3" />
              <span>Procurement Support Desk</span>
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-slate-900">
              Can&apos;t find what you are looking for?
            </h3>
            <p className="text-[11px] text-slate-500 max-w-md">
              Our call centre and procurement desk are available Mon - Fri 8:00 AM - 5:00 PM.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/contact">
              <Button suppressHydrationWarning className="bg-[#32298A] hover:bg-[#271f6f] text-white font-medium text-xs h-7.5 px-3 rounded-lg gap-1 cursor-pointer">
                <span>Contact Us</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
            <a href="tel:0709887000">
              <Button suppressHydrationWarning variant="outline" className="border-slate-200 bg-white text-slate-700 text-xs font-medium h-7.5 px-3 rounded-lg cursor-pointer">
                0709 887 000
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
