"use client";

import { Search, Calendar, GraduationCap } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: 'Search for a Tutor',
      description: 'Browse our verified tutors and find the perfect match for your learning needs.'
    },
    {
      number: 2,
      icon: Calendar,
      title: 'Book a Session',
      description: 'Choose a time that works for you and schedule your first lesson with ease.'
    },
    {
      number: 3,
      icon: GraduationCap,
      title: 'Learn & Review',
      description: 'Attend your session, learn from experts, and leave feedback to help others.'
    }
  ];

  return (
    <section className="py-20 lg:py-32 px-4 transition-colors duration-300 bg-white dark:bg-slate-950">
      <div className="container mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            How Mentora Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400">
            Get started in three simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connecting line: Adjusted colors for dark mode */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600/20 via-blue-500 to-blue-600/20 dark:from-blue-500/10 dark:via-blue-400/30 dark:to-blue-500/10 transform -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="text-center"
                >
                  <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full">
                    <div className="inline-block relative mb-6">
                      {/* Icon Circle */}
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-4 ring-white dark:ring-slate-900">
                        {step.number}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}