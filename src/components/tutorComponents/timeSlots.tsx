import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Check, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface TimeSlotsSectionProps {
  date: Date;
  availability: Record<string, number[]>;
  setAvailability: React.Dispatch<React.SetStateAction<Record<string, number[]>>>;
  formatDateKey: (d: Date) => string;

}

export default function TimeSlotsSection({
  date,
  availability,
  setAvailability,
  formatDateKey
  
}: TimeSlotsSectionProps) {
  // 0 to 23 → 24 hours
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const selectedKey = formatDateKey(date);
  const currentSlots = availability[selectedKey] || [];

  const toggleSlot = (hour: number) => {
    setAvailability((prev) => {
      const slots = prev[selectedKey] || [];
      const newSlots = slots.includes(hour)
        ? slots.filter((h) => h !== hour)
        : [...slots, hour].sort((a, b) => a - b);

      const newAvailability = { ...prev };
      if (newSlots.length === 0) {
        delete newAvailability[selectedKey];
      } else {
        newAvailability[selectedKey] = newSlots;
      }
      return newAvailability;
    });
  };

  const fillDay = () => {
    setAvailability((prev) => ({
      ...prev,
      [selectedKey]: [...timeSlots],
    }));
  };

  const clearDay= () => {
    setAvailability((prev) => {
      const copy = { ...prev };
      delete copy[selectedKey];
      return copy;
    });
  };

  return (
    <Card className="lg:col-span-7">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Clock className="h-5 w-5 text-primary" />
            Time Slots ({format(date, "PPP")})
          </CardTitle>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fillDay}>
              <Check className="mr-1.5 h-4 w-4" />
              Mark All
            </Button>
            <Button variant="outline" size="sm" onClick={clearDay}>
              <Trash2 className="mr-1.5 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
     
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {timeSlots.map((hour) => {
            const isAvailable = currentSlots.includes(hour);

          
            const displayHour = hour % 12 || 12;
            const period = hour >= 12 ? "PM" : "AM";
            const formattedTime = `${displayHour}:00 ${period}`;

            return (
              <Button
                key={hour}
                variant={isAvailable ? "default" : "outline"}
                className={`
                  h-16 md:h-20   
                  flex flex-col items-center justify-center gap-2
                  text-base sm:text-lg md:text-xl font-semibold
                  transition-all duration-200
                  shadow-sm hover:shadow
                  ${isAvailable
                    ? "bg-green-600 hover:bg-green-700 text-white border-green-700"
                    : "hover:border-primary hover:text-primary hover:bg-primary/5 border-gray-300"}
                `}
                onClick={() => toggleSlot(hour)}
              >
                <span className="font-bold tracking-wide">
                  {formattedTime}
                </span>
                <span className="text-sm opacity-90 font-medium">
                  {isAvailable ? "Available" : "Unavailable"}
                </span>
              </Button>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t">
          <h3 className="text-base font-medium mb-4">Legend</h3>
          <div className="flex flex-wrap gap-8 text-base">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-green-600 shadow-sm" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded border-2 border-input bg-background shadow-sm" />
              <span>Unavailable</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}