import { env } from "@/env";
import { cookies } from "next/headers";

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API;

export const tutorDashboard = {
  tutorBio: async function (id: string) {
    const result = await fetch(`${NEXT_PUBLIC_BASE_API}/api/tutor/${id}`, {
      cache: "no-store",
    });

    const data = await result.json();
    return data;
  },

  getBooking: async function (id: string) {
    const result = await fetch(`${NEXT_PUBLIC_BASE_API}/api/tutor/booking/${id}`, {
      cache: "no-store",
    });

    const data = await result.json();
    return data;
  },

  getMetricsGrid: async function (id: string) {
    const cookieStore = await cookies();

    const allCookies = cookieStore.toString();
    const result = await fetch(
      `${NEXT_PUBLIC_BASE_API}/api/tutor/tutor-metricsgrid/${id}`,
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
