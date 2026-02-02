export type UserRole = "STUDENT" | "TUTOR" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
}

export interface PaginationMetaa {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardData {
  users: User[];
  meta: PaginationMetaa;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export interface UserFilters{
  email?: string;
  role?: string;
  page?: number;
  limit?: number;
}