"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FlagIcon, CountryCode } from "@/components/ui/flag-icon";
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
  Calendar,
  Tag,
} from "lucide-react";

interface RFQItem {
  id: string;
  reqNumber: string;
  title: string;
  entity: string;
  flag: CountryCode | string;
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
    <div className="space-y-3.5" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            RFQs (Request For Quotations)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review allocated requisitions, confirm fulfillment quantities, attach quotation, and submit for LPO issuance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-md border border-slate-200/80 bg-white text-[11px] text-slate-600 flex items-center gap-1.5 shadow-2xs">
            <Building2 className="w-3 h-3 text-slate-400" />
            <span className="font-medium">Assigned Requisitions Only</span>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="text-xs font-medium text-slate-500">
          Showing <strong>{filteredRFQs.length}</strong> Assigned Requisitions
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <Input
            placeholder="Search by RFQ #, Requisition #, or Title…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            suppressHydrationWarning
            className="pl-8 h-8 text-xs bg-slate-50/50 border-slate-200 rounded-lg"
          />
        </div>
      </div>

      {/* RFQ Listing Cards (Compact High-Density) */}
      <div className="space-y-3">
        {filteredRFQs.map((rfq) => {
          const totalVal = rfq.items.reduce(
            (acc, item) => acc + item.qty * item.unitPrice * (1 - item.discount / 100),
            0
          );
          return (
            <div
              key={rfq.id}
              className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded">
                      {rfq.id}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-50 border border-slate-200/60 px-1.5 py-0.5 rounded">
                      REQ: {rfq.reqNumber}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <FlagIcon country={rfq.flag} className="w-3.5 h-2.5 rounded-[1px]" />
                      <span>{rfq.entity}</span>
                    </div>
                  </div>
                  <h2 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                    {rfq.title}
                  </h2>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  {rfq.status === "awaiting_confirmation" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 border border-amber-200/80 text-amber-900 font-semibold text-[11px]">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>Awaiting Confirmation</span>
                    </span>
                  )}
                  {rfq.status === "confirmed_pending_lpo" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-slate-500" />
                      <span>Confirmed · Pending LPO</span>
                    </span>
                  )}
                  {rfq.status === "lpo_generated" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-semibold text-[11px]">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>LPO Issued ({rfq.lpoNumber})</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Line Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="text-slate-500 font-bold text-xs uppercase border-b border-slate-100">
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
                        <td className="py-2 pr-2 font-medium max-w-sm text-slate-900">{item.description}</td>
                        <td className="py-2 text-slate-500 font-mono text-xs">{item.unit}</td>
                        <td className="py-2 font-mono font-bold text-slate-900">{item.qty}</td>
                        <td className="py-2 font-mono text-slate-700">KES {item.unitPrice.toLocaleString()}</td>
                        <td className="py-2 font-mono font-bold text-slate-900 text-right">
                          KES {(item.qty * item.unitPrice).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Issued: {rfq.issuedDate}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1 font-semibold text-amber-700">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Deadline: {rfq.deadlineDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {rfq.status === "awaiting_confirmation" && (
                    <Button
                      size="sm"
                      onClick={() => handleOpenRFQ(rfq)}
                      suppressHydrationWarning
                      className="h-7.5 px-3 bg-[#32298A] hover:bg-[#271f6f] text-white font-semibold text-xs rounded-lg gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Confirm Fulfillment &amp; Quote</span>
                    </Button>
                  )}

                  {rfq.status === "confirmed_pending_lpo" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenRFQ(rfq)}
                      suppressHydrationWarning
                      className="h-7.5 px-3 text-xs font-semibold border-slate-200 hover:bg-slate-50 rounded-lg gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>Inspect Confirmation</span>
                    </Button>
                  )}

                  {rfq.status === "lpo_generated" && (
                    <Link href={`/lpos`}>
                      <Button
                        size="sm"
                        suppressHydrationWarning
                        className="h-7.5 px-3 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold rounded-lg gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>Inspect LPO ({rfq.lpoNumber})</span>
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RFQ Confirmation Modal */}
      {activeRFQModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-2xl w-full p-5 sm:p-6 space-y-4 my-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {activeRFQModal.id}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Requisition: {activeRFQModal.reqNumber}
                </span>
              </div>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveRFQModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSuccessSubmitted ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">RFQ Fulfillment Confirmed Successfully!</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your quote and confirmed batch quantities have been submitted to Crown Paints Procurement. An official LPO will be generated upon procurement manager authorization.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => setActiveRFQModal(null)}
                  className="h-8 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold px-4 rounded-lg cursor-pointer mt-2"
                >
                  Return to RFQ Desk
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmitConfirmation} className="space-y-3.5 text-xs">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">{activeRFQModal.title}</h3>
                  <p className="text-[11px] text-slate-400">
                    Allocated by {activeRFQModal.entity} · Confirmation Deadline: {activeRFQModal.deadlineDate}
                  </p>
                </div>

                {/* Confirm Quantities */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2.5">
                  <Label className="text-xs font-bold text-slate-900 block">
                    1. Confirm Fulfillment Quantities (Must match 100% requested):
                  </Label>

                  {activeRFQModal.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-white p-2.5 rounded border border-slate-200/70">
                      <div className="sm:col-span-7 min-w-0">
                        <p className="font-semibold text-slate-800 truncate">{item.description}</p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Requested: {item.qty} {item.unit} @ KES {item.unitPrice.toLocaleString()}/{item.unit}
                        </p>
                      </div>

                      <div className="sm:col-span-5 flex items-center gap-2">
                        <div className="flex-1">
                          <Input
                            type="number"
                            value={confirmedQtys[item.id] || ""}
                            onChange={(e) => handleQtyChange(item.id, item.qty, e.target.value)}
                            className="h-7.5 text-xs font-mono font-bold bg-slate-50"
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 flex-shrink-0">{item.unit}</span>
                      </div>

                      {qtyErrors[item.id] && (
                        <p className="sm:col-span-12 text-[10px] text-red-600 font-medium">{qtyErrors[item.id]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Stamped Quotation Upload */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                  <Label className="text-xs font-bold text-slate-900 block">
                    2. Attach Stamped Company Quotation &amp; Batch Assay PDF:
                  </Label>

                  {uploadedDoc ? (
                    <div className="p-2.5 bg-white rounded border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-[#32298A] flex-shrink-0" />
                        <div className="truncate">
                          <p className="font-semibold text-slate-900 truncate">{uploadedDoc.name}</p>
                          <span className="text-[10px] text-emerald-600 font-mono">{uploadedDoc.compressedSize}</span>
                        </div>
                      </div>
                      <label className="text-[11px] font-semibold text-[#32298A] hover:underline cursor-pointer">
                        Replace File
                        <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 hover:border-[#32298A] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-white">
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs font-semibold text-slate-700">Click to upload quotation document</span>
                      <span className="text-[10px] text-slate-400">PDF, PNG, JPG (Automated WebP/PDF compression)</span>
                      <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveRFQModal(null)}
                    className="h-8 text-xs border-slate-200 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-8 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold gap-1.5 rounded-lg cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Submitting to Procurement…</span>
                    ) : (
                      <>
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Confirm RFQ &amp; Request LPO</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
