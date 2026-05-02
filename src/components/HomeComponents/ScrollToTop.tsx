"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 300);

      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrolled / height) * 100;
      setProgress(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-24 z-50 transition-all duration-500",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none",
      )}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className="relative h-14 w-14 rounded-full shadow-lg dark:bg-slate-900 border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 hover:cursor-pointer"
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <ChevronUp className="w-5 h-5 relative z-10" />
        </div>
      </Button>
    </div>
  );
};

export default ScrollToTop;
