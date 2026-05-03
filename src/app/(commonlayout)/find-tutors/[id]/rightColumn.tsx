"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAvailability } from "@/hooks/useAvailability";
import { authClient } from "@/lib/auth-client";
import { CalendarDays, Clock, Info, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const formatHour = (hour: number) => {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${period}`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export default function RightColumn({
  id,
  setOpen,
  refreshs,
}: {
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refreshs: boolean;
}) {
  const { data: session } = authClient.useSession();
  const { tutoravailability, loading, refresh } = useAvailability(id);

  useEffect(() => {
    if (refreshs) {
      refresh();
    }
  }, [refreshs, refresh]);

  if (loading) {
    return (
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm sticky top-24 space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    );
  }

  const availableSlots = tutoravailability.filter(
    (item) => item.status === "available"
  );

  const displayDate =
    availableSlots.length > 0 ? formatDate(availableSlots[0].date) : null;

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-2xl shadow-xl shadow-primary/5 border border-border sticky top-24 transition-all">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Availability
          </h3>
          {availableSlots.length > 0 && (
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          )}
        </div>

        {displayDate ? (
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-2 rounded-lg w-fit">
            <Clock className="h-4 w-4" />
            <span>Next session: {displayDate}</span>
          </div>
        ) : (
          <div className="mb-4 flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <Info className="h-4 w-4 text-blue-500 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-400">
              No immediate slots. View the full calendar to find future openings.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
          {availableSlots.length > 0 ? (
            availableSlots.slice(0, 4).map((slot) => (
              <div
                key={slot.id}
                className="bg-green-500/10 dark:bg-green-500/5 text-green-700 dark:text-green-400 font-semibold py-3 px-2 rounded-xl border border-green-500/20 text-center text-xs tracking-tight transition-all hover:bg-green-500/20"
              >
                {formatHour(slot.hour)}
              </div>
            ))
          ) : (
            <div className="col-span-2 py-8 text-center border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground text-sm italic">Fully Booked</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Button
            disabled={!session}
            onClick={() => setOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-md font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
          >
            {availableSlots.length > 0 ? "Book a Class" : "View Full Schedule"}
          </Button>

          {!session && (
            <p className="text-[11px] text-center text-muted-foreground leading-tight px-4">
              Join Mentora today to book professional sessions with our expert tutors.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}