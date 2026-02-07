import { env } from "@/env";

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API;




export const adminDashboard = {
  getDashboardCard: async function () {
    const result = await fetch(`${NEXT_PUBLIC_BASE_API}/api/admin/dashboard-card`, {
      cache: "no-store",
    });

    const data = await result.json();
    return data;
  },

  getBookingManagement: async function () {
    const result = await fetch(`${NEXT_PUBLIC_BASE_API}/api/admin/booking-management`, {
      cache: "no-store",
    });

    const data = await result.json();
    return data;
  },

  getTutorById: async function (id: string) {
    const result = await fetch(`${NEXT_PUBLIC_BASE_API}/api/tutor/${id}`, {
      cache: "no-store",
    });

    if (!result.ok) return null;
    return await result.json();
  },


};
