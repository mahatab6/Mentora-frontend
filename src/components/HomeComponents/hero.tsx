import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Hero47Props {
  heading?: string;
  subheading?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  className?: string;
}

const Hero = ({
  heading = "Find the right tutor",
  subheading = " and learn smarter, faster",
  description = "Discover qualified tutors for any subject. Book sessions that fit your schedule.",
  className,
}: Hero47Props) => {
  return (
    <section className={cn(" py-20 lg:py-32 px-4", className)}>
      <div className="container flex flex-col items-center gap-10 lg:my-0 lg:flex-row mx-auto">
        <div className="flex flex-col gap-7 lg:w-2/3 ">
          <h2 className="text-5xl font-semibold text-foreground md:text-5xl lg:text-8xl">
            <span>{heading}</span>
            <span className="text-muted-foreground">{subheading}</span>
          </h2>
          <p className="text-base text-muted-foreground md:text-lg lg:text-xl">
            {description}
          </p>
          <div className="flex flex-wrap items-start gap-5 lg:w-2/4 lg:gap-7">
            <Link href={"/find-tutors"}>
              <Button className="bg-black hover:bg-black-700 hover:cursor-pointer text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-105">
                Find a Tutor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative z-10">
          <Image
            className="relative z-10 rounded-2xl"
            width={950}
            height={500}
            src="https://i.ibb.co.com/39B9rp4T/hero-img.jpg"
            alt="iphone"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
