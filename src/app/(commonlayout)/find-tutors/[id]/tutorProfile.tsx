"use client";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Tutor } from "@/type";
import { BadgeCheck, Globe, MapPin, Star, Sparkles } from "lucide-react";

type TutorProfileProps = {
  tutor: Tutor | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TutorProfile({ tutor, setOpen }: TutorProfileProps) {
  const { data: session } = authClient.useSession();

  return (
    <section className="relative w-full border-b border-border bg-background/95 backdrop-blur-sm dark:bg-slate-950/50 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          
          {/* Avatar Section */}
          <div className="relative group">
            <div className="relative h-[280px] w-[280px] md:h-[320px] md:w-[300px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border">
              <Image
                src={tutor?.photoUrl ?? "/placeholder-avatar.png"}
                alt={tutor?.fullName ?? "Tutor profile"}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Verified Badge */}
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-2.5 rounded-full border-4 border-background shadow-xl">
              <BadgeCheck className="h-7 w-7" />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 w-full">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                    {tutor?.fullName}
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    <Sparkles className="h-3 w-3" /> Professional
                  </span>
                </div>
                <p className="text-xl font-medium text-blue-600 dark:text-blue-400">
                  {tutor?.category} Specialist
                </p>
              </div>

              <div className="bg-secondary/30 dark:bg-secondary/10 p-4 rounded-xl border border-border min-w-[160px] text-center md:text-right">
                <p className="text-3xl font-bold text-foreground">
                  ${tutor?.hourlyRate}
                </p>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">per hour</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-y-4 gap-x-8 text-sm md:text-base text-muted-foreground mb-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200/50 dark:border-yellow-900/20">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-foreground">
                  {Number(tutor?.averageRating ?? 0).toFixed(1)}
                </span>
                <span className="text-xs">({tutor?.totalReviews ?? 0} reviews)</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary/70" />
                <span className="text-foreground/80 font-medium">{tutor?.country}</span>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary/70" />
                <span className="text-foreground/80 font-medium">
                  Speaks: {tutor?.languages?.join(", ") || "English"}
                </span>
              </div>
            </div>

            {/* Action Area */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                disabled={!session}
                onClick={() => setOpen(true)}
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {session ? "Book a Session" : "Login to Book"}
              </Button>
              
              {!session && (
                <p className="text-xs text-muted-foreground mt-2 sm:mt-0 sm:self-center italic">
                  * Authentication required for booking
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}