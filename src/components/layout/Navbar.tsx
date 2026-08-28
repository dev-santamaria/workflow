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
          ? "border-b border-slate-200/90 shadow-xs"
          : "border-b border-slate-100"
      }`}
    >
      {/* Top universal East Africa notification ribbon with Hub Selector */}
      <div className="bg-[#32298A] text-white text-[11px] font-medium py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Regional Hub Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsHubOpen(!isHubOpen)}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-[11px]"
              >
                <FlagIcon country={selectedHub.code} className="w-3.5 h-2.5 rounded-[1px] shadow-2xs" />
                <span className="font-bold">{selectedHub.name}</span>
                <ChevronDown className="w-3 h-3 text-white/70" />
              </button>

              {isHubOpen && (
                <div className="absolute left-0 top-full mt-1 w-60 bg-white text-slate-800 rounded-lg shadow-lg border border-slate-200 py-1 z-50 text-xs">
                  {hubs.map((hub) => (
                    <button
                      key={hub.code}
                      onClick={() => {
                        setSelectedHub(hub);
                        setIsHubOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedHub.code === hub.code ? "bg-[#32298A]/08 text-[#32298A] font-bold" : ""
                      }`}
                    >
                      <FlagIcon country={hub.code} className="w-4 h-3 rounded-[1px] shadow-2xs flex-shrink-0" />
                      <div>
                        <p className="font-semibold leading-tight">{hub.name}</p>
                        <p className="text-[10px] text-slate-500">{hub.entity}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-white/40">|</span>
            <span className="text-white/90">Crown Paints East Africa · Kenya · Uganda · Tanzania</span>
          </div>

          <div className="flex items-center gap-4 text-white/80">
            <span>Call Centre: 0709 887 000 / +254-20 6533603-12</span>
            <span>·</span>
            <Link href="/privacy-policy" className="text-white hover:text-[#DCB353] transition-colors underline-offset-2 hover:underline">
              Privacy Notice
            </Link>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative h-12 w-36 sm:w-44 flex items-center">
              <Image
                src="/images/logo/logo.png"
                alt="Crown Paints Logo"
                width={176}
                height={48}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-12"
                priority
              />
            </div>
            <div className="hidden xl:block h-8 w-[1px] bg-slate-200" />
            <div className="hidden xl:flex flex-col">
              <span className="text-xs font-bold text-slate-800 tracking-tight">East Africa E-Procurement</span>
              <span className="text-[10px] text-slate-500 font-medium">Kenya · Uganda · Tanzania · Chromex</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-[#32298A] hover:bg-slate-50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login">
              <Button
                variant="ghost"
                size="sm"
                suppressHydrationWarning
                className="text-slate-700 hover:text-[#32298A] hover:bg-slate-100 font-semibold px-4 h-10 text-sm gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth/get-started">
              <Button
                size="sm"
                suppressHydrationWarning
                className="bg-[#32298A] hover:bg-[#261e6d] text-white font-semibold px-4 h-10 text-sm shadow-xs transition-all gap-1.5 cursor-pointer"
              >
                <span>Become a Supplier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 px-2 space-y-1 bg-white">
            {/* Mobile Hub Selector */}
            <div className="px-3 py-2 mb-2 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Regional Entity:</span>
              <div className="flex items-center gap-1.5 font-bold text-[#32298A]">
                <FlagIcon country={selectedHub.code} className="w-4 h-3 rounded-[1px] shadow-2xs" />
                <span>{selectedHub.name}</span>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#32298A] hover:bg-slate-50 rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link href="/auth/login" onClick={() => setIsMobileOpen(false)}>
                <Button variant="outline" className="w-full justify-center border-slate-200 text-slate-800">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/get-started" onClick={() => setIsMobileOpen(false)}>
                <Button className="w-full justify-center bg-[#32298A] hover:bg-[#261e6d] text-white">
                  Become a Supplier
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
