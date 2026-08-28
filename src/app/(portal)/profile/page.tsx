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
    <div className="space-y-6" suppressHydrationWarning>
      {/* In-App Toast for MFA */}
      {mfaCodeSent && (
        <div className="fixed top-20 right-6 z-50 p-3.5 bg-slate-900 text-white rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-2 text-xs border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="font-semibold">MFA Re-Pairing Code Dispatched</p>
            <p className="text-[11px] text-slate-300">A secure pairing token was sent to <strong>{email}</strong>.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My User Profile &amp; Account Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Personal identity coordinates, login security, two-factor authentication, and email alert preferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#32298A]" />
            <span>Primary Account Holder</span>
          </span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Personal Profile & Notifications (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* User Profile Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-full bg-[#32298A] text-white flex items-center justify-center text-lg font-bold shadow-xs flex-shrink-0">
                SK
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-slate-900 truncate">{name}</h2>
                <p className="text-xs text-slate-500 font-medium">{title}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">Apex Industrial Polymers Ltd (VEND-KE-84920)</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4" suppressHydrationWarning>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="uName" className="text-xs font-semibold text-slate-900">
                    Full Legal Name *
                  </Label>
                  <Input
                    id="uName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-9 text-xs border-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="uTitle" className="text-xs font-semibold text-slate-900">
                    Job Title / Designation *
                  </Label>
                  <Input
                    id="uTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="h-9 text-xs border-slate-200 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="uEmail" className="text-xs font-semibold text-slate-900">
                    Work Email Address *
                  </Label>
                  <Input
                    id="uEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-9 text-xs border-slate-200 rounded-lg font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="uPhone" className="text-xs font-semibold text-slate-900">
                    Mobile Phone Number *
                  </Label>
                  <Input
                    id="uPhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="h-9 text-xs border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                {profileSaved ? (
                  <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Personal profile updated successfully</span>
                  </span>
                ) : <div />}

                <Button
                  type="submit"
                  className="bg-[#32298A] hover:bg-[#271f6f] text-white text-xs font-medium h-9 px-4 rounded-lg cursor-pointer"
                >
                  Save Profile Details
                </Button>
              </div>
            </form>
          </div>

          {/* Email Notification Alerts */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Bell className="w-4 h-4 text-[#32298A]" />
              <h3 className="text-sm font-semibold text-slate-900">Email Notification Preferences</h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyRfq}
                  onChange={(e) => setNotifyRfq(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#32298A]"
                />
                <div>
                  <span className="font-semibold text-slate-900 block">RFQ Requisitions Assigned to You</span>
                  <span className="text-[11px] text-slate-400">Receive instant email when Crown Paints assigns a quotation request.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyLpo}
                  onChange={(e) => setNotifyLpo(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#32298A]"
                />
                <div>
                  <span className="font-semibold text-slate-900 block">Approved Local Purchase Orders (LPO)</span>
                  <span className="text-[11px] text-slate-400">Get notified immediately when an official Purchase Order is issued.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyPayment}
                  onChange={(e) => setNotifyPayment(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#32298A]"
                />
                <div>
                  <span className="font-semibold text-slate-900 block">Remittance Payouts &amp; GRN Intake</span>
                  <span className="text-[11px] text-slate-400">Alerts when factory security generates GRN and RTGS wire is released.</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Security, Password & 2FA (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Two-Factor Authentication Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#32298A]" />
                <h3 className="text-sm font-semibold text-slate-900">2-Factor Authentication</h3>
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                Active &amp; Enforced
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Your account is secured via TOTP Authenticator (Google Authenticator / Microsoft Authenticator). A 6-digit one-time passcode is required on each login.
            </p>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Method:</span>
                <span className="font-semibold text-slate-900">Time-based OTP (TOTP)</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Paired Device:</span>
                <span className="font-semibold text-slate-900">Pixel / iPhone Authenticator</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRepairMfa}
              className="w-full h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              Re-Pair Authenticator App
            </Button>
          </div>

          {/* Change Password Card with in-app error feedback */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <KeyRound className="w-4 h-4 text-[#32298A]" />
              <h3 className="text-sm font-semibold text-slate-900">Change Account Password</h3>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-3" suppressHydrationWarning>
              <div className="space-y-1">
                <Label htmlFor="curPass" className="text-xs font-semibold text-slate-900">Current Password *</Label>
                <div className="relative">
                  <Input
                    id="curPass"
                    type={showCurrentPass ? "text" : "password"}
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    required
                    className="h-8 text-xs border-slate-200 pr-8 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="newP" className="text-xs font-semibold text-slate-900">New Password *</Label>
                <div className="relative">
                  <Input
                    id="newP"
                    type={showNewPass ? "text" : "password"}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                    className="h-8 text-xs border-slate-200 pr-8 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="confP" className="text-xs font-semibold text-slate-900">Confirm New Password *</Label>
                <Input
                  id="confP"
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                  className="h-8 text-xs border-slate-200 rounded-lg"
                />
              </div>

              {passError && (
                <p className="text-[11px] font-medium text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{passError}</span>
                </p>
              )}

              {passSaved && (
                <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Password updated successfully</span>
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-medium rounded-lg cursor-pointer"
              >
                Update Password
              </Button>
            </form>
          </div>

          {/* Active Session History */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <History className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-900">Active Login Sessions</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Chrome on Windows (Current)</p>
                  <p className="text-[10px] text-slate-400">Nairobi, Kenya · IP: 102.219.84.10</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Active Now
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
