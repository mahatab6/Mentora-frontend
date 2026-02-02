
import { useEffect, useState } from "react";
import { BookingManageResponse, UserFilters } from "@/type";
import { findTutor } from "@/services/findTutor.services";


export const useBookingManage = (filters: UserFilters = {}) => {
  const [response, setResponse] = useState<BookingManageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await findTutor.getBookingManagement({
          search: filters.search,
          status: filters.status,
          page: filters.page,
          limit: filters.limit,
        });

        if (mounted) {
          setResponse(result);
        }
      } catch (err: unknown) {
        if (mounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load bookings"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => {
      mounted = false;
    };
  }, [filters.search, filters.status, filters.page, filters.limit]);

  return {
    data: response?.data ?? null,
    loading,
    error,
  };
};