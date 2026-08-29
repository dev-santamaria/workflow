"use client";

import { useState } from "react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalNavbar from "@/components/portal/PortalNavbar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans" suppressHydrationWarning>
      {/* Fixed Left Sidebar (w-60 on lg) */}
      <PortalSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Workspace Container occupying full width */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-60">
        {/* Sticky Topbar */}
        <PortalNavbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        {/* Dynamic Page Content with compact edge-to-edge layout */}
        <main className="flex-1 p-3 sm:p-4 lg:p-5 w-full min-w-0 space-y-4">
          {children}
        </main>

        {/* Compact Portal Footer */}
        <footer className="py-2.5 border-t border-slate-200/80 bg-white text-[11px] text-slate-400">
          <div className="px-4 sm:px-5 flex flex-col sm:flex-row items-center justify-between gap-1.5">
            <span>© 2026 Crown Paints East Africa PLC. Supplier E-Procurement Hub.</span>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
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
