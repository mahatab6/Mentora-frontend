import { Badge } from "../ui/badge";


export function UserStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : status === "Inactive"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return <Badge className={styles}>{status}</Badge>;
}
