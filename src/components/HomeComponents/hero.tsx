"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Hero = ({ className }: { className?: string }) => {
  const slides = [
    {
      heading: "Find the right tutor",
      subheading: " and learn smarter, faster",
      description: "Discover qualified tutors for any subject. Book sessions that fit your schedule.",
      image: "https://i.ibb.co.com/39B9rp4T/hero-img.jpg",
    },
    {
      heading: "Master new skills",
      subheading: " with live online classes",
      description: "Join interactive sessions led by industry experts. Learn from the comfort of your home.",
      image: "https://i.ibb.co.com/27hDYqy6/online-class.jpg",
    },
  ];

  return (
    <section className={cn("py-20 lg:py-32 px-4 transition-colors duration-300 dark:bg-slate-950", className)}>
      <div className="container mx-auto">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }} // CRITICAL: This stops the overlapping text
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop={true}
          className="rounded-3xl overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="bg-white dark:bg-slate-950"> 
              {/* Added bg color to slide to ensure it masks the one behind it */}
              <div className="flex flex-col items-center gap-10 lg:flex-row min-h-[500px] py-10">
                {/* Text Content */}
                <div className="flex flex-col gap-7 lg:w-2/3">
                  <h1 className="text-5xl font-bold text-slate-900 dark:text-white md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.1]">
                    <span>{slide.heading}</span>
                    <span className="text-blue-500 block">{slide.subheading}</span>
                  </h1>
                  <p className="text-base text-slate-600 dark:text-slate-400 md:text-lg lg:text-xl max-w-xl leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-wrap items-start gap-5">
                    <Link href="/find-tutors">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 text-lg rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer">
                        Find a Tutor
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button variant="outline" className="px-8 py-7 text-lg rounded-2xl border-2 dark:border-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer">
                        Join Free
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Image Content */}
                <div className="relative lg:w-1/2 w-full aspect-[4/3] lg:aspect-video">
                  <Image
                    className="rounded-3xl object-cover shadow-2xl"
                    fill
                    priority
                    src={slide.image}
                    alt="Mentora Tutoring"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 24px !important;
          border-radius: 5px !important;
        }
      `}</style>
    </section>
  );
};

export { Hero };