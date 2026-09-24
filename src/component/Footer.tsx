import React from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080c14] border-t border-slate-800/80 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
            <Dumbbell className="w-4 h-4 -rotate-45" />
          </div>
          <span className="font-black text-xl tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>
        <p className="text-slate-500 text-xs sm:text-sm text-center md:text-right">
          &copy; 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}