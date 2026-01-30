import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "completed"
      ? "bg-green-100 text-green-700"
      : status === "pending"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-700";

  return (
    <Badge className={`capitalize ${styles}`}>
      {status}
    </Badge>
  );
}
