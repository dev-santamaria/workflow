"use client";

import { useState } from "react";
import Link from "next/link";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import {
  Receipt,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Plus,
  Eye,
  Calendar,
} from "lucide-react";

interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  etimsNumber: string;
  grnNumber: string;
  poNumber: string;
  entity: string;
  flag: string;
  invoiceType: "procurement" | "miscellaneous";
  invoiceDate: string;
  postingDate: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: "submitted" | "three_way_matched" | "approved_for_payment" | "paid";
  comments: string;
  attachedDocName: string;
}

const mockInvoices: InvoiceItem[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-9842",
    etimsNumber: "KRA-ETIMS-91820481",
    grnNumber: "GRN-KE-2026-0842",
    poNumber: "LPO-2026-9842",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    invoiceType: "procurement",
    invoiceDate: "Feb 27, 2026",
    postingDate: "Feb 28, 2026",
    subtotal: 4137931,
    taxRate: 16,
    taxAmount: 662069,
    totalAmount: 4800000,
    currency: "KES",
    status: "three_way_matched",
    comments: "Pure Acrylic Polymer Emulsion batch delivery as per verified GRN-KE-2026-0842.",
    attachedDocName: "KRA_eTIMS_Invoice_91820481.pdf",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-9710",
    etimsNumber: "EFRIS-UG-84920194",
    grnNumber: "GRN-UG-2026-0412",
    poNumber: "LPO-2026-9710",
    entity: "Regal Paints Uganda Ltd",
    flag: "UG",
    invoiceType: "procurement",
    invoiceDate: "Feb 24, 2026",
    postingDate: "Feb 24, 2026",
    subtotal: 54237288,
    taxRate: 18,
    taxAmount: 9762712,
    totalAmount: 64000000,
    currency: "UGX",
    status: "approved_for_payment",
    comments: "Paint tinplate cans and buckets supply. Approved by Kampala plant receiving.",
    attachedDocName: "Regal_EFRIS_Tax_Invoice.pdf",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-9655",
    etimsNumber: "KRA-ETIMS-82910488",
    grnNumber: "GRN-CHR-2026-0188",
    poNumber: "LPO-2026-9655",
    entity: "Chromex Colourant Limited",
    flag: "CHROMEX",
    invoiceType: "procurement",
    invoiceDate: "Feb 18, 2026",
    postingDate: "Feb 18, 2026",
    subtotal: 1853448,
    taxRate: 16,
    taxAmount: 296552,
    totalAmount: 2150000,
    currency: "KES",
    status: "paid",
    comments: "Tinting surfactants supply. Fully settled via RTGS.",
    attachedDocName: "Chromex_eTIMS_Signed.pdf",
  },
];

export default function InvoicingPage() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>(mockInvoices);

  return (
    <div className="space-y-3.5" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Invoicing &amp; eTIMS 3-Way Audit Matching
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit fiscal tax invoices against verified Goods Received Notes (GRN). Automatic 3-way matching queues payment release.
          </p>
        </div>

        <Link href="/invoicing/create">
          <Button
            suppressHydrationWarning
            className="bg-[#32298A] hover:bg-[#271f6f] text-white font-medium text-xs h-8 px-3 gap-1.5 rounded-lg cursor-pointer flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Invoice</span>
          </Button>
        </Link>
      </div>

      {/* Invoices List Table (Compact High-Density) */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-slate-900">
              Submitted Invoices &amp; Accounts Payable Status
            </h2>
            <p className="text-[11px] text-slate-400">Track 3-way matching and Accounts approval</p>
          </div>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {invoices.length} Invoices Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3 whitespace-nowrap">Invoice # / Date</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Tax Authority Reference</th>
                <th className="py-2.5 px-3 whitespace-nowrap">GRN / LPO Linked</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Invoice Type</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Tax (VAT)</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Total Amount</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Matching Status</th>
                <th className="py-2.5 px-3 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <p className="font-bold text-slate-900 font-mono text-xs">{inv.invoiceNumber}</p>
                    <p className="text-[11px] text-slate-400">{inv.invoiceDate}</p>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="font-mono text-slate-700 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded text-xs">
                      {inv.etimsNumber}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <p className="font-semibold text-slate-900 font-mono text-xs">{inv.grnNumber}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{inv.poNumber}</p>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="capitalize font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs">
                      {inv.invoiceType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <span className="font-medium text-slate-700 text-xs">{inv.taxRate}% VAT</span>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {inv.currency} {inv.taxAmount.toLocaleString()}
                      </p>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <p className="font-bold text-slate-900 font-mono text-xs sm:text-sm">
                      {inv.currency} {inv.totalAmount.toLocaleString()}
                    </p>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    {inv.status === "submitted" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>Submitted</span>
                      </span>
                    )}
                    {inv.status === "three_way_matched" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                        <ShieldCheck className="w-3 h-3 text-slate-500" />
                        <span>3-Way Matched</span>
                      </span>
                    )}
                    {inv.status === "approved_for_payment" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200/80">
                        <CheckCircle2 className="w-3 h-3 text-purple-600" />
                        <span>Approved</span>
                      </span>
                    )}
                    {inv.status === "paid" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Settled</span>
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <Link href={`/invoicing/${inv.invoiceNumber}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        suppressHydrationWarning
                        className="h-7.5 text-xs font-semibold border-slate-200 hover:bg-slate-50 rounded-md cursor-pointer gap-1 px-2.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>Inspect</span>
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
