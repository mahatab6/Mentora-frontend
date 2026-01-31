import { Button } from "@/components/ui/button";
import { useAvailability } from "@/hooks/useAvailability";



const formatHour = (hour: number) => {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour} ${period}`;
};

const formatDate = (date: string) => {
  return date.split("T")[0]; 
};

export default function RightColumn({ id }: { id: string }) {
  const { tutoravailability, loading } = useAvailability(id);

  const availableSlots = tutoravailability.filter(
    (item) => item.status === "available"
  );

  const displayDate =
    availableSlots.length > 0
      ? formatDate(availableSlots[0].date)
      : null;

  if (loading) {
    return <p className="text-sm text-gray-500">Loading availability...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
        <h3 className="font-bold text-lg text-gray-900 mb-1">
          Availability
        </h3>

        {displayDate && (
          <p className="text-sm text-gray-500 mb-4">
            {displayDate}
          </p>
        )}

        <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
          {availableSlots.length > 0 ? (
            availableSlots.map((slot) => (
              <div
                key={slot.id}
                className="rounded-md bg-green-100 text-green-700 py-2 font-medium"
              >
                {formatHour(slot.hour)}
              </div>
            ))
          ) : (
            <p className="col-span-7 text-gray-500 text-sm">
              No slots available
            </p>
          )}
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Check Full Schedule
        </Button>
      </div>
    </div>
  );
}

