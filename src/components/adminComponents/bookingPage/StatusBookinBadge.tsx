import { cn } from "@/lib/utils";

export function StatusBookingBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Confirmed: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-xs font-medium",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}
