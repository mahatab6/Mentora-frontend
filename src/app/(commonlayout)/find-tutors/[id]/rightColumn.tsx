import { Button } from "@/components/ui/button";
import React from "react";

export default function RightColumn() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
        <h3 className="font-bold text-lg text-gray-900 mb-4">Availability</h3>

        <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
          {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
            <span key={d.indexOf(d)} className="text-gray-400 font-medium">
              {d}
            </span>
          ))}
          {Array.from({ length: 31 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center rounded-md text-xs
                              ${[2, 5, 12, 15, 22].includes(i) ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-500"}
                           `}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-600 mb-6">
          <p className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Available
            dates
          </p>
          <p>
            Next available:{" "}
            <span className="font-semibold text-gray-900">
              Tomorrow, 10:00 AM
            </span>
          </p>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Check Full Schedule
        </Button>
      </div>
    </div>
  );
}
