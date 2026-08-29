"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import {
  Truck,
  ArrowLeft,
  QrCode,
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
  Upload,
  ShieldCheck,
  Building2,
} from "lucide-react";

const availableLpos: Record<
  string,
  {
    entity: string;
    flag: string;
    destination: string;
    totalValue: string;
    items: { description: string; qty: number; unit: string }[];
  }
> = {
  "LPO-2026-9842": {
    entity: "Crown Paints Kenya PLC (Likoni Rd HQ)",
    flag: "KE",
    destination: "Likoni Road Factory, Goods Inwards Bay 3, Industrial Area, Nairobi",
    totalValue: "KES 4,800,000",
    items: [
      { description: "Pure Acrylic Polymer Emulsion (High Gloss Formulation)", qty: 20, unit: "MT" },
      { description: "Rutile Titanium Dioxide Pigment (Paint Grade 99.5%)", qty: 10, unit: "MT" },
    ],
  },
  "LPO-2026-9520": {
    entity: "Crown Paints Tanzania Ltd (Arusha)",
    flag: "TZ",
    destination: "Themi Industrial Area, Plot 14, Njiro Road, Arusha, Tanzania",
    totalValue: "TZS 45,000,000",
    items: [
      { description: "Industrial Solvents (High Flash Paint Grade Xylene)", qty: 10000, unit: "Liters" },
    ],
  },
};

const lpoSelectOptions: CustomSelectOption[] = [
  { value: "LPO-2026-9842", label: "LPO-2026-9842 · Crown Kenya Likoni HQ", sublabel: "Acrylic Emulsion & TiO2 · KES 4,800,000", flag: "KE" },
  { value: "LPO-2026-9520", label: "LPO-2026-9520 · Crown Tanzania Arusha", sublabel: "Industrial Solvents (Xylene) · TZS 45,000,000", flag: "TZ" },
];

function CreateDeliveryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedPo = searchParams.get("po") || "LPO-2026-9842";

  // Form State
  const [selectedPo, setSelectedPo] = useState(preSelectedPo);
  const [deliveryNoteNo, setDeliveryNoteNo] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<"full" | "partial">("full");
  const [deliveredQtys, setDeliveredQtys] = useState<Record<string, number>>({});
  const [docChoice, setDocChoice] = useState<"vault_reuse" | "fresh_upload">("vault_reuse");
  const [uploadedFreshFile, setUploadedFreshFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize quantities on PO select
  useEffect(() => {
    const lpoData = availableLpos[selectedPo];
    if (lpoData) {
      const initial: Record<string, number> = {};
      lpoData.items.forEach((item, idx) => {
        initial[idx] = item.qty;
      });
      setDeliveredQtys(initial);
    }
  }, [selectedPo]);

  const handleQtyInput = (idx: number, maxQty: number, val: string) => {
    let num = Number(val);
    if (isNaN(num) || num < 0) num = 0;
    if (num > maxQty) num = maxQty;
    setDeliveredQtys((prev) => ({ ...prev, [idx]: num }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/delivery-notes");
    }, 1200);
  };

  const selectedLpoData = availableLpos[selectedPo] || availableLpos["LPO-2026-9842"];

  return (
    <div className="space-y-3.5 max-w-4xl mx-auto" suppressHydrationWarning>
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <Link href="/delivery-notes">
            <Button variant="outline" size="sm" className="h-7.5 w-7.5 p-0 rounded-lg border-slate-200">
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.2 rounded">
                Delivery Dispatch Intake
              </span>
              <span className="text-xs text-slate-400">· Likoni Factory Bay Intake</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              Create Delivery Note &amp; Digital Gate Pass
            </h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Step 1: Select PO */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-slate-900">1. Purchase Order Selection</h2>
              <p className="text-[11px] text-slate-400">Select the approved Crown Paints LPO you are fulfilling</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
              Contract Verified
            </span>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-900">Choose Approved LPO *</Label>
            <CustomSelect
              options={lpoSelectOptions}
              value={selectedPo}
              onChange={(val) => setSelectedPo(val)}
            />
          </div>

          {selectedLpoData && (
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Destination:</span>
                <span className="font-medium text-slate-800 truncate max-w-sm">{selectedLpoData.destination}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Contract Value:</span>
                <span className="font-mono font-bold text-[#32298A]">{selectedLpoData.totalValue}</span>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Delivery Identifiers */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-xs sm:text-sm font-semibold text-slate-900">2. Dispatch Identifiers &amp; Vehicle</h2>
            <p className="text-[11px] text-slate-400">Enter delivery note number, eTIMS fiscal invoice, and driver details</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-900">Supplier Delivery Note # *</Label>
              <Input
                placeholder="e.g., DN-KE-2026-0842"
                value={deliveryNoteNo}
                onChange={(e) => setDeliveryNoteNo(e.target.value)}
                required
                className="h-8 text-xs font-mono bg-slate-50"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-900">KRA eTIMS Tax Invoice # *</Label>
              <Input
                placeholder="e.g., KRA-ETIMS-91820481"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                required
                className="h-8 text-xs font-mono bg-slate-50"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-900">Vehicle Plate Number *</Label>
              <Input
                placeholder="e.g., KBZ 892Y (Trailer)"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                required
                className="h-8 text-xs font-mono bg-slate-50"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-900">Driver Phone Number *</Label>
              <Input
                placeholder="e.g., +254 712 345 678"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                className="h-8 text-xs font-mono bg-slate-50"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Quantities */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-slate-900">3. Delivered Batch Quantities</h2>
              <p className="text-[11px] text-slate-400">Declare exact dispatch quantities for factory GRN reconciliation</p>
            </div>
            <div className="inline-flex rounded border border-slate-200 p-0.5 bg-slate-50 text-[11px]">
              <button
                type="button"
                onClick={() => setDeliveryMode("full")}
                className={`px-2 py-0.5 rounded font-medium ${
                  deliveryMode === "full" ? "bg-[#32298A] text-white" : "text-slate-600"
                }`}
              >
                Full
              </button>
              <button
                type="button"
                onClick={() => setDeliveryMode("partial")}
                className={`px-2 py-0.5 rounded font-medium ${
                  deliveryMode === "partial" ? "bg-[#32298A] text-white" : "text-slate-600"
                }`}
              >
                Partial
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {selectedLpoData?.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="sm:col-span-8 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{item.description}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Ordered: {item.qty} {item.unit}</p>
                </div>
                <div className="sm:col-span-4 flex items-center gap-1.5">
                  <Input
                    type="number"
                    value={deliveredQtys[idx] ?? item.qty}
                    onChange={(e) => handleQtyInput(idx, item.qty, e.target.value)}
                    className="h-7.5 text-xs font-mono font-bold bg-white"
                  />
                  <span className="text-[11px] text-slate-500 font-mono flex-shrink-0">{item.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/delivery-notes">
            <Button variant="outline" type="button" className="h-8 text-xs border-slate-200">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-8 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold gap-1.5 rounded-lg cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Generating Gate Pass…" : "Register Dispatch & Generate Gate Pass"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function CreateDeliveryPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-slate-400">Loading delivery form…</div>}>
      <CreateDeliveryContent />
    </Suspense>
  );
}
