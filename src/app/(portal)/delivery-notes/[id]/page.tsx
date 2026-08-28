"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { BarcodeView } from "@/components/ui/barcode-view";
import {
  Truck,
  ArrowLeft,
  CheckCircle2,
  Clock,
  QrCode,
  ShieldCheck,
} from "lucide-react";

export default function DeliveryNoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const deliveryId = resolvedParams.id || "GP-2026-0842";
  const [qrUrl, setQrUrl] = useState("");

  const deliveryData = {
    gatePassId: deliveryId,
    deliveryNoteNo: "DN-KE-2026-0842",
    invoiceNo: "KRA-ETIMS-91820481",
    poNumber: "LPO-2026-9842",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    destination: "Likoni Road Factory, Goods Inwards Bay 3, Industrial Area, Nairobi",
    vehiclePlate: "KBZ 892Y (Trailer 14T)",
    driverName: "Peter Kamau Mwangi",
    driverPhone: "+254 712 345 678",
    deliveryMode: "Full Delivery",
    dispatchDate: "Feb 27, 2026 · 08:30 AM",
    grnNumber: "GRN-KE-2026-0842",
    status: "GRN Verified & Received",
    items: [
      { description: "Pure Acrylic Polymer Emulsion (High Gloss Formulation)", orderedQty: 20, deliveredQty: 20, unit: "MT" },
      { description: "Rutile Titanium Dioxide Pigment (Paint Grade 99.5%)", orderedQty: 10, deliveredQty: 10, unit: "MT" },
    ],
  };

  useEffect(() => {
    QRCode.toDataURL(`CROWN_GATEPASS:${deliveryData.gatePassId}|PO:${deliveryData.poNumber}|VEH:${deliveryData.vehiclePlate}|DRIVER:${deliveryData.driverName}`, {
      width: 120,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    }).then(setQrUrl).catch(() => setQrUrl(""));
  }, [deliveryData.gatePassId]);

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link href="/delivery-notes">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg border-slate-200">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {deliveryData.gatePassId}
              </span>
              <span className="text-xs font-mono text-slate-400">DN: {deliveryData.deliveryNoteNo}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-0.5">
              Factory Gate Pass &amp; Delivery Dispatch
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Gate Clearance Issued</span>
          </span>
        </div>
      </div>

      {/* Gate Pass Card */}
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
            <h3 className="text-sm font-bold text-slate-900 pt-2">{deliveryData.entity}</h3>
            <p className="text-xs text-slate-400">Security Gate &amp; Factory Goods Receiving Voucher</p>
          </div>

          <div className="text-right space-y-1 font-mono">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Gate Pass Reference:</span>
            <span className="text-lg font-black text-[#32298A]">{deliveryData.gatePassId}</span>
            <p className="text-xs text-slate-500 font-sans">{deliveryData.dispatchDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50/70 rounded-lg text-xs border border-slate-100">
          <div>
            <span className="font-semibold text-slate-500 uppercase text-[10px] block">Vehicle &amp; Transporter:</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{deliveryData.vehiclePlate}</p>
            <p className="text-slate-500 mt-0.5">Driver: {deliveryData.driverName}</p>
            <p className="text-slate-400 font-mono text-[11px]">{deliveryData.driverPhone}</p>
          </div>
          <div>
            <span className="font-semibold text-slate-500 uppercase text-[10px] block">KRA Fiscal Reference:</span>
            <p className="font-bold text-slate-900 font-mono mt-0.5">{deliveryData.deliveryNoteNo}</p>
            <p className="text-slate-500 font-mono text-[11px] mt-0.5">eTIMS: {deliveryData.invoiceNo}</p>
            <p className="text-[#32298A] font-bold font-mono text-[11px] mt-0.5">PO: {deliveryData.poNumber}</p>
          </div>
          <div>
            <span className="font-semibold text-slate-500 uppercase text-[10px] block">Intake Verification:</span>
            <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{deliveryData.grnNumber}</span>
            </span>
            <p className="text-[11px] text-slate-500 mt-1">Status: {deliveryData.status}</p>
          </div>
        </div>

        {/* Cargo Manifest */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-[10px] font-semibold text-slate-600 uppercase border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Item Description</th>
                <th className="py-2.5 px-3">Unit</th>
                <th className="py-2.5 px-3">Ordered Qty</th>
                <th className="py-2.5 px-4 text-right">Delivered &amp; Verified Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {deliveryData.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 font-medium text-slate-900">{item.description}</td>
                  <td className="py-3 px-3 text-slate-500">{item.unit}</td>
                  <td className="py-3 px-3 font-semibold text-slate-700">{item.orderedQty}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 text-right font-mono">{item.deliveredQty} {item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with QR and Barcode */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-4">
            {qrUrl && (
              <Image src={qrUrl} alt="Gate Pass QR" width={72} height={72} className="rounded border border-slate-200 p-1" />
            )}
            <BarcodeView code={deliveryData.gatePassId} height={28} />
          </div>

          <div className="text-right text-[11px] text-slate-400 space-y-0.5">
            <p className="font-semibold text-slate-700">Crown Paints Security Gate Terminal</p>
            <p className="font-mono">Gate Status: VERIFIED &amp; LOGGED IN ERP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
