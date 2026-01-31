import { findTutor } from "@/services/findTutor.services";
import { notFound } from "next/navigation";
import TutorProfile from "./tutorProfile";
import LeftColumn from "./leftColumn";
import RightColumn from "./rightColumn";


interface Props {
  params: Promise<{ id: string }>;
}

export default async function TutorSinglePage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const response = await findTutor.getUniqueTutor(id);

  // const [open, setOpen] = useState(false);

  if (!response || !response.data) {
    return notFound();
  }

  const tutor = response.data;

  return (
    <div className="container mx-auto py-20 px-4">
      <TutorProfile tutor={tutor} />

      <div className="grid lg:grid-cols-3 gap-12 py-4">
        <LeftColumn tutor={tutor} />
        <RightColumn />
      </div>
      {/* <BookingWizard
        isOpen={open}
        onClose={() => setOpen(false)}
        tutor={tutor}
      /> */}
    </div>
  );
}
