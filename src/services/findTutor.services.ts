import { env } from "@/env";

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API;

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
        cache: "no-cache"
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
  
};

