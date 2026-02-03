import { env } from "@/env";

const BACKEND_URL = env.BACKEND_URL;




export const adminDashboard = {
  getDashboardCard: async function () {
    const result = await fetch(`${BACKEND_URL}/api/admin/dashboard-card`, {
      cache: "no-store",
    });

    const data = await result.json();
    return data;
  },

  getBookingManagement: async function () {
    const result = await fetch(`${BACKEND_URL}/api/admin/booking-management`, {
      cache: "no-store",
    });

    const data = await result.json();
    return data;
  },

  getTutorById: async function (id: string) {
    const result = await fetch(`http://localhost:5000/api/tutor/${id}`, {
      cache: "no-store",
    });

    if (!result.ok) return null;
    return await result.json();
  },


};
