/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Mail, MapPin, Phone, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);



  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    let isValid = true;
    if (!formData.name.trim()) { tempErrors.name = "Name is required"; isValid = false; }
    if (!formData.email.trim()) { tempErrors.email = "Email is required"; isValid = false; } 
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { tempErrors.email = "Email is invalid"; isValid = false; }
    if (!formData.subject.trim()) { tempErrors.subject = "Subject is required"; isValid = false; }
    if (!formData.message.trim()) { tempErrors.message = "Message is required"; isValid = false; }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    
    // Using Web3Forms as per your reference
    const form = new FormData();
    form.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY"); // Replace with your key
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", `Mentora Contact: ${formData.subject}`);
    form.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        toast.success("Message sent! We'll get back to you shortly.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please check your connection.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { 
      icon: <Mail className="w-5 h-5" />, 
      title: "Email Us", 
      val: "support@mentora.com", 
      link: "mailto:support@mentora.com" 
    },
    { 
      icon: <MapPin className="w-5 h-5" />, 
      title: "Visit Us", 
      val: "123 Education Lane, Learning City", 
      link: "#" 
    },
    { 
      icon: <Phone className="w-5 h-5" />, 
      title: "Call Us", 
      val: "+1 (555) 000-1234", 
      link: "tel:+15550001234" 
    },
    { 
      icon: <Clock className="w-5 h-5" />, 
      title: "Working Hours", 
      val: "Mon - Fri: 9:00 AM - 6:00 PM", 
      link: "#" 
    },
  ];

  return (
    <main ref={containerRef} className="relative pt-32 pb-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen overflow-hidden transition-colors duration-300">
      
      {/* Decorative Background Elements */}
      <div className="bg-orb absolute top-40 -left-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="bg-orb absolute bottom-20 -right-20 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Have questions about finding a mentor or joining as a tutor? We're here to help you navigate your journey on Mentora.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="contact-card group flex items-start gap-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{item.title}</h4>
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="lg:col-span-3 contact-card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              <h3 className="text-2xl font-bold">Send us a message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium pl-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border ${errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-700"} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <span className="text-red-500 text-xs pl-1">{errors.name}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium pl-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border ${errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-700"} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span className="text-red-500 text-xs pl-1">{errors.email}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium pl-1">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border ${errors.subject ? "border-red-500" : "border-slate-200 dark:border-slate-700"} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium pl-1">Message</label>
                <textarea
                  placeholder="Type your message here..."
                  rows={5}
                  className={`w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border ${errors.message ? "border-red-500" : "border-slate-200 dark:border-slate-700"} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                {errors.message && <span className="text-red-500 text-xs pl-1">{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 hover:cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}