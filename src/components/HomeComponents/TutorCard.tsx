import { BadgeCheck, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { TutorType } from "@/type";
import { TutorHoverPreview } from "./TutorHoverPreview";


export const TutorCard = ({ tutor }: { tutor: TutorType }) => {
  return (
    <TutorHoverPreview tutor={tutor}>
    <div className="relative bg-white border-4 rounded-xl p-5 flex gap-4 hover:border-black transition cursor-pointer h-72">
      {/* Image */}
      <img
        src={tutor.photoUrl}
        alt={tutor.fullName}
        className="w-20 h-20 rounded-lg object-cover"
      />

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">{tutor.fullName}</h3>
          <BadgeCheck className="w-5 h-5 text-blue-600" />
        </div>

        <p className="text-sm text-gray-600">{tutor.subjects.join(", ")}</p>

        <p className="text-sm mt-1">
          Speaks:{" "}
          <span className="text-gray-600">{tutor.languages.join(", ")}</span>
        </p>

        <p className="text-sm mt-2 line-clamp-2">{tutor.shortBio}</p>

        <p className="text-sm text-gray-500 mt-1">
          📈 Popular · Booked recently
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end justify-between">
        <Heart className="w-5 h-5 text-gray-400 hover:text-pink-500" />

        <div className="text-right">
          <p className="text-xl font-bold">${tutor.hourlyRate}</p>
          <p className="text-xs text-gray-500">
            {tutor.lessonDuration}-min lesson
          </p>
        </div>

        <Button className="bg-pink-500 hover:bg-pink-600">
          Book trial lesson
        </Button>
      </div>
    </div>
    </TutorHoverPreview>
  );
};
