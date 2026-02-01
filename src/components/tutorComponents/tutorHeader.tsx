import React from "react";
import { Button } from "../ui/button";
import { BadgeCheck, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { userServices } from "@/services/users.services";
import { tutorDashboard } from "@/services/tutorDashboard.services";




const mockTutorStats = {
  averageRating: 4.8,
  totalReviews: 240,
  completionRate: 98,
};

export default async function TutorHeader() {

  const session = await userServices.getSession()

  const id = session?.user?.id
  const data = await tutorDashboard.tutorBio(id)
  const tutor = data?.data
  

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6">
      
      {/* Avatar */}
      <div className="relative">
        <Avatar className="h-24 w-24 border-4 border-blue-50">
          <AvatarImage src={tutor.photoUrl} alt={tutor.fullName} />
          <AvatarFallback>
            {tutor.fullName.charAt(0)}
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
            {tutor.fullName}
          </h1>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
            Verified Tutor
          </span>
        </div>

        <p className="text-gray-500 mb-4">
          {tutor.shortBio}</p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-bold text-gray-900">
              {mockTutorStats.averageRating}
            </span>
            ({mockTutorStats.totalReviews} reviews)
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
