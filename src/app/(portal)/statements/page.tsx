"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FlagIcon, CountryCode } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import {
  FileBarChart,
  Search,
  Download,
  Printer,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Landmark,
  Receipt,
  Eye,
  X,
  CreditCard,
  ExternalLink,
  Calendar,
  Building2,
  Tag,
  Check,
  Award,
  QrCode,
} from "lucide-react";

// Types
interface LedgerEntry {
  id: string;
  date: string;
  docNumber: string;
  docType: "INVOICE" | "PAYMENT_REMITTANCE" | "TAX_WHT" | "CREDIT_NOTE";
  referencePo?: string;
  referenceGrn?: string;
  entity: string;
  flag: CountryCode | string;
  description: string;
  debitAmount: number;
  creditAmount: number;
  runningBalance: number;
  currency: string;
  status: "settled" | "matched" | "queued" | "pending";
  paymentRef?: string;
  etimsNumber?: string;
}

interface WhtCertificate {
  id: string;
  certNumber: string;
  invoiceNo: string;
  paymentRef: string;
  taxAuthority: "KRA (Kenya)" | "URA (Uganda)";
  entity: string;
  flag: CountryCode | string;
  dateIssued: string;
  grossAmount: number;
  whtRate: number;
  whtAmount: number;
  currency: string;
  vendorPin: string;
  withholderPin: string;
  status: "verified";
  kraAcknowledgmentNo: string;
}

interface ReconciliationItem {
  id: string;
  poNumber: string;
  poDate: string;
  entity: string;
  flag: CountryCode | string;
  poAmount: number;
  dispatchedAmount: number;
  gatePassNo: string;
  grnAmount: number;
  grnNo: string;
  invoicedAmount: number;
  invoiceNo: string;
  paidAmount: number;
  remittanceNo: string;
  currency: string;
  reconStatus: "fully_reconciled" | "audit_matched_pending_pay" | "in_transit";
}

const mockLedger: LedgerEntry[] = [
  {
    id: "leg-1",
    date: "Feb 10, 2026",
    docNumber: "INV-2026-9481",
    docType: "INVOICE",
    referencePo: "LPO-2026-9481",
    referenceGrn: "GRN-KE-2026-0799",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    description: "Supply of Pure Rutile Titanium Dioxide (Batch 1)",
    debitAmount: 3200000,
    creditAmount: 0,
    runningBalance: 3200000,
    currency: "KES",
    status: "settled",
    etimsNumber: "KRA-ETIMS-91820381",
  },
  {
    id: "leg-2",
    date: "Feb 12, 2026",
    docNumber: "WHT-KE-2026-0391",
    docType: "TAX_WHT",
    referencePo: "LPO-2026-9481",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    description: "5% Withholding Tax deducted for KRA Tax Compliance",
    debitAmount: 0,
    creditAmount: 160000,
    runningBalance: 3040000,
    currency: "KES",
    status: "settled",
  },
  {
    id: "leg-3",
    date: "Feb 12, 2026",
    docNumber: "REM-2026-8310",
    docType: "PAYMENT_REMITTANCE",
    referencePo: "LPO-2026-9481",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    description: "Net RTGS Settlement via Standard Chartered (Ref: CBK-RTGS-840192841)",
    debitAmount: 0,
    creditAmount: 3040000,
    runningBalance: 0,
    currency: "KES",
    status: "settled",
    paymentRef: "CBK-RTGS-840192841",
  },
  {
    id: "leg-4",
    date: "Feb 18, 2026",
    docNumber: "INV-2026-9655",
    docType: "INVOICE",
    referencePo: "LPO-2026-9655",
    referenceGrn: "GRN-CHR-2026-0188",
    entity: "Chromex Colourant Limited",
    flag: "CHROMEX",
    description: "Tinting Surfactants & Rheology Dispersing Additives",
    debitAmount: 2150000,
    creditAmount: 0,
    runningBalance: 2150000,
    currency: "KES",
    status: "settled",
    etimsNumber: "KRA-ETIMS-82910488",
  },
  {
    id: "leg-5",
    date: "Feb 20, 2026",
    docNumber: "WHT-KE-2026-0412",
    docType: "TAX_WHT",
    referencePo: "LPO-2026-9655",
    entity: "Chromex Colourant Limited",
    flag: "CHROMEX",
    description: "5% Withholding Tax deducted for KRA Tax Compliance",
    debitAmount: 0,
    creditAmount: 107500,
    runningBalance: 2042500,
    currency: "KES",
    status: "settled",
  },
  {
    id: "leg-6",
    date: "Feb 20, 2026",
    docNumber: "REM-2026-8492",
    docType: "PAYMENT_REMITTANCE",
    referencePo: "LPO-2026-9655",
    entity: "Chromex Colourant Limited",
    flag: "CHROMEX",
    description: "Net RTGS Settlement via Standard Chartered (Ref: CBK-RTGS-891049281)",
    debitAmount: 0,
    creditAmount: 2042500,
    runningBalance: 0,
    currency: "KES",
    status: "settled",
    paymentRef: "CBK-RTGS-891049281",
  },
  {
    id: "leg-7",
    date: "Feb 27, 2026",
    docNumber: "INV-2026-9842",
    docType: "INVOICE",
    referencePo: "LPO-2026-9842",
    referenceGrn: "GRN-KE-2026-0842",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    description: "Pure Acrylic Polymer Emulsion (High Gloss Formulation 20 MT)",
    debitAmount: 4800000,
    creditAmount: 0,
    runningBalance: 4800000,
    currency: "KES",
    status: "matched",
    etimsNumber: "KRA-ETIMS-91820481",
  },
];

