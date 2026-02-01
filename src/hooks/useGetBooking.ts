import { findTutor } from "@/services/findTutor.services";
import { BookingSlot } from "@/type";
import { useEffect, useState } from "react";

export const useGetBooking = () => {
     const [bookings, setBooking] = useState<BookingSlot []| null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        const getTutorData = async () => {
            setLoading(true);
          try {
            const data = await findTutor.getBooking()
            setBooking(data?.data);
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
    
        getTutorData();
      }, []);
    
      return { bookings, loading, error };
}