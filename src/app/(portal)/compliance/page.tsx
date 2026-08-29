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
    <div className="space-y-3.5" suppressHydrationWarning>
      {/* Toast Notification */}
      {uploadSuccessToast && (
        <div className="fixed top-16 right-5 z-50 p-2.5 bg-slate-900 text-white rounded-lg shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2 text-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Document submitted for compliance audit review!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            KYC Compliance Vault
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Maintain valid corporate KYC credentials to ensure active pre-qualification for Crown Paints tenders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Pre-Qualification Compliant</span>
          </span>
        </div>
      </div>

      {/* Expiry Alert */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs flex items-start gap-2.5">
        <Clock className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.2">
          <p className="font-semibold text-amber-900">Upcoming Document Renewal</p>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Your <strong>CR12 List of Directors</strong> expires in <strong>78 days</strong>. Upload the certified copy before expiration to maintain tender bidding eligibility.
          </p>
        </div>
      </div>

      {/* Document Vault Cards (Compact High-Density Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {doc.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug pt-0.5">
                  {doc.name}
                </h3>
              </div>

              <div>
                {doc.status === "valid" && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Active</span>
                  </span>
                )}
                {doc.status === "expiring_soon" && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>Expires {doc.daysRemaining}d</span>
                  </span>
                )}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-mono space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Ref Number:</span>
                <span className="font-semibold text-slate-900 text-xs">{doc.docNumber}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Validity:</span>
                <span className="font-medium text-slate-700 text-xs">{doc.issueDate} to {doc.expiryDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400 font-mono truncate max-w-[170px]">
                {doc.fileName}
              </span>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingDoc(doc)}
                  className="h-7.5 text-xs font-semibold border-slate-200 px-2.5 cursor-pointer gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>View</span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => setActiveUploadDoc(doc)}
                  className="h-7.5 text-xs font-semibold bg-[#32298A] hover:bg-[#271f6f] text-white px-2.5 cursor-pointer gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Renew</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Renewal Modal */}
      {activeUploadDoc && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-5 space-y-3.5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">Upload KYC Renewal Document</h3>
              <button
                type="button"
                onClick={() => setActiveUploadDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadRenewal} className="space-y-3 text-xs">
              <div>
                <Label className="text-xs font-semibold text-slate-700">Document Type</Label>
                <p className="font-semibold text-slate-900 mt-0.5">{activeUploadDoc.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <CustomDatePicker label="New Issue Date *" value={issueDate} onChange={setIssueDate} />
                <CustomDatePicker label="New Expiry Date *" value={expiryDate} onChange={setExpiryDate} />
              </div>

              <div className="border-2 border-dashed border-slate-300 hover:border-[#32298A] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50">
                <Upload className="w-5 h-5 text-slate-400 mb-1" />
                <span className="font-semibold text-slate-700 text-xs">Click to upload certified document</span>
                <span className="text-[10px] text-slate-400">PDF, JPG, PNG (Max 15MB)</span>
                <input type="file" accept=".pdf,image/*" className="hidden" />
              </div>

              <div className="flex items-center justify-between pt-1">
                <Button type="button" variant="outline" onClick={() => setActiveUploadDoc(null)} className="h-8 text-xs border-slate-200">
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading} className="h-8 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold">
                  {isUploading ? "Uploading & Encrypting…" : "Submit for Verification"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-5 space-y-3.5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#32298A]" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-xs">{viewingDoc.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Certificate Number:</span>
                <span className="font-mono font-bold text-slate-900">{viewingDoc.docNumber}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Active Period:</span>
                <span className="font-mono font-medium text-slate-800">{viewingDoc.issueDate} to {viewingDoc.expiryDate}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Vault Encryption:</span>
                <span className="font-mono text-emerald-700 font-semibold">AES-256 Verified</span>
              </div>
            </div>

            <div className="pt-1">
              <Button type="button" variant="outline" onClick={() => setViewingDoc(null)} className="w-full h-8 text-xs border-slate-200">
                Close Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
