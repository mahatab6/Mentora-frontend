"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Mail, User, Camera, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

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

    try {
      const response = await fetch("http://localhost:5000/api/student", {
        method: "PATCH",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
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
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500">Update your profile information and how others see you.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleUpdateProfile} className="divide-y divide-gray-100">
          
       
          <div className="p-8 flex flex-col sm:flex-row items-center gap-6 bg-gray-50/50">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-blue-100 flex items-center justify-center">
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
              <button type="button" className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-blue-600 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-900">{session?.user?.name}</h3>
              <p className="text-sm text-gray-500 font-medium">Student Account</p>
              <div className="mt-2 inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                <CheckCircle2 className="h-3 w-3" /> Verified Learner
              </div>
            </div>
          </div>

   
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Profile Image URL
                </label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    type="text"
                    placeholder="https://image-link.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Email Address (Read Only)
                </label>
                <div className="relative opacity-60">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    value={session?.user?.email || ""}
                    disabled
                    type="email"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl cursor-not-allowed text-gray-600"
                  />
                </div>
              </div>

            </div>
          </div>

      
          <div className="p-8 bg-gray-50/50 flex justify-end">
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