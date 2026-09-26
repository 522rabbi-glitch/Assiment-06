import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-[#0b0f17] text-white px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-[#131926] border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
        
        {/* Fitness Icon */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
          <Dumbbell className="w-10 h-10 -rotate-45" />
        </div>

        {/* 404 Error Heading */}
        <div className="space-y-3">
          <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">
            ERROR 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            PAGE NOT FOUND
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Looks like you took a wrong rep! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Back to Home CTA */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#ccff00] hover:bg-[#b1db06] text-black font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#ccff00]/10 hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO WORKOUTS</span>
          </Link>
        </div>

      </div>
    </main>
  );
}