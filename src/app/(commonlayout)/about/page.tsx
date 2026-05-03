/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { 
  Target, 
  Users, 
  Award, 
  Zap, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { label: 'Active Students', value: '10k+', icon: Users },
  { label: 'Expert Tutors', value: '500+', icon: Award },
  { label: 'Countries Reached', value: '50+', icon: Globe },
  { label: 'Success Rate', value: '98%', icon: ShieldCheck },
];

const values = [
  {
    title: "Personalized Growth",
    description: "We believe every student's journey is unique. Our platform adapts to individual learning styles and goals.",
    icon: Target,
  },
  {
    title: "Efficiency First",
    description: "Built for speed and clarity. We connect you with the right mentor in minutes, not days.",
    icon: Zap,
  },
  {
    title: "Quality Assured",
    description: "Every tutor on Mentora undergoes a rigorous verification process to ensure academic excellence.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              We’re redefining <span className="text-blue-600 dark:text-blue-400">Personalized</span> Learning.
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-400 leading-relaxed mb-8">
              Mentora was founded on a simple idea: that everyone deserves access to world-class mentorship, tailored specifically to their dreams and academic pace.
            </p>
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://i.ibb.co.com/Fk7xHFRt/abut.jpg" 
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-slate-400">
                At Mentora, we don't just facilitate tutoring; we build bridges between ambition and achievement. Our platform leverages cutting-edge technology to create an environment where knowledge flows seamlessly.
              </p>
              <div className="space-y-4">
                {values.map((value, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{value.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-slate-400">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 dark:bg-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start your journey?</h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
            Join thousands of students who have already found their perfect tutor on Mentora.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={"/find-tutors"} className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg active:scale-95 hover:cursor-pointer">
              Find a Tutor
            </Link>
            <Link href={"/become-a-tutor"} className="px-8 py-4 bg-blue-500 text-white border border-blue-400 font-bold rounded-xl hover:bg-blue-400 transition-colors active:scale-95 hover:cursor-pointer">
              Become a Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}