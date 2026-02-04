"use client";

import { useGetReview } from "@/hooks/useGetReview";
import { authClient } from "@/lib/auth-client";
import { Star, MessageSquare, CornerDownRight, Calendar } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function Feedback() {
  const { data: session } = authClient.useSession();
  const id = session?.user?.id;
  const { review } = useGetReview(id as string);

  const reviews = review?.data ?? [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-orange-500" />
          Recent Feedback ({reviews.length})
        </h2>
        
      </div>

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews?.slice(0,3).map((item) => (
            <div key={item.id} className="group border-b border-gray-50 last:border-0 pb-6 last:pb-0">
         
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-100">
                    <Image
                      src={item.tutor?.photoUrl || "/placeholder-avatar.png"}
                      alt={item.tutor?.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">
                      {item.tutor?.fullName}
                    </h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3 h-3",
                            i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 flex items-center gap-1 uppercase font-semibold">
                  <Calendar className="w-3 h-3" />
                  {formatDate(item.createdAt)}
                </span>
              </div>

         
              <div className="bg-gray-50/50 rounded-lg p-3 ml-13">
                <p className="text-sm text-gray-700 italic">
                  {item.reviewContent}
                </p>
              </div>

             
              {item.replyContent && (
                <div className="mt-3 ml-8 flex gap-3 items-start">
                  <CornerDownRight className="w-4 h-4 text-gray-300 mt-1" />
                  <div className="flex-1 bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        Tutors Response
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {item.replyContent}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">No feedback found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}