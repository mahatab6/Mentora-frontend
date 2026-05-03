"use client";

import { useSingleTutor } from "@/hooks/useSingleTuor";
import { use, useState } from "react";
import TutorProfile from "./tutorProfile";
import LeftColumn from "./leftColumn";
import RightColumn from "./rightColumn";

import Loading from "../../loading";
import BookingWizard from "./bookingWizard";
import { Tutor } from "@/type";
import RelatedMentors from "./relatedMentors";


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
    <div className="min-h-screen bg-background">
      <TutorProfile tutor={tutor} setOpen={setOpen} />


      <div className="container mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          <LeftColumn tutor={tutor} />
          <aside>
            <RightColumn id={id} setOpen={setOpen} refreshs={refreshs}/>
          </aside>
        </div>

        {/* AI Recommendations */}
        <hr className="my-16 border-border" />
        <RelatedMentors category={tutor?.category ?? ""} currentId={id} />
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
