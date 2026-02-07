import { BookingResponse } from "@/type";
import { useEffect, useState, useCallback } from "react";

export const useGetBooking = () => {
  const [bookings, setBookings] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔁 refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = async (): Promise<void> => {
  setRefreshKey((prev) => prev + 1);
};


  useEffect(() => {
    let isMounted = true;

    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Unauthorized");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/api/bookings`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-cache",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();

        if (isMounted) {
          setBookings(data);
        }
      } catch (err: unknown) {
        if (!isMounted) return;

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]); 

  return { bookings, loading, error, refresh };
};
