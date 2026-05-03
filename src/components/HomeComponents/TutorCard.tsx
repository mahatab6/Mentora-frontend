"use client";

import { BadgeCheck, GraduationCap, Languages, Star, Play } from "lucide-react";
import { Button } from "../ui/button";
import { Tutor } from "@/type";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";

export const TutorCard = ({ tutor }: { tutor: Tutor | null }) => {
  if (!tutor) {
    return <div className="h-[420px] w-full bg-gray-100 dark:bg-slate-800 animate-pulse rounded-2xl" />;
  }

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl dark:hover:shadow-blue-900/20 transition-all duration-300 flex flex-col h-full">
      
      {/* Top Image & Video Intro Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          fill
          src={tutor.photoUrl ?? ''}
          alt={tutor.fullName ?? 'Tutor'}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Cinematic Video Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 scale-90 group-hover:scale-100 transition-transform">
            <Play className="text-white fill-white w-5 h-5 ml-1" />
          </div>
          <span className="absolute bottom-3 left-3 text-[10px] text-white bg-black/60 backdrop-blur-sm px-2 py-1 rounded font-bold uppercase tracking-widest">
            Watch Intro
          </span>
        </div>

        {/* Price Badge on Image */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-slate-700">
          <span className="text-sm font-black text-gray-900 dark:text-white">${tutor.hourlyRate}</span>
          <span className="text-[10px] text-gray-500 dark:text-slate-400 font-bold ml-1">/hr</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {tutor.fullName}
          </h3>
          <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />
          
          <div className="ml-auto flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold dark:text-slate-300">{Number(tutor.averageRating).toFixed(1)}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-slate-400">
            <GraduationCap className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{tutor.education}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-slate-400">
            <Languages className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{tutor.languages.slice(0, 2).join(", ")}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 italic mb-4">
          &quot;{tutor.shortBio}&quot;
        </p>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tutor.subjects.slice(0, 2).map((subject) => (
            <Badge 
              key={subject} 
              variant="secondary" 
              className="text-[9px] bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none px-2 py-0"
            >
              {subject}
            </Badge>
          ))}
          {tutor.subjects.length > 2 && (
            <span className="text-[9px] text-gray-400">+{tutor.subjects.length - 2} more</span>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
          <Button 
            asChild
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold transition-all active:scale-95"
          >
            <Link href={`/find-tutors/${tutor.tutor_id}`}>
              Book Trial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};