import { BadgeCheck, GraduationCap, Languages, Star, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Tutor } from "@/type";
import { TutorHoverPreview } from "./TutorHoverPreview";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";

export const TutorCard = ({ tutor }: { tutor: Tutor | null }) => {
  if (!tutor) return <div className="h-72 w-full bg-gray-100 animate-pulse rounded-2xl" />;

  return (
    <TutorHoverPreview tutor={tutor}>
      <Link 
        href={`/find-tutors/${tutor.tutor_id}`} 
        className="group relative bg-white border border-gray-200 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-4 md:gap-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[18rem] md:h-72"
      >
       
        <div className="relative w-full md:w-48 h-80 md:h-full shrink-0">
          <Image
            fill
            src={tutor.photoUrl ?? ''}
            alt={tutor.fullName ?? 'Tutor'}
            className="rounded-xl object-cover"
          />
        </div>


        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between md:justify-start gap-2 mb-2">
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
              {tutor.fullName}
            </h3>
            <BadgeCheck className="w-5 h-5 text-blue-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-y-2 gap-x-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GraduationCap className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="truncate">{tutor.education}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Languages className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="truncate">{tutor.languages.join(", ")}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2 italic mb-4 md:mb-0">
            &quot;{tutor.shortBio}&quot;
          </p>

          <div className="mt-auto hidden md:flex flex-wrap gap-1">
            {tutor.subjects.slice(0, 3).map((subject) => (
              <Badge key={subject} variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 border-none hover: ">
                {subject}
              </Badge>
            ))}
          </div>
        </div>

      
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between pt-4 md:pt-0 md:pl-6 border-t md:border-t-0 md:border-l border-gray-100">
          <div className="text-left md:text-right">
            <div className="flex items-baseline md:flex-col gap-1 md:gap-0">
              <span className="text-2xl font-black text-gray-900">${tutor.hourlyRate}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">/ hr</span>
            </div>
            <div className="hidden md:flex items-center justify-end gap-1 mt-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{tutor.lessonDuration}m lesson</span>
            </div>
          </div>

          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-6 md:w-full font-bold transition-transform active:scale-95"
          >
            Book Trial
          </Button>
        </div>
      </Link>
    </TutorHoverPreview>
  );
};