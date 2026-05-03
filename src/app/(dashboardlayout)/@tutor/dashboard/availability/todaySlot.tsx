"use client";

import { useAvailability } from "@/hooks/useAvailability";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

const formatHour = (hour: number) => {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${period}`;
};

const formatDate = (date: string) => {
  return date.split("T")[0];
};

export default function TodaySlot({ datarefresh, setRefresh }: { datarefresh: boolean, setRefresh:(value: boolean) => void; }) {
  const { data: session, isPending } = authClient.useSession();

  const userId = session?.user?.id ?? "";

  const { tutoravailability, refresh } = useAvailability(userId);


 useEffect(() => {
  if (datarefresh) {
    refresh().finally(() => {
      setRefresh(false);
    });
  }
}, [datarefresh, refresh]);

  if (isPending) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">Loading availability...</p>;
  }

  const availableSlots = tutoravailability?.filter(
    (item) => item.status === "available",
  );

  const displayDate =
    availableSlots.length > 0 ? formatDate(availableSlots[0]?.date) : null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
          Today Your Time Slots
        </h3>

        {displayDate && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{displayDate}</p>
        )}

        <div className="grid grid-cols-4 gap-2 text-center text-sm mb-4">
          {availableSlots.length > 0 ? (
            availableSlots.map((slot) => (
              <div
                key={slot.id}
                className=" bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium py-4 rounded-lg border dark:border-green-800 text-sm transition-all"
              >
                {formatHour(slot.hour)}
              </div>
            ))
          ) : (
            <p className="col-span-7 text-slate-500 dark:text-slate-400 text-sm">
              No slots available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
