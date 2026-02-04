"use client";

import Loading from "@/app/(dashboardlayout)/loading";
import StudentFeedback from "@/components/studentComponents/studentFeedback";
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

  const { bookings, loading } = useGetBooking()

  if(loading) {
    return <Loading/>
  }

  const bookingInfo:BookingResponse | null = bookings

  const filerBooking = bookingInfo?.data?.result?.filter((S) => {
    if(filter === "all") return true;
    return S.status === filter;
  }) || [];

  status
: 
"completed"

console.log(filerBooking)
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      <div className="mb-6 flex gap-2">
        {["all", "upcoming", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">
                Tutor
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">
                Subject
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">
                Date & Time
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">
                Price
              </TableHead>
              
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-200">
            {filerBooking.length > 0 ? (
              filerBooking?.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4 font-medium text-gray-900">
                    {booking?.tutor?.fullName}
                  </TableCell>

                  <TableCell className="px-6 py-4 text-gray-500">
                    {booking?.subject}
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === "upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : booking.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-gray-500">
                    ${booking.price}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
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
