import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Award, Star, Globe } from "lucide-react";
import { findTutor } from "@/services/findTutor.services";
import Image from "next/image";
import Link from "next/link";
import { Tutor } from "@/type"; 

export default async function FeaturedTutorsSection() {

  const data = await findTutor.getAllTutor();
  const tutors: Tutor[] = data?.data?.tutors ?? [];

  return (
    <section className={cn("py-16 sm:py-20 lg:py-32 px-4 bg-white")}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Featured Tutors
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn from our top-rated experts and accelerate your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.slice(0,4).map((tutor) => (
            <div
              key={tutor.id}
              className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              {/* Card Header & Image */}
              <div className="relative p-6 pb-0 flex flex-col items-center">
                <div className="relative w-28 h-28 mb-4">
                  <Image
                    src={(tutor.photoUrl as string) || "/placeholder-avatar.png"}
                    alt={tutor.fullName || "Tutor"}
                    fill
                    className="rounded-full object-cover border-4 border-blue-50 group-hover:border-blue-100 transition-colors"
                  />
                  {tutor.averageRating >= 4.8 && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1.5 shadow-md">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 text-center line-clamp-1">
                  {tutor.fullName}
                </h3>
                <p className="text-sm font-medium text-blue-600 mb-2">
                  {tutor.category || tutor.subjects[0]}
                </p>
              </div>

              {/* Card Body */}
              <div className="px-6 py-2 flex-grow text-center">
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">{tutor.averageRating}</span>
                  <span className="text-xs text-gray-500">({tutor.totalReviews} reviews)</span>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {tutor.languages.slice(0, 2).map((lang, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {lang}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 italic mb-4">
                  {tutor.shortBio}
                </p>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 mt-auto border-t border-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Hourly Rate</p>
                    <p className="text-xl font-bold text-gray-900">${tutor.hourlyRate}</p>
                  </div>
                  
                </div>

                <Link href={`/find-tutors/${tutor.tutor_id}`}>
                  <Button className="w-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 shadow-md shadow-blue-100 transition-all hover:scale-[1.02] active:scale-95">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}