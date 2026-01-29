import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function profilePage() {
  return (
    <div>
      <div className="flex justify-between w-full items-center gap-1 px-4 py-4 lg:gap-2 lg:px-6">
        <h2>My Profile</h2>
        <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
          <Link href={"/dashboard/manage-profile"}>Manage Profile</Link>
        </Button>
      </div>
    </div>
  );
}
