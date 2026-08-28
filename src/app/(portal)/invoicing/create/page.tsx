"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import {
  Receipt,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Sparkles,
  Link as LinkIcon,
  Upload,
  CheckCircle2,
} from "lucide-react";

const grnOptions: CustomSelectOption[] = [
  { value: "GRN-KE-2026-0842", label: "GRN-KE-2026-0842 · Crown Paints Likoni HQ", sublabel: "LPO-2026-9842 · Acrylic Polymer Emulsion (Verified KES 4,800,000)", flag: "KE" },
  { value: "GRN-UG-2026-0412", label: "GRN-UG-2026-0412 · Regal Paints Uganda", sublabel: "LPO-2026-9710 · Packaging Cans & Buckets (Verified UGX 64,000,000)", flag: "UG" },
  { value: "GRN-CHR-2026-0188", label: "GRN-CHR-2026-0188 · Chromex Colourant", sublabel: "LPO-2026-9655 · Tinting Surfactants (Verified KES 2,150,000)", flag: "CHROMEX" },
];

const taxTypeOptions: CustomSelectOption[] = [
  { value: "VAT", label: "Value Added Tax (VAT)" },
  { value: "WHT_VAT", label: "Withholding VAT (WHT-VAT)" },
  { value: "ZERO_RATED", label: "Zero Rated / Exempt" },
];

const taxRateOptions: CustomSelectOption[] = [
  { value: "16", label: "16% (Kenya Standard VAT)" },
  { value: "18", label: "18% (Uganda / Tanzania)" },
  { value: "8", label: "8% (Petroleum / Energy)" },
  { value: "0", label: "0% (Exempt)" },
];

