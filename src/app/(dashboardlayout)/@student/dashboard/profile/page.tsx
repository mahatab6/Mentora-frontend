"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Mail, User, Camera, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { env } from "@/env";

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API

export default function ProfilePage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  

  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });


  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    

    const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    try {
      const toastId = toast.loading("updated profile...");
      const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/student`, {
        method: "PATCH",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully!", { id: toastId});
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sessionLoading) {
    return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Update your profile information and how others see you.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <form onSubmit={handleUpdateProfile} className="divide-y divide-slate-100 dark:divide-slate-800">
          
       
          <div className="p-8 flex flex-col sm:flex-row items-center gap-6 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full border-4 border-white dark:border-slate-800 shadow-md overflow-hidden bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                {formData.image ? (
                  <Image 
                    src={formData.image} 
                    alt="Profile" 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-blue-600">
                    {formData.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <button type="button" className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 cursor-pointer transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{session?.user?.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Student Account</p>
              <div className="mt-2 inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                <CheckCircle2 className="h-3 w-3" /> Verified Learner
              </div>
            </div>
          </div>

   
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Profile Image URL
                </label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    type="text"
                    placeholder="https://image-link.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Email Address (Read Only)
                </label>
                <div className="relative opacity-60">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <input
                    value={session?.user?.email || ""}
                    disabled
                    type="email"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl cursor-not-allowed text-slate-600 dark:text-slate-400"
                  />
                </div>
              </div>

            </div>
          </div>

      
          <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end">
            <Button
              disabled={loading}
              type="submit"
              className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white px-8 py-6 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}