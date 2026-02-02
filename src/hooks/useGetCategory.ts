import { findTutor } from "@/services/findTutor.services";

import { useEffect, useState } from "react";

type categoryResponse = {
  id: number;
  name: string;
  description: string;
};

export const useGetCategory = () => {
  const [category, setCategory] = useState<categoryResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTutorData = async () => {
      setLoading(true);
      try {
        const data = await findTutor.getCategory();
        setCategory(data.data);
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

  return { category, loading, error, refresh:getTutorData };
};
