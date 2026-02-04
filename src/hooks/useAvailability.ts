import { findTutor } from "@/services/findTutor.services";
import { useEffect, useState, useCallback } from "react";

// Types
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
  const [tutoravailability, setTutors] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTutorData = useCallback(async () => {
    if (!id) return; 

    setLoading(true);
    setError(null); 

    try {
      const res: AvailabilityResponse = await findTutor.getavailability(id);
      
      if (res.success) {
        setTutors(res.data);
      } else {
        throw new Error("Failed to fetch availability");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getTutorData();
  }, [getTutorData]);

  return { 
    tutoravailability, 
    loading, 
    error, 
    refresh: getTutorData 
  };
};