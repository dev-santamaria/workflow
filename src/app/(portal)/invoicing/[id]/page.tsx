"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { BarcodeView } from "@/components/ui/barcode-view";
import {
  Receipt,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Building2,
} from "lucide-react";

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const invoiceId = resolvedParams.id || "INV-2026-9842";
  const [qrUrl, setQrUrl] = useState("");

  const invoiceData = {
    invoiceNumber: invoiceId,
    etimsNumber: "KRA-ETIMS-91820481",
    grnNumber: "GRN-KE-2026-0842",
    poNumber: "LPO-2026-9842",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    invoiceType: "Procurement Supply",
    invoiceDate: "Feb 27, 2026",
    postingDate: "Feb 28, 2026",
    subtotal: 4137931,
    taxRate: 16,
    taxAmount: 662069,
    totalAmount: 4800000,
    currency: "KES",
    status: "3-Way Audit Matched",
    items: [
      { id: 1, description: "Pure Acrylic Polymer Emulsion (High Gloss Formulation)", qty: "20 MT", unitPrice: "KES 140,000 / MT", subtotal: 2413793 },
      { id: 2, description: "Rutile Titanium Dioxide Pigment (Paint Grade 99.5%)", qty: "10 MT", unitPrice: "KES 200,000 / MT", subtotal: 1724138 },
    ],
  };

  useEffect(() => {
    QRCode.toDataURL(`KRA_ETIMS_TAX_INVOICE:${invoiceData.etimsNumber}|INV:${invoiceData.invoiceNumber}|TOTAL:KES${invoiceData.totalAmount}`, {
      width: 110,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    }).then(setQrUrl).catch(() => setQrUrl(""));
  }, [invoiceData.etimsNumber, invoiceData.invoiceNumber, invoiceData.totalAmount]);

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link href="/invoicing">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg border-slate-200">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {invoiceData.invoiceNumber}
              </span>
              <span className="text-xs font-mono text-slate-400">eTIMS: {invoiceData.etimsNumber}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-0.5">
              Fiscal e-Invoice Inspection
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>3-Way Matched with GRN</span>
          </span>
        </div>
      </div>

      {/* Invoice Document Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] max-w-4xl mx-auto">
        <div className="flex items-start justify-between border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <Image
              src="/images/logo/logo.png"
              alt="Crown Paints Logo"
              width={140}
              height={38}
              style={{ width: "auto", height: "auto" }}
              className="object-contain max-h-9"
              priority
            />
            <h3 className="text-sm font-bold text-slate-900 pt-2">{invoiceData.entity}</h3>
            <p className="text-xs text-slate-400">Accounts Payable &amp; Financial Auditing Division</p>
          </div>

          <div className="text-right space-y-1 font-mono">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Fiscal Tax Invoice:</span>
            <span className="text-lg font-black text-[#32298A]">{invoiceData.invoiceNumber}</span>
            <p className="text-xs text-slate-500 font-sans">Date: {invoiceData.invoiceDate}</p>
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3" />
              <span>3-Way Matched</span>
            </span>
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/70 rounded-lg text-xs border border-slate-100">
          <div>
            <span className="font-semibold text-slate-500 uppercase text-[10px] block">Supplier (Issuer):</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">Apex Industrial Polymers Ltd</p>
            <p className="text-slate-500 font-mono text-[11px]">Tax PIN: P051982736Z · Vendor Code: VEND-KE-84920</p>
          </div>
          <div>
            <span className="font-semibold text-slate-500 uppercase text-[10px] block">Audit Cross-References:</span>
            <p className="text-slate-700 font-mono mt-0.5">Goods Received Note: <strong>{invoiceData.grnNumber}</strong></p>
            <p className="text-slate-700 font-mono text-[11px]">Purchase Order: <strong>{invoiceData.poNumber}</strong></p>
          </div>
        </div>

        {/* Items Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-[10px] font-semibold text-slate-600 uppercase border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">#</th>
                <th className="py-2.5 px-4">Item Description</th>
                <th className="py-2.5 px-3">Verified Qty</th>
                <th className="py-2.5 px-3">Unit Price</th>
                <th className="py-2.5 px-4 text-right">Taxable Net Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {invoiceData.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-4 font-mono text-slate-400">{item.id}</td>
                  <td className="py-3 px-4 font-medium text-slate-900">{item.description}</td>
                  <td className="py-3 px-3 font-semibold text-slate-700">{item.qty}</td>
                  <td className="py-3 px-3 text-slate-600 font-mono">{item.unitPrice}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 text-right font-mono">
                    KES {item.subtotal.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-200 bg-slate-50 text-xs">
                <td colSpan={4} className="py-2 px-4 text-right text-slate-500">Taxable Net Amount:</td>
                <td className="py-2 px-4 text-right font-mono text-slate-700">KES {invoiceData.subtotal.toLocaleString()}</td>
              </tr>
              <tr className="bg-slate-50 text-xs">
                <td colSpan={4} className="py-1 px-4 text-right text-slate-500">VAT (16% Standard):</td>
                <td className="py-1 px-4 text-right font-mono text-slate-700">KES {invoiceData.taxAmount.toLocaleString()}</td>
              </tr>
              <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold text-sm">
                <td colSpan={4} className="py-3 px-4 text-right uppercase text-slate-900">Total Invoice Amount:</td>
                <td className="py-3 px-4 text-right text-[#32298A] font-mono font-black">
                  {invoiceData.currency} {invoiceData.totalAmount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-4">
            {qrUrl && (
              <Image src={qrUrl} alt="eTIMS QR" width={68} height={68} className="rounded border border-slate-200 p-1" />
            )}
            <BarcodeView code={invoiceData.etimsNumber} height={28} />
          </div>

          <div className="text-right text-[11px] text-slate-400 space-y-0.5">
            <p className="font-semibold text-slate-700">KRA eTIMS Fiscal Compliance Verified</p>
            <p className="font-mono">Control Unit: KRA-CU-09281048-2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
