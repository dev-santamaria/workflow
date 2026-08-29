"use client";

import { useState } from "react";
import Link from "next/link";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FileSpreadsheet,
  ShoppingBag,
  Truck,
  Receipt,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Tag,
  Calendar,
} from "lucide-react";

interface RecentOrder {
  poNumber: string;
  entity: string;
  flag: string;
  date: string;
  amount: string;
  deliveryStatus: string;
  deliveryBadge: string;
  gatePass: string;
  paymentStatus: string;
  paymentBadge: string;
}

const recentOrders: RecentOrder[] = [
  {
    poNumber: "LPO-2026-9842",
    entity: "Crown Paints Kenya PLC",
    flag: "KE",
    date: "Feb 27, 2026",
    amount: "KES 4,800,000",
    deliveryStatus: "Gate Pass In Transit",
    deliveryBadge: "bg-amber-50 text-amber-800 border-amber-200/80",
    gatePass: "GP-2026-0842",
    paymentStatus: "Awaiting Factory GRN",
    paymentBadge: "bg-slate-100 text-slate-700 border-slate-200/80",
  },
  {
    poNumber: "LPO-2026-9710",
    entity: "Regal Paints Uganda Ltd",
    flag: "UG",
    date: "Feb 23, 2026",
    amount: "UGX 64,000,000",
    deliveryStatus: "Delivered & GRN Verified",
    deliveryBadge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    gatePass: "GP-2026-0799",
    paymentStatus: "Approved by Finance",
    paymentBadge: "bg-slate-100 text-slate-700 border-slate-200/80",
  },
  {
    poNumber: "LPO-2026-9655",
    entity: "Chromex Colourant Limited",
    flag: "CHROMEX",
    date: "Feb 17, 2026",
    amount: "KES 2,150,000",
    deliveryStatus: "Delivered & GRN Verified",
    deliveryBadge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    gatePass: "GP-2026-0740",
    paymentStatus: "Settled & Paid via RTGS",
    paymentBadge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  },
];

const monthlyVolumeData = [
  { month: "Oct", poAwarded: 3.2, paidSettled: 2.8 },
  { month: "Nov", poAwarded: 4.5, paidSettled: 3.9 },
  { month: "Dec", poAwarded: 5.1, paidSettled: 4.8 },
  { month: "Jan", poAwarded: 4.2, paidSettled: 4.0 },
  { month: "Feb", poAwarded: 6.95, paidSettled: 5.08 },
];

const categoryData = [
  { name: "Acrylic Resins", value: 45, color: "#32298A" },
  { name: "TiO2 Pigments", value: 30, color: "#64748B" },
  { name: "Packaging & Cans", value: 15, color: "#94A3B8" },
  { name: "Specialty Solvents", value: 10, color: "#CBD5E1" },
];

export default function OverviewPage() {
  return (
    <div className="space-y-3.5" suppressHydrationWarning>
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Supplier Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Welcome back, <strong>Apex Industrial Polymers Ltd</strong>. Monitor active RFQs, purchase orders, deliveries, and disbursements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/rfqs">
            <Button
              suppressHydrationWarning
              className="bg-[#32298A] hover:bg-[#271f6f] text-white font-medium text-xs h-8 px-3 gap-1.5 rounded-lg cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>View Assigned RFQs</span>
            </Button>
          </Link>

          <Link href="/delivery-notes">
            <Button
              variant="outline"
              suppressHydrationWarning
              className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs h-8 px-3 gap-1.5 rounded-lg cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-slate-500" />
              <span>Create Delivery</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Compact Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Assigned RFQs</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#32298A] flex items-center justify-center">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono">2 Active</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Awaiting fulfillment confirmation</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Active LPOs Volume</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#32298A] flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono">KES 4.8M</div>
            <p className="text-[10px] text-slate-400 mt-0.5">3 Total open contracts</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Dispatches &amp; Gate Passes</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#32298A] flex items-center justify-center">
              <Truck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono">1 In Transit</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Likoni Rd Factory Bay 3</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Settled Remittances</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono">KES 5.08M</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Paid via RTGS this month</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section (Volume Trend & Category Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left: Monthly Volume & Payout Trend (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-4 sm:p-4.5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-slate-900">Contract Volume vs Settled Payouts (KES Millions)</h2>
              <p className="text-[11px] text-slate-400">Monthly breakdown of LPO contract awards vs bank disbursements</p>
            </div>
            <div className="flex items-center gap-2.5 text-[10px]">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-[#32298A]" />
                <span className="text-slate-600">LPO Awarded</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-slate-300" />
                <span className="text-slate-600">Paid Settled</span>
              </div>
            </div>
          </div>

          <div className="h-52 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyVolumeData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} tickFormatter={(val) => `${val}M`} />
                <Tooltip
                  formatter={(val: any) => [`KES ${val} Million`]}
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: 6, border: "1px solid #E2E8F0", fontSize: 11 }}
                />
                <Bar dataKey="poAwarded" name="LPO Awarded" fill="#32298A" radius={[3, 3, 0, 0]} />
                <Bar dataKey="paidSettled" name="Paid Settled" fill="#CBD5E1" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Category Donut Breakdown & Performance (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-4 sm:p-4.5 shadow-2xs space-y-3">
          <div className="pb-2.5 border-b border-slate-100">
            <h2 className="text-xs sm:text-sm font-semibold text-slate-900">Supply Categories</h2>
            <p className="text-[11px] text-slate-400">Share of awarded contracts</p>
          </div>

          <div className="h-36 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={58}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-xs flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-slate-600 truncate">{cat.name}</span>
                <span className="font-semibold text-slate-900 ml-auto">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Density Recent Purchase Orders & Dispatches Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-slate-900">Recent Purchase Orders &amp; Dispatches</h2>
            <p className="text-[11px] text-slate-400">Track delivery gate passes, receiving receipts, and payment status</p>
          </div>

          <Link
            href="/lpos"
            className="text-xs font-semibold text-[#32298A] hover:underline flex items-center gap-1"
          >
            <span>All Orders</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3 whitespace-nowrap">LPO #</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Crown Entity</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Date Issued</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Contract Value</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Gate Pass / Dispatch</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Payment Stage</th>
                <th className="py-2.5 px-3 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  {/* LPO Ref */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded text-xs">
                      {order.poNumber}
                    </span>
                  </td>

                  {/* Entity with Flag */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700 text-xs sm:text-sm">
                      <FlagIcon country={order.flag} className="w-4 h-3 rounded-[1px]" />
                      <span>{order.entity}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap font-medium text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{order.date}</span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap text-xs sm:text-sm">
                    {order.amount}
                  </td>

                  {/* Gate Pass status */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold border ${order.deliveryBadge}`}>
                        {order.deliveryStatus}
                      </span>
                      <span className="font-mono text-xs text-slate-400">({order.gatePass})</span>
                    </div>
                  </td>

                  {/* Payment stage */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold border ${order.paymentBadge}`}>
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <Link href={`/lpos`}>
                      <Button
                        variant="outline"
                        size="sm"
                        suppressHydrationWarning
                        className="h-7.5 text-xs font-semibold border-slate-200 hover:bg-slate-50 rounded-md cursor-pointer px-2.5"
                      >
                        Inspect
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
