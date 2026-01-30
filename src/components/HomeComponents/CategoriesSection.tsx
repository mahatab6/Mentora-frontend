"use client";

import { cn } from "@/lib/utils";
import {
  Code,
  Database,
  Calculator,
  Palette,
  Globe,
  Briefcase,
  ArrowRight,
} from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    {
      id: "web",
      title: "Web Development",
      icon: Code,
      color: "from-blue-500 to-blue-600",
      tutors: 245,
    },
    {
      id: "data",
      title: "Data Science",
      icon: Database,
      color: "from-purple-500 to-purple-600",
      tutors: 189,
    },
    {
      id: "math",
      title: "Mathematics",
      icon: Calculator,
      color: "from-green-500 to-green-600",
      tutors: 312,
    },
    {
      id: "design",
      title: "Design",
      icon: Palette,
      color: "from-pink-500 to-pink-600",
      tutors: 167,
    },
    {
      id: "language",
      title: "Language",
      icon: Globe,
      color: "from-orange-500 to-orange-600",
      tutors: 423,
    },
    {
      id: "business",
      title: "Business",
      icon: Briefcase,
      color: "from-indigo-500 to-indigo-600",
      tutors: 201,
    },
  ];

  return (
    <section className="py-20 lg:py-32 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Choose from a wide range of subjects and start learning from expert tutors
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 transition"
              >
                <div className="rounded-2xl bg-white p-8 h-full hover:shadow-xl transition-all duration-300">
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6",
                      category.color
                    )}
                  >
                    <Icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.tutors}+ tutors available
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">
                    Explore category
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
