"use client";

import Lottie from "lottie-react";
import Trail from "../../../public/Trail.json";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4">
      <div className="w-64 h-64">
        <Lottie animationData={Trail} loop={true} />
      </div>
      <p className="text-slate-500 dark:text-slate-400 animate-pulse font-medium">
        Loading ...
      </p>
    </div>
  );
}
