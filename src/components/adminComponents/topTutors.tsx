"use client";


import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


type TopTutor = {
  id: string;
  name: string;
  sessions: number;
  earnings: number;
  rating: number;
};

export default function TopTutors() {

const topTutors: TopTutor[] = [
  {
    id: "T-101",
    name: "John Doe",
    sessions: 120,
    earnings: 2450,
    rating: 4.9,
  },
  {
    id: "T-102",
    name: "Sarah Ahmed",
    sessions: 98,
    earnings: 1980,
    rating: 4.8,
  },
  {
    id: "T-103",
    name: "Michael Lee",
    sessions: 87,
    earnings: 1760,
    rating: 4.7,
  },
  {
    id: "T-104",
    name: "Emma Watson",
    sessions: 75,
    earnings: 1520,
    rating: 4.6,
  },
  {
    id: "T-105",
    name: "David Khan",
    sessions: 69,
    earnings: 1390,
    rating: 4.5,
  },
];



  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Top Performing Tutors
        </h2>
        <Button variant="ghost" size="sm" className="text-blue-600">
          View All
        </Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tutor</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Earnings</TableHead>
            <TableHead className="text-right">Rating</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {topTutors.map((tutor) => (
            <TableRow key={tutor.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {tutor.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900">
                    {tutor.name}
                  </span>
                </div>
              </TableCell>

              <TableCell>{tutor.sessions}</TableCell>

              <TableCell className="font-semibold">
                ${tutor.earnings}
              </TableCell>

              <TableCell className="text-right text-green-600 font-medium">
                ★ {tutor.rating}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
