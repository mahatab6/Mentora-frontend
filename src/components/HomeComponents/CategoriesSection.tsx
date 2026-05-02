"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Code,
  Briefcase,
  HeartPulse,
  Palette,
  UserCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

const STATIC_CATEGORIES = [
  {
    id: 1,
    name: "Technology & Software",
    description: "Learn coding, web development, and software engineering.",
    icon: Code,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    name: "Business & Finance",
    description: "Master marketing, accounting, and business strategies.",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    name: "Health & Wellness",
    description: "Expert guidance on fitness, nutrition, and mental health.",
    icon: HeartPulse,
    color: "from-rose-500 to-red-600",
  },
  {
    id: 4,
    name: "Creative Arts & Design",
    description: "Explore UI/UX, graphic design, and fine arts.",
    icon: Palette,
    color: "from-purple-500 to-fuchsia-600",
  },
  {
    id: 5,
    name: "Personal Development",
    description: "Improve soft skills, leadership, and communication.",
    icon: UserCheck,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 6,
    name: "Science & Engineering",
    description: "In-depth coaching in Physics, Math, and Chemistry.",
    icon: Zap,
    color: "from-cyan-500 to-blue-600",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 lg:py-32 px-4 transition-colors duration-300 bg-gray-50/50 dark:bg-slate-950">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find the perfect mentor from our specialized categories and start your journey today.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {STATIC_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={{
                pathname: "/find-tutors",
                query: { category: category.name, page: 1 },
              }}
              className="group relative block h-full"
            >
              <div className="h-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 hover:-translate-y-1">
                {/* Icon Container */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 group-hover:rotate-[10deg]",
                    category.color
                  )}
                >
                  <category.icon className="h-7 w-7 text-white" />
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* CTA Footer */}
                <div className="flex items-center text-sm font-bold text-gray-900 dark:text-slate-200 group-hover:gap-3 transition-all">
                  <span>Explore category</span>
                  <ArrowRight className="ml-2 h-4 w-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}