"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Search,
  ChevronDown,
  Building2,
  Lock,
  LogOut,
  User,
  ShieldAlert,
  Globe2,
  Menu,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Truck,
  Receipt,
  FileText,
  Clock,
  ExternalLink,
  Coins,
  DollarSign,
  Euro,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import { FlagIcon } from "@/components/ui/flag-icon";

interface PortalNavbarProps {
  onToggleMobileSidebar?: () => void;
  onOpenMobile?: () => void;
}

const currencyAccounts: CustomSelectOption[] = [
  { value: "KES", label: "KES - Kenya Shillings", sublabel: "Apex Polymers (Likoni HQ)", flag: "KE", badge: "Primary" },
  { value: "USD", label: "USD - US Dollar", sublabel: "Apex Polymers Global (Foreign Supply)", flag: "US" },
  { value: "UGX", label: "UGX - Uganda Shillings", sublabel: "Apex Polymers Uganda (Kampala)", flag: "UG" },
  { value: "TZS", label: "TZS - Tanzania Shillings", sublabel: "Apex Polymers TZ (Arusha)", flag: "TZ" },
  { value: "EUR", label: "EUR - Euro", sublabel: "European Chemical Imports", flag: "EU" },
];

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  category: "RFQ" | "LPO" | "PAYMENT" | "GATEPASS" | "KYC";
  referenceId?: string;
  actionUrl?: string;
  fullMessage?: string;
  icon: typeof Bell;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New Purchase Order Released",
    desc: "LPO-2026-9842 (KES 3,250,000) has been officially authorized by Crown Paints Likoni HQ.",
    time: "10 mins ago",
    unread: true,
    category: "LPO",
    referenceId: "LPO-2026-9842",
    actionUrl: "/lpos",
    fullMessage: "Purchase Order LPO-2026-9842 for 15,000 Liters Acrylic Polymer Resin has completed executive approval. Please review delivery timelines and generate a Gate Pass prior to dispatch.",
    icon: FileCheck,
  },
  {
    id: "notif-2",
    title: "Electronic Gate Pass Approved",
    desc: "GP-2026-0842 is approved for Likoni Gate 2 arrival tomorrow at 08:30 AM.",
    time: "1 hour ago",
    unread: true,
    category: "GATEPASS",
    referenceId: "GP-2026-0842",
    actionUrl: "/delivery-notes",
    fullMessage: "Security clearance granted for vehicle KBZ 942X. Digital QR code ready for warehouse inspection.",
    icon: Truck,
  },
  {
    id: "notif-3",
    title: "RTGS Payment Remittance Cleared",
    desc: "KES 2,042,500 settled via Stanbic RTGS for Invoice INV-2026-0041.",
    time: "Yesterday",
    unread: false,
    category: "PAYMENT",
    referenceId: "REM-2026-8492",
    actionUrl: "/remittance",
    fullMessage: "Bank Reference: FT260519827361. KRA Withholding VAT Certificate WHT-2026-0412 has been auto-generated.",
    icon: Receipt,
  },
  {
    id: "notif-4",
    title: "Annual TCC Compliance Renewal Reminder",
    desc: "Tax Compliance Certificate expires in 28 days. Upload current KRA TCC to avoid bidding hold.",
    time: "2 days ago",
    unread: false,
    category: "KYC",
    referenceId: "KYC-TCC-2026",
    actionUrl: "/compliance",
    fullMessage: "Your organization Tax Compliance Certificate expires on 31-March-2026. Submit updated certificate via Compliance portal.",
    icon: ShieldAlert,
  },
];

export default function PortalNavbar({ onOpenMobile }: PortalNavbarProps) {
  const [selectedCurrency, setSelectedCurrency] = useState("KES");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeDetailNotif, setActiveDetailNotif] = useState<NotificationItem | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleOpenDetail = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
    );
    setActiveDetailNotif(notif);
    setIsNotifOpen(false);
  };

  return (
    <>
      <header className="h-14 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-3 shadow-2xs">
        {/* Left Side: Mobile Menu Trigger + Search Bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-lg">
          <button
            type="button"
            onClick={onOpenMobile}
            suppressHydrationWarning
            className="lg:hidden p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Quick Universal Procurement Search */}
          <div className="relative w-full max-w-sm hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search RFQs, LPOs, Delivery Notes, Invoices…"
              suppressHydrationWarning
              className="w-full pl-8 pr-3 h-8 rounded-lg border border-slate-200 bg-slate-50/60 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#32298A] outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Side: Currency Switcher & Notifications */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Currency Sub-Account Selector */}
          <div className="w-36 sm:w-44">
            <CustomSelect
              options={currencyAccounts}
              value={selectedCurrency}
              onChange={(val) => setSelectedCurrency(val)}
            />
          </div>

          {/* Notifications Bell Dropdown */}
          <div className="relative" ref={notifRef} suppressHydrationWarning>
            <button
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              suppressHydrationWarning
              className="relative p-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#32298A] text-white font-bold text-[10px] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in-50 duration-100">
                <div className="p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Procurement Notifications</h4>
                    <p className="text-xs text-slate-400">Live requisitions, gate passes &amp; payouts</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={handleMarkAllRead}
                        className="text-xs font-semibold text-[#32298A] hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                    <span className="text-[11px] font-semibold text-[#32298A] bg-white border border-slate-200 px-1.5 py-0.2 rounded">
                      {unreadCount} New
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                      <div
                        key={notif.id}
                        onClick={() => handleOpenDetail(notif)}
                        className={`p-3 flex items-start gap-2.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                          notif.unread ? "bg-slate-50/40" : ""
                        }`}
                        suppressHydrationWarning
                      >
                        <div className="w-6.5 h-6.5 rounded-md bg-slate-100 text-[#32298A] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">{notif.title}</p>
                            <span className="text-[11px] text-slate-400 whitespace-nowrap">{notif.time}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                            {notif.desc}
                          </p>
                          <span className="text-xs font-semibold text-[#32298A] mt-1 inline-flex items-center gap-0.5">
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
              className="bg-[#32298A] hover:bg-[#271f6f] text-white font-medium text-xs h-8 px-2.5 gap-1.5 rounded-lg shadow-none cursor-pointer"
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
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-5 space-y-3.5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#32298A] bg-slate-100 px-2 py-0.5 rounded uppercase">
                  {activeDetailNotif.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{activeDetailNotif.time}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailNotif(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">{activeDetailNotif.title}</h3>
              <p className="text-xs text-slate-500 font-mono">Reference: {activeDetailNotif.referenceId}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeDetailNotif.fullMessage || activeDetailNotif.desc}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setActiveDetailNotif(null)}
                className="text-xs font-semibold h-8"
              >
                Close
              </Button>
              {activeDetailNotif.actionUrl && (
                <Link href={activeDetailNotif.actionUrl}>
                  <Button
                    onClick={() => setActiveDetailNotif(null)}
                    className="bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-bold h-8 gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
