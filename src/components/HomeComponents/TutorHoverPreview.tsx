import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

import { useIsDesktop } from "./isDesktop";
import { TutorType } from "@/type";


export function TutorHoverPreview({
  tutor,
  children,
}: {
  tutor: TutorType;
  children: React.ReactNode;
}) {
  const isDesktop = useIsDesktop();

  if (!isDesktop) return <>{children}</>;

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>

      <HoverCardContent
        side="right"
        align="start"
        className="w-94 p-4 rounded-xl ml-2"
      >
        {/* Video Preview */}
        <div className="relative rounded-lg overflow-hidden mb-4">
          <img
            src={tutor.photoUrl}
            alt={tutor.fullName}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
              <Play className="text-white ml-1" />
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mb-2">
          View full schedule
        </Button>
        <Button className="w-full">See profile</Button>
      </HoverCardContent>
    </HoverCard>
  );
}
