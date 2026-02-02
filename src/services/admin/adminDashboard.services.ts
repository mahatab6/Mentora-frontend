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
}