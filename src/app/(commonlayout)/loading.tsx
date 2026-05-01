"use client";

import Lottie from "lottie-react";
import Trail from "../../../public/Trail.json";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
      <div className="w-64 h-64">
        <Lottie animationData={Trail} loop={true} />
      </div>
      <p className="text-muted-foreground animate-pulse">
        Loading ...
      </p>
    </div>
  );
}
