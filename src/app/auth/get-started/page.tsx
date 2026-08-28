"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import { FlagIcon } from "@/components/ui/flag-icon";
import {
  Building2,
  Globe2,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
  Coins,
  ShieldCheck,
  Clock,
  Mail,
  UserCheck,
  Sparkles,
  FileCheck,
  Lock,
  BadgeCheck,
  Receipt,
  Info,
} from "lucide-react";

const entityOptions: CustomSelectOption[] = [
  { value: "CP_KE", label: "Crown Paints Kenya PLC", sublabel: "Nairobi Head Office & Regional Hub", flag: "KE", badge: "Kenya HQ" },
  { value: "CP_UG", label: "Regal Paints Uganda Ltd", sublabel: "Kampala Industrial Area Hub", flag: "UG" },
  { value: "CP_TZ", label: "Crown Paints Tanzania Ltd", sublabel: "Arusha Operations Hub", flag: "TZ" },
  { value: "CHROMEX", label: "Chromex Colourant Limited", sublabel: "Specialized Colorant & Pigment Division", flag: "CHROMEX", badge: "Subsidiary" },
];

const availableCurrencies = [
  { code: "KES", name: "Kenya Shilling", symbol: "KSh", flag: "KE", description: "Standard settlement for Kenya operations" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "US", description: "Cross-border imports & international supply" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "EU", description: "European sourcing & industrial raw materials" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "GB", description: "UK & global supply agreements" },
  { code: "UGX", name: "Uganda Shilling", symbol: "USh", flag: "UG", description: "Direct Uganda localized settlement" },
  { code: "TZS", name: "Tanzania Shilling", symbol: "TSh", flag: "TZ", description: "Direct Tanzania localized settlement" },
];

