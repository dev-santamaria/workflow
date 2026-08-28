"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { BarcodeView } from "@/components/ui/barcode-view";
import {
  Landmark,
  ArrowLeft,
  Printer,
  Download,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function RemittanceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const remittanceId = resolvedParams.id || "REM-2026-8492";
  const [qrUrl, setQrUrl] = useState("");

  const remData = {
    remittanceNo: remittanceId,
    invoiceNo: "INV-2026-9655",
    poNumber: "LPO-2026-9655",
    entity: "Chromex Colourant Limited",
    flag: "CHROMEX",
    paymentDate: "Feb 20, 2026",
    grossAmount: 2150000,
    whtRate: 5,
    whtAmount: 107500,
    netSettled: 2042500,
    currency: "KES",
    paymentMethod: "RTGS",
    bankAccount: "Standard Chartered Bank · Account ending in 8492",
    bankName: "Standard Chartered Bank Kenya (Chiromo Branch)",
    transactionRef: "CBK-RTGS-891049281",
    status: "Settled & Cleared in Bank",
  };

  useEffect(() => {
    QRCode.toDataURL(`CROWN_REMITTANCE:${remData.remittanceNo}|RTGS:${remData.transactionRef}|NET:KES${remData.netSettled}`, {
      width: 110,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    }).then(setQrUrl).catch(() => setQrUrl(""));
  }, [remData.remittanceNo, remData.transactionRef, remData.netSettled]);

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link href="/remittance">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg border-slate-200">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {remData.remittanceNo}
              </span>
              <span className="text-xs font-mono text-slate-400">RTGS: {remData.transactionRef}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-0.5">
              Official Remittance Advice Slip
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 rounded-lg gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Slip</span>
          </Button>

          <Button
            size="sm"
            onClick={() => window.print()}
            className="h-8 text-xs font-medium bg-[#32298A] hover:bg-[#271f6f] text-white rounded-lg gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Remittance PDF</span>
          </Button>
        </div>
      </div>

      {/* Remittance Document Slip */}
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
            <h3 className="text-sm font-bold text-slate-900 pt-2">{remData.entity}</h3>
            <p className="text-xs text-slate-400">Treasury &amp; Disbursements Operations</p>
            <p className="text-xs text-slate-400">Likoni Road, P.O. Box 78848 - 00507, Nairobi</p>
          </div>

          <div className="text-right space-y-1 font-mono">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Remittance Voucher:</span>
            <span className="text-lg font-black text-[#32298A]">{remData.remittanceNo}</span>
            <p className="text-xs text-slate-500 font-sans">Settled on {remData.paymentDate}</p>
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Funds Settled</span>
            </span>
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/70 rounded-lg text-xs border border-slate-100">
          <div>
            <span className="font-semibold text-slate-500 uppercase text-[10px] block">Beneficiary Supplier:</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">Apex Industrial Polymers Ltd</p>
            <p className="text-slate-500 font-mono text-[11px]">Vendor Code: VEND-KE-84920 · Tax PIN: P051982736Z</p>
          </div>
          <div>
            <span className="font-semibold text-slate-500 uppercase text-[10px] block">Banking Destination:</span>
            <p className="font-bold text-slate-900 mt-0.5">{remData.bankName}</p>
            <p className="text-slate-500 font-mono text-[11px]">{remData.bankAccount}</p>
            <p className="text-[#32298A] font-mono text-[11px] font-bold mt-0.5">Central Bank RTGS: {remData.transactionRef}</p>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-[10px] font-semibold text-slate-600 uppercase border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Invoice Reference</th>
                <th className="py-2.5 px-4">PO Reference</th>
                <th className="py-2.5 px-3 text-right">Gross Total</th>
                <th className="py-2.5 px-3 text-right">Withholding Tax</th>
                <th className="py-2.5 px-4 text-right">Net Released</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="py-3 px-4 font-semibold font-mono">{remData.invoiceNo}</td>
                <td className="py-3 px-4 font-mono text-slate-500">{remData.poNumber}</td>
                <td className="py-3 px-3 text-right font-mono text-slate-700">
                  {remData.currency} {remData.grossAmount.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right text-red-600 font-mono font-semibold">
                  - {remData.currency} {remData.whtAmount.toLocaleString()} ({remData.whtRate}% WHT)
                </td>
                <td className="py-3 px-4 text-right font-bold text-slate-900 text-sm font-mono">
                  {remData.currency} {remData.netSettled.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900 font-semibold">
          <span>Net Amount Credited into Beneficiary Account:</span>
          <span className="font-mono text-base font-bold">
            {remData.currency} {remData.netSettled.toLocaleString()}
          </span>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-4">
            {qrUrl && (
              <Image src={qrUrl} alt="Remittance QR" width={68} height={68} className="rounded border border-slate-200 p-1" />
            )}
            <BarcodeView code={remData.transactionRef} height={28} />
          </div>

          <div className="text-right text-[11px] text-slate-400 space-y-0.5">
            <p className="font-semibold text-slate-700">Central Bank of Kenya RTGS Settlement</p>
            <p className="font-mono">Reference: {remData.transactionRef}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
