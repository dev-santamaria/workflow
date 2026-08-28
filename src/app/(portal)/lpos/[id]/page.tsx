"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { BarcodeView } from "@/components/ui/barcode-view";
import {
  ShoppingBag,
  ArrowLeft,
  Truck,
  Printer,
  CheckCircle2,
  Clock,
  Building2,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export default function LPODetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const lpoId = resolvedParams.id || "LPO-2026-9842";
  const [qrUrl, setQrUrl] = useState("");

  const lpoData = {
    poNumber: lpoId,
    rfqRef: "RFQ-2026-0810",
    reqNumber: "REQ-2026-4891",
    entity: "Crown Paints Kenya PLC (Likoni Rd HQ)",
    flag: "KE",
    issueDate: "Feb 27, 2026",
    deliveryDeadline: "March 5, 2026",
    destination: "Likoni Road Factory, Goods Inwards Bay 3, Industrial Area, Nairobi",
    totalValue: "KES 4,800,000",
    taxAmount: "KES 662,069 (16% VAT)",
    netAmount: "KES 4,137,931",
    deliveryCreated: false,
    status: "Awaiting Delivery Dispatch",
    items: [
      { id: 1, description: "Pure Acrylic Polymer Emulsion (High Gloss Formulation)", qty: "20 MT", unitPrice: "KES 140,000 / MT", total: "KES 2,800,000" },
      { id: 2, description: "Rutile Titanium Dioxide Pigment (Paint Grade 99.5%)", qty: "10 MT", unitPrice: "KES 200,000 / MT", total: "KES 2,000,000" },
    ],
  };

  useEffect(() => {
    QRCode.toDataURL(`CROWN_OFFICIAL_LPO:${lpoData.poNumber}|VENDOR:VEND-KE-84920|VAL:KES4800000`, {
      width: 110,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    }).then(setQrUrl).catch(() => setQrUrl(""));
  }, [lpoData.poNumber]);

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link href="/lpos">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg border-slate-200">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {lpoData.poNumber}
              </span>
              <span className="text-xs font-mono text-slate-400">RFQ: {lpoData.rfqRef}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-0.5">
              Official Local Purchase Order
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="h-8 text-xs font-medium border-slate-200 rounded-lg gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print LPO</span>
          </Button>

          {!lpoData.deliveryCreated && (
            <Link href={`/delivery-notes?po=${lpoData.poNumber}`}>
              <Button size="sm" className="h-8 text-xs font-medium bg-[#32298A] hover:bg-[#271f6f] text-white gap-1.5 rounded-lg">
                <Truck className="w-3.5 h-3.5" />
                <span>Create Delivery</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Official Printable LPO Document Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] max-w-4xl mx-auto">
        {/* Document Header */}
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
            <h3 className="text-sm font-bold text-slate-900 pt-2">{lpoData.entity}</h3>
            <p className="text-xs text-slate-400">Likoni Road, Industrial Area, P.O. Box 78848 - 00507, Nairobi</p>
            <p className="text-xs text-slate-400 font-mono">Tax PIN: P051289104A · Procurement Dept</p>
          </div>

          <div className="text-right space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Official Contract LPO:</span>
            <span className="text-lg font-black text-[#32298A] font-mono">{lpoData.poNumber}</span>
            <p className="text-xs text-slate-500 font-medium">Issued: {lpoData.issueDate}</p>
            <p className="text-xs text-amber-800 font-semibold">Delivery By: {lpoData.deliveryDeadline}</p>
          </div>
        </div>

        {/* Vendor Coordinates & Shipping Details */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/70 rounded-lg text-xs border border-slate-100">
          <div>
            <span className="font-semibold text-slate-500 block uppercase text-[10px]">Vendor (Beneficiary):</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">Apex Industrial Polymers Ltd</p>
            <p className="text-slate-500 font-mono text-[11px]">Vendor Code: VEND-KE-84920 · PIN: P051982736Z</p>
            <p className="text-slate-500 text-[11px] mt-0.5">Plot 14B, Road C, Industrial Area, Nairobi</p>
          </div>
          <div>
            <span className="font-semibold text-slate-500 block uppercase text-[10px]">Delivery Destination Plant:</span>
            <p className="font-bold text-slate-900 mt-0.5">Likoni Road Factory Goods Receiving</p>
            <p className="text-slate-600 text-[11px]">{lpoData.destination}</p>
            <p className="text-slate-400 font-mono text-[11px] mt-0.5">Requisition Ref: {lpoData.reqNumber}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-[10px] font-semibold text-slate-600 uppercase border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">#</th>
                <th className="py-2.5 px-4">Item Description</th>
                <th className="py-2.5 px-3">Contract Qty</th>
                <th className="py-2.5 px-3">Agreed Unit Rate</th>
                <th className="py-2.5 px-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {lpoData.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-4 font-mono text-slate-400">{item.id}</td>
                  <td className="py-3 px-4 font-medium text-slate-900">{item.description}</td>
                  <td className="py-3 px-3 font-semibold text-slate-800">{item.qty}</td>
                  <td className="py-3 px-3 text-slate-600 font-mono">{item.unitPrice}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 text-right font-mono">{item.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-200 bg-slate-50 text-xs">
                <td colSpan={4} className="py-2 px-4 text-right text-slate-500">Taxable Net Amount:</td>
                <td className="py-2 px-4 text-right font-mono text-slate-700">{lpoData.netAmount}</td>
              </tr>
              <tr className="bg-slate-50 text-xs">
                <td colSpan={4} className="py-1 px-4 text-right text-slate-500">VAT (16% Standard):</td>
                <td className="py-1 px-4 text-right font-mono text-slate-700">{lpoData.taxAmount}</td>
              </tr>
              <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold text-sm">
                <td colSpan={4} className="py-3 px-4 text-right uppercase text-slate-900">Total Purchase Order Value:</td>
                <td className="py-3 px-4 text-right text-[#32298A] font-mono font-black">{lpoData.totalValue}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Barcode & Verification Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-4">
            {qrUrl && (
              <Image src={qrUrl} alt="LPO QR" width={68} height={68} className="rounded border border-slate-200 p-1" />
            )}
            <div>
              <BarcodeView code={lpoData.poNumber} height={28} />
            </div>
          </div>

          <div className="text-right text-[11px] text-slate-400 space-y-0.5">
            <p className="font-semibold text-slate-700">Crown Paints Enterprise ERP Contract</p>
            <p className="font-mono">Verification: CROWN-PO-SHA256-84920</p>
          </div>
        </div>
      </div>
    </div>
  );
}
