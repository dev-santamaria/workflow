"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileSpreadsheet,
  ShoppingCart,
  Truck,
  Receipt,
  Landmark,
  ShieldCheck,
  Building2,
  User,
  LogOut,
  X,
  ExternalLink,
  HelpCircle,
  BadgeCheck,
  FileText,
  Inbox,
} from "lucide-react";

interface PortalSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems = [
  {
    name: "Overview",
    href: "/overview",
    icon: LayoutDashboard,
  },
  {
    name: "Tenders & RFQs",
    href: "/rfqs",
    icon: FileSpreadsheet,
    badge: "3 Open",
  },
  {
    name: "Purchase Orders",
    href: "/lpos",
    icon: ShoppingCart,
    badge: "1 Pending",
  },
  {
    name: "Delivery Notes",
    href: "/delivery-notes",
    icon: Truck,
  },
  {
    name: "Invoicing",
    href: "/invoicing",
    icon: Receipt,
  },
  {
    name: "Statements",
    href: "/statements",
    icon: FileText,
  },
  {
    name: "Inbox",
    href: "/inbox",
    icon: Inbox,
    badge: "2 New",
  },
  {
    name: "Remittance",
    href: "/remittance",
    icon: Landmark,
  },
  {
    name: "Compliance / KYC",
    href: "/compliance",
    icon: ShieldCheck,
  },
  {
    name: "Company Profile",
    href: "/company-profile",
    icon: Building2,
  },
];

export default function PortalSidebar({
  mobileOpen,
  onCloseMobile,
}: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Branding Section */}
        <div>
          {/* Logo Area */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-slate-100 bg-white">
            <Link href="/overview" className="flex items-center gap-2.5">
              <Image
                src="/images/logo/logo.png"
                alt="Crown Paints Logo"
                width={120}
                height={30}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-7"
                priority
              />
              <div className="flex flex-col border-l border-slate-200 pl-2">
                <span className="text-[11px] font-bold text-[#32298A] tracking-wider uppercase">Supplier</span>
                <span className="text-[10px] text-slate-400 font-medium leading-none">Portal</span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onCloseMobile}
              suppressHydrationWarning
              className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Clean Static Vendor Info */}
          <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    Apex Industrial Polymers
                  </h4>
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-400">
                  <span className="font-mono text-slate-600">VEND-KE-84920</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-190px)]">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/overview" && pathname.startsWith(item.href));

              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? "bg-[#32298A] text-white font-semibold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  suppressHydrationWarning
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
                    <span className="truncate text-xs">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-700 border border-slate-200/80"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Footer */}
        <div className="p-2.5 border-t border-slate-100 bg-white space-y-1.5">
          <Link
            href="/contact"
            className="flex items-center justify-between px-2 text-xs text-slate-500 hover:text-slate-900 font-medium"
            suppressHydrationWarning
          >
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Helpdesk</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">0709 887 000</span>
          </Link>

          <div className="pt-1.5 border-t border-slate-100 px-1.5 flex items-center justify-between">
            <Link href="/profile" className="flex items-center gap-2 min-w-0 group">
              <div className="w-6.5 h-6.5 rounded-full bg-slate-100 border border-slate-200 text-[#32298A] font-bold text-[11px] flex items-center justify-center flex-shrink-0 group-hover:border-[#32298A]">
                SK
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate group-hover:text-[#32298A]">Samuel Kariuki</p>
                <p className="text-[10px] text-slate-400 truncate">Settings</p>
              </div>
            </Link>

            <Link
              href="/auth/login"
              title="Sign Out"
              className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
