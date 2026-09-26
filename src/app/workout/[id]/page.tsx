"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";
import { Calendar, Bookmark, ArrowLeft, Check } from "lucide-react";
import NotFound from "@/app/not-found";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { addToPlan, addToSaved, isInPlan, isInSaved } = useWorkout();

  useEffect(() => {
    if (!id) return;

    const fetchWorkoutDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        
        if (!res.ok) {
          setWorkout(null);
          return;
        }
        
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error("Error fetching workout details:", err);
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0f17] text-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
            <div className="lg:col-span-6 h-[480px] bg-slate-800/50 rounded-3xl" />
            <div className="lg:col-span-6 space-y-6">
              <div className="h-10 bg-slate-800/60 rounded w-3/4" />
              <div className="h-4 bg-slate-800/40 rounded w-full" />
              <div className="h-4 bg-slate-800/40 rounded w-2/3" />
              <div className="h-64 bg-slate-800/30 rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    );
  }

 
  if (!workout) {
    return <NotFound />;
  }

  const alreadyPlanned = isInPlan(workout.id);
  const alreadySaved = isInSaved(workout.id);

  return (
    <main className="min-h-screen bg-[#0b0f17] text-slate-100 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to workouts</span>
          </button>
        </div>

        {/* Two-Column Details Layout (Strictly Figma Design) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Visual / Media */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl">
              <Image
                src={workout.image}
                alt={workout.name}
                width={800}
                height={800}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Title & Description */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                {workout.name}
              </h1>

              <p className="text-slate-400 text-base leading-relaxed">
                {workout.description}
              </p>

              {/* Category Tag Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {workout.muscleGroups?.map((group, idx) => (
                  <span
                    key={idx}
                    className="bg-[#ccff00] text-black text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Specs Table / Panel */}
            <div className="bg-[#131926] border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80 text-sm">
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">
                  EQUIPMENT
                </span>
                <span className="text-white font-medium">{workout.equipment}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">
                  DIFFICULTY
                </span>
                <span className="text-white font-medium">{workout.difficulty}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">
                  SETS
                </span>
                <span className="text-white font-medium">{workout.sets}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">
                  REPS
                </span>
                <span className="text-white font-medium">{workout.reps}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">
                  DURATION
                </span>
                <span className="text-white font-medium">{workout.duration} min</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">
                  CALORIES
                </span>
                <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">
                  RATING
                </span>
                <span className="text-[#ccff00] font-bold">{workout.rating}</span>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase text-white tracking-wide">
                INSTRUCTIONS
              </h2>
              <ol className="space-y-3">
                {workout.instructions?.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-sm text-slate-300">
                    <span className="font-bold text-slate-400 shrink-0">
                      {idx + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => addToPlan(workout)}
                className={`flex-1 flex items-center justify-center gap-2.5 font-black text-sm px-6 py-4 rounded-xl transition-all shadow-lg ${
                  alreadyPlanned
                    ? "bg-[#1f293d] text-slate-400 cursor-not-allowed border border-slate-700"
                    : "bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-[#ccff00]/10 hover:-translate-y-0.5"
                }`}
              >
                {alreadyPlanned ? (
                  <>
                    <Check className="w-5 h-5 text-[#ccff00]" />
                    <span>IN TODAY&apos;S PLAN</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    <span>ADD TO TODAY&apos;S PLAN</span>
                  </>
                )}
              </button>

              <button
                onClick={() => addToSaved(workout)}
                className={`flex-1 flex items-center justify-center gap-2.5 font-bold text-sm px-6 py-4 rounded-xl transition-all border ${
                  alreadySaved
                    ? "bg-[#182030] text-slate-400 border-slate-700 cursor-not-allowed"
                    : "bg-[#141b29] hover:bg-[#1c263a] text-white border-slate-700/80 hover:border-slate-600"
                }`}
              >
                {alreadySaved ? (
                  <>
                    <Check className="w-5 h-5 text-blue-400" />
                    <span>SAVED</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-5 h-5" />
                    <span>SAVE FOR LATER</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}