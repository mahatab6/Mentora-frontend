"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircleMore, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { env } from "@/env";

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API;

export default function StudentFeedback({
  studentId,
  tutorId,
}: {
  studentId: string;
  tutorId: string;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      return toast.error("Please select a rating!");
    }

    setLoading(true);
    const payload = {
      rating,
      reviewContent,
      tutor_id: tutorId,
      student_id: studentId,
    };

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        return;
      }
      const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/reviews`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error();

      toast.success("Feedback submitted successfully!");
      setOpen(false);
      setRating(0);
      setReviewContent("");
    } catch (error) {
      toast.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-blue-600 transition-colors hover:cursor-pointer"
        >
          <MessageCircleMore className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-425px rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Write a Review
          </DialogTitle>
          <DialogDescription>
            Share your experience with the tutor. Your feedback helps other
            students make better choices.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-3 text-center">
            <label className="text-sm font-semibold text-gray-700">
              How was your experience?
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-colors",
                      (hover || rating) >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Detailed Feedback
            </label>
            <Textarea
              placeholder="What did you like or what can be improved?"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              className="min-h-120px rounded-xl focus-visible:ring-blue-500 border-gray-200"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-lg hover:cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white min-w-120px rounded-lg shadow-md shadow-blue-100"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