const mockWhtCertificates: WhtCertificate[] = [
  {
    id: "wht-1",
    certNumber: "WHT-KE-2026-0412",
    invoiceNo: "INV-2026-9655",
    paymentRef: "REM-2026-8492",
    taxAuthority: "KRA (Kenya)",
    entity: "Chromex Colourant Limited",
    flag: "CHROMEX",
    dateIssued: "Feb 20, 2026",
    grossAmount: 2150000,
    whtRate: 5,
    whtAmount: 107500,
    currency: "KES",
    vendorPin: "P051284920Z",
    withholderPin: "P000609341X",
    status: "verified",
    kraAcknowledgmentNo: "KRA-WHT-ACK-992014881",
  },
  {
    id: "wht-2",
    certNumber: "WHT-KE-2026-0391",
    invoiceNo: "INV-2026-9481",
    paymentRef: "REM-2026-8310",
    taxAuthority: "KRA (Kenya)",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    dateIssued: "Feb 12, 2026",
    grossAmount: 3200000,
    whtRate: 5,
    whtAmount: 160000,
    currency: "KES",
    vendorPin: "P051284920Z",
    withholderPin: "P000609341X",
    status: "verified",
    kraAcknowledgmentNo: "KRA-WHT-ACK-881920419",
  },
  {
    id: "wht-3",
    certNumber: "WHT-UG-2026-0104",
    invoiceNo: "INV-2026-9304",
    paymentRef: "REM-2026-8104",
    taxAuthority: "URA (Uganda)",
    entity: "Regal Paints Uganda Ltd",
    flag: "UG",
    dateIssued: "Jan 28, 2026",
    grossAmount: 45000000,
    whtRate: 6,
    whtAmount: 2700000,
    currency: "UGX",
    vendorPin: "1004928190",
    withholderPin: "1000034928",
    status: "verified",
    kraAcknowledgmentNo: "URA-WHT-EFRIS-7740192",
  },
];

const mockReconciliations: ReconciliationItem[] = [
  {
    id: "rec-1",
    poNumber: "LPO-2026-9842",
    poDate: "Feb 27, 2026",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    poAmount: 4800000,
    dispatchedAmount: 4800000,
    gatePassNo: "GP-2026-0842",
    grnAmount: 4800000,
    grnNo: "GRN-KE-2026-0842",
    invoicedAmount: 4800000,
    invoiceNo: "INV-2026-9842",
    paidAmount: 0,
    remittanceNo: "Pending Treasury",
    currency: "KES",
    reconStatus: "audit_matched_pending_pay",
  },
  {
    id: "rec-2",
    poNumber: "LPO-2026-9710",
    poDate: "Feb 23, 2026",
    entity: "Regal Paints Uganda Ltd",
    flag: "UG",
    poAmount: 64000000,
    dispatchedAmount: 64000000,
    gatePassNo: "GP-2026-0799",
    grnAmount: 64000000,
    grnNo: "GRN-UG-2026-0412",
    invoicedAmount: 64000000,
    invoiceNo: "INV-2026-9710",
    paidAmount: 64000000,
    remittanceNo: "REM-2026-8340",
    currency: "UGX",
    reconStatus: "fully_reconciled",
  },
  {
    id: "rec-3",
    poNumber: "LPO-2026-9655",
    poDate: "Feb 17, 2026",
    entity: "Chromex Colourant Limited",
    flag: "CHROMEX",
    poAmount: 2150000,
    dispatchedAmount: 2150000,
    gatePassNo: "GP-2026-0740",
    grnAmount: 2150000,
    grnNo: "GRN-CHR-2026-0188",
    invoicedAmount: 2150000,
    invoiceNo: "INV-2026-9655",
    paidAmount: 2042500,
    remittanceNo: "REM-2026-8492",
    currency: "KES",
    reconStatus: "fully_reconciled",
  },
  {
    id: "rec-4",
    poNumber: "LPO-2026-9481",
    poDate: "Feb 05, 2026",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    poAmount: 3200000,
    dispatchedAmount: 3200000,
    gatePassNo: "GP-2026-0688",
    grnAmount: 3200000,
    grnNo: "GRN-KE-2026-0799",
    invoicedAmount: 3200000,
    invoiceNo: "INV-2026-9481",
    paidAmount: 3040000,
    remittanceNo: "REM-2026-8310",
    currency: "KES",
    reconStatus: "fully_reconciled",
  },
];

