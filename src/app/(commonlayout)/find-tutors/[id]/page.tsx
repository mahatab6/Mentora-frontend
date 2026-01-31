"use client";

import { useSingleTutor } from "@/hooks/useSingleTuor";
import { use, useState } from "react";
import TutorProfile from "./tutorProfile";
import LeftColumn from "./leftColumn";
import RightColumn from "./rightColumn";
import { Button } from "@/components/ui/button";
import Loading from "../../loading";
import BookingWizard from "./bookingWizard";

export default function TutorSinglePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [open, setOpen] = useState(false);

  const { singleTutor, loading } = useSingleTutor(id);

  if (loading) return <Loading />;

  
  const tutor = singleTutor?.data;

  return (
    <div className="container mx-auto py-20 px-4">
      <TutorProfile tutor={tutor} />

      <Button onClick={() => setOpen(true)}>Book Now</Button>

      <div className="grid lg:grid-cols-3 gap-12 py-4">
        <LeftColumn tutor={tutor} />
        <RightColumn id={id}/>
      </div>
      <BookingWizard
        isOpen={open}
        onClose={() => setOpen(false)}
        tutor={tutor}
      />
    </div>
  );
}
