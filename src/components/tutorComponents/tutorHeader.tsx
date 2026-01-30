import React from "react";
import { Button } from "../ui/button";
import { BadgeCheck, CheckCircle, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const mockTutor = {
  fullName: "Sarah Johnson",
  title: "Senior Mathematics Tutor",
  experience: "5+ Years Experience",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop",
};

const mockTutorStats = {
  averageRating: 4.8,
  totalReviews: 240,
  completionRate: 98,
};

export default function TutorHeader() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6">
      
      {/* Avatar */}
      <div className="relative">
        <Avatar className="h-24 w-24 border-4 border-blue-50">
          <AvatarImage src={mockTutor.avatar} alt={mockTutor.fullName} />
          <AvatarFallback>
            {mockTutor.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
          <BadgeCheck className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {mockTutor.fullName}
          </h1>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
            Verified Tutor
          </span>
        </div>

        <p className="text-gray-500 mb-4">
          {mockTutor.title} • {mockTutor.experience}
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-bold text-gray-900">
              {mockTutorStats.averageRating}
            </span>
            ({mockTutorStats.totalReviews} reviews)
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="font-bold text-gray-900">
              {mockTutorStats.completionRate}%
            </span>
            Completion
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline">Edit Profile</Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          View Public Profile
        </Button>
      </div>
    </div>
  );
}
