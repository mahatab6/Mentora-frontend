"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import CalendarSection from "@/components/tutorComponents/calendarSection";
import TimeSlotsSection from "@/components/tutorComponents/timeSlots";
import { toast } from "sonner";

type Availability = Record<string, number[]>;

export default function TutorAvailabilityPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<Availability>({});
  const [datarefresh, setRefresh] = useState(false)
  const [clear, setClear] = useState(false)

  const formatDateKey = (d: Date) => format(d, "yyyy-MM-dd");

  const handleSave = async () => {
    const [date, hours] = Object.entries(availability)[0];

    const payload = {
      date,
      hours,
    };
    const toastId = toast.loading("Saving availability...");
    try {
      const res = await fetch(
        "http://localhost:5000/api/tutor/manage-availability",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        toast.error("Failed to save availability", { id: toastId });
        return;
      }

      toast.success("Availability saved successfully!", { id: toastId });
      setClear(true)
      setRefresh(true)
    } catch (error) {
      console.error("Availability error:", error);
      toast.error("Something went wrong while saving availability", {
        id: toastId,
      });
    }
  };
  return (
    <div className="container  mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Manage Availability
          </h1>
          <p className="text-muted-foreground mt-1">
            Set when you are available for tutoring sessions
          </p>
        </div>
        <Button onClick={handleSave} size="lg" className="min-w-[140px] hover:cursor-pointer">
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        <CalendarSection
          date={date}
          setDate={setDate}
          availability={availability}
          formatDateKey={formatDateKey}
          datarefresh={datarefresh}
          setRefresh={setRefresh}
        />

        <TimeSlotsSection
          date={date}
          availability={availability}
          setAvailability={setAvailability}
          formatDateKey={formatDateKey}
          clear={clear}
          setClear= {setClear}
        />
      </div>
    </div>
  );
}
