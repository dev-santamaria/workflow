"use client";

import { useState } from "react";
import { FlagIcon } from "@/components/ui/flag-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import {
  Building2,
  BadgeCheck,
  CheckCircle2,
  Landmark,
  ShieldCheck,
  Users,
  Plus,
  X,
  CreditCard,
  AlertCircle,
  Clock,
  Upload,
  Sparkles,
} from "lucide-react";

interface TeamUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  mfaEnabled: boolean;
}

interface SettlementAccount {
  id: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  accountName: string;
  currency: string;
  currencyLabel: string;
  swiftCode: string;
  status: "active" | "pending_approval";
  isPrimary: boolean;
}

const initialAccounts: SettlementAccount[] = [
  {
    id: "acc-1",
    bankName: "Standard Chartered Bank Kenya",
    branchName: "Chiromo Road Branch, Nairobi",
    accountNumber: "0102084920400",
    accountName: "Apex Industrial Polymers Ltd",
    currency: "KES",
    currencyLabel: "Kenya Shilling (KES)",
    swiftCode: "SCBLKENX",
    status: "active",
    isPrimary: true,
  },
  {
    id: "acc-2",
    bankName: "Standard Chartered Bank Kenya",
    branchName: "Chiromo Road Branch, Nairobi",
    accountNumber: "8702084920401",
    accountName: "Apex Industrial Polymers Ltd",
    currency: "USD",
    currencyLabel: "US Dollar (USD)",
    swiftCode: "SCBLKENX",
    status: "active",
    isPrimary: false,
  },
  {
    id: "acc-3",
    bankName: "Stanbic Bank Uganda Ltd",
    branchName: "Kampala Main Branch, 6th Street",
    accountNumber: "9030018492019",
    accountName: "Apex Industrial Polymers (Uganda Branch)",
    currency: "UGX",
    currencyLabel: "Uganda Shilling (UGX)",
    swiftCode: "SBICUGKX",
    status: "active",
    isPrimary: false,
  },
];

const initialTeam: TeamUser[] = [
  {
    id: "user-1",
    name: "Samuel Kariuki",
    email: "procurement@apexpolymers.co.ke",
    phone: "+254 712 345 678",
    role: "Commercial Director",
    mfaEnabled: true,
  },
  {
    id: "user-2",
    name: "Grace Wanjiku",
    email: "finance@apexpolymers.co.ke",
    phone: "+254 722 987 654",
    role: "Finance & Accounts Payable",
    mfaEnabled: true,
  },
];

const currencyOptions: CustomSelectOption[] = [
  { value: "KES", label: "KES · Kenya Shillings", sublabel: "For Crown Paints Kenya PLC & Chromex", flag: "KE" },
  { value: "USD", label: "USD · United States Dollar", sublabel: "For Foreign & International Wire Transfers" },
  { value: "UGX", label: "UGX · Uganda Shillings", sublabel: "For Regal Paints Uganda Ltd", flag: "UG" },
  { value: "TZS", label: "TZS · Tanzania Shillings", sublabel: "For Crown Paints Tanzania Ltd", flag: "TZ" },
  { value: "EUR", label: "EUR · Euro Currency", sublabel: "European Raw Material Supplies" },
];

