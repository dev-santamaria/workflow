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
    <div className="space-y-6" suppressHydrationWarning>
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Supplier Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Welcome back, <strong>Apex Industrial Polymers Ltd</strong>. Monitor your active RFQs, purchase orders, deliveries, and payment disbursements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/rfqs">
            <Button
              suppressHydrationWarning
              className="bg-[#32298A] hover:bg-[#271f6f] text-white font-medium text-xs h-9 px-3.5 gap-2 rounded-lg cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>View Assigned RFQs</span>
            </Button>
          </Link>

          <Link href="/delivery-notes">
            <Button
              variant="outline"
              suppressHydrationWarning
              className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs h-9 px-3.5 gap-2 rounded-lg cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-slate-500" />
              <span>Create Delivery</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Core Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Assigned RFQs</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#32298A] flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">2 Active</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Awaiting fulfillment confirmation</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active LPOs Volume</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#32298A] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">KES 4.8M</div>
            <p className="text-[11px] text-slate-400 mt-0.5">3 Total open contracts</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Dispatches &amp; Gate Passes</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#32298A] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">1 In Transit</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Likoni Rd Factory Bay 3</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Settled Remittances</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">KES 5.08M</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Paid via RTGS this month</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section (Volume Trend & Category Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Monthly Volume & Payout Trend (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Contract Volume vs Settled Payouts (KES Millions)</h2>
              <p className="text-xs text-slate-400">Monthly breakdown of LPO contract awards vs bank disbursements</p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#32298A]" />
                <span className="text-slate-600">LPO Awarded</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" />
                <span className="text-slate-600">Paid Settled</span>
              </div>
            </div>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} tickFormatter={(val) => `${val}M`} />
                <Tooltip
                  formatter={(val: any) => [`KES ${val} Million`]}
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }}
                />
                <Bar dataKey="poAwarded" name="LPO Awarded" fill="#32298A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="paidSettled" name="Paid Settled" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Category Donut Breakdown & Performance (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Supply Categories</h2>
            <p className="text-xs text-slate-400">Share of awarded contracts</p>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={68}
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
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-bold text-slate-900 font-mono">100%</span>
              <span className="text-[9px] text-slate-400 font-medium uppercase">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-slate-600 text-[11px] truncate">{c.name} ({c.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Delivery Tracker Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Active Local Purchase Orders &amp; Factory Intake
            </h2>
            <p className="text-xs text-slate-400">Track delivery gate passes, factory receiving GRN, and payment booking</p>
          </div>
          <Link
            href="/lpos"
            className="text-xs font-semibold text-[#32298A] hover:underline flex items-center gap-1"
          >
            <span>View All LPOs →</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-4">LPO Number &amp; Date</th>
                <th className="py-2.5 px-4">Entity</th>
                <th className="py-2.5 px-4">Contract Value</th>
                <th className="py-2.5 px-4">Gate Pass / Delivery</th>
                <th className="py-2.5 px-4">Settlement Stage</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <tr key={order.poNumber} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900 font-mono">{order.poNumber}</p>
                    <p className="text-[10px] text-slate-400">{order.date}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <FlagIcon country={order.flag} className="w-4 h-3 rounded-[1px]" />
                      <span className="truncate max-w-[160px]">{order.entity}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{order.amount}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded border ${order.deliveryBadge}`}>
                        {order.deliveryStatus}
                      </span>
                      <p className="text-[10px] font-mono text-slate-400">{order.gatePass}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded border ${order.paymentBadge}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/delivery-notes?po=${order.poNumber}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        suppressHydrationWarning
                        className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer"
                      >
                        Delivery Pass
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
