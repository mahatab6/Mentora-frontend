import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div>
        <div className="flex justify-between w-full items-center gap-1 px-4 py-4 lg:gap-2 lg:px-6">
            <h2>Your Courses</h2>
            <Button variant="ghost" asChild size="sm" className="hidden sm:flex"><Link href={"/dashboard/create-course"}>Create Course</Link></Button>
        </div>
    </div>
  )
}
