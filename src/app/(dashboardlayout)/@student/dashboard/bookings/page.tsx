"use client";

import Loading from "@/app/(dashboardlayout)/loading";
import StudentFeedback from "@/components/studentComponents/studentFeedback";
import StudentStatus from "@/components/studentComponents/studentStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBooking } from "@/hooks/useGetBooking";
import { BookingResponse } from "@/type";
import { Calendar } from "lucide-react";
import { useState } from "react";

export default function BookingsPage() {
  const [filter, setFilter] = useState<string>("all");

  const { bookings, loading, refresh } = useGetBooking();

  if (loading) {
    return <Loading />;
  }

  const bookingInfo: BookingResponse | null = bookings;

  const filerBooking =
    bookingInfo?.data?.result?.filter((S) => {
      if (filter === "all") return true;
      return S.status === filter;
    }) || [];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Bookings</h1>

      <div className="mb-6 flex gap-2">
        {["all", "upcoming", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
            <TableRow>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                Tutor
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                Subject
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                Date & Time
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                Price
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filerBooking.length > 0 ? (
              filerBooking?.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <TableCell className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    {booking?.tutor?.fullName}
                  </TableCell>

                  <TableCell className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {booking?.subject}
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === "upcoming"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                          : booking.status === "completed"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    ${booking.price}
                  </TableCell>

                  <TableCell className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {booking.status === "completed" ? (
                      <StudentFeedback
                        studentId={booking.studentId}
                        tutorId={booking.tutorId}
                      />
                    ) : booking.status === "upcoming" ? (
                      <StudentStatus id={booking.id} refresh={refresh}/>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                >
                  No bookings found in this category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
