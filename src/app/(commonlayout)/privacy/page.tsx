"use client";

import React, { useRef } from "react";
import { Shield, Lock, Eye,  } from "lucide-react";

export default function PrivacyPage() {
  const containerRef = useRef(null);


  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: "Information Collection",
      content: "We collect information you provide directly to us when you create an account, such as your name, email address, and professional background. We also collect data regarding your tutoring sessions and interactions on the platform."
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      title: "How We Protect Data",
      content: "We implement industry-standard security measures including SSL encryption and secure database protocols to protect your personal information from unauthorized access or disclosure."
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Data Usage",
      content: "Your data is used to facilitate mentor-student matches, process payments via secure third-party providers, and improve the overall Mentora user experience."
    }
  ];

  return (
    <main ref={containerRef} className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Privacy <span className="text-blue-600">Policy</span></h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Last Updated: May 2026</p>
        </div>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <section key={idx} className="policy-section group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
          
          <div className="policy-section p-8 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold mb-4">Contact for Privacy Concerns</h2>
            <p className="text-slate-600 dark:text-slate-400">
              If you have any questions about this Privacy Policy, please reach out to us at <span className="text-blue-600 font-medium">privacy@mentora.com</span>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}