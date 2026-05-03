"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetReview } from "@/hooks/useGetReview";
import { Tutor } from "@/type";
import { Clock, GraduationCap, Star, Quote } from "lucide-react";

export default function LeftColumn({ tutor }: { tutor: Tutor | null }) {
  const id = tutor?.tutor_id;
  const { review } = useGetReview(id as string);

  const mockReview = review?.data ?? [];
  // Handles different sentence spacing for paragraph splitting
  const paragraphs = tutor?.aboutMe.split(".  ") ?? tutor?.aboutMe.split(". ") ?? [];

  return (
    <div className="lg:col-span-2 space-y-16">
      {/* About Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          About {tutor?.fullName}
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground mb-8">
          {paragraphs.map((para, i) => (
            <p key={i} className="first-letter:text-3xl first-letter:font-bold first-letter:text-foreground">
              {para.trim()}{para.endsWith('.') ? "" : "."}
            </p>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4 transition-colors hover:border-primary/20">
            <div className="bg-primary/10 p-3 rounded-xl text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">Education</p>
              <p className="text-muted-foreground leading-snug">{tutor?.education}</p>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4 transition-colors hover:border-green-500/20">
            <div className="bg-green-500/10 p-3 rounded-xl text-green-600 dark:text-green-400">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">Experience</p>
              <p className="text-muted-foreground">10+ Years Teaching</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Expertise & Subjects</h2>
        <div className="flex flex-wrap gap-3">
          {tutor?.subjects?.map((subject) => (
            <span
              key={subject}
              className="px-5 py-2.5 bg-secondary/50 border border-border rounded-xl text-foreground font-medium text-sm transition-all hover:bg-secondary hover:scale-105"
            >
              {subject}
            </span>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Student Reviews</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 rounded-full border border-yellow-500/20">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-bold text-yellow-700 dark:text-yellow-500">
              {Number(tutor?.averageRating).toFixed(1)} Avg
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          {mockReview.length > 0 ? (
            mockReview.slice(0, 5).map((review) => (
              <div
                key={review.id}
                className="p-6 bg-card rounded-2xl border border-border hover:shadow-lg hover:shadow-primary/5 transition-all flex flex-col relative overflow-hidden group"
              >
                <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/5 group-hover:text-primary/10 transition-colors" />
                
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-muted border-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Review Content */}
                <p className="text-foreground/80 italic leading-relaxed mb-6 relative z-10">
                  {review?.reviewContent}
                </p>

                {/* Student Info */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                  <Avatar className="h-10 w-10 ring-2 ring-background shadow-sm">
                    <AvatarImage
                      src={review?.student.image}
                      alt={review?.student.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {review?.student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block text-sm font-bold text-foreground">
                      {review?.student.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Verified Student</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-secondary/20 rounded-2xl border border-dashed border-border">
              <p className="text-muted-foreground italic">No reviews yet. Be the first to book a session!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}