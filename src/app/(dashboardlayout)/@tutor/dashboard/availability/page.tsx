"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import CalendarSection from "@/components/tutorComponents/calendarSection";
import TimeSlotsSection from "@/components/tutorComponents/timeSlots";
import { toast } from "sonner";


type Availability = Record<string, number[]>; // "2025-01-31": [8,9,10,14,...]

export default function TutorAvailabilityPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<Availability>({});

  const formatDateKey = (d: Date) => format(d, "yyyy-MM-dd");

  const handleSave = async () => {
    try {
      // তোমার backend API call এখানে
      // const res = await fetch("/api/tutor/availability", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(availability),
      // });
      // if (!res.ok) throw new Error();
      toast.success("Availability updated successfully.")
     
    } catch (err) {
      toast.error("Failed to save availability.")

    }
  };

  // Optional: backend থেকে initial data লোড
  // useEffect(() => { fetch... }, []);

  return (
    <div className="container  mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Availability</h1>
          <p className="text-muted-foreground mt-1">
            Set when you are available for tutoring sessions
          </p>
        </div>
        <Button
          onClick={handleSave}
          size="lg"
          className="min-w-[140px]"
        >
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        <CalendarSection
          date={date}
          setDate={setDate}
          availability={availability}
          formatDateKey={formatDateKey}
        />

        <TimeSlotsSection
          date={date}
          availability={availability}
          setAvailability={setAvailability}
          formatDateKey={formatDateKey}
        />
      </div>
    </div>
  );
}