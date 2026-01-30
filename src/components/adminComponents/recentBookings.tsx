"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";

type Booking = {
  id: string;
  subject: string;
  price: number;
  status: "completed" | "pending" | "cancelled";
};

export default function RecentBookings() {

  

const generateBookings: Booking[] = [
  {
    id: "BK-1021",
    subject: "Web Development",
    price: 45,
    status: "completed",
  },
  {
    id: "BK-1022",
    subject: "English Speaking",
    price: 30,
    status: "pending",
  },
  {
    id: "BK-1023",
    subject: "UI/UX Design",
    price: 50,
    status: "completed",
  },
  {
    id: "BK-1024",
    subject: "Data Science",
    price: 60,
    status: "cancelled",
  },
  {
    id: "BK-1025",
    subject: "Business Strategy",
    price: 40,
    status: "completed",
  },
];


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Recent Bookings
        </h2>
        <Button variant="ghost" size="sm" className="text-blue-600">
          View All
        </Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {generateBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                {booking.id}
              </TableCell>
              <TableCell>{booking.subject}</TableCell>
              <TableCell>${booking.price}</TableCell>
              <TableCell>
                <StatusBadge status={booking.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
