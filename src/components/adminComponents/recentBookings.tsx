
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
import { adminDashboard } from "@/services/admin/adminDashboard.services";
import Link from "next/link";

type Booking = {
  id: string;
  subject: string;
  price: number;
  status: "completed" | "pending" | "cancelled";
};

export default async function RecentBookings() {


  const data = await adminDashboard.getBookingManagement();

  const generateBookings: Booking[] = data?.data?.bookings

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Recent Bookings
        </h2>
        <Link href={"/dashboard/bookings"}>
        <Button variant="ghost" size="sm" className="text-blue-600">
          View All
        </Button>
        </Link>
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
          {generateBookings.slice(0,5).map((booking) => (
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
