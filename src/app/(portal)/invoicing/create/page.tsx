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
    <div className="space-y-3.5 max-w-4xl mx-auto" suppressHydrationWarning>
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <Link href="/invoicing">
            <Button variant="outline" size="sm" className="h-7.5 w-7.5 p-0 rounded-lg border-slate-200">
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.2 rounded">
                Accounts Payable Intake
              </span>
              <span className="text-xs text-slate-400">· eTIMS 3-Way Audit Matching</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              Create &amp; Submit Fiscal Tax Invoice
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/invoicing">
            <Button variant="outline" size="sm" className="h-7.5 text-xs border-slate-200 rounded-lg">
              Cancel
            </Button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Step 1: Supplier Coordinates & Linked GRN */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-slate-900">1. Goods Received Note (GRN) Cross-Reference</h2>
              <p className="text-[11px] text-slate-400">Attach your invoice to a verified receiving note from Crown Paints plant</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Verified Receiving</span>
            </span>
          </div>

          <div className="p-2.5 bg-slate-50/70 rounded-lg border border-slate-200/80 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
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

          <div className="space-y-1">
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
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-xs sm:text-sm font-semibold text-slate-900">2. Invoice Identifiers &amp; Accounting Dates</h2>
            <p className="text-[11px] text-slate-400">Enter fiscal invoice details and select dates via calendar</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="invNum" className="text-xs font-semibold text-slate-900">
                Supplier Invoice Number *
              </Label>
              <Input
                id="invNum"
                placeholder="e.g. INV-2026-9842"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
                className="h-8 text-xs font-mono border-slate-200 rounded-lg bg-slate-50"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="etimsCode" className="text-xs font-semibold text-slate-900">
                KRA eTIMS / EFRIS Control Code *
              </Label>
              <Input
                id="etimsCode"
                placeholder="e.g. KRA-ETIMS-91820481"
                value={etimsNumber}
                onChange={(e) => setEtimsNumber(e.target.value)}
                required
                className="h-8 text-xs uppercase font-mono border-slate-200 rounded-lg bg-slate-50"
              />
            </div>

            {/* Custom Date Pickers */}
            <div className="space-y-1">
              <CustomDatePicker
                label="Invoice Date *"
                value={invoiceDate}
                onChange={(val) => setInvoiceDate(val)}
              />
            </div>

            <div className="space-y-1">
              <CustomDatePicker
                label="Posting / Due Date *"
                value={postingDate}
                onChange={(val) => setPostingDate(val)}
              />
            </div>
          </div>
        </div>

        {/* Step 3: Tax Engine */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
          <div className="pb-2 border-b border-slate-100">
            <h2 className="text-xs sm:text-sm font-semibold text-slate-900">3. Tax &amp; Value Added Tax (VAT) Engine</h2>
            <p className="text-[11px] text-slate-400">Configure tax rates for automatic ledger posting</p>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={hasTax}
                  onChange={(e) => setHasTax(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#32298A]"
                />
                <span>Subject to Standard VAT / Sales Tax</span>
              </label>
              <span className="text-[10px] font-mono text-slate-500">16% KRA Standard</span>
            </div>

            {hasTax && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-slate-700">Tax Classification</Label>
                  <CustomSelect
                    options={taxTypeOptions}
                    value={taxType}
                    onChange={(val) => setTaxType(val)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-slate-700">VAT Rate Percentage</Label>
                  <CustomSelect
                    options={taxRateOptions}
                    value={String(taxRate)}
                    onChange={(val) => setTaxRate(Number(val))}
                  />
                </div>
              </div>
            )}

            <div className="p-2.5 bg-white rounded border border-slate-200 space-y-1 text-xs font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Base Taxable Amount:</span>
                <span>KES {baseAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Calculated VAT ({taxRate}%):</span>
                <span>KES {calculatedTaxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100 text-sm">
                <span>Gross Payable Total:</span>
                <span className="text-[#32298A]">KES {calculatedTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/invoicing">
            <Button variant="outline" type="button" className="h-8 text-xs border-slate-200">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-8 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold gap-1.5 rounded-lg cursor-pointer"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Submitting to Accounts Payable…" : "Submit Invoice for 3-Way Matching"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
