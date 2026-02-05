import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Play, CalendarDays, User, Star } from "lucide-react";
import { useIsDesktop } from "./isDesktop";
import { Tutor } from "@/type";
import Link from "next/link";
import Image from "next/image";

export function TutorHoverPreview({
  tutor,
  children,
}: {
  tutor: Tutor | null;
  children: React.ReactNode;
}) {
  const isDesktop = useIsDesktop();


  if (!isDesktop || !tutor) return <>{children}</>;

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>

      <HoverCardContent
        side="right"
        align="start"
        sideOffset={15}
        className="w-80 p-0 overflow-hidden rounded-2xl border-none shadow-2xl animate-in zoom-in-95 duration-200"
      >
        
        <div className="relative group cursor-pointer h-44 w-full">
          <Image
            src={tutor.photoUrl ?? ''}
            alt={tutor.fullName ?? ''}
            fill
            className="object-cover"
          />
     
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
              <Play className="text-white fill-white w-6 h-6 ml-1" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded uppercase tracking-widest font-bold">
            Watch Intro
          </div>
        </div>

       
        <div className="p-4 space-y-4">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-lg leading-tight">{tutor?.fullName}</h4>
              <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                <span className="text-xs font-bold text-yellow-700">{Number(tutor?.averageRating).toFixed(1)}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {tutor.shortBio}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-semibold border-gray-200">
              <CalendarDays className="w-3.5 h-3.5" />
              Schedule
            </Button> */}
           
            <Button asChild size="sm" className="h-9 bg-blue-600 hover:bg-blue-700">
              <Link href={`/find-tutors/${tutor.tutor_id}`}>
                <User className="w-3.5 h-3.5 mr-2" />
                Profile
              </Link>
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}