export default function CreateInvoicePage() {
  const router = useRouter();

  // Form State
  const [selectedGrn, setSelectedGrn] = useState("GRN-KE-2026-0842");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [etimsNumber, setEtimsNumber] = useState("");
  const [invoiceType, setInvoiceType] = useState<"procurement" | "miscellaneous">("procurement");
  const [invoiceDate, setInvoiceDate] = useState("2026-02-28");
  const [postingDate, setPostingDate] = useState("2026-02-28");
  const [comments, setComments] = useState("");
  
  // Tax / VAT Configuration Engine
  const [hasTax, setHasTax] = useState(true);
  const [taxType, setTaxType] = useState("VAT");
  const [taxRate, setTaxRate] = useState(16);
  const [baseAmount, setBaseAmount] = useState(4137931);
  const [docReuseChoice, setDocReuseChoice] = useState<"vault" | "fresh">("vault");
  const [uploadedFreshFile, setUploadedFreshFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatedTaxAmount = hasTax ? Math.round(baseAmount * (taxRate / 100)) : 0;
  const calculatedTotal = baseAmount + calculatedTaxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/invoicing");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto" suppressHydrationWarning>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link href="/invoicing">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg border-slate-200">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                Accounts Payable Intake
              </span>
              <span className="text-xs text-slate-400">Step 1 of 2 · eTIMS 3-Way Audit Matching</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-0.5">
              Create &amp; Submit Fiscal Tax Invoice
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/invoicing">
            <Button variant="outline" size="sm" className="h-8 text-xs border-slate-200 rounded-lg">
              Cancel
            </Button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Supplier Coordinates & Linked GRN */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">1. Goods Received Note (GRN) Cross-Reference</h2>
              <p className="text-xs text-slate-400">Attach your invoice to a verified receiving note from Crown Paints plant</p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/80 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Receiving</span>
            </span>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Supplier Legal Name:</span>
              <span className="font-semibold text-slate-900 truncate block">Apex Industrial Polymers Ltd</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Tax PIN:</span>
              <span className="font-mono font-semibold text-slate-900">P051982736Z</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Crown Vendor Code:</span>
              <span className="font-mono font-semibold text-[#32298A]">VEND-KE-84920</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-900">
              Select Verified Goods Received Note (GRN) *
            </Label>
            <CustomSelect
              options={grnOptions}
              value={selectedGrn}
              onChange={(val) => setSelectedGrn(val)}
            />
          </div>
        </div>

        {/* Step 2: Invoice Numbers & Dates */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">2. Invoice Identifiers &amp; Accounting Dates</h2>
            <p className="text-xs text-slate-400">Enter your fiscal invoice details and select dates via calendar</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="invNum" className="text-xs font-semibold text-slate-900">
                Supplier Invoice Number *
              </Label>
              <Input
                id="invNum"
                placeholder="e.g. INV-2026-9842"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
                className="h-9 text-xs border-slate-200 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="etimsCode" className="text-xs font-semibold text-slate-900">
                KRA eTIMS / EFRIS Control Code *
              </Label>
              <Input
                id="etimsCode"
                placeholder="e.g. KRA-ETIMS-91820481"
                value={etimsNumber}
                onChange={(e) => setEtimsNumber(e.target.value)}
                required
                className="h-9 text-xs uppercase font-mono border-slate-200 rounded-lg"
              />
            </div>

            {/* Custom Date Pickers */}
            <div className="space-y-1.5">
              <CustomDatePicker
                label="Invoice Date *"
                value={invoiceDate}
                onChange={(val) => setInvoiceDate(val)}
              />
            </div>

            <div className="space-y-1.5">
              <CustomDatePicker
                label="Posting / Due Date *"
                value={postingDate}
                onChange={(val) => setPostingDate(val)}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs font-semibold text-slate-900">
                Invoice Classification Type *
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInvoiceType("procurement")}
                  className={`p-3 rounded-lg border text-xs font-medium text-left transition-colors ${
                    invoiceType === "procurement"
                      ? "border-[#32298A] bg-slate-50 text-[#32298A] font-semibold ring-1 ring-[#32298A]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <p className="font-bold">Procurement Supply (Default)</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Raw materials, containers, solvents &amp; packaging</p>
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceType("miscellaneous")}
                  className={`p-3 rounded-lg border text-xs font-medium text-left transition-colors ${
                    invoiceType === "miscellaneous"
                      ? "border-[#32298A] bg-slate-50 text-[#32298A] font-semibold ring-1 ring-[#32298A]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <p className="font-bold">Miscellaneous Service / Freight</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Freight transport, warehousing, logistics fees</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Tax / VAT Configuration Engine */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">3. Tax &amp; Value Added Tax (VAT) Calculation Engine</h2>
            <p className="text-xs text-slate-400">Configure tax exemptions or standard rates for automatic ledger posting</p>
          </div>

          <div className="p-4 bg-slate-50/70 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTax}
                  onChange={(e) => setHasTax(e.target.checked)}
                  className="w-4 h-4 rounded text-[#32298A]"
                />
                <span className="text-xs font-semibold text-slate-900">
                  Items Attract Tax (e.g. VAT 16% / 18%)
                </span>
              </label>
            </div>

            {hasTax && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <Label className="text-[11px] text-slate-500 font-medium">Tax Type Category</Label>
                  <CustomSelect
                    options={taxTypeOptions}
                    value={taxType}
                    onChange={(val) => setTaxType(val)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-slate-500 font-medium">Tax Rate (%)</Label>
                  <CustomSelect
                    options={taxRateOptions}
                    value={String(taxRate)}
                    onChange={(val) => setTaxRate(Number(val))}
                  />
                </div>
              </div>
            )}

            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Taxable Base Subtotal:</span>
                <span>KES {baseAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{hasTax ? `${taxRate}% ${taxType}` : "Tax (0%)"}:</span>
                <span>KES {calculatedTaxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1.5 border-t border-slate-100 text-sm">
                <span>Total Payable Invoice Value:</span>
                <span className="text-[#32298A]">KES {calculatedTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Document Attachment with Active Fresh File Upload */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">4. Attach Official Fiscal Tax Invoice</h2>
            <p className="text-xs text-slate-400">Link document from delivery intake step or upload fresh PDF</p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <input
                type="radio"
                name="docReuse"
                checked={docReuseChoice === "vault"}
                onChange={() => setDocReuseChoice("vault")}
                className="mt-0.5"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-[#32298A]" />
                  <span>Link KRA eTIMS Invoice from Delivery Intake Step</span>
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  File: <strong>KRA_eTIMS_Invoice_91820481.pdf</strong> (Stored in Vault)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <input
                type="radio"
                name="docReuse"
                checked={docReuseChoice === "fresh"}
                onChange={() => setDocReuseChoice("fresh")}
                className="mt-0.5"
              />
              <div className="text-xs flex-1">
                <span className="font-semibold text-slate-900">Upload Fresh Fiscal Tax Invoice PDF</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Upload signed electronic fiscal receipt
                </p>
              </div>
            </label>

            {/* Active Dropzone */}
            {docReuseChoice === "fresh" && (
              <label className="border-2 border-dashed border-slate-300 hover:border-[#32298A] rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-white transition-colors">
                <Upload className="w-6 h-6 text-[#32298A]" />
                <span className="text-xs font-semibold text-slate-900">
                  {uploadedFreshFile ? uploadedFreshFile.name : "Click or Drag to Upload Fiscal Invoice PDF"}
                </span>
                <span className="text-[11px] text-slate-400">
                  {uploadedFreshFile ? `${(uploadedFreshFile.size / 1024).toFixed(1)} KB · Ready to Submit` : "PDF, PNG or JPG (Max 10MB)"}
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

          <div className="space-y-1.5 pt-2">
            <Label htmlFor="comm" className="text-xs font-semibold text-slate-900">
              Remarks / Comments for Crown Paints Accounts Payable
            </Label>
            <Input
              id="comm"
              placeholder="Optional remarks regarding delivery receipt or payment booking…"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="h-9 text-xs border-slate-200 rounded-lg"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/invoicing">
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
              <span>Submitting to Accounts Department…</span>
            ) : (
              <>
                <Receipt className="w-4 h-4" />
                <span>Submit Invoice for 3-Way Audit Matching</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
