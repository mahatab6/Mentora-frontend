"use client";

import React from "react";
import { Button } from "../ui/button";
import { StatusBadge } from "../adminComponents/StatusBadge";
import { Clock, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// ---------------------- Mock Data ----------------------
const mockUpcomingSessions = [
  {
    id: 1,
    studentName: "Alex Johnson",
    studentImage:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    subject: "Calculus I",
    date: "Today, 2:00 PM",
    duration: "1 hour",
    status: "Confirmed",
  },
  {
    id: 2,
    studentName: "Sarah Williams",
    studentImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    subject: "Physics Lab",
    date: "Tomorrow, 10:00 AM",
    duration: "1.5 hours",
    status: "Pending",
  },
  {
    id: 3,
    studentName: "Michael Brown",
    studentImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    subject: "Linear Algebra",
    date: "Jan 25, 4:00 PM",
    duration: "1 hour",
    status: "Confirmed",
  },
];


const handleAction = (message: string) => {
  alert(message);
};


export default function UpcomingSessions() {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="space-y-4">
      {mockUpcomingSessions.map((session) => (
        <div
          key={session.id}
          className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md hover:border-blue-200 transition-all bg-white"
        >

          <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
            <Avatar className="h-14 w-14">
              <AvatarImage src={session.studentImage} alt={session.studentName} />
              <AvatarFallback>{session.studentName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{session.studentName}</h3>
              <p className="text-sm text-gray-500">{session.subject}</p>
            </div>
          </div>


          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                <Clock className="h-4 w-4 text-gray-400" />
                {session.date}
              </div>
              <p className="text-xs text-gray-500">{session.duration}</p>
            </div>

            <StatusBadge status={session.status} />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleAction("Session Options")}
              className="hover:bg-gray-100"
            >
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
