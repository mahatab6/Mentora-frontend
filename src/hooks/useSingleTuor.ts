import { findTutor } from "@/services/findTutor.services";
import { AllTutorResponse } from "@/type";
import { useEffect, useState } from "react";


export const useSingleTutor = (id: string) => {
  const [singleTutor, setTutors] = useState<AllTutorResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTutorData = async () => {
        setLoading(true);
      try {
        const data = await findTutor.getUniqueTutor(id)
        setTutors(data);
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
  }, [id]);

  return { singleTutor, loading, error };
};
