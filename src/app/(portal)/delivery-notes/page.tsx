"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import { FlagIcon } from "@/components/ui/flag-icon";
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
  flag: string;
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
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Delivery Notes &amp; Gate Pass Intake
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Register delivery note dispatches against approved LPOs. Factory gate check-in triggers automatic Goods Received Note (GRN) generation and payment booking.
          </p>
        </div>

        <Link href="/delivery-notes/create">
          <Button
            suppressHydrationWarning
            className="bg-[#32298A] hover:bg-[#271f6f] text-white font-medium text-xs h-9 px-3.5 gap-2 rounded-lg cursor-pointer flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Delivery</span>
          </Button>
        </Link>
      </div>

      {/* Deliveries Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              All-Time Delivery Dispatches &amp; Gate Passes
            </h2>
            <p className="text-xs text-slate-400">Track delivery status, vehicle intake, and verified GRNs</p>
          </div>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
            {deliveries.length} Registered Deliveries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-4">Delivery Note # &amp; Date</th>
                <th className="py-2.5 px-4">KRA Invoice / eTIMS</th>
                <th className="py-2.5 px-4">Linked LPO &amp; Entity</th>
                <th className="py-2.5 px-4">Vehicle &amp; Contact</th>
                <th className="py-2.5 px-4">Delivery Type</th>
                <th className="py-2.5 px-4">Gate Pass / GRN Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveries.map((del) => (
                <tr key={del.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900 font-mono">{del.deliveryNoteNo}</p>
                    <p className="text-[10px] text-slate-400">{del.dispatchDate}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded text-[11px]">
                      {del.invoiceNo}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-[#32298A] font-mono">{del.poNumber}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <FlagIcon country={del.flag} className="w-3.5 h-2.5 rounded-[1px]" />
                      <span className="truncate max-w-[130px]">{del.entity}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-slate-900">{del.vehiclePlate}</p>
                    <p className="text-[10px] text-slate-400">{del.driverName} ({del.driverPhone})</p>
                  </td>
                  <td className="py-3 px-4">
                    {del.deliveryMode === "full" ? (
                      <span className="inline-block text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded">
                        Full Delivery
                      </span>
                    ) : (
                      <span className="inline-block text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded">
                        Partial Delivery
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {del.status === "in_transit" && (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-200/80">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>In Transit</span>
                        </span>
                        <p className="text-[10px] font-mono text-slate-400 pl-1">{del.gatePassId}</p>
                      </div>
                    )}
                    {del.status === "grn_received" && (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>GRN Issued</span>
                        </span>
                        <p className="text-[10px] font-mono text-emerald-700 font-semibold pl-1">{del.grnNumber}</p>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenGatePass(del)}
                        suppressHydrationWarning
                        className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 rounded-lg gap-1 cursor-pointer"
                      >
                        <QrCode className="w-3.5 h-3.5 text-slate-500" />
                        <span>Pass</span>
                      </Button>

                      <Link href={`/delivery-notes/${del.gatePassId}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          suppressHydrationWarning
                          className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 rounded-lg gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
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

      {/* Gate Pass Modal (Digital Pass - No Print Button) */}
      {activeGatePassModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#32298A]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Factory Gate Terminal Pass</span>
              </div>
              <button
                onClick={() => setActiveGatePassModal(null)}
                suppressHydrationWarning
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pass Card */}
            <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-3 text-center">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-900">{activeGatePassModal.entity}</h4>
                  <p className="text-[10px] text-slate-400">Security Goods Inwards Pass</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-[#32298A]">{activeGatePassModal.gatePassId}</span>
                </div>
              </div>

              <div className="w-28 h-28 mx-auto bg-white border border-slate-200 rounded-lg p-1.5 flex flex-col items-center justify-center">
                {qrCodeUrl ? (
                  <Image
                    src={qrCodeUrl}
                    alt="Digital Gate Pass QR"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                ) : (
                  <QrCode className="w-16 h-16 text-slate-900" />
                )}
              </div>

              <BarcodeView code={activeGatePassModal.gatePassId} height={24} />

              <div className="grid grid-cols-2 gap-2 text-left text-xs bg-slate-50 p-2.5 rounded-md border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[10px] block">Vehicle Plate:</span>
                  <span className="font-bold text-slate-900">{activeGatePassModal.vehiclePlate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Driver Name:</span>
                  <span className="font-semibold text-slate-800">{activeGatePassModal.driverName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Delivery Note / KRA:</span>
                  <span className="font-bold text-[#32298A]">{activeGatePassModal.deliveryNoteNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">LPO Reference:</span>
                  <span className="font-bold text-slate-900">{activeGatePassModal.poNumber}</span>
                </div>
              </div>

              {activeGatePassModal.grnNumber && (
                <div className="p-2 bg-emerald-50 border border-emerald-200/80 rounded text-xs text-emerald-800 flex items-center justify-between">
                  <span className="font-medium text-[11px]">Goods Received Note (GRN):</span>
                  <span className="font-mono font-bold">{activeGatePassModal.grnNumber}</span>
                </div>
              )}
            </div>

            <Button
              onClick={() => setActiveGatePassModal(null)}
              suppressHydrationWarning
              className="w-full h-9 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-medium rounded-lg"
            >
              Done &amp; Close Pass
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DeliveryNotesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading delivery dispatches…</div>}>
      <DeliveryNotesContent />
    </Suspense>
  );
}
