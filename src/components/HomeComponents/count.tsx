"use client";

import { cn } from "@/lib/utils";
import CountUp from "react-countup";
import { FaStar } from "react-icons/fa";

export default function CountPage() {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-32 px-4 bg-[#F0F6FF]")}>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          
      
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">
              <CountUp end={100000} />+
            </h3>
            <p className="text-sm text-muted-foreground">
              Experienced tutors
            </p>
          </div>

       
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">
              <CountUp end={300000} />+
            </h3>
            <p className="text-sm text-muted-foreground">
              5-star tutor reviews
            </p>
          </div>

       
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">
              <CountUp end={120} />+
            </h3>
            <p className="text-sm text-muted-foreground">
              Subjects taught
            </p>
          </div>

        
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">
              <CountUp end={180} />+
            </h3>
            <p className="text-sm text-muted-foreground">
              Tutor nationalities
            </p>
          </div>

     
          <div className="space-y-2">
            <h3 className="text-3xl font-bold flex items-center justify-center gap-1">
              4.8 <FaStar className="text-yellow-400" />
            </h3>
            <p className="text-sm text-muted-foreground">
              on the App Store
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
