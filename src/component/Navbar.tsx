"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import { Dumbbell, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
              <Dumbbell className="w-5 h-5 -rotate-45" />
            </div>
            <span className="font-black text-2xl tracking-wider text-white uppercase">
              FITLOG
            </span>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-2 bg-[#121824] px-3 py-1.5 rounded-full border border-slate-800">
            <Link
              href="/"
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                isWorkoutsActive
                  ? "bg-[#1d273a] text-[#ccff00]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                isPlanActive
                  ? "bg-[#1d273a] text-[#ccff00]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </nav>

          {/* Badges / Counters (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-sm font-medium text-slate-300"
            >
              <span>Plan</span>
              <span className="bg-[#ccff00] text-black font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                {plan.length}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-sm font-medium text-slate-300"
            >
              <span>Saved</span>
              <span className="border border-slate-700 text-slate-400 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {saved.length}
              </span>
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 bg-[#ccff00] text-black font-bold text-xs px-2.5 py-1 rounded-full"
            >
              <span>Plan</span>
              <span>{plan.length}</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#101622] border-b border-slate-800 px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
              isWorkoutsActive ? "bg-[#1d273a] text-[#ccff00]" : "text-slate-300"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
              isPlanActive ? "bg-[#1d273a] text-[#ccff00]" : "text-slate-300"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </header>
  );
}