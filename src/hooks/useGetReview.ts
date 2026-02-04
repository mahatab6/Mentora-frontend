import { useEffect, useState, useCallback } from "react";
import { findTutor } from "@/services/findTutor.services";
import { ReviewResponse } from "@/type";

export const useGetReview = (id: string) => {
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await findTutor.getReview(id as string);
      setReview(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [id]);

 
  useEffect(() => {
    fetchReview();
  }, [id]);

  return {
    review,
    loading,
    error,
    refresh: fetchReview, 
  };
};