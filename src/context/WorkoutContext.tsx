"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  completedIds: number[];
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleComplete: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  isCompleted: (id: number) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      const storedCompleted = localStorage.getItem("fitlog_completed");

      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      if (storedCompleted) setCompletedIds(JSON.parse(storedCompleted));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    localStorage.setItem("fitlog_completed", JSON.stringify(completedIds));
  }, [plan, saved, completedIds, isLoaded]);

  const addToPlan = (workout: Workout): boolean => {
    if (plan.some((item) => item.id === workout.id)) {
      toast.error(`"${workout.name}" is already in today's plan!`);
      return false;
    }
    if (plan.length >= 5) {
      toast.error("Cap reached! Today's plan can only hold 5 lifts.");
      return false;
    }
    setPlan((prev) => [...prev, workout]);
    toast.success(`Added "${workout.name}" to today's plan`);
    return true;
  };

  const addToSaved = (workout: Workout): boolean => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error(`"${workout.name}" is already in saved list!`);
      return false;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success(`Saved "${workout.name}" for later`);
    return true;
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((p) => p.id !== id));
    setCompletedIds((prev) => prev.filter((cId) => cId !== id));
    toast.success("Removed from plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((s) => s.id !== id));
    toast.success("Removed from saved");
  };

  const toggleComplete = (id: number) => {
    if (completedIds.includes(id)) {
      setCompletedIds((prev) => prev.filter((cId) => cId !== id));
    } else {
      setCompletedIds((prev) => [...prev, id]);
      toast.success("Workout completed! 💪");
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        completedIds,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleComplete,
        isInPlan: (id) => plan.some((p) => p.id === id),
        isInSaved: (id) => saved.some((s) => s.id === id),
        isCompleted: (id) => completedIds.includes(id),
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkout must be used within WorkoutProvider");
  return context;
};