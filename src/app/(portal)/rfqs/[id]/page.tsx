"use client";

import { use, useState } from "react";
import Link from "next/link";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarcodeView } from "@/components/ui/barcode-view";
import {
  FileSpreadsheet,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Check,
  FileCheck,
  Upload,
  Eye,
  X,
  Printer,
} from "lucide-react";

export default function RFQDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const rfqId = resolvedParams.id || "RFQ-2026-0810";

  const [confirmedQtys, setConfirmedQtys] = useState<Record<string, string>>({
    "item-1": "20",
    "item-2": "10",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const rfqData = {
    id: rfqId,
    reqNumber: "REQ-2026-4891",
    title: "Pure Acrylic Polymer Emulsions & Rutile TiO2 Pigments",
    entity: "Crown Paints Kenya PLC (Likoni Rd HQ)",
    flag: "KE",
    category: "Raw Materials & Resins",
    issuedDate: "Feb 26, 2026",
    deadlineDate: "March 3, 2026",
    status: "Awaiting Confirmation",
    items: [
      { id: "item-1", description: "Pure Acrylic Polymer Emulsion (High Gloss Formulation - 55% Solid)", unit: "MT", qty: 20, unitPrice: 140000, discount: 0, taxRate: 0 },
      { id: "item-2", description: "Rutile Titanium Dioxide Pigment (Paint Grade 99.5% Purity)", unit: "MT", qty: 10, unitPrice: 200000, discount: 0, taxRate: 0 },
    ],
  };

  const totalVal = rfqData.items.reduce((a, b) => a + b.qty * b.unitPrice, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Back button & Title */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link href="/rfqs">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg border-slate-200">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {rfqData.id}
              </span>
              <span className="text-xs font-mono text-slate-400">Requisition: {rfqData.reqNumber}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-0.5">
              {rfqData.title}
            </h1>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="h-8 text-xs font-medium border-slate-200 rounded-lg gap-1.5"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>Print Spec</span>
        </Button>
      </div>

      {/* Main Spec Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Requisition Sheet (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FlagIcon country={rfqData.flag} className="w-4 h-3 rounded-[1px]" />
              <h2 className="text-sm font-semibold text-slate-900">{rfqData.entity}</h2>
            </div>
            <span className="text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-md">
              {rfqData.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50/70 rounded-lg text-xs border border-slate-100">
            <div>
              <span className="text-slate-400 text-[10px] block">Issued Date:</span>
              <span className="font-semibold text-slate-800">{rfqData.issuedDate}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Response Deadline:</span>
              <span className="font-bold text-amber-900">{rfqData.deadlineDate}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Supply Division:</span>
              <span className="font-semibold text-slate-800">{rfqData.category}</span>
            </div>
          </div>

          {/* Line items table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-2">Unit</th>
                  <th className="py-2.5 px-2">Qty Requested</th>
                  <th className="py-2.5 px-2">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {rfqData.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-3 font-medium text-slate-900">{item.description}</td>
                    <td className="py-3 px-2 text-slate-500">{item.unit}</td>
                    <td className="py-3 px-2 font-bold text-slate-800">{item.qty}</td>
                    <td className="py-3 px-2 text-slate-600 font-mono">KES {item.unitPrice.toLocaleString()}</td>
                    <td className="py-3 px-3 font-bold text-slate-900 text-right font-mono">
                      KES {(item.qty * item.unitPrice).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-200 bg-slate-50 font-bold">
                  <td colSpan={4} className="py-2.5 px-3 text-right text-xs uppercase text-slate-600">Estimated Total Value:</td>
                  <td className="py-2.5 px-3 text-right text-xs font-bold text-slate-900 font-mono">KES {totalVal.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2">
            <BarcodeView code={rfqData.id} height={32} />
            <div className="text-right text-[11px] text-slate-400 font-mono">
              <span>Security Hash: SHA256-849204A</span>
            </div>
          </div>
        </div>

        {/* Right: Confirmation & Quotation Form (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Confirm Fulfillment</h3>
            <p className="text-xs text-slate-400">Confirm exact quantities and submit signed quotation</p>
          </div>

          {isSuccess ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-900">RFQ Confirmed &amp; Notified!</p>
              <p className="text-[11px] text-slate-500">The requisitioner is preparing your LPO.</p>
              <Link href="/rfqs">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs border-slate-200">
                  Return to RFQs
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-slate-900">Confirm QTY Fulfillment</Label>
                {rfqData.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="truncate max-w-[160px] text-slate-700">{item.description}</span>
                    <span className="font-bold text-slate-900 font-mono">{item.qty} {item.unit}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-900">Attach Signed Quotation</Label>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
                  <span className="truncate text-slate-700 font-medium">Apex_Quotation_Signed.pdf</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Attached</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-9 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-medium rounded-lg"
              >
                {isSubmitting ? "Submitting Confirmation…" : "Confirm & Send to Requisitioner"}
              </Button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
