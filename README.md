# ⚡ FitLog — Train With Intent. Log Every Set.

A sleek, dark-themed, no-nonsense gym companion and workout planning web application built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. Pick lifts, lock them into today's plan, track metrics in real time, and keep your fitness routine honest.

---

## 🚀 Live Demo & API

- **Live URL:** [FitLog on Vercel](https://your-deployment-link.vercel.app) *(Deploy করার পর আপনার লাইভ লিংকটি এখানে বসাবেন)*
- **All Workouts API:** `https://api.abcz.workers.dev/api/fitlog`
- **Single Workout API:** `https://api.abcz.workers.dev/api/fitlog/:id`

---

## ✨ 5 Key Features

1. **🏋️ Comprehensive Workout Library:**
   - Displays 12 major muscle-targeting exercises fetched directly from the API.
   - Interactive, responsive 3x4 card grid featuring workout preview images, muscle group tag pills, equipment specifications, and stats (duration, calories burned, rating).

2. **⚡ Real-time Dynamic Metrics Summary:**
   - Three dynamic live-updating metric stat cards on the **My Plan** page (`Exercises`, `Minutes`, and `Calories`).
   - Automatically recalibrates values as workouts are added, removed, or completed, dynamically adapting whether viewing **Today's Plan** or **Saved for Later**.

3. **🎯 5-Lift Daily Plan Management with Strict Cap:**
   - Allows users to lock workouts into "Today's Plan" with an enforced cap of maximum 5 lifts.
   - Prevents accidental duplicates and notifies users via animated toast messages when caps or constraints are met.

4. **🔄 Live Interactive Sorting (Challenge C1):**
   - Instant sorting dropdown on the My Plan page supporting **Duration**, **Calories Burned**, and **Rating**.
   - Sorts lifts seamlessly in real time without triggering page reloads.

5. **💪 Workout Tracking & Local Persistence (Challenge C3 & Bonus):**
   - Single-click **"Mark as Done"** feature to track finished sets with visual feedback and strike-through styling.
   - Instant lift removal with animated toast confirmations.
   - Full **LocalStorage persistence** ensuring plans, saved workouts, and completion statuses survive page reloads and browser restarts.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | High-performance React framework, routing, and layout architecture |
| **TypeScript** | Strict type-safety, interface modeling, and bug prevention |
| **Tailwind CSS** | Modern utility-first styling matching the Figma dark design |
| **Lucide React** | Minimalist modern SVG icon set |
| **React Hot Toast** | Lightweight, animated notification alerts for user interactions |
| **Context API + LocalStorage** | Global state management across Navbar, Details, and Plan pages |

---

## 💻 Getting Started Locally

Follow these steps to set up and run the project locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/ProgrammingHero1/B14-A6-Fit-Log.git
