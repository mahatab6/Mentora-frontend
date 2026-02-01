"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { useAvailability } from "@/hooks/useAvailability";
import { toast } from "sonner";
import { Tutor } from "@/type";

// interface Tutor {
//   id: string;
//   name: string;
//   subjects: string[];
//   hourlyRate: number;
// }

interface Availability {
  id: number;
  date: string;
  hour: number;
  status: string;
  tutor_id: string;
}

interface BookingData {
  subject: string;
  date: Date;
  timeSlot: string;
  duration: number;
  selectedSlotId: string | number | undefined;
}

type BookingWizardProps = {
  isOpen: boolean;
  onClose: () => void;
  tutor: Tutor| undefined ;
  id: string;
};

const steps = [
  { id: 1, title: "Select Topic" },
  { id: 2, title: "Date & Time" },
  { id: 3, title: "Review & Confirm" },
] as const;

const formatHour = (hour: number): string => {
  const period = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${period}`;
};

export default function BookingWizard({
  isOpen,
  onClose,
  tutor,
  id,
}: BookingWizardProps) {
  const { tutoravailability } = useAvailability(id);

  const availableSlots =
    tutoravailability?.filter((item) => item.status === "available") ?? [];

  const [currentStep, setCurrentStep] = useState(1);


  const [bookingData, setBookingData] = useState<BookingData>({
    subject: tutor?.subjects?.[0] ?? "",
    date: new Date(),
    timeSlot: "",
    duration: 60,
    selectedSlotId: tutor?.id,
  });

  const totalPrice = (bookingData.duration / 60) * (tutor?.hourlyRate ?? 0);

  const handleNext = () => setCurrentStep((p) => Math.min(p + 1, 3));
  const handleBack = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const handleConfirm = async () => {
    if (!tutor) return;

     const toastId = toast.loading("BOOKING...");

    const payload = {
      tutorId: id,
      subject: bookingData.subject,
      startTime: bookingData.timeSlot,
      durationMinutes: bookingData.duration,
      price: totalPrice,
      id: bookingData.selectedSlotId,
    };

    try {
      const res = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      

      if (res.ok === false) {
        toast.error("Failed to BOOKING", { id: toastId });
        onClose();
        return
      }
  
      toast.success("FINAL BOOKING successfully!", { id: toastId });
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (!tutor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-650px p-0 overflow-hidden">
        <div className="bg-gray-50 p-6 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Book Session with {tutor.fullName}
            </DialogTitle>
            <p className="text-sm text-gray-500 mt-1">
              Step {currentStep} of 3 — {steps[currentStep - 1].title}
            </p>
          </DialogHeader>
        </div>

        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {/* Step 1: Subject */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {tutor.subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setBookingData((p) => ({ ...p, subject }))}
                  className={`p-4 rounded-xl border-2 flex justify-between w-full transition-colors ${
                    bookingData.subject === subject
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span>{subject}</span>
                  {bookingData.subject === subject && (
                    <Check className="h-5 w-5" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <div>
              <label className="text-sm font-medium mb-3 block">
                Available Times
              </label>

              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {availableSlots.map((slot) => {
                    const label = formatHour(slot.hour);
                    const isSelected = bookingData.selectedSlotId === slot.id;

                    return (
                      <button
                        key={slot.id}
                        onClick={() =>
                          setBookingData((p) => ({
                            ...p,
                            timeSlot: label,
                            selectedSlotId: slot.id,
                            date: new Date(slot.date),
                          }))
                        }
                        className={`py-3 rounded-lg border text-center font-medium transition-all ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  No available slots for this tutor at the moment.
                </div>
              )}

              <div className="mt-8">
                <label className="text-sm font-medium mb-2 block">
                  Duration
                </label>
                <select
                  value={bookingData.duration}
                  onChange={(e) =>
                    setBookingData((p) => ({
                      ...p,
                      duration: Number(e.target.value),
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                  <option value={120}>120 minutes</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="bg-gray-50 p-5 rounded-lg border">
                <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-3">
                  <dt className="font-medium text-gray-700">Subject</dt>
                  <dd>{bookingData.subject}</dd>

                  <dt className="font-medium text-gray-700">Date</dt>
                  <dd className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {format(bookingData.date, "PPP")}
                  </dd>

                  <dt className="font-medium text-gray-700">Time</dt>
                  <dd className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {bookingData.timeSlot}
                  </dd>

                  <dt className="font-medium text-gray-700">Duration</dt>
                  <dd>{bookingData.duration} minutes</dd>

                  <dt className="font-bold text-lg pt-3">Total Price</dt>
                  <dd className="font-bold text-lg text-blue-600 pt-3">
                    ${totalPrice.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between p-6 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !bookingData.subject) ||
                (currentStep === 2 && !bookingData.timeSlot)
              }
            >
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleConfirm}
              disabled={!bookingData.selectedSlotId}
              className="bg-green-600 hover:bg-green-700"
            >
              {"Confirm & Pay"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
