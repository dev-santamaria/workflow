"use client";

import { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
  parseISO,
  isValid,
} from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

interface CustomDatePickerProps {
  value: string; // ISO format: YYYY-MM-DD
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  minDate?: string;
  disabled?: boolean;
  className?: string;
}

export function CustomDatePicker({
  value,
  onChange,
  label,
  placeholder = "Select date",
  minDate,
  disabled = false,
  className = "",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value or fallback to today
  const selectedDate = value && isValid(new Date(value)) ? parseISO(value) : null;
  const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate || new Date());

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectDay = (day: Date) => {
    const formatted = format(day, "yyyy-MM-dd");
    onChange(formatted);
    setIsOpen(false);
  };

  const handlePreset = (daysToAdd: number) => {
    const target = addDays(new Date(), daysToAdd);
    const formatted = format(target, "yyyy-MM-dd");
    setCurrentMonth(target);
    onChange(formatted);
    setIsOpen(false);
  };

  // Calendar matrix calculation
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className={`relative ${className}`} ref={containerRef} suppressHydrationWarning>
      {label && (
        <label className="block text-xs font-semibold text-slate-900 mb-1">
          {label}
        </label>
      )}

      {/* Input Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        suppressHydrationWarning
        className={`w-full flex items-center justify-between px-3 h-9 bg-white border rounded-lg text-xs transition-all ${
          isOpen
            ? "border-[#32298A] ring-1 ring-[#32298A]/20"
            : "border-slate-200 hover:border-slate-300"
        } ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : "cursor-pointer"}`}
      >
        <div className="flex items-center gap-2 text-slate-800">
          <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
          <span className={selectedDate ? "font-medium text-slate-900" : "text-slate-400"}>
            {selectedDate ? format(selectedDate, "MMM dd, yyyy") : placeholder}
          </span>
        </div>
        {selectedDate && !disabled && (
          <span className="text-[10px] text-slate-400 font-mono">
            {format(selectedDate, "yyyy-MM-dd")}
          </span>
        )}
      </button>

      {/* Calendar Popover */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 z-50 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-3.5 animate-in fade-in-50 duration-100">
          {/* Quick Presets */}
          <div className="flex items-center justify-between gap-1 pb-2.5 mb-2.5 border-b border-slate-100">
            <button
              type="button"
              onClick={() => handlePreset(0)}
              className="text-[10px] font-medium text-slate-600 hover:text-[#32298A] hover:bg-slate-50 px-2 py-1 rounded"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handlePreset(7)}
              className="text-[10px] font-medium text-slate-600 hover:text-[#32298A] hover:bg-slate-50 px-2 py-1 rounded"
            >
              +7 Days
            </button>
            <button
              type="button"
              onClick={() => handlePreset(30)}
              className="text-[10px] font-medium text-slate-600 hover:text-[#32298A] hover:bg-slate-50 px-2 py-1 rounded"
            >
              +30 Days
            </button>
            <button
              type="button"
              onClick={() => handlePreset(180)}
              className="text-[10px] font-medium text-slate-600 hover:text-[#32298A] hover:bg-slate-50 px-2 py-1 rounded"
            >
              +6 Months
            </button>
          </div>

          {/* Month / Year Header Navigation */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isToday = isSameDay(day, new Date());

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-7 w-7 mx-auto flex items-center justify-center rounded-md text-xs transition-colors ${
                    isSelected
                      ? "bg-[#32298A] text-white font-bold"
                      : isToday
                      ? "border border-[#32298A] text-[#32298A] font-semibold"
                      : isCurrentMonth
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
