"use client";

import React from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Reviews() {
  const mockReviews = [
    {
      id: 1,
      studentName: "Emily Davis",
      rating: 5,
      text: "Excellent explanation of complex concepts! Really helped me understand derivatives.",
      date: "2 days ago",
      studentImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      studentName: "David Wilson",
      rating: 4,
      text: "Great session, very patient tutor. Would recommend for physics help.",
      date: "1 week ago",
      studentImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      studentName: "Jessica Taylor",
      rating: 5,
      text: "Helped me ace my midterm! Best math tutor on the platform.",
      date: "2 weeks ago",
      studentImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Student Reviews</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">{review.date}</span>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">{review.text}</p>

            {/* Student Info */}
            <div className="flex items-center gap-3 mt-auto">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.studentImage} alt={review.studentName} />
                <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-900">{review.studentName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
