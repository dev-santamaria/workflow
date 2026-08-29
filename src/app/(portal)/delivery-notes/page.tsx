"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import { FlagIcon, CountryCode } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { BarcodeView } from "@/components/ui/barcode-view";
import {
  Truck,
  QrCode,
  CheckCircle2,
  Clock,
  X,
  Eye,
  Plus,
} from "lucide-react";

interface DeliveryItem {
  id: string;
  deliveryNoteNo: string;
  invoiceNo: string;
  poNumber: string;
  entity: string;
  flag: CountryCode | string;
  destination: string;
  vehiclePlate: string;
  driverName: string;
  driverPhone: string;
  deliveryMode: "full" | "partial";
  dispatchDate: string;
  gatePassId: string;
  grnNumber?: string;
  status: "in_transit" | "gate_scanned" | "grn_received";
  items: {
    description: string;
    orderedQty: number;
    deliveredQty: number;
    unit: string;
  }[];
  attachedDocName: string;
  docSource: "vault_reuse" | "fresh_upload";
}

const mockDeliveries: DeliveryItem[] = [
  {
    id: "del-1",
    deliveryNoteNo: "DN-KE-2026-0842",
    invoiceNo: "KRA-ETIMS-91820481",
    poNumber: "LPO-2026-9842",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    destination: "Likoni Road Factory, Bay 3, Industrial Area, Nairobi",
    vehiclePlate: "KBZ 892Y (Trailer)",
    driverName: "Peter Kamau Mwangi",
    driverPhone: "+254 712 345 678",
    deliveryMode: "full",
    dispatchDate: "Feb 27, 2026 · 08:30 AM",
    gatePassId: "GP-2026-0842",
    status: "in_transit",
    attachedDocName: "Apex_Quotation_Doc_Signed.pdf",
    docSource: "vault_reuse",
    items: [
      { description: "Pure Acrylic Polymer Emulsion", orderedQty: 20, deliveredQty: 20, unit: "MT" },
      { description: "Rutile Titanium Dioxide Pigment", orderedQty: 10, deliveredQty: 10, unit: "MT" },
    ],
  },
  {
    id: "del-2",
    deliveryNoteNo: "DN-UG-2026-0412",
    invoiceNo: "EFRIS-UG-84920194",
    poNumber: "LPO-2026-9710",
    entity: "Regal Paints Uganda Ltd",
    flag: "UG",
    destination: "Plot 67/69, 6th Street Industrial Area, Kampala",
    vehiclePlate: "UBC 412K",
    driverName: "Dennis Ochieng",
    driverPhone: "+256 700 812 345",
    deliveryMode: "partial",
    dispatchDate: "Feb 23, 2026 · 09:00 AM",
    gatePassId: "GP-2026-0799",
    grnNumber: "GRN-UG-2026-0412",
    status: "grn_received",
    attachedDocName: "Regal_Delivery_Note_0412.pdf",
    docSource: "fresh_upload",
    items: [
      { description: "20L Metal Paint Containers", orderedQty: 5000, deliveredQty: 4500, unit: "Units" },
      { description: "4L Plastic Paint Buckets", orderedQty: 8000, deliveredQty: 8000, unit: "Units" },
    ],
  },
];

