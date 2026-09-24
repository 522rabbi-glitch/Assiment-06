import React from "react";
import Image from "next/image";
import HeroLogo from'@/assets/banner.png'
export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#121824] border border-slate-800/80 p-8 sm:p-12 lg:p-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-block text-[#ccff00] text-xs font-bold tracking-widest uppercase">
            WORKOUT LIBRARY
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08]">
            TRAIN WITH INTENT. <br />
            LOG EVERY SET.
          </h1>
          
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          
          <div className="pt-2">
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm px-7 py-4 rounded-lg transition-all duration-200 uppercase tracking-wide"
            >
              BROWSE WORKOUTS
            </a>
          </div>
        </div>

        {/* Right Column: Hero Visual */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            <Image
              src={HeroLogo}
              alt="Gym Training"
              width={600}
              height={500}
              priority
              className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] rounded-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}