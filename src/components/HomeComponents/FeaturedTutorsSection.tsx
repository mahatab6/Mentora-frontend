"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Award, BadgeCheck, Star } from "lucide-react";

export default function FeaturedTutorsSection() {
  const featuredTutors = [
    {
      id: 1,
      name: "Dr. Amanda Foster",
      subject: "Advanced Mathematics",
      rating: 5.0,
      reviews: 342,
      sessions: 567,
      image: "https://images.unsplash.com/photo-1701229404076-5629809b331d",
      badges: ["Verified", "Top Mentor"],
      price: 75,
    },
    {
      id: 2,
      name: "Prof. Robert Martinez",
      subject: "Computer Science",
      rating: 5.0,
      reviews: 289,
      sessions: 432,
      image: "https://images.unsplash.com/photo-1686488594144-65fb516275e1",
      badges: ["Verified", "Top Mentor"],
      price: 70,
    },
    {
      id: 3,
      name: "Jessica Thompson",
      subject: "Business Strategy",
      rating: 4.9,
      reviews: 256,
      sessions: 398,
      image: "https://images.unsplash.com/photo-1561089489-f13d5e730d72",
      badges: ["Verified", "Top Mentor"],
      price: 65,
    },
    {
      id: 4,
      name: "Mahatab",
      subject: "Business Strategy",
      rating: 4.9,
      reviews: 256,
      sessions: 398,
      image: "https://images.unsplash.com/photo-1561089489-f13d5e730d72",
      badges: ["Verified", "Top Mentor"],
      price: 65,
    },
  ];

  return (
    <section className={cn("py-16 sm:py-20 lg:py-32 px-4")}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Tutors
          </h2>
          <p className="text-xl text-gray-600">
            Learn from our top-rated experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={tutor.image}
                    alt={`${tutor.name} - ${tutor.subject} expert tutor`}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {tutor.name}
                </h3>
                <p className="text-gray-600 mb-3">{tutor.subject}</p>

                <div className="flex justify-center gap-2 mb-3">
                  {tutor.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-full"
                    >
                      {badge === "Verified" && (
                        <BadgeCheck className="h-3 w-3" />
                      )}
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">
                    {tutor.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({tutor.reviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {tutor.sessions} sessions completed
                </p>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    ${tutor.price}
                  </span>
                  <span className="text-gray-500">/hour</span>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
