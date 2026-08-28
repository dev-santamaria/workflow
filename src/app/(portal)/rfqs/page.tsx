"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileSpreadsheet,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Upload,
  FileText,
  ArrowRight,
  X,
  Building2,
  FileCheck,
  Check,
  Eye,
} from "lucide-react";

interface RFQItem {
  id: string;
  reqNumber: string;
  title: string;
  entity: string;
  flag: string;
  category: string;
  issuedDate: string;
  deadlineDate: string;
  status: "awaiting_confirmation" | "confirmed_pending_lpo" | "lpo_generated";
  lpoNumber?: string;
  items: {
    id: string;
    description: string;
    unit: string;
    qty: number;
    unitPrice: number;
    discount: number;
    taxRate: number;
  }[];
}

const mockSupplierRFQs: RFQItem[] = [
  {
    id: "RFQ-2026-0810",
    reqNumber: "REQ-2026-4891",
    title: "Pure Acrylic Polymer Emulsions & Rutile TiO2 Pigments",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    category: "Raw Materials",
    issuedDate: "Feb 26, 2026",
    deadlineDate: "March 3, 2026",
    status: "awaiting_confirmation",
    items: [
      {
        id: "item-1",
        description: "Pure Acrylic Polymer Emulsion (High Gloss Formulation - 55% Solid)",
        unit: "MT",
        qty: 20,
        unitPrice: 140000,
        discount: 0,
        taxRate: 0,
      },
      {
        id: "item-2",
        description: "Rutile Titanium Dioxide Pigment (Paint Grade 99.5% Purity)",
        unit: "MT",
        qty: 10,
        unitPrice: 200000,
        discount: 0,
        taxRate: 0,
      },
    ],
  },
  {
    id: "RFQ-2026-0792",
    reqNumber: "REQ-2026-4720",
    title: "20L & 4L Branded Paint Packaging Cans & Buckets",
    entity: "Regal Paints Uganda Ltd",
    flag: "UG",
    category: "Packaging Materials",
    issuedDate: "Feb 22, 2026",
    deadlineDate: "Feb 28, 2026",
    status: "confirmed_pending_lpo",
    items: [
      {
        id: "item-3",
        description: "20L Metal Paint Containers with Crown Litho Print & Handles",
        unit: "Units",
        qty: 5000,
        unitPrice: 8000,
        discount: 0,
        taxRate: 0,
      },
      {
        id: "item-4",
        description: "4L Plastic Paint Buckets with Airtight Security Lids",
        unit: "Units",
        qty: 8000,
        unitPrice: 3000,
        discount: 0,
        taxRate: 0,
      },
    ],
  },
  {
    id: "RFQ-2026-0740",
    reqNumber: "REQ-2026-4510",
    title: "Universal Tinting Paste Dispersing Agents & Additives",
    entity: "Chromex Colourant Limited",
    flag: "CHROMEX",
    category: "Specialty Chemicals",
    issuedDate: "Feb 15, 2026",
    deadlineDate: "Feb 20, 2026",
    status: "lpo_generated",
    lpoNumber: "LPO-2026-9655",
    items: [
      {
        id: "item-5",
        description: "Universal Tinting Paste Dispersing Surfactants (Non-Ionic)",
        unit: "Drums",
        qty: 15,
        unitPrice: 110000,
        discount: 0,
        taxRate: 0,
      },
    ],
  },
];

