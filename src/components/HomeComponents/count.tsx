/* eslint-disable react/no-unescaped-entities */
"use client";

import { cn } from "@/lib/utils";
import CountUp from "react-countup";
import { FaStar } from "react-icons/fa";

export default function CountPage() {
  const stats = [
    { label: "Experienced tutors", value: 100000, suffix: "+" },
    { label: "5-star tutor reviews", value: 300000, suffix: "+" },
    { label: "Subjects taught", value: 120, suffix: "+" },
    { label: "Tutor nationalities", value: 180, suffix: "+" },
    { label: "on the App Store", value: 4.8, isRating: true },
  ];

  return (
    <section 
      className={cn(
        "py-16 sm:py-20 lg:py-28 px-4 transition-colors duration-300",
        "bg-[#F0F6FF] dark:bg-slate-950"
      )}
    >
      <div className="container mx-auto">
        {/* New Heading and Description Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Our Success in Numbers
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Join a global community of learners and educators. We take pride in connecting 
            thousands of students with the world's most qualified tutors to achieve 
            academic excellence together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-3 group">
              <div className="h-14 flex items-center justify-center">
                 <h3 className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110">
                  {stat.isRating ? (
                    <span className="flex items-center justify-center gap-2">
                      {stat.value} <FaStar className="text-yellow-400 text-2xl" />
                    </span>
                  ) : (
                    <>
                      <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                      {stat.suffix}
                    </>
                  )}
                </h3>
              </div>
              <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}