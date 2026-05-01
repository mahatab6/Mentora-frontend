"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
        toast.error("Please enter a valid email address.")
      return;
    }

    // Logic for subscription goes here
    toast.success("You've been subscribed to our newsletter.")
    setEmail("");
  };

  return (
    <section className="bg-blue-600 dark:bg-slate-900 py-16 px-4 transition-colors duration-300">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div className="text-white space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Subscribe our newsletter
          </h2>

          <p className="text-blue-100 dark:text-slate-400 max-w-md leading-relaxed">
            Get the latest updates, tutor tips, and learning resources directly
            in your inbox. Stay ahead with Mentora.
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full">
          <form onSubmit={handleSubscribe}>
            <label className="text-sm text-blue-100 dark:text-slate-400 uppercase tracking-wide">
              Your E-mail Address
            </label>

            <div className="mt-2 flex rounded-lg overflow-hidden shadow-2xl">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-none border-0 focus-visible:ring-0 text-gray-900 dark:text-white bg-white dark:bg-slate-800 h-12"
              />

              <Button 
                type="submit"
                className="rounded-none bg-slate-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 px-8 h-12 font-semibold transition-all cursor-pointer active:scale-95"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;