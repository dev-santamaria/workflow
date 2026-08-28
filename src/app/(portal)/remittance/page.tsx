"use client";

import { useState } from "react";
import Link from "next/link";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Landmark,
  Search,
  CheckCircle2,
  Eye,
} from "lucide-react";

interface RemittanceItem {
  id: string;
  remittanceNo: string;
  invoiceNo: string;
  poNumber: string;
  entity: string;
  flag: string;
  paymentDate: string;
  grossAmount: number;
  whtRate: number;
  whtAmount: number;
  netSettled: number;
  currency: string;
  paymentMethod: "RTGS" | "EFT" | "SWIFT";
  bankAccount: string;
  bankName: string;
  transactionRef: string;
  status: "settled" | "processing";
}

const mockRemittances: RemittanceItem[] = [
  {
    id: "rem-1",
    remittanceNo: "REM-2026-8492",
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
    status: "settled",
  },
  {
    id: "rem-2",
    remittanceNo: "REM-2026-8310",
    invoiceNo: "INV-2026-9481",
    poNumber: "LPO-2026-9481",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    paymentDate: "Feb 10, 2026",
    grossAmount: 3200000,
    whtRate: 5,
    whtAmount: 160000,
    netSettled: 3040000,
    currency: "KES",
    paymentMethod: "RTGS",
    bankAccount: "Standard Chartered Bank · Account ending in 8492",
    bankName: "Standard Chartered Bank Kenya",
    transactionRef: "CBK-RTGS-840192841",
    status: "settled",
  },
  {
    id: "rem-3",
    remittanceNo: "REM-2026-8104",
    invoiceNo: "INV-2026-9304",
    poNumber: "LPO-2026-9304",
    entity: "Regal Paints Uganda Ltd",
    flag: "UG",
    paymentDate: "Jan 28, 2026",
    grossAmount: 45000000,
    whtRate: 6,
    whtAmount: 2700000,
    netSettled: 42300000,
    currency: "UGX",
    paymentMethod: "EFT",
    bankAccount: "Stanbic Bank Uganda · Account ending in 2048",
    bankName: "Stanbic Bank Uganda (Kampala Main)",
    transactionRef: "BOU-EFT-9920148",
    status: "settled",
  },
];

export default function RemittancePage() {
  const [remittances, setRemittances] = useState<RemittanceItem[]>(mockRemittances);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = remittances.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      r.remittanceNo.toLowerCase().includes(q) ||
      r.invoiceNo.toLowerCase().includes(q) ||
      r.poNumber.toLowerCase().includes(q) ||
      r.transactionRef.toLowerCase().includes(q)
    );
  });

  const totalSettledKES = remittances
    .filter((r) => r.currency === "KES")
    .reduce((acc, r) => acc + r.netSettled, 0);

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Remittance &amp; Payment Payouts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review completed banking disbursements, withholding tax (WHT) deductions, and inspect official in-app Remittance Advice vouchers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 flex items-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold">Settled (KES): {totalSettledKES.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-medium text-slate-500">
          Showing <strong>{filtered.length}</strong> Remittance Payout Records
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search Remittance #, Invoice, or RTGS Ref…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            suppressHydrationWarning
            className="pl-9 h-9 text-xs bg-slate-50/50 border-slate-200 rounded-lg"
          />
        </div>
      </div>

      {/* Payouts Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Completed Bank Remittances &amp; Settlement Slips
            </h2>
            <p className="text-xs text-slate-400">Gross invoice amount, Withholding Tax (WHT), and Net settlement</p>
          </div>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
            Direct Bank Wire (RTGS / EFT)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-4">Remittance Ref &amp; Date</th>
                <th className="py-2.5 px-4">Linked Invoice &amp; PO</th>
                <th className="py-2.5 px-4">Entity</th>
                <th className="py-2.5 px-4">Gross Amount</th>
                <th className="py-2.5 px-4">Withholding Tax (WHT)</th>
                <th className="py-2.5 px-4">Net Settled in Bank</th>
                <th className="py-2.5 px-4">Bank Transaction Code</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((rem) => (
                <tr key={rem.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900 font-mono">{rem.remittanceNo}</p>
                    <p className="text-[10px] text-slate-400">{rem.paymentDate}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-[#32298A] font-mono">{rem.invoiceNo}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{rem.poNumber}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <FlagIcon country={rem.flag} className="w-4 h-3 rounded-[1px]" />
                      <span className="truncate max-w-[130px]">{rem.entity}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-600">
                      {rem.currency} {rem.grossAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-red-600 text-[11px] font-mono">
                        - {rem.currency} {rem.whtAmount.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-slate-400 block font-mono">({rem.whtRate}% WHT)</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900 font-mono">
                        {rem.currency} {rem.netSettled.toLocaleString()}
                      </p>
                      <span className="text-[9px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                        Settled
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <span className="font-mono text-[11px] font-semibold text-slate-800">{rem.transactionRef}</span>
                      <p className="text-[10px] text-slate-400">{rem.paymentMethod} · {rem.bankName}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/remittance/${rem.remittanceNo}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        suppressHydrationWarning
                        className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 rounded-lg gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Inspect Slip</span>
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
