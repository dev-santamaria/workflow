"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { FlagIcon, CountryCode } from "./flag-icon";

export interface CustomSelectOption {
  value: string;
  label: string;
  sublabel?: string;
  flag?: CountryCode | string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface CustomSelectProps {
  id?: string;
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
  disabled?: boolean;
}

export function CustomSelect({
  id,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchable = false,
  className = "",
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto focus search input when opened
  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen, searchable]);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      opt.sublabel?.toLowerCase().includes(search.toLowerCase()) ||
      opt.value.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      id={id}
      ref={dropdownRef}
      className={`relative w-full ${className}`}
      suppressHydrationWarning
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full h-11 px-3.5 rounded-lg border text-left flex items-center justify-between gap-2.5 transition-all bg-white cursor-pointer ${
          isOpen
            ? "border-[#32298A] ring-2 ring-[#32298A]/10 shadow-xs"
            : "border-slate-200 hover:border-slate-300"
        } ${disabled ? "opacity-60 cursor-not-allowed bg-slate-50" : ""}`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {selectedOption?.flag && (
            <FlagIcon country={selectedOption.flag} className="w-5 h-3.5 rounded-[2px] shadow-2xs flex-shrink-0" />
          )}
          {selectedOption?.icon && !selectedOption.flag && (
            <selectedOption.icon className="w-4 h-4 text-[#32298A] flex-shrink-0" />
          )}
          <div className="flex items-center gap-2 truncate">
            <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            {selectedOption?.sublabel && (
              <span className="text-[11px] text-slate-400 font-normal truncate hidden sm:inline">
                ({selectedOption.sublabel})
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {selectedOption?.badge && (
            <span className="text-[10px] font-bold text-[#32298A] bg-[#32298A]/08 px-1.5 py-0.5 rounded">
              {selectedOption.badge}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#32298A]" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          {searchable && (
            <div className="p-2 border-b border-slate-100 sticky top-0 bg-white">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Filter options…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 focus:border-[#32298A] outline-none text-slate-800"
                />
              </div>
            </div>
          )}

          <div className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`px-3.5 py-2.5 mx-1 rounded-lg flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#32298A]/08 text-[#32298A] font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {opt.flag && (
                        <FlagIcon country={opt.flag} className="w-5 h-3.5 rounded-[2px] shadow-2xs flex-shrink-0" />
                      )}
                      {Icon && !opt.flag && (
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-[#32298A]" : "text-slate-500"}`} />
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold">{opt.label}</span>
                          {opt.badge && (
                            <span className="text-[10px] font-bold text-[#DCB353] bg-amber-50 border border-amber-200/60 px-1.5 py-0.2 rounded">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        {opt.sublabel && (
                          <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                            {opt.sublabel}
                          </p>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[#32298A] flex-shrink-0" />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-3 text-xs text-slate-400 text-center">
                No matching options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