export default function RFQsPage() {
  const [rfqs, setRfqs] = useState<RFQItem[]>(mockSupplierRFQs);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRFQModal, setActiveRFQModal] = useState<RFQItem | null>(null);

  // Form confirmation state
  const [confirmedQtys, setConfirmedQtys] = useState<Record<string, string>>({});
  const [qtyErrors, setQtyErrors] = useState<Record<string, string>>({});
  const [uploadedDoc, setUploadedDoc] = useState<{
    name: string;
    originalSize: string;
    compressedSize: string;
    type: "pdf" | "image";
    previewUrl?: string;
  } | null>(null);
  const [previewDocModal, setPreviewDocModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  const filteredRFQs = rfqs.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.reqNumber.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.entity.toLowerCase().includes(q)
    );
  });

  const handleOpenRFQ = (rfq: RFQItem) => {
    setActiveRFQModal(rfq);
    setIsSuccessSubmitted(false);
    const initialQtys: Record<string, string> = {};
    rfq.items.forEach((item) => {
      initialQtys[item.id] = String(item.qty);
    });
    setConfirmedQtys(initialQtys);
    setQtyErrors({});
    setUploadedDoc({
      name: "Apex_Quotation_Doc_Signed.pdf",
      originalSize: "2.4 MB",
      compressedSize: "380 KB (Compressed)",
      type: "pdf",
    });
  };

  const handleQtyChange = (itemId: string, requestedQty: number, val: string) => {
    setConfirmedQtys((prev) => ({ ...prev, [itemId]: val }));
    const num = Number(val);
    if (isNaN(num) || num !== requestedQty) {
      setQtyErrors((prev) => ({
        ...prev,
        [itemId]: `Must confirm exact requested QTY of ${requestedQty} units`,
      }));
    } else {
      setQtyErrors((prev) => {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImg = file.type.startsWith("image/");
      const origSize = (file.size / 1024 / 1024).toFixed(1) + " MB";
      const compSize = (file.size / 1024 / 1024 * 0.2).toFixed(1) + " MB (Compressed)";
      setUploadedDoc({
        name: file.name,
        originalSize: origSize,
        compressedSize: compSize,
        type: isImg ? "image" : "pdf",
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmitConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRFQModal) return;

    let hasError = false;
    activeRFQModal.items.forEach((item) => {
      if (Number(confirmedQtys[item.id]) !== item.qty) {
        hasError = true;
        setQtyErrors((prev) => ({
          ...prev,
          [item.id]: `Must confirm exact requested QTY of ${item.qty} units`,
        }));
      }
    });

    if (hasError) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessSubmitted(true);
      setRfqs((prev) =>
        prev.map((r) =>
          r.id === activeRFQModal.id ? { ...r, status: "confirmed_pending_lpo" } : r
        )
      );
    }, 1200);
  };

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            RFQs (Request For Quotations)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review requisitions allocated to your company, confirm fulfillment quantities, attach your quotation, and submit for LPO generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg border border-slate-200/80 bg-white text-xs text-slate-600 flex items-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">Assigned Requisitions Only</span>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-medium text-slate-500">
          Showing <strong>{filteredRFQs.length}</strong> Assigned Requisitions
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by RFQ #, Requisition #, or Title…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            suppressHydrationWarning
            className="pl-9 h-9 text-xs bg-slate-50/50 border-slate-200 rounded-lg"
          />
        </div>
      </div>

      {/* RFQ Listing Cards */}
      <div className="space-y-4">
        {filteredRFQs.map((rfq) => {
          const totalVal = rfq.items.reduce(
            (acc, item) => acc + item.qty * item.unitPrice * (1 - item.discount / 100),
            0
          );
          return (
            <div
              key={rfq.id}
              className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {rfq.id}
                    </span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded">
                      Requisition: {rfq.reqNumber}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <FlagIcon country={rfq.flag} className="w-4 h-3 rounded-[1px]" />
                      <span>{rfq.entity}</span>
                    </div>
                  </div>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug pt-0.5">
                    {rfq.title}
                  </h2>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  {rfq.status === "awaiting_confirmation" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 text-amber-900 font-medium text-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Awaiting Your Confirmation</span>
                    </span>
                  )}
                  {rfq.status === "confirmed_pending_lpo" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Confirmed · Pending LPO</span>
                    </span>
                  )}
                  {rfq.status === "lpo_generated" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-medium text-xs">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>LPO Issued ({rfq.lpoNumber})</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Line Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 font-semibold text-[11px] uppercase border-b border-slate-100">
                      <th className="py-2">Item Description</th>
                      <th className="py-2">Unit</th>
                      <th className="py-2">Requested Qty</th>
                      <th className="py-2">Unit Price</th>
                      <th className="py-2 text-right">Estimated Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {rfq.items.map((item) => (
                      <tr key={item.id} className="text-slate-700">
                        <td className="py-2.5 font-medium text-slate-900">{item.description}</td>
                        <td className="py-2.5 text-slate-500">{item.unit}</td>
                        <td className="py-2.5 font-semibold text-slate-900">{item.qty}</td>
                        <td className="py-2.5 text-slate-600 font-mono">KES {item.unitPrice.toLocaleString()}</td>
                        <td className="py-2.5 font-semibold text-slate-900 text-right font-mono">
                          KES {(item.qty * item.unitPrice).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Issued: <strong>{rfq.issuedDate}</strong></span>
                  <span>·</span>
                  <span>Deadline: <strong className="text-amber-800 font-semibold">{rfq.deadlineDate}</strong></span>
                  <span>·</span>
                  <span>Total Value: <strong className="text-slate-900 font-bold font-mono">KES {totalVal.toLocaleString()}</strong></span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {rfq.status === "awaiting_confirmation" ? (
                    <Button
                      size="sm"
                      onClick={() => handleOpenRFQ(rfq)}
                      suppressHydrationWarning
                      className="h-9 text-xs font-medium bg-[#32298A] hover:bg-[#271f6f] text-white gap-1.5 rounded-lg cursor-pointer px-4"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Review &amp; Confirm RFQ</span>
                    </Button>
                  ) : rfq.status === "lpo_generated" ? (
                    <Link href={`/lpos?po=${rfq.lpoNumber}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        suppressHydrationWarning
                        className="h-9 text-xs font-medium border-slate-200 text-slate-800 hover:bg-slate-50 gap-1.5 rounded-lg cursor-pointer"
                      >
                        <span>View LPO ({rfq.lpoNumber})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenRFQ(rfq)}
                      suppressHydrationWarning
                      className="h-9 text-xs font-normal text-slate-500 border-slate-200 rounded-lg"
                    >
                      <span>View Confirmed RFQ</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RFQ Confirmation Modal */}
      {activeRFQModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-3xl w-full p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-semibold text-slate-900">RFQ Fulfillment Confirmation</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {activeRFQModal.id} · Requisition: {activeRFQModal.reqNumber} · {activeRFQModal.entity}
                </p>
              </div>
              <button
                onClick={() => setActiveRFQModal(null)}
                suppressHydrationWarning
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSuccessSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-slate-900">RFQ Confirmation Submitted!</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Your confirmed quantities and signed quotation document have been submitted. The Crown Paints internal requisitioner has been notified to generate your <strong>Local Purchase Order (LPO)</strong>.
                  </p>
                </div>
                <Button
                  onClick={() => setActiveRFQModal(null)}
                  suppressHydrationWarning
                  className="w-full max-w-xs bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-medium h-9 rounded-lg"
                >
                  Done &amp; Return to RFQs
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmitConfirmation} className="space-y-5">
                {/* 1. Line Items Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-slate-900">
                      1. Line Items &amp; Quantity Confirmation *
                    </Label>
                    <span className="text-[11px] text-slate-400">
                      Must confirm exact requested quantity
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200">
                          <th className="py-2.5 px-3">Item Description</th>
                          <th className="py-2.5 px-2">Unit</th>
                          <th className="py-2.5 px-2">Requested</th>
                          <th className="py-2.5 px-2">Unit Price</th>
                          <th className="py-2.5 px-2">Discount</th>
                          <th className="py-2.5 px-2">Tax</th>
                          <th className="py-2.5 px-3 text-right">Confirm Qty *</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {activeRFQModal.items.map((item) => (
                          <tr key={item.id}>
                            <td className="py-2.5 px-3 font-medium text-slate-900 max-w-[200px]">
                              {item.description}
                            </td>
                            <td className="py-2.5 px-2 text-slate-500">{item.unit}</td>
                            <td className="py-2.5 px-2 font-bold text-slate-800">{item.qty}</td>
                            <td className="py-2.5 px-2 text-slate-600 font-mono">KES {item.unitPrice.toLocaleString()}</td>
                            <td className="py-2.5 px-2 text-slate-400">{item.discount}%</td>
                            <td className="py-2.5 px-2 text-slate-400">{item.taxRate}%</td>
                            <td className="py-2.5 px-3 text-right">
                              <div className="inline-block w-24">
                                <Input
                                  type="number"
                                  value={confirmedQtys[item.id] || ""}
                                  onChange={(e) =>
                                    handleQtyChange(item.id, item.qty, e.target.value)
                                  }
                                  required
                                  suppressHydrationWarning
                                  className={`h-8 text-xs font-semibold text-center border-slate-200 rounded-md ${
                                    qtyErrors[item.id] ? "border-red-400 bg-red-50" : ""
                                  }`}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {Object.values(qtyErrors).length > 0 && (
                    <p className="text-[11px] text-red-600 font-medium">
                      ⚠️ {Object.values(qtyErrors)[0]}
                    </p>
                  )}
                </div>

                {/* 2. Quotation Upload */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-slate-900">
                    2. Attach Quotation Document (PDF or Image) *
                  </Label>

                  {uploadedDoc ? (
                    <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-[#32298A] flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{uploadedDoc.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {uploadedDoc.compressedSize} · <span className="text-emerald-600 font-medium">Verified Clean</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setPreviewDocModal(true)}
                          suppressHydrationWarning
                          className="h-8 text-xs font-medium border-slate-200 hover:bg-white rounded-md"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500 mr-1" />
                          <span>Preview</span>
                        </Button>

                        <label className="cursor-pointer">
                          <span className="text-xs text-[#32298A] font-medium hover:underline px-2 py-1">
                            Replace
                          </span>
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="border border-dashed border-slate-300 hover:border-slate-400 rounded-lg p-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-slate-50/30 hover:bg-slate-50 transition-colors">
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-xs font-medium text-slate-700">
                        Click to upload signed quotation document
                      </span>
                      <span className="text-[10px] text-slate-400">PDF, PNG, JPG (Auto-compressed)</span>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveRFQModal(null)}
                    suppressHydrationWarning
                    className="h-9 border-slate-200 text-slate-700 text-xs font-medium rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || Object.keys(qtyErrors).length > 0}
                    suppressHydrationWarning
                    className="flex-1 h-9 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-medium gap-2 rounded-lg cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Submitting RFQ Confirmation…</span>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Confirm RFQ &amp; Notify Requisitioner for LPO</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDocModal && uploadedDoc && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-xl w-full p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                <h4 className="text-xs font-semibold text-slate-900">{uploadedDoc.name}</h4>
              </div>
              <button
                onClick={() => setPreviewDocModal(false)}
                suppressHydrationWarning
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg p-6 bg-slate-50/50 min-h-[260px] flex flex-col items-center justify-center text-center space-y-2">
              {uploadedDoc.previewUrl && uploadedDoc.type === "image" ? (
                <Image
                  src={uploadedDoc.previewUrl}
                  alt="Quotation Document Preview"
                  width={380}
                  height={260}
                  className="max-h-[300px] object-contain rounded shadow-2xs"
                />
              ) : (
                <div className="space-y-1.5">
                  <FileText className="w-12 h-12 text-[#32298A] mx-auto" />
                  <p className="text-xs font-semibold text-slate-800">{uploadedDoc.name}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{uploadedDoc.compressedSize}</p>
                </div>
              )}
            </div>

            <Button
              onClick={() => setPreviewDocModal(false)}
              suppressHydrationWarning
              className="w-full h-9 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-medium rounded-lg"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