export default function CompanyProfilePage() {
  const [activeTab, setActiveTab] = useState<"general" | "banking" | "signers">("general");
  
  // Banking state
  const [accounts, setAccounts] = useState<SettlementAccount[]>(initialAccounts);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [newBank, setNewBank] = useState({
    bankName: "",
    branchName: "",
    accountNumber: "",
    accountName: "Apex Industrial Polymers Ltd",
    currency: "KES",
    swiftCode: "",
  });
  const [bankSubmitting, setBankSubmitting] = useState(false);

  // Signers state
  const [team, setTeam] = useState<TeamUser[]>(initialTeam);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", role: "" });
  const [isSaved, setIsSaved] = useState(false);

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setBankSubmitting(true);
    setTimeout(() => {
      setBankSubmitting(false);
      const created: SettlementAccount = {
        id: `acc-${Date.now()}`,
        bankName: newBank.bankName || "NCBA Bank Kenya PLC",
        branchName: newBank.branchName || "Industrial Area Branch",
        accountNumber: newBank.accountNumber || "1002984920",
        accountName: newBank.accountName || "Apex Industrial Polymers Ltd",
        currency: newBank.currency,
        currencyLabel: `${newBank.currency} Settlement Account`,
        swiftCode: newBank.swiftCode || "NCBAKENX",
        status: "pending_approval",
        isPrimary: false,
      };
      setAccounts([...accounts, created]);
      setShowAddBankModal(false);
    }, 1100);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const created: TeamUser = {
      id: `user-${Date.now()}`,
      name: newUser.name || "Alex Mutua",
      email: newUser.email || "logistics@apexpolymers.co.ke",
      phone: newUser.phone || "+254 700 112 233",
      role: newUser.role || "Logistics & Dispatch Officer",
      mfaEnabled: true,
    };
    setTeam([...team, created]);
    setShowAddUserModal(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Company &amp; Supplier Master Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Registered corporate identity, payment settlement accounts (multi-currency rails), operating hubs, and authorized company signers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tier 1 Gold Pre-Qualified</span>
          </span>
        </div>
      </div>

      {/* Master Vendor Banner Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#32298A] flex items-center justify-center font-bold text-base flex-shrink-0">
              AIP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Apex Industrial Polymers Ltd
                </h2>
                <BadgeCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Vendor Master Code: <strong className="font-mono text-slate-700">VEND-KE-84920</strong> · Incorporated in Kenya (2020)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-md flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full Active Standing</span>
            </span>
          </div>
        </div>

        {/* 4 Classification Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-medium block text-[11px]">Classification:</span>
            <span className="font-semibold text-slate-900 text-xs">Local East Africa Supplier</span>
            <span className="text-[10px] text-slate-400 block">Kenya, Uganda &amp; Tanzania</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-medium block text-[11px]">Tax Identification (PIN):</span>
            <span className="font-semibold text-slate-900 text-xs font-mono">P051982736Z</span>
            <span className="text-[10px] text-emerald-700 font-medium block">TCC Active &amp; Verified</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-medium block text-[11px]">Supply Category:</span>
            <span className="font-semibold text-slate-900 text-xs">Resins, TiO2 &amp; Solvents</span>
            <span className="text-[10px] text-slate-400 block">Raw Materials Division</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-medium block text-[11px]">Relationship:</span>
            <span className="font-semibold text-[#32298A] text-xs">Framework Agreement Partner</span>
            <span className="text-[10px] text-slate-400 block">Active since 2022</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-1">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === "general"
              ? "bg-[#32298A] text-white"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Corporate Coordinates &amp; Hubs
        </button>

        <button
          onClick={() => setActiveTab("banking")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === "banking"
              ? "bg-[#32298A] text-white"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>Payment Methods &amp; Accounts ({accounts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("signers")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === "signers"
              ? "bg-[#32298A] text-white"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Authorized Signers ({team.length})</span>
        </button>
      </div>

      {/* TAB 1: General Corporate Details & Hubs */}
      {activeTab === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Coordinates (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Registered Corporate Coordinates</h3>
              <span className="text-[11px] text-slate-400">Head Office Coordinates</span>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="legalName" className="text-xs font-semibold text-slate-900">
                    Registered Legal Company Name
                  </Label>
                  <Input
                    id="legalName"
                    defaultValue="Apex Industrial Polymers Ltd"
                    className="h-9 text-xs border-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="tPin" className="text-xs font-semibold text-slate-900">
                    Tax PIN / TIN
                  </Label>
                  <Input
                    id="tPin"
                    defaultValue="P051982736Z"
                    disabled
                    className="h-9 text-xs bg-slate-50 border-slate-200 font-mono text-slate-500 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="regNo" className="text-xs font-semibold text-slate-900">
                    Registration No (CPR)
                  </Label>
                  <Input
                    id="regNo"
                    defaultValue="CPR/2020/89201"
                    disabled
                    className="h-9 text-xs bg-slate-50 border-slate-200 font-mono text-slate-500 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="physAddr" className="text-xs font-semibold text-slate-900">
                    Physical Office Address
                  </Label>
                  <Input
                    id="physAddr"
                    defaultValue="Plot 14B, Road C, Industrial Area, Nairobi, Kenya"
                    className="h-9 text-xs border-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="postAddr" className="text-xs font-semibold text-slate-900">
                    Postal Address
                  </Label>
                  <Input
                    id="postAddr"
                    defaultValue="P.O. Box 78491 - 00507, Nairobi, Kenya"
                    className="h-9 text-xs border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                {isSaved ? (
                  <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Company profile saved</span>
                  </span>
                ) : <div />}

                <Button
                  type="submit"
                  className="bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-medium h-9 px-4 rounded-lg cursor-pointer"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Operating Hubs (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Regional Operating Hubs</h3>
              <span className="text-[10px] font-medium text-slate-400 uppercase">4 Hubs Active</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FlagIcon country="KE" className="w-4 h-3 rounded-[1px]" />
                  <div>
                    <p className="font-semibold text-slate-900">Crown Paints Kenya PLC</p>
                    <p className="text-[10px] text-slate-400">Likoni Road Head Office, Nairobi</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                  Primary HQ
                </span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FlagIcon country="UG" className="w-4 h-3 rounded-[1px]" />
                  <div>
                    <p className="font-semibold text-slate-900">Regal Paints Uganda Ltd</p>
                    <p className="text-[10px] text-slate-400">6th Street Industrial Area, Kampala</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Active Sourcing
                </span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FlagIcon country="TZ" className="w-4 h-3 rounded-[1px]" />
                  <div>
                    <p className="font-semibold text-slate-900">Crown Paints Tanzania Ltd</p>
                    <p className="text-[10px] text-slate-400">Themi Industrial Area, Arusha</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Arusha Hub
                </span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FlagIcon country="CHROMEX" className="w-4 h-3 rounded-[1px]" />
                  <div>
                    <p className="font-semibold text-slate-900">Chromex Colourant Limited</p>
                    <p className="text-[10px] text-slate-400">Colorant Unit, Nairobi</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Colorant Unit
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Payment Methods & Settlement Accounts (Multi-Currency Rails) */}
      {activeTab === "banking" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Settlement Bank Accounts &amp; Payment Rails</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage your multi-currency accounts (KES, USD, UGX, TZS) for direct RTGS/EFT settlement disbursements.
                </p>
              </div>

              <Button
                onClick={() => setShowAddBankModal(true)}
                className="bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-semibold h-9 px-3.5 gap-1.5 rounded-lg cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Settlement Account</span>
              </Button>
            </div>

            {/* Warning Callout regarding approval requirement */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold text-amber-900">Settlement Rail Verification Policy</p>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  For anti-fraud compliance, updates to existing bank coordinates or newly added payment rails require <strong>Crown Paints Treasury &amp; Audit</strong> approval before funds can be disbursed to the new rail.
                </p>
              </div>
            </div>

            {/* Accounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#32298A] bg-slate-100 px-2 py-0.5 rounded">
                        {acc.currency} Account
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 pt-1">{acc.bankName}</h4>
                      <p className="text-[11px] text-slate-400">{acc.branchName}</p>
                    </div>

                    <div>
                      {acc.status === "active" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Approved Rail</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Under Review</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-mono space-y-1">
                    <div className="flex justify-between text-slate-500">
                      <span>Account Number:</span>
                      <span className="font-bold text-slate-900">{acc.accountNumber}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Beneficiary:</span>
                      <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[150px]">{acc.accountName}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>SWIFT / BIC:</span>
                      <span className="text-slate-700">{acc.swiftCode}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    {acc.isPrimary ? (
                      <span className="font-semibold text-slate-900 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Primary Default Rail</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setAccounts(
                            accounts.map((a) => ({
                              ...a,
                              isPrimary: a.id === acc.id,
                            }))
                          );
                        }}
                        className="text-[#32298A] hover:underline font-medium cursor-pointer"
                      >
                        Set as Default {acc.currency} Rail
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Authorized Company Signers */}
      {activeTab === "signers" && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Authorized Company Signers &amp; Users</h3>
              <p className="text-xs text-slate-400">Team members with delegated bidding and dispatch authority</p>
            </div>
            <Button
              size="sm"
              onClick={() => setShowAddUserModal(true)}
              className="h-8 text-xs font-medium bg-[#32298A] hover:bg-[#271f6f] text-white rounded-lg gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Signer</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{member.name}</span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                    2FA Enforced
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{member.role}</p>
                <p className="text-[11px] text-slate-400 font-mono">{member.email}</p>
                <p className="text-[11px] text-slate-400 font-mono">{member.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Settlement Account Modal */}
      {showAddBankModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#32298A]" />
                <h3 className="text-sm font-bold text-slate-900">Add Settlement Bank Rail</h3>
              </div>
              <button
                onClick={() => setShowAddBankModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-900">
                  Settlement Currency *
                </Label>
                <CustomSelect
                  options={currencyOptions}
                  value={newBank.currency}
                  onChange={(val) => setNewBank((p) => ({ ...p, currency: val }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="bName" className="text-xs font-semibold text-slate-900">
                    Bank Name *
                  </Label>
                  <Input
                    id="bName"
                    placeholder="e.g. NCBA Bank Kenya PLC / Stanbic Bank"
                    value={newBank.bankName}
                    onChange={(e) => setNewBank((p) => ({ ...p, bankName: e.target.value }))}
                    required
                    className="h-9 text-xs border-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="brName" className="text-xs font-semibold text-slate-900">
                    Branch Name &amp; Code *
                  </Label>
                  <Input
                    id="brName"
                    placeholder="e.g. Industrial Area Branch, Nairobi"
                    value={newBank.branchName}
                    onChange={(e) => setNewBank((p) => ({ ...p, branchName: e.target.value }))}
                    required
                    className="h-9 text-xs border-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="accNo" className="text-xs font-semibold text-slate-900">
                    Account Number *
                  </Label>
                  <Input
                    id="accNo"
                    placeholder="e.g. 100298492040"
                    value={newBank.accountNumber}
                    onChange={(e) => setNewBank((p) => ({ ...p, accountNumber: e.target.value }))}
                    required
                    className="h-9 text-xs font-mono border-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="swiftCode" className="text-xs font-semibold text-slate-900">
                    SWIFT / BIC Code *
                  </Label>
                  <Input
                    id="swiftCode"
                    placeholder="e.g. NCBAKENX"
                    value={newBank.swiftCode}
                    onChange={(e) => setNewBank((p) => ({ ...p, swiftCode: e.target.value.toUpperCase() }))}
                    required
                    className="h-9 text-xs font-mono uppercase border-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="accName" className="text-xs font-semibold text-slate-900">
                    Account Holder Legal Name *
                  </Label>
                  <Input
                    id="accName"
                    value={newBank.accountName}
                    onChange={(e) => setNewBank((p) => ({ ...p, accountName: e.target.value }))}
                    required
                    className="h-9 text-xs border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Document verification attachment */}
              <div className="space-y-1.5 pt-1">
                <Label className="text-xs font-semibold text-slate-900">
                  Attach Bank Reference Letter / Cancelled Cheque *
                </Label>
                <label className="border border-dashed border-slate-300 hover:border-slate-400 rounded-lg p-3 flex items-center justify-between text-xs text-slate-500 bg-slate-50 cursor-pointer">
                  <span className="truncate">Bank_Confirmation_Letter.pdf</span>
                  <Upload className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input type="file" accept=".pdf,image/*" className="hidden" />
                </label>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                <strong>Audit Note:</strong> Crown Paints Treasury will verify this account with the beneficiary bank within 1 business day before activating it as a disbursement rail.
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddBankModal(false)}
                  className="h-9 border-slate-200 text-slate-700 text-xs font-medium rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={bankSubmitting}
                  className="flex-1 h-9 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-medium rounded-lg cursor-pointer"
                >
                  {bankSubmitting ? "Submitting for Treasury Review…" : "Submit Rail for Approval"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Add Authorized User</h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="uName" className="text-xs font-semibold text-slate-900">
                  Full Name *
                </Label>
                <Input
                  id="uName"
                  placeholder="e.g. Alex Mutua"
                  value={newUser.name}
                  onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="h-9 text-xs border-slate-200 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="uEmail" className="text-xs font-semibold text-slate-900">
                  Corporate Email *
                </Label>
                <Input
                  id="uEmail"
                  type="email"
                  placeholder="e.g. alex.mutua@apexpolymers.co.ke"
                  value={newUser.email}
                  onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
                  required
                  className="h-9 text-xs border-slate-200 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="uPhone" className="text-xs font-semibold text-slate-900">
                  Phone Number *
                </Label>
                <Input
                  id="uPhone"
                  placeholder="+254 7XX XXX XXX"
                  value={newUser.phone}
                  onChange={(e) => setNewUser((p) => ({ ...p, phone: e.target.value }))}
                  required
                  className="h-9 text-xs border-slate-200 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="uRole" className="text-xs font-semibold text-slate-900">
                  Role / Title *
                </Label>
                <Input
                  id="uRole"
                  placeholder="e.g. Logistics & Dispatch Manager"
                  value={newUser.role}
                  onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))}
                  required
                  className="h-9 text-xs border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddUserModal(false)}
                  className="h-9 border-slate-200 text-slate-700 text-xs font-medium rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-9 bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-medium rounded-lg"
                >
                  Grant Portal Access
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
