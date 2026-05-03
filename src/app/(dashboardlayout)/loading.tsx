import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[80vh] items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-4 text-slate-500 dark:text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-500" />
        <span className="text-sm font-medium tracking-wide">Loading...</span>
      </div>
    </div>
  );
}
