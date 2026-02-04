"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { Tutor } from "@/type";

import { BadgeCheck, Globe, MapPin, Star } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

type TutorProfileProps = {
  tutor: Tutor | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TutorProfile({ tutor, setOpen }: TutorProfileProps) {
  const { data: session } = authClient.useSession();
 

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative">
            <Image
              src={tutor?.photoUrl ?? ""}
              alt={tutor?.fullName ?? "Tutor name"}
              width={300}
              height={280}
              className="rounded-xl object-cover shadow-lg"
            />

            <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-2 rounded-full border-4 border-white shadow-sm">
              <BadgeCheck className="h-6 w-6" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {tutor?.fullName}
                </h1>
                <p className="text-lg text-blue-600 font-medium">
                  {tutor?.category} Specialist
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">
                  ${tutor?.hourlyRate}
                </p>
                <p className="text-gray-500">per hour</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-gray-900 text-base">
                  {Number(tutor?.averageRating).toFixed(1)}
                </span>
                <span>({tutor?.totalReviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {tutor?.country}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" /> Speaks{" "}
                {tutor?.languages.join(", ")}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                disabled={!session}
                onClick={() => setOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white px-8 py-6 text-lg h-auto"
              >
                Book Now
              </Button>
              {/* <Button variant="outline" className="px-8 py-6 text-lg h-auto gap-2">
                        <MessageSquare className="h-5 w-5" /> Message
                     </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
