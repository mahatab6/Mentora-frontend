import { findTutor } from "@/services/findTutor.services";
import { useEffect, useState } from "react";

type Availability = {
  id: number;
  date: string;
  hour: number;
  status: string;
  tutor_id: string;
};

type AvailabilityResponse = {
  success: boolean;
  data: Availability[];
};


export const useAvailability = (id: string) => {
  const [tutoravailability, setTutors] =
    useState<Availability[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTutorData = async () => {
      setLoading(true);
      try {
        const res: AvailabilityResponse =
          await findTutor.getavailability(id);

        setTutors(res.data);
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

  return { tutoravailability, loading, error };
};

