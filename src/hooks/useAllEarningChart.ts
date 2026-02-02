import { findTutor } from "@/services/findTutor.services";
import { useEffect, useState } from "react";

type Earnig = {
  price: number;
  createdAt: string;
};

export const useAllEarning = () => {
  const [allEarning, setEarningsChart] = useState<Earnig [] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTutorData = async () => {
        setLoading(true);
      try {
        const data = await findTutor.getAllEarningChart()
        setEarningsChart(data?.data);
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

  return { allEarning, loading, error };
};