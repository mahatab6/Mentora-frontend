"use client";

import { Button } from "@/components/ui/button";
import { useGetBooking } from "@/hooks/useGetBooking";
import { findTutor } from "@/services/findTutor.services";

import { BookOpen, Calendar, Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import Loading from "../../loading";
import { BookingResponse } from "@/type";

export default function DashboardPage() {
  const { bookings, loading } = useGetBooking();

  if (loading) {
    return <Loading />;
  }

  const bookingInfo: BookingResponse | null = bookings;

  const filter = bookingInfo?.data.result ?? [];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome back, Mike Smith
      </h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Upcoming Sessions</p>
            <p className="text-2xl font-bold text-gray-900">
              {bookings?.data.upcomingSessions}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed Lessons</p>
            <p className="text-2xl font-bold text-gray-900">
              {bookings?.data.totalSessions}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-full text-orange-600">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">
              {bookings?.data.totalSpend}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
          <Link href={"/dashboard/bookings"}>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {filter?.length > 0 ? (
          <div className="space-y-4">
            {filter?.slice(0, 5)?.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {booking.subject}
                    </h3>
                    <p className="text-sm text-gray-500">
                      with {booking.tutor.fullName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                      booking.status === "upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No bookings yet. Start learning today!
            </p>
            <Link href={"/"}>
              <Button className="mt-4 bg-blue-600 text-white">
                Find a Tutor
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