const entityOptions: CustomSelectOption[] = [
  { value: "ALL", label: "All Crown Paints Entities", sublabel: "Kenya, Uganda & Chromex Divisions" },
  { value: "Crown Paints Kenya PLC", label: "Crown Paints Kenya PLC", sublabel: "Likoni Rd HQ & Nairobi Factory", flag: "KE" },
  { value: "Chromex Colourant Limited", label: "Chromex Colourant Limited", sublabel: "Industrial Area Colorant Plant", flag: "CHROMEX" },
  { value: "Regal Paints Uganda Ltd", label: "Regal Paints Uganda Ltd", sublabel: "Kampala Operations Hub", flag: "UG" },
];

export default function StatementsPage() {
  const [activeTab, setActiveTab] = useState<"statement" | "wht" | "reconciliation">("statement");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntity, setSelectedEntity] = useState("ALL");
  const [selectedCurrency, setSelectedCurrency] = useState<"KES" | "UGX">("KES");
  const [activeLedgerModal, setActiveLedgerModal] = useState<LedgerEntry | null>(null);
  const [activeWhtModal, setActiveWhtModal] = useState<WhtCertificate | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [inspectTab, setInspectTab] = useState<"details" | "paper">("details");

  // Filter Ledger Entries
  const filteredLedger = mockLedger.filter((item) => {
    const matchesCurrency = item.currency === selectedCurrency;
    const matchesEntity = selectedEntity === "ALL" || item.entity.toLowerCase().includes(selectedEntity.toLowerCase());
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      item.docNumber.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.referencePo && item.referencePo.toLowerCase().includes(q)) ||
      (item.referenceGrn && item.referenceGrn.toLowerCase().includes(q));

    return matchesCurrency && matchesEntity && matchesQuery;
  });

  // Financial aggregates
  const totalInvoicedKES = mockLedger
    .filter((l) => l.currency === "KES" && l.docType === "INVOICE")
    .reduce((acc, l) => acc + l.debitAmount, 0);

  const totalRemittedKES = mockLedger
    .filter((l) => l.currency === "KES" && l.docType === "PAYMENT_REMITTANCE")
    .reduce((acc, l) => acc + l.creditAmount, 0);

  const totalWhtKES = mockLedger
    .filter((l) => l.currency === "KES" && l.docType === "TAX_WHT")
    .reduce((acc, l) => acc + l.creditAmount, 0);

  const currentOutstandingKES = 4800000;

  return (
    <div className="space-y-3.5" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Statements of Account &amp; Financial Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit supplier general ledger, Withholding Tax (WHT) credit vouchers, and 4-way contract reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Currency Toggle */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs text-[11px]">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setSelectedCurrency("KES")}
              className={`px-2.5 py-0.5 font-semibold rounded transition-colors cursor-pointer ${
                selectedCurrency === "KES"
                  ? "bg-[#32298A] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              KES (Kenya)
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setSelectedCurrency("UGX")}
              className={`px-2.5 py-0.5 font-semibold rounded transition-colors cursor-pointer ${
                selectedCurrency === "UGX"
                  ? "bg-[#32298A] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              UGX (Uganda)
            </button>
          </div>

          {/* Download Official Statement PDF */}
          <Button
            onClick={() => setShowPdfModal(true)}
            suppressHydrationWarning
            className="bg-[#32298A] hover:bg-[#271f6f] text-white font-medium text-xs h-8 px-3 gap-1.5 rounded-lg cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Official Statement</span>
          </Button>
        </div>
      </div>

      {/* 4 Compact Core Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Invoiced */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Gross Invoiced</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#32298A] flex items-center justify-center">
              <Receipt className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono">
              KES {totalInvoicedKES.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">3 Fiscal eTIMS Tax Invoices</p>
          </div>
        </div>

        {/* Bank Disbursements */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Settled via RTGS</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-emerald-600 flex items-center justify-center">
              <Landmark className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono">
              KES {totalRemittedKES.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Net funds received in bank</p>
          </div>
        </div>

        {/* Withholding Tax */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">WHT Deductions</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono">
              KES {totalWhtKES.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">5% KRA Withheld (Certificates issued)</p>
          </div>
        </div>

        {/* Current Outstanding AP Balance */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Outstanding AP</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#32298A] flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-[#32298A] font-mono">
              KES {currentOutstandingKES.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">INV-2026-9842 in 3-Way Matched Audit</p>
          </div>
        </div>
      </div>

      {/* Compact Aging Schedule Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Accounts Payable Aging Analysis
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 font-mono">
            Total Open: KES 4,800,000
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2 rounded bg-emerald-50/50 border border-emerald-200/60">
            <span className="text-[10px] font-medium text-emerald-800">Current (0 - 30 Days)</span>
            <p className="text-xs font-bold text-emerald-900 font-mono mt-0.5">KES 4,800,000</p>
          </div>

          <div className="p-2 rounded bg-slate-50 border border-slate-200/60">
            <span className="text-[10px] font-medium text-slate-500">31 - 60 Days</span>
            <p className="text-xs font-bold text-slate-700 font-mono mt-0.5">KES 0.00</p>
          </div>

          <div className="p-2 rounded bg-slate-50 border border-slate-200/60">
            <span className="text-[10px] font-medium text-slate-500">61 - 90 Days</span>
            <p className="text-xs font-bold text-slate-700 font-mono mt-0.5">KES 0.00</p>
          </div>

          <div className="p-2 rounded bg-slate-50 border border-slate-200/60">
            <span className="text-[10px] font-medium text-slate-500">90+ Days Overdue</span>
            <p className="text-xs font-bold text-slate-700 font-mono mt-0.5">KES 0.00</p>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex border-b border-slate-200 space-x-4 text-xs font-semibold">
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setActiveTab("statement")}
          className={`pb-2 transition-colors relative cursor-pointer ${
            activeTab === "statement"
              ? "text-[#32298A] border-b-2 border-[#32298A]"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          Statement of Account (Running Ledger)
        </button>

        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setActiveTab("wht")}
          className={`pb-2 transition-colors relative cursor-pointer ${
            activeTab === "wht"
              ? "text-[#32298A] border-b-2 border-[#32298A]"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          Withholding Tax Certificates ({mockWhtCertificates.length})
        </button>

        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setActiveTab("reconciliation")}
          className={`pb-2 transition-colors relative cursor-pointer ${
            activeTab === "reconciliation"
              ? "text-[#32298A] border-b-2 border-[#32298A]"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          4-Way Contract Reconciliation
        </button>
      </div>

      {/* TAB 1: Statement of Account (Running Ledger) */}
      {activeTab === "statement" && (
        <div className="space-y-3">
          {/* Custom Select Filter & Search Bar */}
          <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="w-full sm:w-72">
              <CustomSelect
                options={entityOptions}
                value={selectedEntity}
                onChange={(val) => setSelectedEntity(val)}
              />
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input
                placeholder="Search Doc #, PO, GRN, or description…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                suppressHydrationWarning
                className="pl-8 h-8 text-xs bg-slate-50/50 border-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Ledger Table Card (High-Density) */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div>
                <h2 className="text-xs sm:text-sm font-semibold text-slate-900">
                  Chronological Transaction Ledger &amp; Running Balance
                </h2>
                <p className="text-[11px] text-slate-400">
                  Debits increase Accounts Payable; Credits (RTGS payments &amp; WHT) decrease balance
                </p>
              </div>
              <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Closing: {selectedCurrency} 4,800,000
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3 whitespace-nowrap">Posting Date</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">Document #</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">Type</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">Crown Entity</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">Description / Reference</th>
                    <th className="py-2.5 px-3 text-right whitespace-nowrap">Debit (Invoice)</th>
                    <th className="py-2.5 px-3 text-right whitespace-nowrap">Credit (Payout)</th>
                    <th className="py-2.5 px-3 text-right whitespace-nowrap">Balance</th>
                    <th className="py-2.5 px-3 text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {filteredLedger.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Date with Calendar Icon */}
                      <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-medium text-xs">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span>{entry.date}</span>
                        </div>
                      </td>

                      {/* Document Ref */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded text-xs inline-block">
                          {entry.docNumber}
                        </span>
                        {entry.paymentRef && (
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {entry.paymentRef}
                          </p>
                        )}
                      </td>

                      {/* Type Badge */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {entry.docType === "INVOICE" && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70 px-2 py-0.5 rounded">
                            <Receipt className="w-3 h-3" />
                            Tax Invoice
                          </span>
                        )}
                        {entry.docType === "PAYMENT_REMITTANCE" && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/70 px-2 py-0.5 rounded">
                            <Landmark className="w-3 h-3" />
                            RTGS Wire
                          </span>
                        )}
                        {entry.docType === "TAX_WHT" && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/70 px-2 py-0.5 rounded">
                            <ShieldCheck className="w-3 h-3" />
                            5% WHT Tax
                          </span>
                        )}
                      </td>

                      {/* Entity with Country Flag */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-medium text-slate-700 text-xs">
                          <FlagIcon country={entry.flag} className="w-4 h-3 rounded-[1px]" />
                          <span className="truncate max-w-[130px]">{entry.entity}</span>
                        </div>
                      </td>

                      {/* Description & Linked Codes */}
                      <td className="py-2.5 px-3 min-w-[200px]">
                        <p className="text-slate-800 font-medium line-clamp-1 text-xs sm:text-sm">{entry.description}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-400 font-mono">
                          {entry.referencePo && (
                            <span className="bg-slate-50 border border-slate-200/60 px-1.5 py-0.2 rounded">
                              PO: {entry.referencePo}
                            </span>
                          )}
                          {entry.referenceGrn && (
                            <span className="bg-slate-50 border border-slate-200/60 px-1.5 py-0.2 rounded">
                              GRN: {entry.referenceGrn}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Debit */}
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        {entry.debitAmount > 0 ? (
                          <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
                            {entry.debitAmount.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>

                      {/* Credit */}
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        {entry.creditAmount > 0 ? (
                          <span className="font-mono font-bold text-emerald-700 text-xs sm:text-sm">
                            ({entry.creditAmount.toLocaleString()})
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>

                      {/* Balance */}
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
                          {entry.currency} {entry.runningBalance.toLocaleString()}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setActiveLedgerModal(entry);
                            setInspectTab("details");
                          }}
                          suppressHydrationWarning
                          className="h-7.5 text-xs font-semibold border-slate-200 hover:bg-slate-50 rounded-md cursor-pointer gap-1 px-2.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          <span>Inspect</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Withholding Tax (WHT) Certificates */}
      {activeTab === "wht" && (
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div>
                <h2 className="text-xs sm:text-sm font-semibold text-slate-900">
                  Official Withholding Tax (WHT) Credit Certificates
                </h2>
                <p className="text-xs text-slate-400">
                  Tax deduction vouchers issued by Crown Paints for KRA &amp; URA
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {mockWhtCertificates.length} Tax Vouchers
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3 whitespace-nowrap">Certificate #</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">Date Issued</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">Tax Authority</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">Withholding Entity</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">Linked Invoice</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">Gross Taxable Value</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">WHT Rate</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">Tax Deducted</th>
                    <th className="py-2.5 px-3 text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockWhtCertificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="font-mono font-bold text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded text-[11px] inline-block">
                          {cert.certNumber}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-slate-700 font-medium">
                        <div className="flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{cert.dateIssued}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="font-semibold text-slate-800 bg-slate-100 border border-slate-200/80 px-1.5 py-0.2 rounded text-[10px]">
                          {cert.taxAuthority}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-medium text-slate-700 text-[11px]">
                          <FlagIcon country={cert.flag} className="w-3.5 h-2.5 rounded-[1px]" />
                          <span className="truncate max-w-[120px]">{cert.entity}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <p className="font-mono font-bold text-[#32298A] text-[11px]">{cert.invoiceNo}</p>
                        <p className="text-[9px] text-slate-400 font-mono">{cert.paymentRef}</p>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-slate-700 whitespace-nowrap text-xs">
                        {cert.currency} {cert.grossAmount.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-800 whitespace-nowrap text-xs">
                        {cert.whtRate}%
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="font-mono font-bold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/70 text-xs">
                          {cert.currency} {cert.whtAmount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveWhtModal(cert)}
                          suppressHydrationWarning
                          className="h-7 text-[11px] font-medium border-slate-200 hover:bg-slate-50 rounded-md cursor-pointer gap-1 px-2"
                        >
                          <FileText className="w-3 h-3 text-slate-500" />
                          <span>View Voucher</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 4-Way Contract Reconciliation */}
      {activeTab === "reconciliation" && (
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div>
                <h2 className="text-xs sm:text-sm font-semibold text-slate-900">
                  4-Way Supply Contract &amp; Payment Reconciliation
                </h2>
                <p className="text-[11px] text-slate-400">
                  Cross-verify Purchase Orders ➔ Delivery Gate Passes ➔ Factory GRN ➔ Fiscal Invoices ➔ Bank Remittance
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                100% Variance Cleared
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-2 px-3 whitespace-nowrap">LPO # &amp; Entity</th>
                    <th className="py-2 px-3 whitespace-nowrap">1. Contracted LPO</th>
                    <th className="py-2 px-3 whitespace-nowrap">2. Dispatched Pass</th>
                    <th className="py-2 px-3 whitespace-nowrap">3. Factory GRN</th>
                    <th className="py-2 px-3 whitespace-nowrap">4. Tax Invoice</th>
                    <th className="py-2 px-3 whitespace-nowrap">5. Bank Settled</th>
                    <th className="py-2 px-3 text-right whitespace-nowrap">Recon Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockReconciliations.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <p className="font-mono font-bold text-slate-900 text-[11px]">{rec.poNumber}</p>
                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-500">
                          <FlagIcon country={rec.flag} className="w-3 h-2 rounded-[1px]" />
                          <span>{rec.entity}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-slate-800 whitespace-nowrap text-xs">
                        {rec.currency} {rec.poAmount.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <p className="font-mono font-semibold text-slate-700 text-xs">
                          {rec.currency} {rec.dispatchedAmount.toLocaleString()}
                        </p>
                        <span className="text-[9px] text-slate-400 font-mono">{rec.gatePassNo}</span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <p className="font-mono font-semibold text-slate-700 text-xs">
                          {rec.currency} {rec.grnAmount.toLocaleString()}
                        </p>
                        <span className="text-[9px] text-slate-400 font-mono">{rec.grnNo}</span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <p className="font-mono font-semibold text-[#32298A] text-xs">
                          {rec.currency} {rec.invoicedAmount.toLocaleString()}
                        </p>
                        <span className="text-[9px] text-slate-400 font-mono">{rec.invoiceNo}</span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <p className="font-mono font-semibold text-emerald-800 text-xs">
                          {rec.currency} {rec.paidAmount.toLocaleString()}
                        </p>
                        <span className="text-[9px] text-slate-400 font-mono">{rec.remittanceNo}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        {rec.reconStatus === "fully_reconciled" && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            Fully Settled
                          </span>
                        )}
                        {rec.reconStatus === "audit_matched_pending_pay" && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.2 rounded">
                            <ShieldCheck className="w-2.5 h-2.5 text-blue-600" />
                            3-Way Matched
                          </span>
                        )}
                        {rec.reconStatus === "in_transit" && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded">
                            <Clock className="w-2.5 h-2.5 text-amber-600" />
                            In Transit
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Ledger Detail Inspector Modal */}
      {activeLedgerModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full p-5 sm:p-6 space-y-4 animate-in zoom-in-95 duration-150 my-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#32298A] flex items-center justify-center font-bold">
                  <Receipt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                      {activeLedgerModal.docNumber}
                    </h3>
                    <span className="text-[9px] font-bold text-[#32298A] bg-slate-100 px-1.5 py-0.2 rounded uppercase">
                      {activeLedgerModal.docType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Recorded Date: {activeLedgerModal.date} · {activeLedgerModal.entity}
                  </p>
                </div>
              </div>

              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveLedgerModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Switch between Details view and Certificate preview */}
            <div className="flex border-b border-slate-200 gap-3 text-xs font-semibold">
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setInspectTab("details")}
                className={`pb-1.5 transition-colors cursor-pointer ${
                  inspectTab === "details"
                    ? "text-[#32298A] border-b-2 border-[#32298A]"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Accounting Ledger Breakdown
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setInspectTab("paper")}
                className={`pb-1.5 transition-colors cursor-pointer ${
                  inspectTab === "paper"
                    ? "text-[#32298A] border-b-2 border-[#32298A]"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Document Slip / Voucher Preview
              </button>
            </div>

            {inspectTab === "details" ? (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-semibold">Operating Entity</span>
                    <p className="font-semibold text-slate-900 mt-0.5 text-xs">{activeLedgerModal.entity}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-semibold">Posting Date</span>
                    <p className="font-mono font-medium text-slate-800 mt-0.5 text-xs">{activeLedgerModal.date}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-semibold">Associated PO</span>
                    <p className="font-mono font-bold text-[#32298A] mt-0.5 text-xs">{activeLedgerModal.referencePo || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-semibold">Verified GRN</span>
                    <p className="font-mono font-bold text-slate-800 mt-0.5 text-xs">{activeLedgerModal.referenceGrn || "N/A"}</p>
                  </div>
                  {activeLedgerModal.etimsNumber && (
                    <div className="col-span-2 pt-1.5 border-t border-slate-200/60">
                      <span className="text-slate-400 text-[10px] block uppercase font-semibold">KRA eTIMS Fiscal Signature</span>
                      <p className="font-mono font-bold text-slate-900 mt-0.5 bg-white border border-slate-200 px-1.5 py-0.5 rounded inline-block text-xs">
                        {activeLedgerModal.etimsNumber}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Debit Amount:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {activeLedgerModal.debitAmount > 0
                        ? `${activeLedgerModal.currency} ${activeLedgerModal.debitAmount.toLocaleString()}`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Credit Amount:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {activeLedgerModal.creditAmount > 0
                        ? `(${activeLedgerModal.currency} ${activeLedgerModal.creditAmount.toLocaleString()})`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-900 pt-1.5 border-t border-slate-200 font-bold">
                    <span>Running Account Balance:</span>
                    <span className="font-mono text-sm text-[#32298A]">
                      {activeLedgerModal.currency} {activeLedgerModal.runningBalance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-3 text-xs font-sans shadow-2xs">
                {/* Paper Header */}
                <div className="flex items-start justify-between pb-2.5 border-b border-slate-200">
                  <div className="space-y-0.5">
                    <p className="font-bold text-xs text-[#32298A]">Crown Paints Kenya PLC</p>
                    <p className="text-[10px] text-slate-500">Likoni Road Factory · Enterprise Accounts Hub</p>
                    <p className="text-[9px] text-slate-400 font-mono">PIN: P000609341X</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                      {activeLedgerModal.docNumber}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{activeLedgerModal.date}</p>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-100 space-y-0.5">
                  <p className="text-[11px] font-semibold text-slate-800">Apex Industrial Polymers Ltd (VEND-KE-84920)</p>
                  <p className="text-[11px] text-slate-600">{activeLedgerModal.description}</p>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Audit Matched &amp; Verified</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-slate-900">
                    {activeLedgerModal.currency}{" "}
                    {(activeLedgerModal.debitAmount || activeLedgerModal.creditAmount).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <Button
                variant="outline"
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveLedgerModal(null)}
                className="h-8 text-xs border-slate-200 rounded-lg cursor-pointer"
              >
                Close
              </Button>

              <div className="flex items-center gap-2">
                {activeLedgerModal.referencePo && (
                  <Link href={`/lpos`}>
                    <Button suppressHydrationWarning className="h-8 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold gap-1.5 rounded-lg cursor-pointer">
                      <span>Inspect Linked LPO</span>
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced WHT Voucher Inspector Modal */}
      {activeWhtModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 space-y-4 animate-in zoom-in-95 duration-150 my-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                    {activeWhtModal.certNumber}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {activeWhtModal.taxAuthority} Credit Certificate · {activeWhtModal.dateIssued}
                  </p>
                </div>
              </div>

              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveWhtModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Official Tax Certificate Body */}
            <div className="p-3.5 rounded-lg bg-amber-50/40 border border-amber-200/70 space-y-2 text-xs">
              <div className="flex justify-between pb-1.5 border-b border-amber-200/50">
                <span className="text-slate-600 font-medium">Tax Authority:</span>
                <span className="font-bold text-slate-900">{activeWhtModal.taxAuthority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Customer:</span>
                <span className="font-semibold text-slate-900">{activeWhtModal.entity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Customer Tax PIN:</span>
                <span className="font-mono font-semibold text-slate-800">{activeWhtModal.withholderPin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Vendor PIN:</span>
                <span className="font-mono font-semibold text-slate-800">{activeWhtModal.vendorPin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Linked Invoice:</span>
                <span className="font-mono font-bold text-[#32298A]">{activeWhtModal.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Gross Taxable:</span>
                <span className="font-mono font-semibold text-slate-900">
                  {activeWhtModal.currency} {activeWhtModal.grossAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-amber-200 font-bold">
                <span className="text-amber-950">Tax Withheld ({activeWhtModal.whtRate}% Rate):</span>
                <span className="font-mono text-xs text-amber-900">
                  {activeWhtModal.currency} {activeWhtModal.whtAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <Button
                variant="outline"
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveWhtModal(null)}
                className="h-8 text-xs border-slate-200 rounded-lg cursor-pointer"
              >
                Close
              </Button>
              <Button
                type="button"
                suppressHydrationWarning
                onClick={() => alert(`Downloading Official Tax Voucher ${activeWhtModal.certNumber}...`)}
                className="h-8 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold gap-1.5 rounded-lg cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Tax Voucher PDF</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Official Statement PDF Preview Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-4xl w-full p-5 sm:p-6 space-y-4 my-6 animate-in zoom-in-95 duration-150">
            {/* Modal Actions Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2">
                <FileBarChart className="w-4 h-4 text-[#32298A]" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Official Supplier Statement of Account</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  suppressHydrationWarning
                  onClick={() => window.print()}
                  className="h-7.5 text-xs font-semibold border-slate-200 rounded-lg gap-1 cursor-pointer"
                >
                  <Printer className="w-3 h-3" />
                  <span>Print</span>
                </Button>
                <Button
                  size="sm"
                  type="button"
                  suppressHydrationWarning
                  onClick={() => alert("Statement of Account downloaded successfully.")}
                  className="h-7.5 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold rounded-lg gap-1 cursor-pointer shadow-2xs"
                >
                  <Download className="w-3 h-3" />
                  <span>Download PDF</span>
                </Button>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setShowPdfModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 ml-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Statement Document Content */}
            <div className="space-y-4 border border-slate-200 rounded-lg p-4 sm:p-6 bg-white">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 pb-4 border-b border-slate-200">
                <div>
                  <Image
                    src="/images/logo/logo.png"
                    alt="Crown Paints Logo"
                    width={120}
                    height={30}
                    style={{ width: "auto", height: "auto" }}
                    className="object-contain max-h-7"
                  />
                  <div className="mt-1.5 text-[11px] text-slate-500 leading-tight">
                    <p className="font-bold text-slate-800">Crown Paints Kenya PLC</p>
                    <p>Likoni Road, Industrial Area · P.O. Box 78848 - 00507, Nairobi</p>
                    <p>PIN: P000609341X · Tel: +254 709 887 000</p>
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[11px] font-bold text-[#32298A] bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                    Statement of Account
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">Date: <strong>February 28, 2026</strong></p>
                  <p className="text-[11px] text-slate-400">Period: <strong>Feb 01 – Feb 28, 2026</strong></p>
                  <p className="text-[11px] text-slate-400 font-mono">Currency: <strong>KES</strong></p>
                </div>
              </div>

              {/* Vendor Account Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 uppercase font-semibold text-[10px]">Vendor Details</span>
                  <p className="font-bold text-slate-900 text-xs mt-0.5">Apex Industrial Polymers Ltd</p>
                  <p className="text-[11px] text-slate-600">Enterprise Road, Industrial Area, Nairobi</p>
                  <p className="text-[11px] text-slate-500">PIN: <span className="font-mono text-slate-800">P051284920Z</span></p>
                </div>
                <div className="sm:text-right">
                  <span className="text-slate-400 uppercase font-semibold text-[10px]">Summary</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">Code: <span className="font-mono font-bold text-slate-800">VEND-KE-84920</span></p>
                  <p className="text-[11px] text-slate-600">Terms: <span className="font-semibold text-slate-800">Net 30 Days</span></p>
                  <p className="text-xs font-bold text-[#32298A] font-mono mt-0.5">
                    Closing: KES 4,800,000
                  </p>
                </div>
              </div>

              {/* Transaction Statement Table */}
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                    <th className="py-2">Date</th>
                    <th className="py-2">Document #</th>
                    <th className="py-2">Description</th>
                    <th className="py-2 text-right">Debit (+)</th>
                    <th className="py-2 text-right">Credit (-)</th>
                    <th className="py-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockLedger.filter((l) => l.currency === "KES").map((item) => (
                    <tr key={item.id} className="text-slate-700">
                      <td className="py-2 text-slate-500 text-[11px]">{item.date}</td>
                      <td className="py-2 font-mono font-semibold text-slate-900 text-[11px]">{item.docNumber}</td>
                      <td className="py-2 max-w-[180px] truncate text-[11px]">{item.description}</td>
                      <td className="py-2 text-right font-mono font-medium text-xs">
                        {item.debitAmount > 0 ? item.debitAmount.toLocaleString() : "-"}
                      </td>
                      <td className="py-2 text-right font-mono font-medium text-emerald-700 text-xs">
                        {item.creditAmount > 0 ? `(${item.creditAmount.toLocaleString()})` : "-"}
                      </td>
                      <td className="py-2 text-right font-mono font-bold text-slate-900 text-xs">
                        {item.runningBalance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Document Signoff Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-1.5">
                <span>Computer generated official statement. Crown Paints Enterprise ERP.</span>
                <span className="font-mono">Ref: KES-STMT-2026-084920</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