function DeliveryNotesContent() {
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>(mockDeliveries);
  const [activeGatePassModal, setActiveGatePassModal] = useState<DeliveryItem | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const handleOpenGatePass = (del: DeliveryItem) => {
    setActiveGatePassModal(del);
    const qrText = `CROWN_GATEPASS:${del.gatePassId}|PO:${del.poNumber}|DN:${del.deliveryNoteNo}|VEH:${del.vehiclePlate}|DRIVER:${del.driverName}`;
    QRCode.toDataURL(qrText, {
      width: 130,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    })
      .then(setQrCodeUrl)
      .catch(() => setQrCodeUrl(""));
  };

  return (
    <div className="space-y-3.5" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Delivery Notes &amp; Gate Pass Intake
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Register delivery note dispatches against approved LPOs. Factory gate check-in triggers automatic GRN verification.
          </p>
        </div>

        <Link href="/delivery-notes/create">
          <Button
            suppressHydrationWarning
            className="bg-[#32298A] hover:bg-[#271f6f] text-white font-medium text-xs h-8 px-3 gap-1.5 rounded-lg cursor-pointer flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Delivery</span>
          </Button>
        </Link>
      </div>

      {/* Deliveries Table Card (Compact High-Density) */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-slate-900">
              All-Time Delivery Dispatches &amp; Gate Passes
            </h2>
            <p className="text-[11px] text-slate-400">Track delivery status, vehicle intake, and verified GRNs</p>
          </div>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {deliveries.length} Registered Deliveries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">Delivery Note # &amp; Date</th>
                <th className="py-2.5 px-3">Tax Authority Ref</th>
                <th className="py-2.5 px-3">Linked LPO &amp; Entity</th>
                <th className="py-2.5 px-3">Vehicle &amp; Driver</th>
                <th className="py-2.5 px-3">Delivery Mode</th>
                <th className="py-2.5 px-3">Gate Pass / GRN Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveries.map((del) => (
                <tr key={del.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 px-3">
                    <p className="font-bold text-slate-900 font-mono text-xs">{del.deliveryNoteNo}</p>
                    <p className="text-[11px] text-slate-400">{del.dispatchDate}</p>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-mono text-slate-700 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded text-xs">
                      {del.invoiceNo}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <p className="font-bold text-[#32298A] font-mono text-xs">{del.poNumber}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <FlagIcon country={del.flag} className="w-4 h-3 rounded-[1px]" />
                      <span className="truncate max-w-[140px]">{del.entity}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <p className="font-semibold text-slate-900 text-xs">{del.vehiclePlate}</p>
                    <p className="text-[11px] text-slate-400">{del.driverName} ({del.driverPhone})</p>
                  </td>
                  <td className="py-2.5 px-3">
                    {del.deliveryMode === "full" ? (
                      <span className="inline-block text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded">
                        Full Delivery
                      </span>
                    ) : (
                      <span className="inline-block text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded">
                        Partial Delivery
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {del.status === "in_transit" && (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>In Transit</span>
                        </span>
                        <p className="text-[11px] font-mono text-slate-400 pl-0.5">{del.gatePassId}</p>
                      </div>
                    )}
                    {del.status === "grn_received" && (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>GRN Issued</span>
                        </span>
                        <p className="text-[11px] font-mono text-emerald-700 font-semibold pl-0.5">{del.grnNumber}</p>
                      </div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenGatePass(del)}
                        suppressHydrationWarning
                        className="h-7.5 text-xs font-semibold border-slate-200 hover:bg-slate-50 rounded-md cursor-pointer gap-1 px-2.5"
                      >
                        <QrCode className="w-3.5 h-3.5 text-slate-400" />
                        <span>Gate Pass</span>
                      </Button>

                      <Link href={`/delivery-notes/${del.gatePassId}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          suppressHydrationWarning
                          className="h-7 text-[11px] font-medium border-slate-200 hover:bg-slate-50 rounded-md gap-1 cursor-pointer px-2"
                        >
                          <Eye className="w-3 h-3 text-slate-400" />
                          <span>Inspect</span>
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gate Pass Modal (Digital Pass) */}
      {activeGatePassModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-5 space-y-3.5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-900">
                  {activeGatePassModal.gatePassId}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold">Verified Digital Pass</span>
              </div>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveGatePassModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center space-y-2 py-2">
              {qrCodeUrl && (
                <div className="inline-block p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <Image src={qrCodeUrl} alt="Gate Pass QR" width={110} height={110} className="mx-auto" />
                </div>
              )}
              <div>
                <p className="font-mono font-bold text-sm text-slate-900">{activeGatePassModal.vehiclePlate}</p>
                <p className="text-xs text-slate-600 font-medium">Driver: {activeGatePassModal.driverName}</p>
                <p className="text-[11px] text-slate-400">{activeGatePassModal.destination}</p>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Linked PO:</span>
                <span className="font-mono font-bold text-slate-800">{activeGatePassModal.poNumber}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery Note:</span>
                <span className="font-mono font-semibold text-slate-800">{activeGatePassModal.deliveryNoteNo}</span>
              </div>
            </div>

            <div className="pt-1">
              <Button
                type="button"
                variant="outline"
                suppressHydrationWarning
                onClick={() => setActiveGatePassModal(null)}
                className="w-full h-8 text-xs border-slate-200 rounded-lg"
              >
                Close Pass
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DeliveryNotesPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-slate-400">Loading delivery notes…</div>}>
      <DeliveryNotesContent />
    </Suspense>
  );
}