const industryCategories: CustomSelectOption[] = [
  { value: "raw_materials", label: "Raw Materials, Resins & Solvents", sublabel: "Pigments, extenders, emulsions, chemical additives" },
  { value: "packaging", label: "Packaging Materials & Cans", sublabel: "Tinplate containers, plastic buckets, carton boxes, labels" },
  { value: "logistics", label: "Freight, Logistics & Transport", sublabel: "Haulage, warehousing, clearing & forwarding" },
  { value: "engineering", label: "Engineering, Spares & Machinery", sublabel: "Plant maintenance, valves, pumps, electrical equipment" },
  { value: "it_software", label: "IT, Hardware & Enterprise Software", sublabel: "Cloud solutions, computers, network infrastructure" },
  { value: "general", label: "General Goods, Safety Gear & Services", sublabel: "PPE equipment, uniforms, stationeries, facilities" },
];

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [supplierType, setSupplierType] = useState<"local" | "foreign">("local");
  const [relationshipStatus, setRelationshipStatus] = useState<"new" | "existing">("new");
  const [selectedEntity, setSelectedEntity] = useState("CP_KE");
  const [selectedCategory, setSelectedCategory] = useState("raw_materials");
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(["KES"]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [form, setForm] = useState({
    companyName: "",
    pinNumber: "",
    regNumber: "",
    existingVendorCode: "",
    physicalAddress: "",
    postalAddress: "",
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ phone?: string; password?: string; confirmPassword?: string; currency?: string }>({});

  const update = (key: string, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  // Strict Phone Validation & Character Limiting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^\d+ ]/g, "");
    if (raw.length > 16) raw = raw.slice(0, 16);
    update("phone", raw);
    if (raw.length > 0 && raw.length < 9) {
      setErrors((prev) => ({ ...prev, phone: "Please enter a valid phone number (min 9 digits)" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const toggleCurrency = (code: string) => {
    setSelectedCurrencies((prev) => {
      if (prev.includes(code)) {
        if (prev.length === 1) return prev; // Keep at least one currency
        return prev.filter((c) => c !== code);
      } else {
        return [...prev, code];
      }
    });
  };

  // Live Password Strength Calculations
  const passwordStrength = useMemo(() => {
    const p = form.password;
    let score = 0;
    if (p.length >= 8) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;
    return score;
  }, [form.password]);

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCurrencies.length === 0) {
      setErrors((prev) => ({ ...prev, currency: "Please select at least one operating currency." }));
      return;
    }
    setErrors((prev) => ({ ...prev, currency: undefined }));
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password.length < 8) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters long." }));
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 1400);
  };

  const activeEntityObj = entityOptions.find((e) => e.value === selectedEntity);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between" suppressHydrationWarning>
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="bg-white p-1.5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center">
              <Image
                src="/images/logo/logo.png"
                alt="Crown Paints Logo"
                width={190}
                height={52}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-11 sm:max-h-12"
                priority
              />
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-200" />
            <span className="hidden sm:block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Supplier Onboarding Portal
            </span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/"
              className="text-slate-600 hover:text-[#32298A] transition-colors"
            >
              ← Portal Home
            </Link>
            <Link
              href="/auth/login"
              className="text-slate-700 hover:text-[#32298A] flex items-center gap-1.5 transition-colors"
            >
              <span>Already registered? Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Registration Flow */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 py-8 lg:py-10">
        {isSuccess ? (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-7 sm:p-10 space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-[#DCB353]" />
                Registration Received &amp; Pending Verification
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Your Details Have Been Received!
              </h1>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Thank you for applying to register with <strong>{activeEntityObj?.label}</strong>.
                Your supplier profile and KYC documents are now undergoing formal compliance review.
              </p>
            </div>

            {/* Profile Summary Card */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 font-medium">Company Name:</span>
                  <p className="font-bold text-slate-800 text-sm">{form.companyName || "Your Organization"}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Target Entity:</span>
                  <div className="flex items-center gap-1.5 font-bold text-[#32298A] mt-0.5">
                    {activeEntityObj?.flag && (
                      <FlagIcon country={activeEntityObj.flag} className="w-4 h-3 rounded-[1px] shadow-2xs" />
                    )}
                    <span>{activeEntityObj?.label}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 font-medium">Authorized Login Email:</span>
                  <p className="font-semibold text-slate-800">{form.email || "email@company.com"}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Authorized Contact Person:</span>
                  <p className="font-semibold text-slate-800">{form.firstName} {form.lastName} ({form.designation || "Representative"})</p>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">Provisioned Currency Accounts:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCurrencies.map((curr) => {
                    const cObj = availableCurrencies.find((c) => c.code === curr);
                    return (
                      <span
                        key={curr}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 font-bold text-slate-800"
                      >
                        {cObj?.flag && <FlagIcon country={cObj.flag} className="w-4 h-3 rounded-[1px] shadow-2xs" />}
                        <span>{curr} Account</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Email notification notice */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 text-left flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#32298A] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-[#32298A]">What happens next?</p>
                <p className="text-slate-600 leading-relaxed">
                  Our procurement committee reviews supplier submissions within <strong>2 to 3 business days</strong>.
                  You will be automatically notified once approved via the email provided (<strong>{form.email}</strong>).
                  Upon approval, your login will be activated and you will be able to submit quotes for open tenders.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full h-11 border-slate-300 text-slate-700 text-xs font-semibold cursor-pointer">
                  Return to Home
                </Button>
              </Link>
              <Link href="/auth/login" className="w-full sm:w-auto">
                <Button className="w-full h-11 bg-[#32298A] hover:bg-[#261e6d] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs">
                  <span>Go to Login Screen</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Main Form (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step Progress Tracker */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === 1 ? "bg-[#32298A] text-white ring-4 ring-[#32298A]/10" : "bg-emerald-600 text-white"
                      }`}
                    >
                      {step === 1 ? "1" : <Check className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Step 1: Entity &amp; Currencies</p>
                      <p className="text-[11px] text-slate-500">Local/Foreign, Entity &amp; Multi-Currency</p>
                    </div>
                  </div>

                  <div className="h-px w-10 sm:w-28 bg-slate-200" />

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === 2 ? "bg-[#32298A] text-white ring-4 ring-[#32298A]/10" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      2
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Step 2: Company &amp; User</p>
                      <p className="text-[11px] text-slate-500">KYC PIN &amp; Sign-in credentials</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 1 Form */}
              {step === 1 && (
                <form onSubmit={handleStep1Continue} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                      Supplier Classification &amp; Regional Entity
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Select your incorporation classification, target Crown Paints entity, and required operating currencies.
                    </p>
                  </div>

                  {/* 1. Local vs Foreign Supplier */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      1. Supplier Classification *
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setSupplierType("local")}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          supplierType === "local"
                            ? "border-[#32298A] bg-[#32298A]/03"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            supplierType === "local" ? "bg-[#32298A] text-white" : "bg-slate-100 text-slate-600"
                          }`}>
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xs font-bold text-slate-900">Local East Africa Supplier</h3>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                supplierType === "local" ? "border-[#32298A] bg-[#32298A]" : "border-slate-300"
                              }`}>
                                {supplierType === "local" && <Check className="w-2.5 h-2.5 text-white" />}
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Incorporated within Kenya, Uganda, or Tanzania.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => setSupplierType("foreign")}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          supplierType === "foreign"
                            ? "border-[#32298A] bg-[#32298A]/03"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            supplierType === "foreign" ? "bg-[#32298A] text-white" : "bg-slate-100 text-slate-600"
                          }`}>
                            <Globe2 className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xs font-bold text-slate-900">Foreign / International Supplier</h3>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                supplierType === "foreign" ? "border-[#32298A] bg-[#32298A]" : "border-slate-300"
                              }`}>
                                {supplierType === "foreign" && <Check className="w-2.5 h-2.5 text-white" />}
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Cross-border manufacturers, global raw material &amp; machinery vendors.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Target Crown Paints Entity */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      2. Select Crown Paints Entity You Are Registering For *
                    </Label>
                    <CustomSelect
                      options={entityOptions}
                      value={selectedEntity}
                      onChange={(val) => setSelectedEntity(val)}
                    />
                  </div>

                  {/* 3. New vs Existing Supplier Relationship */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      3. Supplier Relationship Status with Crown Paints *
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setRelationshipStatus("new")}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                          relationshipStatus === "new"
                            ? "border-[#32298A] bg-[#32298A]/03"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#DCB353]" />
                            <span className="text-xs font-bold text-slate-900">New Supplier</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            relationshipStatus === "new" ? "border-[#32298A] bg-[#32298A]" : "border-slate-300"
                          }`}>
                            {relationshipStatus === "new" && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          First time onboarding and seeking procurement pre-qualification.
                        </p>
                      </div>

                      <div
                        onClick={() => setRelationshipStatus("existing")}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                          relationshipStatus === "existing"
                            ? "border-[#32298A] bg-[#32298A]/03"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-bold text-slate-900">Existing Supplier</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            relationshipStatus === "existing" ? "border-[#32298A] bg-[#32298A]" : "border-slate-300"
                          }`}>
                            {relationshipStatus === "existing" && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Already doing business with Crown Paints, transitioning to portal.
                        </p>
                      </div>
                    </div>

                    {relationshipStatus === "existing" && (
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 animate-in fade-in duration-200">
                        <Label htmlFor="existingVendorCode" className="text-xs font-bold text-slate-800">
                          Existing Crown Paints Vendor / Account Number (If Known)
                        </Label>
                        <Input
                          id="existingVendorCode"
                          placeholder="e.g. VEND-KE-84920"
                          value={form.existingVendorCode}
                          onChange={(e) => update("existingVendorCode", e.target.value)}
                          className="h-10 mt-1 border-slate-200 text-sm bg-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* 4. Multi-Currency Selection */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-[#DCB353]" />
                        <span>4. Select Operating Currencies (Multi-Currency Allowed) *</span>
                      </Label>
                      <span className="text-[11px] font-bold text-[#32298A]">
                        {selectedCurrencies.length} Selected
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950">
                      <p className="font-semibold flex items-center gap-1.5 text-amber-900">
                        <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                        <span>Multi-Currency Rule:</span>
                      </p>
                      <p className="text-slate-700 mt-0.5 leading-relaxed pl-5">
                        You can select multiple currencies (e.g. <strong>KES and USD</strong>). Dedicated currency sub-accounts will be automatically created under your master profile to ensure segregated PO billing and compliance.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {availableCurrencies.map((curr) => {
                        const isChecked = selectedCurrencies.includes(curr.code);
                        return (
                          <div
                            key={curr.code}
                            onClick={() => toggleCurrency(curr.code)}
                            className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                              isChecked
                                ? "border-[#32298A] bg-[#32298A]/06 shadow-2xs"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <FlagIcon country={curr.flag} className="w-5 h-3.5 rounded-[2px] shadow-2xs flex-shrink-0" />
                              <div className="truncate">
                                <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                                  <span>{curr.code}</span>
                                  <span className="text-slate-400 font-normal">({curr.symbol})</span>
                                </p>
                                <p className="text-[10px] text-slate-500 truncate">{curr.description}</p>
                              </div>
                            </div>

                            <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                              isChecked ? "border-[#32298A] bg-[#32298A]" : "border-slate-300"
                            }`}>
                              {isChecked && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.currency && (
                      <p className="text-xs text-red-600 font-medium">{errors.currency}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    suppressHydrationWarning
                    className="w-full h-11 bg-[#32298A] hover:bg-[#261e6d] text-white font-bold text-sm shadow-xs gap-2 cursor-pointer"
                  >
                    <span>Continue to Step 2 (Company Details &amp; Account)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              )}

              {/* Step 2 Form */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-black text-slate-900">
                        Company Details &amp; Primary Login
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Registering for: <strong className="text-[#32298A]">{activeEntityObj?.label}</strong> ({supplierType === "local" ? "Local" : "Foreign"})
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-500 hover:text-[#32298A] font-semibold cursor-pointer"
                    >
                      ← Edit Classification
                    </button>
                  </div>

                  {/* Section A: Company Information */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-100">
                      A. Registered Company Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="companyName" className="text-xs font-bold text-slate-800">
                          Registered Company Name (as per Certificate of Incorporation) *
                        </Label>
                        <Input
                          id="companyName"
                          placeholder="e.g. Apex Industrial Polymers Ltd"
                          value={form.companyName}
                          onChange={(e) => update("companyName", e.target.value)}
                          required
                          suppressHydrationWarning
                          className="h-10 border-slate-200 text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="pinNumber" className="text-xs font-bold text-slate-800">
                          Tax Identification / PIN / TIN *
                        </Label>
                        <Input
                          id="pinNumber"
                          placeholder="e.g. P051982736Z"
                          value={form.pinNumber}
                          onChange={(e) => update("pinNumber", e.target.value.toUpperCase())}
                          required
                          maxLength={15}
                          suppressHydrationWarning
                          className="h-10 border-slate-200 text-sm uppercase"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="regNumber" className="text-xs font-bold text-slate-800">
                          Certificate of Incorporation / Reg No. *
                        </Label>
                        <Input
                          id="regNumber"
                          placeholder="e.g. CPR/2020/89201"
                          value={form.regNumber}
                          onChange={(e) => update("regNumber", e.target.value)}
                          required
                          maxLength={20}
                          suppressHydrationWarning
                          className="h-10 border-slate-200 text-sm"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <Label className="text-xs font-bold text-slate-800">
                          Primary Supply Industry / Category *
                        </Label>
                        <CustomSelect
                          options={industryCategories}
                          value={selectedCategory}
                          onChange={(val) => setSelectedCategory(val)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="physicalAddress" className="text-xs font-bold text-slate-800">
                          Physical Office Address *
                        </Label>
                        <Input
                          id="physicalAddress"
                          placeholder="e.g. Industrial Area, Road C"
                          value={form.physicalAddress}
                          onChange={(e) => update("physicalAddress", e.target.value)}
                          required
                          suppressHydrationWarning
                          className="h-10 border-slate-200 text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="postalAddress" className="text-xs font-bold text-slate-800">
                          Postal Address &amp; Town/City *
                        </Label>
                        <Input
                          id="postalAddress"
                          placeholder="e.g. P.O. Box 12345 Nairobi / Kampala / Arusha"
                          value={form.postalAddress}
                          onChange={(e) => update("postalAddress", e.target.value)}
                          required
                          suppressHydrationWarning
                          className="h-10 border-slate-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section B: Authorized Sign-in User Account Details */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-100">
                      B. Primary Authorized Login Account Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName" className="text-xs font-bold text-slate-800">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="e.g. Samuel"
                          value={form.firstName}
                          onChange={(e) => update("firstName", e.target.value)}
                          required
                          maxLength={30}
                          suppressHydrationWarning
                          className="h-10 border-slate-200 text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="lastName" className="text-xs font-bold text-slate-800">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="e.g. Kariuki"
                          value={form.lastName}
                          onChange={(e) => update("lastName", e.target.value)}
                          required
                          maxLength={30}
                          suppressHydrationWarning
                          className="h-10 border-slate-200 text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="designation" className="text-xs font-bold text-slate-800">
                          Job Title / Designation *
                        </Label>
                        <Input
                          id="designation"
                          placeholder="e.g. Commercial Director / Key Account Manager"
                          value={form.designation}
                          onChange={(e) => update("designation", e.target.value)}
                          required
                          maxLength={40}
                          suppressHydrationWarning
                          className="h-10 border-slate-200 text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-bold text-slate-800">
                          Official Telephone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+254 7XX XXX XXX"
                          value={form.phone}
                          onChange={handlePhoneChange}
                          required
                          maxLength={16}
                          suppressHydrationWarning
                          className={`h-10 border-slate-200 text-sm ${errors.phone ? "border-red-500" : ""}`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-red-600">{errors.phone}</p>
                        )}
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="email" className="text-xs font-bold text-slate-800">
                          Official Corporate Email (used to sign in to the portal) *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="procurement@company.co.ke"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          required
                          suppressHydrationWarning
                          className="h-10 border-slate-200 text-sm"
                        />
                      </div>

                      {/* Password with live strength bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-xs font-bold text-slate-800">
                            Create Password (min 8 chars) *
                          </Label>
                          {form.password && (
                            <span className={`text-[10px] font-bold ${
                              passwordStrength <= 2 ? "text-amber-600" : "text-emerald-600"
                            }`}>
                              {passwordStrength <= 1 ? "Weak" : passwordStrength <= 3 ? "Good" : "Strong"}
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            value={form.password}
                            onChange={(e) => update("password", e.target.value)}
                            required
                            maxLength={32}
                            suppressHydrationWarning
                            className={`pr-10 h-10 border-slate-200 text-sm ${errors.password ? "border-red-500" : ""}`}
                          />
                          <button
                            type="button"
                            suppressHydrationWarning
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {/* Live Strength Bars */}
                        {form.password && (
                          <div className="grid grid-cols-4 gap-1 pt-1">
                            {[1, 2, 3, 4].map((bar) => (
                              <div
                                key={bar}
                                className={`h-1 rounded-full transition-all ${
                                  bar <= passwordStrength
                                    ? passwordStrength <= 2
                                      ? "bg-amber-500"
                                      : "bg-emerald-500"
                                    : "bg-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        {errors.password && (
                          <p className="text-[11px] text-red-600">{errors.password}</p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-1.5">
                        <Label htmlFor="confirmPassword" className="text-xs font-bold text-slate-800">
                          Confirm Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••••••"
                            value={form.confirmPassword}
                            onChange={(e) => update("confirmPassword", e.target.value)}
                            required
                            maxLength={32}
                            suppressHydrationWarning
                            className={`pr-10 h-10 border-slate-200 text-sm ${errors.confirmPassword ? "border-red-500" : ""}`}
                          />
                          <button
                            type="button"
                            suppressHydrationWarning
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-[11px] text-red-600">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 leading-relaxed pt-2">
                    By submitting this application, you verify that the information provided is accurate and agree to Crown Paints East Africa&apos;s{" "}
                    <Link href="/privacy-policy" className="text-[#32298A] underline">
                      Privacy Policy &amp; Supplier Code of Conduct
                    </Link>.
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="h-11 border-slate-300 text-slate-700 text-sm font-semibold cursor-pointer"
                    >
                      Back to Step 1
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      suppressHydrationWarning
                      className="flex-1 h-11 bg-[#32298A] hover:bg-[#261e6d] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          <span>Submitting Application for Review…</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Registration for Review</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Sidebar: KYC Document Checklist & Readiness Guide (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Summary Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <BadgeCheck className="w-5 h-5 text-[#32298A]" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Onboarding Summary
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Selected Entity:</span>
                    <div className="flex items-center gap-1.5 font-bold text-[#32298A] mt-0.5">
                      {activeEntityObj?.flag && (
                        <FlagIcon country={activeEntityObj.flag} className="w-4 h-3 rounded-[1px] shadow-2xs" />
                      )}
                      <span>{activeEntityObj?.label}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Provisioned Currencies ({selectedCurrencies.length}):</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCurrencies.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono font-bold text-[10px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Classification:</span>
                    <span className="font-semibold text-slate-800">
                      {supplierType === "local" ? "Local East Africa Vendor" : "Foreign / Cross-Border Vendor"}
                    </span>
                  </div>
                </div>
              </div>

              {/* KYC Document Checklist */}
              <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-3.5 shadow-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <FileCheck className="w-4 h-4 text-[#DCB353]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    KYC Documents Checklist
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Have digital copies of the following ready for post-registration compliance upload:
                </p>

                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Certificate of Incorporation / Reg</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Valid Tax Compliance (TCC / TIN)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>CR12 / Official List of Directors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Bank Reference / Cancelled Cheque</span>
                  </li>
                </ul>
              </div>

              {/* Help Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Info className="w-4 h-4 text-[#32298A]" />
                  <span>Need Help Registering?</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Our regional procurement desk is here to help. Call: <a href="tel:0709887000" className="text-[#32298A] font-bold underline">0709 887 000</a>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-200 text-center text-xs text-slate-400 bg-white">
        © 2026 Crown Paints East Africa. All rights reserved.
      </footer>
    </div>
  );
}
