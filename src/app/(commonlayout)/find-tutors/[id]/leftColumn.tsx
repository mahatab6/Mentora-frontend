"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useGetReview } from "@/hooks/useGetReview";
import { Tutor } from "@/type";

import { Clock, GraduationCap, Star } from "lucide-react";

export default function LeftColumn({ tutor }: { tutor: Tutor | null }) {
  const id = tutor?.tutor_id;
  const { review } = useGetReview(id as string);

  const mockReview = review?.data ?? [];

  const paragraphs = tutor?.aboutMe.split(".  ") ?? []

  return (
    <div className="lg:col-span-2 space-y-12">
      {/* About */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About {tutor?.fullName}
        </h2>
        <div className="space-y-6 text-lg leading-relaxed mb-4">
          {paragraphs.map((para, i) => (
            <p key={i}>{para.trim()}.</p>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Education</p>
              <p className="text-sm text-gray-600">{tutor?.education}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Experience</p>
              <p className="text-sm text-gray-600">10 Years Teaching</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Subjects</h2>
        <div className="flex flex-wrap gap-2">
          {tutor?.subjects?.map((subject) => (
            <span
              key={subject}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 font-medium"
            >
              {subject}
            </span>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Student Reviews
        </h2>
        <div className="grid gap-6">
          {mockReview.slice(0, 5).map((review) => (
            <div
              key={review.id}
              className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Star Rating + Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {review?.reviewContent}
              </p>

              {/* Student Info */}
              <div className="flex items-center gap-3 mt-auto">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={review?.student.image}
                    alt={review?.student.name}
                  />
                  <AvatarFallback>
                    {review?.student.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-900">
                  {review?.student.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
