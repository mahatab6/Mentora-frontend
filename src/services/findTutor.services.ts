import { env } from "@/env";

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API;

interface BookingFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  email?: string;
  role?: string;
}

export const findTutor = {
  getAllTutor: async function (queryString = "") {
    const result = await fetch(
      `http://localhost:5000/api/tutor${queryString ? `?${queryString}` : ""}`,
      {
        cache: "no-store",
      },
    );
    const data = await result.json();
    return data;
  },

  getUniqueTutor: async function (id: string) {
    const result = await fetch(`http://localhost:5000/api/tutor/${id}`, {
      cache: "no-store",
    });

    if (!result.ok) return null;
    return await result.json();
  },

  getReview: async function (id:string) {
    const result = await fetch(`${NEXT_PUBLIC_BASE_API}/api/reviews/${id}`, {
      cache: "no-cache"
    });

    if(!result.ok) return null;
    return await result.json();
  },

  getavailability: async function (id: string) {
    const result = await fetch(
      `http://localhost:5000/api/tutor/availability/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!result.ok) return null;
    return await result.json();
  },

  getBooking: async function () {
    const result = await fetch("http://localhost:5000/api/bookings", {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    });

    if (!result.ok) {
      return null;
    }

    return await result.json();
  },

  getEarningsChart: async function (id: string) {
    const result = await fetch(
      `${NEXT_PUBLIC_BASE_API}/api/tutor/earnings-chart/${id}`,
      {
        cache: "no-store",
      },
    );
    const data = await result.json();
    return data;
  },

  getBookingManagement: async function (filters: BookingFilters = {}) {
    const params = new URLSearchParams();

    if (filters.search?.trim()) {
      params.set("search", filters.search.trim());
    }

    if (filters.status && filters.status !== "All") {
      params.set("status", filters.status);
    }

    params.set("page", String(filters.page ?? 1));
    params.set("limit", String(filters.limit ?? 10));

    const url = `${NEXT_PUBLIC_BASE_API}/api/admin/booking-management?${params.toString()}`;

    const result = await fetch(url, {
      cache: "no-store",
    });

    if (!result.ok) {
      throw new Error(`Failed to fetch bookings: ${result.statusText}`);
    }

    return result.json();
  },

  getAllEarningChart: async function () {
    const result = await fetch(
      `${NEXT_PUBLIC_BASE_API}/api/admin/all-earning-chart`,
      {
        cache: "no-store",
      },
    );
    const data = await result.json();
    return data;
  },

  getManageUsers: async function (filters: BookingFilters = {}) {
    const params = new URLSearchParams();

    if (filters.email?.trim()) {
      params.set("email", filters.email.trim());
    }

    if(filters?.role?.trim()){
      params.set("role", filters.role.trim())
    }

    params.set("page", String(filters.page ?? 1));
    params.set("limit", String(filters.limit ?? 10));

    const result = await fetch(`${NEXT_PUBLIC_BASE_API}/api/admin/manage-users?${params.toString()}`, {
      cache: "no-store",
    });

    if (!result.ok) {
      throw new Error(`Failed to fetch bookings: ${result.statusText}`);
    }

    return result.json();
  },

  getCategory: async function () {
    const result = await fetch(`${NEXT_PUBLIC_BASE_API}/api/admin/category`, {
      cache: "no-store"
    })
    
    const data = await result.json();
    return data;
  }

};
