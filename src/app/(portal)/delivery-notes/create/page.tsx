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
    <div className="space-y-6 max-w-5xl mx-auto" suppressHydrationWarning>
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link href="/delivery-notes">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg border-slate-200">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                Delivery Dispatch Intake
              </span>
              <span className="text-xs text-slate-400">Step 1 of 2 · Factory Gate Pass Intake</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-0.5">
              Create New Delivery Note &amp; Security Gate Pass
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/delivery-notes">
            <Button variant="outline" size="sm" className="h-8 text-xs border-slate-200 rounded-lg">
              Cancel
            </Button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: LPO Selection & Destination */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">1. Actionable Local Purchase Order (LPO)</h2>
              <p className="text-xs text-slate-400">Select the approved order you are delivering against</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <FlagIcon country={selectedLpoData.flag} className="w-4 h-3 rounded-[1px]" />
              <span className="font-semibold">{selectedLpoData.entity}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-900">
              Select Approved Purchase Order *
            </Label>
            <CustomSelect
              options={lpoSelectOptions}
              value={selectedPo}
              onChange={(val) => setSelectedPo(val)}
            />
          </div>

          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Delivery Destination Factory:</span>
              <span className="font-medium text-slate-800">{selectedLpoData.destination}</span>
            </div>
            <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Total Contract Value:</span>
              <span className="font-bold text-slate-900 font-mono">{selectedLpoData.totalValue}</span>
            </div>
          </div>
        </div>

        {/* Step 2: Delivery Reference & Vehicle Coordinates */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">2. Dispatch References &amp; Vehicle Intake Coordinates</h2>
            <p className="text-xs text-slate-400">Security Gate terminals use these to scan vehicle entry and generate GRN</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="delNote" className="text-xs font-semibold text-slate-900">
                Delivery Note Number *
              </Label>
              <Input
                id="delNote"
                placeholder="e.g. DN-KE-2026-0842"
                value={deliveryNoteNo}
                onChange={(e) => setDeliveryNoteNo(e.target.value)}
                required
                className="h-9 text-xs border-slate-200 rounded-lg"
              />
              <p className="text-[10px] text-slate-400">Your company dispatch reference number</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="invNum" className="text-xs font-semibold text-slate-900">
                KRA eTIMS Fiscal Invoice / Receipt Number *
              </Label>
              <Input
                id="invNum"
                placeholder="e.g. KRA-ETIMS-91820481"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                required
                className="h-9 text-xs uppercase border-slate-200 font-mono rounded-lg"
              />
              <p className="text-[10px] text-slate-400">Tax authority fiscal control code</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="vehPlate" className="text-xs font-semibold text-slate-900">
                Vehicle Registration License Plate *
              </Label>
              <Input
                id="vehPlate"
                placeholder="e.g. KBZ 892Y (or Trailer No)"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value.toUpperCase())}
                required
                className="h-9 text-xs uppercase border-slate-200 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cPerson" className="text-xs font-semibold text-slate-900">
                Driver / Transport Contact Person *
              </Label>
              <Input
                id="cPerson"
                placeholder="e.g. Peter Kamau Mwangi"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                className="h-9 text-xs border-slate-200 rounded-lg"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cPhone" className="text-xs font-semibold text-slate-900">
                Driver Mobile Phone Number (For Gate SMS PIN) *
              </Label>
              <Input
                id="cPhone"
                placeholder="+254 712 345 678"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                className="h-9 text-xs border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Line Items & Quantity Validator */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">3. Line Items Delivered Quantity (Strict Validator)</h2>
              <p className="text-xs text-slate-400">Delivered quantity cannot exceed original LPO quantity</p>
            </div>
            <span className="text-[11px] font-semibold text-[#32298A] bg-slate-50 px-2.5 py-1 rounded border border-slate-200/80">
              Verified Upon Receiving
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase border-b border-slate-200">
                  <th className="py-2.5 px-4">Item Description</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3">Original LPO Qty</th>
                  <th className="py-2.5 px-4 text-right">Delivered Quantity *</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {selectedLpoData.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 font-medium text-slate-900 max-w-sm">
                      {item.description}
                    </td>
                    <td className="py-3 px-3 text-slate-500">{item.unit}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{item.qty}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-block w-32">
                        <Input
                          type="number"
                          min="1"
                          max={item.qty}
                          value={deliveredQtys[idx] ?? item.qty}
                          onChange={(e) => handleQtyInput(idx, item.qty, e.target.value)}
                          required
                          className="h-8 text-xs font-semibold text-center border-slate-200 rounded-md"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delivery Mode: Full vs Partial */}
          <div className="space-y-1.5 pt-2">
            <Label className="text-xs font-semibold text-slate-900">
              Delivery Completion Mode *
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setDeliveryMode("full")}
                className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                  deliveryMode === "full"
                    ? "border-[#32298A] bg-slate-50/70 ring-1 ring-[#32298A]"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Full Complete Delivery</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    deliveryMode === "full" ? "border-[#32298A] bg-[#32298A]" : "border-slate-300"
                  }`}>
                    {deliveryMode === "full" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Completes the entire purchase order contract fulfillment.
                </p>
              </div>

              <div
                onClick={() => setDeliveryMode("partial")}
                className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                  deliveryMode === "partial"
                    ? "border-[#32298A] bg-slate-50/70 ring-1 ring-[#32298A]"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Partial Batch Delivery</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    deliveryMode === "partial" ? "border-[#32298A] bg-[#32298A]" : "border-slate-300"
                  }`}>
                    {deliveryMode === "partial" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Remaining line items balance will be delivered in subsequent gate pass dispatches.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Document Attachment */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">4. Document Attachment &amp; Vault Verification</h2>
            <p className="text-xs text-slate-400">1-click reuse signed quotation document or upload fresh delivery note</p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <input
                type="radio"
                name="docChoice"
                checked={docChoice === "vault_reuse"}
                onChange={() => setDocChoice("vault_reuse")}
                className="mt-0.5"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-[#32298A]" />
                  <span>1-Click Reuse Quotation Document from Requisition Step</span>
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Attached file: <strong>Apex_Quotation_Doc_Signed.pdf</strong> (Stored in Vault)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <input
                type="radio"
                name="docChoice"
                checked={docChoice === "fresh_upload"}
                onChange={() => setDocChoice("fresh_upload")}
                className="mt-0.5"
              />
              <div className="text-xs flex-1">
                <span className="font-semibold text-slate-900">Upload Fresh Delivery Note / KRA Invoice PDF</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  For service providers or standalone freight waybills
                </p>
              </div>
            </label>

            {/* Active Dropzone */}
            {docChoice === "fresh_upload" && (
              <label className="border-2 border-dashed border-slate-300 hover:border-[#32298A] rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-white transition-colors">
                <Upload className="w-6 h-6 text-[#32298A]" />
                <span className="text-xs font-semibold text-slate-900">
                  {uploadedFreshFile ? uploadedFreshFile.name : "Click or Drag to Upload Delivery Note Document"}
                </span>
                <span className="text-[11px] text-slate-400">
                  {uploadedFreshFile ? `${(uploadedFreshFile.size / 1024).toFixed(1)} KB · Ready for Dispatch` : "Supports PDF, PNG, JPG (Max 10MB)"}
                </span>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => e.target.files?.[0] && setUploadedFreshFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/delivery-notes">
            <Button type="button" variant="outline" className="h-9 border-slate-200 text-slate-700 text-xs font-medium rounded-lg">
              Discard &amp; Return
            </Button>
          </Link>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-6 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold gap-2 rounded-lg cursor-pointer shadow-xs"
          >
            {isSubmitting ? (
              <span>Submitting Dispatch &amp; Generating Gate Pass…</span>
            ) : (
              <>
                <QrCode className="w-4 h-4" />
                <span>Submit Delivery &amp; Issue Security Gate Pass</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function CreateDeliveryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading delivery form…</div>}>
      <CreateDeliveryContent />
    </Suspense>
  );
}
