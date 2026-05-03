"use client";

import React from "react";
import { Scale, CheckCircle2, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4 text-blue-600 font-bold tracking-widest uppercase text-sm">
            <Scale size={20} />
            Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Terms of <span className="text-blue-600">Service</span></h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            By using the Mentora platform, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <CheckCircle2 className="text-green-500" /> 1. User Eligibility
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              You must be at least 18 years old to create an account on Mentora. As a mentor, you represent that all information regarding your skills and experience is accurate and verifiable.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <AlertCircle className="text-amber-500" /> 2. Booking & Cancellations
            </h2>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Sessions must be booked through the Mentora platform.</li>
              <li>Cancellations made less than 24 hours before a session may be subject to a fee.</li>
              <li>Mentors are responsible for maintaining their own availability schedules.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <CheckCircle2 className="text-green-500" /> 3. Payment Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Payments for tutoring sessions are processed securely via Stripe. Mentora takes a service fee for facilitating the connection, which is clearly disclosed at the time of booking.
            </p>
          </div>
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-blue-600 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Have Questions About These Terms?</h3>
          <p className="mb-6 opacity-90">Our legal team is available to clarify any points regarding our user agreement.</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}