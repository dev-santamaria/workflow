"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import {
  Search,
  Bell,
  Menu,
  Truck,
  FileSpreadsheet,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Landmark,
  Clock,
  ExternalLink,
} from "lucide-react";

interface PortalNavbarProps {
  onToggleMobileSidebar: () => void;
}

interface NotificationItem {
  id: string;
  category: "RFQ" | "LPO" | "GATE_PASS" | "INVOICE" | "REMITTANCE";
  title: string;
  desc: string;
  detail: string;
  time: string;
  unread: boolean;
  href: string;
  ctaText: string;
  icon: React.ElementType;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    category: "RFQ",
    title: "New RFQ Requisition Assigned (REQ-2026-4891)",
    desc: "Crown Paints Kenya PLC assigned you a quotation request for Pure Acrylic Polymer Emulsion.",
    detail: "Crown Paints Procurement team evaluated vendor pre-qualification scores and assigned Requisition REQ-2026-4891 to Apex Industrial Polymers Ltd. You are requested to confirm unit pricing and delivery schedule before March 3, 2026.",
    time: "10 mins ago",
    unread: true,
    href: "/rfqs/RFQ-2026-0810",
    ctaText: "Inspect & Confirm RFQ",
    icon: FileSpreadsheet,
  },
  {
    id: "notif-2",
    category: "GATE_PASS",
    title: "Digital Gate Pass Approved (GP-2026-0842)",
    desc: "Gate Pass GP-2026-0842 generated for Likoni Rd Factory Receiving Bay 3.",
    detail: "Security dispatch clearance issued for vehicle KBZ 892Y carrying 20 MT Pure Acrylic Polymer Emulsion. Factory terminal will scan driver QR code upon arrival to generate Goods Received Note (GRN).",
    time: "2 hours ago",
    unread: true,
    href: "/delivery-notes/GP-2026-0842",
    ctaText: "View Digital Gate Pass",
    icon: Truck,
  },
  {
    id: "notif-3",
    category: "REMITTANCE",
    title: "Bank Remittance Settled (KES 2,042,500)",
    desc: "Treasury settled INV-2026-9655 via Central Bank RTGS. Remittance voucher available.",
    detail: "Crown Paints Finance & Treasury released net funds of KES 2,042,500 against invoice INV-2026-9655 into Standard Chartered Bank (Chiromo Branch). 5% Withholding Tax (KES 107,500) deducted.",
    time: "Yesterday",
    unread: false,
    href: "/remittance/REM-2026-8492",
    ctaText: "Inspect Remittance Advice Slip",
    icon: CheckCircle2,
  },
  {
    id: "notif-4",
    category: "INVOICE",
    title: "3-Way Audit Matching Approved (INV-2026-9842)",
    desc: "Fiscal eTIMS invoice successfully matched with GRN-KE-2026-0842.",
    detail: "Accounts Payable automated 3-way matching verified delivery quantities, agreed LPO rates, and KRA eTIMS fiscal control signatures. Payment has been queued for Friday Treasury batch run.",
    time: "2 days ago",
    unread: false,
    href: "/invoicing/INV-2026-9842",
    ctaText: "Inspect Invoice Audit",
    icon: Receipt,
  },
];

export default function PortalNavbar({ onToggleMobileSidebar }: PortalNavbarProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [activeDetailNotif, setActiveDetailNotif] = useState<NotificationItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const notifRef = useRef<HTMLDivElement>(null);

  // Auto-close notifications dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleOpenDetail = (notif: NotificationItem) => {
    setActiveDetailNotif(notif);
    setIsNotifOpen(false);
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <>
      <header
        className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between"
        suppressHydrationWarning
      >
        {/* Left Area: Mobile Toggle & Global Search */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            suppressHydrationWarning
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search Bar */}
          <div className="relative w-full max-w-sm hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search RFQs, LPOs, Gate Passes, Invoices…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              suppressHydrationWarning
              className="w-full pl-9 pr-4 h-9 rounded-lg border border-slate-200 bg-slate-50/60 text-xs font-normal text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#32298A] focus:ring-1 focus:ring-[#32298A]/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Area: Static Operating Hub & Notifications */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Operating Entity Hub */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200/80 bg-slate-50/50 text-xs font-medium text-slate-700"
            suppressHydrationWarning
          >
            <FlagIcon country="KE" className="w-4 h-3 rounded-[1px]" />
            <span className="hidden sm:inline font-semibold text-slate-800">Crown Paints Kenya PLC</span>
            <span className="text-[11px] text-slate-400 hidden md:inline">· Likoni HQ</span>
          </div>

          {/* Notifications Bell Dropdown */}
          <div className="relative" ref={notifRef} suppressHydrationWarning>
            <button
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              suppressHydrationWarning
              className="relative p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#32298A] text-white font-bold text-[8px] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in-50 duration-100">
                <div className="p-3.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Procurement Notifications</h4>
                    <p className="text-[10px] text-slate-400">Live requisitions, gate passes &amp; payouts</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[10px] font-semibold text-[#32298A] hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                    <span className="text-[10px] font-semibold text-[#32298A] bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {unreadCount} New
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {notifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                      <div
                        key={notif.id}
                        onClick={() => handleOpenDetail(notif)}
                        className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                          notif.unread ? "bg-slate-50/40" : ""
                        }`}
                        suppressHydrationWarning
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#32298A] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-semibold text-slate-900 truncate">{notif.title}</p>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                            {notif.desc}
                          </p>
                          <span className="text-[10px] font-semibold text-[#32298A] mt-1 inline-flex items-center gap-1">
                            <span>View details &amp; action</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick CTA */}
          <Link href="/delivery-notes/create">
            <Button
              size="sm"
              suppressHydrationWarning
              className="bg-[#32298A] hover:bg-[#271f6f] text-white font-medium text-xs h-9 px-3 gap-1.5 rounded-lg shadow-none cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Dispatch</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Detailed Notification Inspection Modal */}
      {activeDetailNotif && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#32298A] bg-slate-100 px-2 py-0.5 rounded uppercase">
                  {activeDetailNotif.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{activeDetailNotif.time}</span>
              </div>
              <button
                onClick={() => setActiveDetailNotif(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {activeDetailNotif.title}
              </h3>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                {activeDetailNotif.detail}
              </div>

              <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Issued By:</span>
                  <span className="font-semibold text-slate-800">Crown Paints Enterprise Procurement Hub</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Recipient Vendor:</span>
                  <span className="font-mono text-slate-800">Apex Industrial Polymers (VEND-KE-84920)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setActiveDetailNotif(null)}
                className="h-9 text-xs border-slate-200 rounded-lg"
              >
                Close Notification
              </Button>

              <Link href={activeDetailNotif.href} onClick={() => setActiveDetailNotif(null)}>
                <Button className="h-9 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold gap-1.5 rounded-lg cursor-pointer">
                  <span>{activeDetailNotif.ctaText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
