export type BookingStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled";

export interface Booking {
  id: string;
  studentName: string;
  tutorName: string;
  subject: string;
  date: string;
  status: BookingStatus;
  price: number;
}

const statuses: BookingStatus[] = [
  "Confirmed",
  "Pending",
  "Completed",
  "Cancelled",
];

const subjects = ["Math", "Physics", "English", "Biology", "ICT"];

export const generateBookings = (count = 20): Booking[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `BK-${1000 + i}`,
    studentName: `Student ${i + 1}`,
    tutorName: `Tutor ${i + 1}`,
    subject: subjects[i % subjects.length],
    date: new Date().toLocaleDateString(),
    status: statuses[i % statuses.length],
    price: 20 + (i % 5) * 10,
  }));
