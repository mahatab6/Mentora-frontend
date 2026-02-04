import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import TodaySlot from "@/app/(dashboardlayout)/@tutor/dashboard/availability/todaySlot";

interface CalendarSectionProps {
  date: Date;
  setDate: (date: Date) => void;
  availability: Record<string, number[]>;
  formatDateKey: (d: Date) => string;
}

export default function CalendarSection({
  date,
  setDate,
  availability,
  formatDateKey,
}: CalendarSectionProps) {
  const selectedKey = formatDateKey(date);
  const slotCount = availability[selectedKey]?.length || 0;

  return (
    <div className="lg:col-span-5 h-fit space-y-4">
      <Card >
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <CalendarIcon className="h-5 w-5 text-primary" />
          Select Date
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            className="rounded-md border"
            modifiers={{
              hasSlots: (day) => (availability[formatDateKey(day)]?.length ?? 0) > 0,
            }}
            modifiersClassNames={{
              hasSlots: "bg-primary/10 font-semibold text-primary",
            }}
          />
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="font-medium">Selected:</span>
            <span className="font-semibold">{format(date, "PPP")}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="font-medium">Available Slots:</span>
            <Badge variant="outline" className="text-lg px-4 py-1">
              {slotCount}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>

    <TodaySlot/>
    </div>
  );
}