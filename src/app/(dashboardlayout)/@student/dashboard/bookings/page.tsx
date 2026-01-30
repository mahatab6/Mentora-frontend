"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { useState } from "react";

export default function BookingsPage() {
  const [filter, setFilter] = useState<string>("all");

  const bookings = [
    {
      id: 1,
      subject: "Web Development",
      category: "Programming",
      other_party_name: "John Doe",
      date: "2026-02-02T10:00:00Z",
      status: "upcoming",
      price: 1500, // BDT per session
    },
    {
      id: 2,
      subject: "English Speaking",
      category: "Language",
      other_party_name: "Max Smith",
      date: "2026-01-28T14:30:00Z",
      status: "completed",
      price: 1000,
    },
    {
      id: 3,
      subject: "UI/UX Design",
      category: "Design",
      other_party_name: "Sophia Lee",
      date: "2026-01-25T09:00:00Z",
      status: "completed",
      price: 1800,
    },
    {
      id: 4,
      subject: "Data Science",
      category: "Data",
      other_party_name: "Alex Johnson",
      date: "2026-02-05T16:00:00Z",
      status: "upcoming",
      price: 2000,
    },
    {
      id: 5,
      subject: "Business Strategy",
      category: "Business",
      other_party_name: "Emma Wilson",
      date: "2026-01-20T11:00:00Z",
      status: "cancelled",
      price: 2200,
    },
    {
      id: 6,
      subject: "Mathematics",
      category: "Math",
      other_party_name: "Daniel Brown",
      date: "2026-02-10T08:00:00Z",
      status: "upcoming",
      price: 1200,
    },
  ];

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      <div className="mb-6 flex gap-2">
        {["all", "upcoming", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4 font-medium text-gray-900">
                    {booking.other_party_name}
                  </TableCell>

                  <TableCell className="px-6 py-4 text-gray-500">
                    {booking.category}
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(booking.date).toLocaleDateString()}
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
                    ৳{booking.price}
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
