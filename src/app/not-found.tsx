import Link from "next/link";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-slate-50 dark:bg-slate-950">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping opacity-20 rounded-full bg-blue-500"></div>
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-xl">
          <FileQuestion className="h-16 w-16 text-slate-400 dark:text-slate-500" />
        </div>
      </div>

      <h1 className="mb-2 text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
        404
      </h1>
      <h2 className="mb-4 text-3xl font-semibold text-slate-800 dark:text-slate-200">
        Page Not Found
      </h2>
      <p className="mb-10 max-w-md text-lg text-slate-500 dark:text-slate-400">
        Oops! The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Home className="h-4 w-4" />
          Return Home
        </Link>
        <button
          onClick={() => {
            if (typeof window !== "undefined") window.history.back();
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-all border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
