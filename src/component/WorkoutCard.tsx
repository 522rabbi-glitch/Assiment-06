import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#232d41] hover:bg-[#283753] border border-slate-750/90 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1"
    >
      {/* Top Image */}
      <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          width={500}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Lime Green Tags */}
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups?.map((group, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3 className="text-lg font-black uppercase text-white group-hover:text-[#ccff00] transition-colors tracking-wide leading-tight">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="text-slate-450 text-xs font-medium">
            {workout.equipment}
          </p>
        </div>

        {/* Stats Row */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}