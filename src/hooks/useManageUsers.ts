import { useEffect, useState, useCallback } from "react";
import { findTutor } from "@/services/findTutor.services";
import { DashboardResponse, UserFilters } from "@/type";

export const useManageUsers = (filters: UserFilters = {}) => {
  const [response, setResponse] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await findTutor.getManageUsers({
        email: filters.email,
        role: filters.role,
        page: filters.page,
        limit: filters.limit,
      });
      setResponse(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [filters.page, filters.role, filters.limit, filters.email]);

 
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    data: response?.data ?? null,
    loading,
    error,
    refresh: fetchUsers, 
  };
};