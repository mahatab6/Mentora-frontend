import { findTutor } from "@/services/findTutor.services";
import { BookingResponse } from "@/type";
import { useEffect, useState } from "react";

export const useGetBooking = () => {
  const [bookings, setBooking] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTutorData = async () => {
    setLoading(true);
    try {
      const data = await findTutor.getBooking();
      setBooking(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTutorData();
  }, []);

  return { bookings, loading, error, refresh:getTutorData };
};
