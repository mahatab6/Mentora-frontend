export type BookingSlot = {
  id: number;
  subject: string;
  price: number;
  durationMinutes: number;
  startTime: string; 
  status: 'upcoming' | 'completed' | 'canceled';
  studentId: string;
  tutorId: string;
  createdAt: string | Date; 
  tutor: {
    fullName: string;
  };
};