"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  ShieldCheck,
  KeyRound,
  Smartphone,
  History,
  CheckCircle2,
  Bell,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

export default function UserProfilePage() {
  const [name, setName] = useState("Samuel Kariuki");
  const [email, setEmail] = useState("procurement@apexpolymers.co.ke");
  const [phone, setPhone] = useState("+254 712 345 678");
  const [title, setTitle] = useState("Commercial & Sourcing Director");

  // Password Change
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passSaved, setPassSaved] = useState(false);
  const [passError, setPassError] = useState("");

  // Notifications
  const [notifyRfq, setNotifyRfq] = useState(true);
  const [notifyLpo, setNotifyLpo] = useState(true);
  const [notifyPayment, setNotifyPayment] = useState(true);
  const [profileSaved, setProfileSaved] = useState(false);

  // In-App Toast States
  const [mfaCodeSent, setMfaCodeSent] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    if (newPass !== confirmPass) {
      setPassError("New password and confirmation do not match.");
      return;
    }
    if (newPass.length < 8) {
      setPassError("Password must be at least 8 characters long.");
      return;
    }
    setPassSaved(true);
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setTimeout(() => setPassSaved(false), 2500);
  };

  const handleRepairMfa = () => {
    setMfaCodeSent(true);
    setTimeout(() => setMfaCodeSent(false), 4000);
  };

  return (
    <div className="space-y-3.5" suppressHydrationWarning>
      {/* In-App Toast for MFA */}
      {mfaCodeSent && (
        <div className="fixed top-16 right-5 z-50 p-3 bg-slate-900 text-white rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top-2 text-xs border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="font-semibold">MFA Re-Pairing Code Dispatched</p>
            <p className="text-[10px] text-slate-300">A secure token was sent to <strong>{email}</strong>.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            My User Profile &amp; Account Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Personal identity coordinates, login security, two-factor authentication, and alert preferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#32298A]" />
            <span>Primary Account Holder</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* Left Column: Personal Profile & Passwords (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          {/* Card 1: Personal Details */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#32298A]" />
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900">Personal Information</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">User ID: USR-84920</span>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="pName" className="text-xs font-semibold text-slate-900">Full Name *</Label>
                  <Input
                    id="pName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-8 text-xs border-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pEmail" className="text-xs font-semibold text-slate-900">Email Address (Login) *</Label>
                  <Input
                    id="pEmail"
                    value={email}
                    disabled
                    className="h-8 text-xs bg-slate-50 border-slate-200 font-mono text-slate-500 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pPhone" className="text-xs font-semibold text-slate-900">Phone Number *</Label>
                  <Input
                    id="pPhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="h-8 text-xs border-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="pTitle" className="text-xs font-semibold text-slate-900">Designation / Role</Label>
                  <Input
                    id="pTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-8 text-xs border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                {profileSaved ? (
                  <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Profile saved</span>
                  </span>
                ) : <div />}

                <Button
                  type="submit"
                  className="bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-medium h-8 px-3.5 rounded-lg cursor-pointer"
                >
                  Save Profile
                </Button>
              </div>
            </form>
          </div>

          {/* Card 2: Security & Password */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#32298A]" />
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900">Security &amp; Password</h3>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                Strong Security
              </span>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-2.5">
              {passError && (
                <p className="text-[11px] text-red-600 font-medium">{passError}</p>
              )}

              <div className="space-y-1">
                <Label htmlFor="curPass" className="text-xs font-semibold text-slate-900">Current Password</Label>
                <div className="relative">
                  <Input
                    id="curPass"
                    type={showCurrentPass ? "text" : "password"}
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    required
                    className="h-8 text-xs pr-8 border-slate-200 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <Label htmlFor="nPass" className="text-xs font-semibold text-slate-900">New Password</Label>
                  <div className="relative">
                    <Input
                      id="nPass"
                      type={showNewPass ? "text" : "password"}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                      className="h-8 text-xs pr-8 border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="cPass" className="text-xs font-semibold text-slate-900">Confirm Password</Label>
                  <Input
                    id="cPass"
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                    className="h-8 text-xs border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                {passSaved ? (
                  <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Password updated</span>
                  </span>
                ) : <div />}

                <Button
                  type="submit"
                  className="bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-medium h-8 px-3.5 rounded-lg cursor-pointer"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: 2FA & Notification Preferences (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* 2FA Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#32298A]" />
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900">2-Factor Authentication</h3>
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/80">
                Active &amp; Enforced
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              SMS OTP / Authenticator App is enforced for all supplier actions involving price confirmations and payment rail changes.
            </p>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Method:</span>
                <span className="font-semibold text-slate-900">SMS OTP (+254 712 *** 678)</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Last Verification:</span>
                <span className="font-mono text-slate-700">Today · 08:30 AM</span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              onClick={handleRepairMfa}
              className="w-full h-8 text-xs border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              Re-Pair 2FA Device / Phone Number
            </Button>
          </div>

          {/* Email Notification Channels */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#32298A]" />
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900">Email Alerts</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Real-time alerts</span>
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyRfq}
                  onChange={(e) => setNotifyRfq(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#32298A] mt-0.5"
                />
                <div>
                  <p className="font-semibold text-slate-900 text-xs">New RFQ &amp; Requisition Allocations</p>
                  <p className="text-[10px] text-slate-400">Receive immediate notification when Crown Paints publishes an RFQ.</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyLpo}
                  onChange={(e) => setNotifyLpo(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#32298A] mt-0.5"
                />
                <div>
                  <p className="font-semibold text-slate-900 text-xs">Purchase Order (LPO) Issuance</p>
                  <p className="text-[10px] text-slate-400">Get notified when an authorized LPO is signed by Procurement.</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyPayment}
                  onChange={(e) => setNotifyPayment(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#32298A] mt-0.5"
                />
                <div>
                  <p className="font-semibold text-slate-900 text-xs">Bank Wire Remittance Advice</p>
                  <p className="text-[10px] text-slate-400">Instant notification when RTGS payment is disbursed with WHT certificate.</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
