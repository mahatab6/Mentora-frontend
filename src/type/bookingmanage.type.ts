
export type SessionStatus = "pending" | "scheduled" | "completed" | "cancelled" | "upcoming";

export interface UserSummary {
  name?: string;
  fullName?: string;
}

export interface TutoringSession {
  id: number;
  createdAt: string;
  startTime: string;
  durationMinutes: number;
  price: number;
  subject: string;
  studentId: string;
  status: SessionStatus;
  tutorId: string;
  student: {
    name: string;
  };
  tutor: {
    fullName: string;
  };
}

export interface BookingMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BookingManageResponse {
  success: boolean;
  message: string;
  data: {
    bookings: TutoringSession[];
    meta: BookingMeta;
  };
}

export interface UserFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  email?: string;
  role?: string;
  
}
