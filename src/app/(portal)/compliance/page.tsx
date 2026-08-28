"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import {
  ShieldCheck,
  Eye,
  Upload,
  CheckCircle2,
  Clock,
  X,
  BadgeCheck,
  FileText,
  Lock,
} from "lucide-react";

interface ComplianceDoc {
  id: string;
  name: string;
  category: string;
  docNumber: string;
  issueDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: "valid" | "expiring_soon" | "under_review";
  fileName: string;
}

const mockComplianceDocs: ComplianceDoc[] = [
  {
    id: "doc-1",
    name: "Certificate of Incorporation / Business Registration",
    category: "Legal Incorporation",
    docNumber: "CPR/2020/89201",
    issueDate: "2020-01-12",
    expiryDate: "2035-12-31",
    daysRemaining: 9999,
    status: "valid",
    fileName: "Apex_Certificate_of_Incorporation.pdf",
  },
  {
    id: "doc-2",
    name: "Valid Tax Compliance Certificate (KRA TCC)",
    category: "Tax Authority",
    docNumber: "KRA-TCC-92810492",
    issueDate: "2025-11-01",
    expiryDate: "2026-10-31",
    daysRemaining: 245,
    status: "valid",
    fileName: "Apex_KRA_Tax_Compliance_2026.pdf",
  },
  {
    id: "doc-3",
    name: "CR12 Official List of Company Directors",
    category: "Corporate Governance",
    docNumber: "CR12-KE-2025-1104",
    issueDate: "2025-11-15",
    expiryDate: "2026-05-15",
    daysRemaining: 78,
    status: "expiring_soon",
    fileName: "Apex_CR12_Directors_Certified.pdf",
  },
  {
    id: "doc-4",
    name: "NEMA Chemical & Raw Material Handling Permit",
    category: "Environmental & Safety",
    docNumber: "NEMA-EIA-84920",
    issueDate: "2025-08-10",
    expiryDate: "2026-08-09",
    daysRemaining: 162,
    status: "valid",
    fileName: "Apex_NEMA_Transport_Permit_2026.pdf",
  },
  {
    id: "doc-5",
    name: "Bank Reference & Cancelled Cheque Letter",
    category: "Banking Verification",
    docNumber: "SCB-VERIF-2026",
    issueDate: "2026-01-05",
    expiryDate: "2030-01-01",
    daysRemaining: 9999,
    status: "valid",
    fileName: "StandardChartered_Bank_Letter.pdf",
  },
  {
    id: "doc-6",
    name: "ISO 9001:2015 Quality Management Accreditation",
    category: "Quality Assurance",
    docNumber: "ISO-QMS-89104",
    issueDate: "2024-03-10",
    expiryDate: "2027-03-09",
    daysRemaining: 375,
    status: "valid",
    fileName: "Apex_ISO9001_Quality_Certificate.pdf",
  },
];

