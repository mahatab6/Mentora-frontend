"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, MoreHorizontal, Search } from "lucide-react";
import { StatusBookingBadge } from "@/components/adminComponents/bookingPage/StatusBookinBadge";
import { generateBookings } from "@/components/adminComponents/bookingPage/generateBookings";

export default function BookingsPage() {
  const [bookings] = useState(generateBookings(25));
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBookings = bookings.filter(
    (b) => statusFilter === "All" || b.status === statusFilter,
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage all platform sessions.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border shadow-sm">
        {/* Filters */}
        <div className="p-4 border-b flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search bookings..." className="pl-9" />
          </div>

          <div className="flex gap-2 flex-wrap">
            {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map(
              (status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={statusFilter === status ? "default" : "outline"}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ),
            )}
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Parties</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-mono text-xs">
                  {booking.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{booking.studentName}</span>
                    <span className="text-xs text-muted-foreground">
                      with {booking.tutorName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{booking.subject}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>
                  <StatusBookingBadge status={booking.status} />
                </TableCell>
                <TableCell className="font-medium">${booking.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer */}
        <div className="p-4 border-t text-sm text-muted-foreground text-center">
          Showing {filteredBookings.length} bookings
        </div>
      </div>
    </div>
  );
}
