import { BadgeCheck, Star, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export type TutorType = {
  id: number;
  name: string;
  subject: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  verified?: boolean;
  sessions?: number;
};

export const TutorCard = ({ tutor }: { tutor: TutorType }) => {
  return (
    <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-4">
        <img
          src={tutor.image}
          alt={`${tutor.name} - ${tutor.subject} tutor`}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-500 transition"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg text-gray-900">
              {tutor.name}
            </h3>
            {tutor.verified && (
              <BadgeCheck className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <p className="text-sm text-gray-600">{tutor.subject}</p>
        </div>
      </div>

      {/* Rating + Price */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-900">
            {tutor.rating.toFixed(1)}
          </span>
          <span className="text-gray-500">({tutor.reviews})</span>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-blue-600">${tutor.price}</p>
          <p className="text-xs text-gray-500">per hour</p>
        </div>
      </div>

      {/* Sessions */}
      {tutor.sessions && (
        <p className="mt-2 text-sm text-gray-600">
          🎓 {tutor.sessions}+ sessions completed
        </p>
      )}

      {/* CTA */}
      <Button
        variant="outline"
        className="w-full mt-5 flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white transition-all"
      >
        View Profile
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};
