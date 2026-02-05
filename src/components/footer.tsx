import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  sections?: Array<{
    title: string;
    links?: Array<{ name: string; href: string }>;
    details?: Array<string>; 
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
}

const defaultSections = [
  {
    title: "FOR TUTORS",
    links: [
      { name: "Become a tutor", href: "/become-a-tutor" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "CONTACT US",
    details: [
      "123 Education Lane, Learning City",
      "Email: support@mentora.com",
      "Phone: +1 (555) 000-1234",
      "Mon - Fri: 9:00 AM - 6:00 PM",
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "https://www.instagram.com/", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "https://www.facebook.com/", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "https://x.com/", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "https://www.linkedin.com/", label: "LinkedIn" },
];

const Footer = ({
  logo = {
    url: "/",
    src: "https://i.ibb.co.com/QF8TdfMS/mentora.png",
    alt: "logo",
    title: "Mentora",
  },
  sections = defaultSections,
  description = "Empowering students and tutors worldwide with a seamless learning experience and advanced tools.",
  socialLinks = defaultSocialLinks,
  className,
}: Footer7Props) => {
  return (
    <footer className={cn("bg-background border-t py-20 px-4", className)}>
      <div className="container mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start">
      
          <div className="flex flex-col gap-6 lg:max-w-sm">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image width={40} height={40} src={logo.src} alt={logo.alt} />
              <h2 className="text-2xl font-bold tracking-tight">{logo.title}</h2>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div className="flex items-center space-x-5 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <Link key={idx} href={social.href} aria-label={social.label} className="transition-colors hover:text-primary">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

         
          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-3 lg:ml-20">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
            
                  {section.links?.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link href={link.href} className="transition-colors hover:text-primary">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  
                
                  {section.details?.map((detail, dIdx) => (
                    <li key={dIdx} className="leading-relaxed">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mentora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };