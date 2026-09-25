"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWorkout } from "@/context/WorkoutContext";
import { 
  Check, 
  Trash2, 
  Clock, 
  Flame, 
  Star, 
  Dumbbell, 
  ArrowRight, 
  ExternalLink,
  Plus,
  ChevronDown
} from "lucide-react";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  const { 
    plan, 
    saved, 
    removeFromPlan, 
    removeFromSaved, 
    toggleComplete, 
    isCompleted,
    addToPlan 
  } = useWorkout();

  // Active list based on selected Tab (Today's Plan or Saved)
  const activeList = activeTab === "plan" ? plan : saved;

  // Dynamic Metrics Calculation (Updates live based on active tab)
  const totalExercises = activeList.length;
  const totalMinutes = activeList.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalCalories = activeList.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);

  // Live Sorting (Challenge C1: Duration, Calories, Rating)
  const currentList = [...activeList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="min-h-screen bg-[#0b0f17] text-slate-100 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ================= 1. HEADER ================= */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            MY PLAN
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            {activeTab === "plan" 
              ? "Cap of five lifts for today. Finish them, then load more."
              : "Workouts saved for upcoming sessions."
            }
          </p>
        </div>

        {/* ================= 2. METRICS SUMMARY (DYNAMIC 3 STAT CARDS) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Exercises Card */}
          <div className="bg-[#131926] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                EXERCISES
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {activeTab === "plan" ? "Today" : "Saved"}
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {totalExercises}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {activeTab === "plan" ? "/ 5 max" : "lifts"}
              </span>
            </div>
          </div>

          {/* Minutes Card */}
          <div className="bg-[#131926] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                MINUTES
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {activeTab === "plan" ? "Today" : "Saved"}
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {totalMinutes}
              </span>
              <span className="text-xs font-semibold text-slate-500">mins total</span>
            </div>
          </div>

          {/* Calories Card */}
          <div className="bg-[#131926] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                CALORIES
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {activeTab === "plan" ? "Today" : "Saved"}
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[#ccff00]">
                {totalCalories}
              </span>
              <span className="text-xs font-semibold text-slate-500">kcal burn</span>
            </div>
          </div>
        </div>

        {/* ================= 3. TABS & SORT DROPDOWN ROW ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          
          {/* Tabs: Today's Plan / Saved for Later */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === "plan"
                  ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10"
                  : "bg-[#141b29] text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <span>Today&apos;s Plan</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-black ${
                  activeTab === "plan" ? "bg-black text-[#ccff00]" : "bg-slate-800 text-slate-300"
                }`}
              >
                {plan.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10"
                  : "bg-[#141b29] text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <span>Saved for Later</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-black ${
                  activeTab === "saved" ? "bg-black text-[#ccff00]" : "bg-slate-800 text-slate-300"
                }`}
              >
                {saved.length}
              </span>
            </button>
          </div>

          {/* Challenge C1: Sort Dropdown */}
          <div className="flex items-center gap-2.5 bg-[#141b29] border border-slate-800 px-4 py-2 rounded-xl text-sm self-start sm:self-auto">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
                className="bg-transparent text-white font-semibold pr-6 focus:outline-none cursor-pointer appearance-none text-xs sm:text-sm"
              >
                <option value="duration" className="bg-[#141b29] text-white">Duration </option>
                <option value="calories" className="bg-[#141b29] text-white">Calories </option>
                <option value="rating" className="bg-[#141b29] text-white">Rating </option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* ================= 4. WORKOUT CARDS LIST / EMPTY STATE ================= */}
        {currentList.length === 0 ? (
          /* Empty State */
          <div className="bg-[#131926] border border-dashed border-slate-800 rounded-3xl p-12 sm:p-16 text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mx-auto">
              <Dumbbell className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-black uppercase text-white tracking-wide">
              NOTHING HERE YET
            </h3>
            
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "No saved workouts yet. Click 'Save for later' on any workout detail page."
              }
            </p>

            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold px-6 py-3 rounded-xl transition-all"
              >
                <span>Go to workouts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Cards List */
          <div className="space-y-4">
            {currentList.map((workout) => {
              const completed = isCompleted(workout.id);

              return (
                <div
                  key={workout.id}
                  className={`bg-[#131926] border rounded-2xl p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                    completed
                      ? "border-emerald-500/40 bg-emerald-950/10 opacity-80"
                      : "border-slate-800/90 hover:border-slate-700"
                  }`}
                >
                  {/* Left: Thumbnail & Info */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Titles & Stats */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-base sm:text-lg font-black uppercase tracking-wide ${
                          completed ? "line-through text-slate-400" : "text-white"
                        }`}>
                          {workout.name}
                        </h3>
                        {completed && (
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                            Done
                          </span>
                        )}
                      </div>

                      <p className="text-slate-400 text-xs font-medium">
                        {workout.equipment}
                      </p>

                      {/* Stats Row */}
                      <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
                        <div className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1 text-orange-400">
                          <Flame className="w-3.5 h-3.5" />
                          <span>{workout.caloriesBurned} kcal</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-3.5 h-3.5 fill-yellow-400" />
                          <span>{workout.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                    
                    {/* Saved Tab Quick Add: Move to Today's Plan */}
                    {activeTab === "saved" && (
                      <button
                        onClick={() => addToPlan(workout)}
                        className="flex items-center gap-1.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Plan</span>
                      </button>
                    )}

                    {/* Challenge C3: Mark as Done (For Today's Plan) */}
                    {activeTab === "plan" && (
                      <button
                        onClick={() => toggleComplete(workout.id)}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl border transition-all ${
                          completed
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            : "bg-[#141b29] hover:bg-[#1a2336] text-slate-200 border-slate-700"
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>{completed ? "Completed" : "Mark as Done"}</span>
                      </button>
                    )}

                    {/* View Details Button */}
                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex items-center gap-1.5 bg-[#141b29] hover:bg-[#1a2336] text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {/* Challenge C3: Remove (Trash) Button */}
                    <button
                      onClick={() => {
                        if (activeTab === "plan") {
                          removeFromPlan(workout.id);
                        } else {
                          removeFromSaved(workout.id);
                        }
                      }}
                      className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                      title="Remove workout"
                      aria-label="Remove workout"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}