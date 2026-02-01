import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const tutorDashboard = {
  tutorBio: async function (id: string) {
    const result = await fetch(`${BACKEND_URL}/api/tutor/${id}`, {
      cache: "no-store",
    });

    const data = await result.json();
    return data;
  },

  getMetricsGrid: async function (id: string) {
    const cookieStore = await cookies();

    const allCookies = cookieStore.toString();
    const result = await fetch(
      `${BACKEND_URL}/api/tutor/tutor-metricsgrid/${id}`,
      {
        headers: {
          Cookie: allCookies,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    const data = await result.json();
    return data
    ;
  },
  
};
