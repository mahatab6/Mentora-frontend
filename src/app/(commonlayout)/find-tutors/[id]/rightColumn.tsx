"use client";

import { Button } from "@/components/ui/button";
import { useAvailability } from "@/hooks/useAvailability";
import { authClient } from "@/lib/auth-client";

import { Dispatch, SetStateAction, useEffect } from "react";

const formatHour = (hour: number) => {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${period}`;
};

const formatDate = (date: string) => {
  return date.split("T")[0];
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
    return <p className="text-sm text-gray-500">Loading availability...</p>;
  }

  const availableSlots = tutoravailability.filter(
    (item) => item.status === "available",
  );

  const displayDate =
    availableSlots.length > 0 ? formatDate(availableSlots[0].date) : null;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
        <h3 className="font-bold text-lg text-gray-900 mb-1">
          Available Times
        </h3>

        {displayDate && (
          <p className="text-sm text-gray-500 mb-4">{displayDate}</p>
        )}

        <div className="grid grid-cols-4 gap-2 text-center text-sm mb-4">
          {availableSlots.length > 0 ? (
            availableSlots.map((slot) => (
              <div
                key={slot.id}
                className=" bg-green-100 text-green-700 font-medium py-4 rounded-lg border text-sm transition-all"
              >
                {formatHour(slot.hour)}
              </div>
            ))
          ) : (
            <p className="col-span-7 text-gray-500 text-sm">
              No slots available
            </p>
          )}
        </div>

        <Button
          disabled={!session}
          onClick={() => setOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white"
        >
          Check Schedule
        </Button>
      </div>
    </div>
  );
}
