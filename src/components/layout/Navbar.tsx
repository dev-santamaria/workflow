"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Menu, X, ArrowRight, Lock, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Overview", href: "/#overview" },
  { label: "Supplier Benefits", href: "/#benefits" },
  { label: "Requirements", href: "/#currency-notice" },
  { label: "Statements", href: "/statements" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

const hubs = [
  { code: "KE", name: "Kenya (HQ)", entity: "Crown Paints Kenya PLC - Nairobi" },
  { code: "UG", name: "Uganda", entity: "Regal Paints Uganda - Kampala" },
  { code: "TZ", name: "Tanzania", entity: "Crown Paints Tanzania - Arusha" },
  { code: "CHROMEX", name: "Chromex", entity: "Chromex Colourant Limited" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedHub, setSelectedHub] = useState(hubs[0]);
  const [isHubOpen, setIsHubOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 bg-white ${
        isScrolled
          ? "border-b border-slate-200/90 shadow-2xs"
          : "border-b border-slate-100"
      }`}
      suppressHydrationWarning
    >
      {/* Top universal East Africa notification ribbon with Hub Selector */}
      <div className="bg-[#32298A] text-white text-[10px] font-medium py-1 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Regional Hub Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsHubOpen(!isHubOpen)}
                className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-[10px]"
              >
                <FlagIcon country={selectedHub.code} className="w-3 h-2 rounded-[1px] shadow-2xs" />
                <span className="font-bold">{selectedHub.name}</span>
                <ChevronDown className="w-2.5 h-2.5 text-white/70" />
              </button>

              {isHubOpen && (
                <div className="absolute left-0 top-full mt-1 w-56 bg-white text-slate-800 rounded-lg shadow-lg border border-slate-200 py-1 z-50 text-xs">
                  {hubs.map((hub) => (
                    <button
                      key={hub.code}
                      onClick={() => {
                        setSelectedHub(hub);
                        setIsHubOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedHub.code === hub.code ? "bg-[#32298A]/08 text-[#32298A] font-bold" : ""
                      }`}
                    >
                      <FlagIcon country={hub.code} className="w-3.5 h-2.5 rounded-[1px] shadow-2xs flex-shrink-0" />
                      <div>
                        <p className="font-semibold leading-tight text-xs">{hub.name}</p>
                        <p className="text-[9px] text-slate-500">{hub.entity}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-white/40">|</span>
            <span className="text-white/90">Crown Paints East Africa · Kenya · Uganda · Tanzania</span>
          </div>

          <div className="flex items-center gap-3 text-white/80">
            <span>0709 887 000</span>
            <span>·</span>
            <Link href="/privacy-policy" className="text-white hover:text-[#DCB353] transition-colors">
              Privacy Notice
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-14">
          {/* Logo with official Crown Paints branding */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo/logo.png"
              alt="Crown Paints Logo"
              width={125}
              height={32}
              style={{ width: "auto", height: "auto" }}
              className="object-contain max-h-7 sm:max-h-8"
              priority
            />
            <div className="hidden sm:flex flex-col border-l border-slate-200 pl-2">
              <span className="text-[10px] font-bold text-[#32298A] tracking-wider uppercase">Supplier</span>
              <span className="text-[9px] text-slate-400 font-medium leading-none">Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-slate-600 hover:text-[#32298A] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/auth/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-700 hover:text-[#32298A] hover:bg-slate-50 font-semibold text-xs h-8 px-3 cursor-pointer"
              >
                <Lock className="w-3 h-3 mr-1 text-slate-400" />
                <span>Sign In</span>
              </Button>
            </Link>

            <Link href="/overview">
              <Button
                size="sm"
                className="bg-[#32298A] hover:bg-[#261e6d] text-white font-semibold text-xs h-8 px-3.5 shadow-2xs gap-1.5 cursor-pointer rounded-lg"
              >
                <span>Supplier Portal</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/auth/login">
              <Button size="sm" variant="ghost" className="text-xs font-semibold px-2 h-7.5">
                Sign In
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2 text-xs">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
            <Link href="/auth/login" onClick={() => setIsMobileOpen(false)}>
              <Button variant="outline" className="w-full h-8 text-xs font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/overview" onClick={() => setIsMobileOpen(false)}>
              <Button className="w-full h-8 bg-[#32298A] text-white text-xs font-semibold">
                Go to Supplier Portal
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
