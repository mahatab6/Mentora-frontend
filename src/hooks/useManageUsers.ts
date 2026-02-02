import { useEffect, useState } from "react";

import { findTutor } from "@/services/findTutor.services";
import { DashboardResponse, UserFilters } from "@/type";

export const useManageUsers = (filters: UserFilters = {}) => {
  const [response, setResponse] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await findTutor.getManageUsers({
          email: filters.email,
          role: filters.role,
          page: filters.page,
          limit: filters.limit,
        });
        if (mounted) setResponse(result);
      } catch (err: unknown) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load users");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      mounted = false;
    };
  }, [filters.page, filters.role, filters.limit, filters.email]);

  return {
    data: response?.data ?? null,
    loading,
    error,
  };
};
