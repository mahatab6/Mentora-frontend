
export type BookingSlot = {
  id: number;
  subject: string;
  price: number;
  durationMinutes: number;
  startTime: string;
  status: "upcoming" | "completed" | "cancelled";
  studentId: string;
  tutorId: string;
  createdAt: string | Date;
  tutor: {
    fullName: string;
  };
  student: {
    name: string;
  };
};


export type BookingResponse = {
  success: true;
  data: {
    result: BookingSlot[];
    totalSessions: number;
    upcomingSessions: number;
    totalSpend: number;
  };
};