export default function CompliancePage() {
  const [docs, setDocs] = useState<ComplianceDoc[]>(mockComplianceDocs);
  const [activeUploadDoc, setActiveUploadDoc] = useState<ComplianceDoc | null>(null);
  const [viewingDoc, setViewingDoc] = useState<ComplianceDoc | null>(null);
  
  // Upload Renewal Form
  const [issueDate, setIssueDate] = useState("2026-02-28");
  const [expiryDate, setExpiryDate] = useState("2027-02-28");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);

  const handleUploadRenewal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setActiveUploadDoc(null);
      setUploadSuccessToast(true);
      setTimeout(() => setUploadSuccessToast(false), 3000);
    }, 1100);
  };

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Toast Notification */}
      {uploadSuccessToast && (
        <div className="fixed top-20 right-6 z-50 p-3.5 bg-slate-900 text-white rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Document submitted for compliance audit review!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            KYC Compliance Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Maintain valid corporate KYC credentials to ensure active pre-qualification for Crown Paints tenders and Purchase Orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Pre-Qualification Compliant</span>
          </span>
        </div>
      </div>

      {/* Expiry Alert */}
      <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs flex items-start gap-3">
        <Clock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-amber-900">Upcoming Document Renewal</p>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Your <strong>CR12 List of Directors</strong> expires in <strong>78 days</strong>. Upload the certified updated copy before expiration to prevent automatic tender bidding hold.
          </p>
        </div>
      </div>

      {/* Document Vault Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-3.5"
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {doc.category}
                </span>
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug pt-0.5">
                  {doc.name}
                </h3>
              </div>

              <div>
                {doc.status === "valid" && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Active</span>
                  </span>
                )}
                {doc.status === "expiring_soon" && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>Expires in {doc.daysRemaining}d</span>
                  </span>
                )}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-mono space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Ref Number:</span>
                <span className="font-semibold text-slate-900">{doc.docNumber}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Issued:</span>
                <span>{doc.issueDate}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Expiration:</span>
                <span className="font-semibold text-slate-800">{doc.expiryDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 truncate max-w-[180px]">
                <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate text-[11px]">{doc.fileName}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Protected In-App Viewer (No Download Option) */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingDoc(doc)}
                  className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 rounded-lg gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Doc</span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => setActiveUploadDoc(doc)}
                  className="h-8 text-xs font-medium bg-[#32298A] hover:bg-[#271f6f] text-white gap-1 rounded-lg"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Update</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Protected In-App Document Viewer Modal (View Only, Download Disabled) */}
      {viewingDoc && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#32298A]" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{viewingDoc.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">Reference: {viewingDoc.docNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Viewer Canvas with Watermark */}
            <div className="relative border border-slate-200 rounded-lg p-8 bg-slate-50 min-h-[300px] flex flex-col items-center justify-center text-center space-y-3 select-none">
              {/* Security Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <span className="text-4xl font-black uppercase rotate-[-25deg] text-slate-900">
                  CROWN PAINTS VERIFIED · VIEW ONLY
                </span>
              </div>

              <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                <FileText className="w-7 h-7 text-[#32298A]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">{viewingDoc.fileName}</p>
                <p className="text-xs text-slate-500 font-mono">
                  Verified by Crown Paints Legal &amp; Compliance Division
                </p>
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                  <span>Issued: <strong>{viewingDoc.issueDate}</strong></span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">Valid until: <strong>{viewingDoc.expiryDate}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200/80">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Protected In-App View (Downloading &amp; Copying Disabled)</span>
              </div>
            </div>

            <Button
              onClick={() => setViewingDoc(null)}
              className="w-full h-9 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-medium rounded-lg"
            >
              Close Protected Viewer
            </Button>
          </div>
        </div>
      )}

      {/* Upload Renewal Modal with Custom Date Pickers */}
      {activeUploadDoc && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Upload Document Renewal</h3>
                <p className="text-xs text-slate-400 truncate max-w-xs">{activeUploadDoc.name}</p>
              </div>
              <button
                onClick={() => setActiveUploadDoc(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadRenewal} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="docNo" className="text-xs font-semibold text-slate-900">
                  New Certificate / Reference Number *
                </Label>
                <Input
                  id="docNo"
                  placeholder="e.g. CR12-KE-2026-0842"
                  defaultValue={activeUploadDoc.docNumber}
                  required
                  className="h-9 text-xs border-slate-200 rounded-lg"
                />
              </div>

              {/* Custom Date Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <CustomDatePicker
                    label="Issue Date *"
                    value={issueDate}
                    onChange={(val) => setIssueDate(val)}
                  />
                </div>
                <div className="space-y-1.5">
                  <CustomDatePicker
                    label="New Expiry Date *"
                    value={expiryDate}
                    onChange={(val) => setExpiryDate(val)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-900">
                  Attach Certified PDF Copy *
                </Label>
                <label className="border border-dashed border-slate-300 hover:border-slate-400 rounded-lg p-3 flex items-center justify-between text-xs text-slate-500 bg-slate-50 cursor-pointer">
                  <span className="truncate font-medium text-slate-700">Apex_Updated_CR12_Directors_2026.pdf</span>
                  <Upload className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input type="file" accept=".pdf,image/*" className="hidden" />
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveUploadDoc(null)}
                  className="h-9 border-slate-200 text-slate-700 text-xs font-medium rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 h-9 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-medium rounded-lg"
                >
                  {isUploading ? "Uploading & Verifying…" : "Submit Renewal Document"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
