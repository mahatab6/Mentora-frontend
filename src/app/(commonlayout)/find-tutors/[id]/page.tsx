"use client";

import { useSingleTutor } from "@/hooks/useSingleTuor";
import { use, useState } from "react";
import TutorProfile from "./tutorProfile";
import LeftColumn from "./leftColumn";
import RightColumn from "./rightColumn";

import Loading from "../../loading";
import BookingWizard from "./bookingWizard";
import { Tutor } from "@/type";


export default function TutorSinglePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [open, setOpen] = useState(false);
  const [refreshs, setRefresh] = useState(false)

  const { singleTutor, loading } = useSingleTutor(id);

  if (loading) return <Loading />;

  
  const tutor: Tutor | null = singleTutor;

  return (
    <div className="container mx-auto py-20 px-4">
      <TutorProfile tutor={tutor} setOpen={setOpen} />


      <div className="grid lg:grid-cols-3 gap-12 py-4">
        <LeftColumn tutor={tutor} />
        <RightColumn id={id} setOpen={setOpen} refreshs={refreshs}/>
      </div>
      <BookingWizard
        isOpen={open}
        onClose={() => setOpen(false)}
        tutor={tutor}
        id={id}
        setRefresh= {() => setRefresh(true)}
      />
    </div>
  );
}
