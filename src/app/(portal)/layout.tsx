"use client";

import { useState } from "react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalNavbar from "@/components/portal/PortalNavbar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex text-slate-900" suppressHydrationWarning>
      {/* Fixed Left Sidebar (w-64) */}
      <PortalSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Workspace Container occupying full width */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Sticky Topbar */}
        <PortalNavbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        {/* Dynamic Page Content with edge-to-edge layout */}
        <main className="flex-1 p-5 sm:p-6 lg:p-7 w-full min-w-0">
          {children}
        </main>

        {/* Portal Footer */}
        <footer className="py-3.5 border-t border-slate-200/80 bg-white text-xs text-slate-400">
          <div className="px-5 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 Crown Paints East Africa PLC. Supplier E-Procurement Portal.</span>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
              <span>Likoni Rd Factory &amp; Regional Hubs</span>
              <span>·</span>
              <span>256-bit Encrypted</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
