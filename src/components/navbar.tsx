"use client";

import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  id: string | null; 
}

const Navbar = ({ className, id }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Find Tutors", url: "/find-tutors" },
    { title: "Blog", url: "/blog" },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4",
        isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100" 
          : "py-5 bg-transparent",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className=" p-1.5 rounded-xl group-hover:rotate-6 transition-transform">
            <Image
              width={50}
              height={50}
              src="https://i.ibb.co.com/QF8TdfMS/mentora.png"
              alt="Mentora Logo"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Mentora
          </span>
        </Link>

      
        <nav className="hidden lg:flex items-center gap-8">
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "text-sm font-medium transition-colors hover:text-orange-500",
                pathname === item.url ? "text-orange-600" : "text-gray-600"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {!id ? (
            <>
              <Button asChild variant="ghost" className="font-semibold text-gray-600">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-100 rounded-full px-6">
                <Link href="/sign-up">Join Free</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4 bg-gray-50 p-3 pr-4 rounded-full border border-gray-100">
              <Link href="/dashboard" className="flex items-center gap-2 group">
                 <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 transition-colors hover:cursor-pointer"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center gap-4">
           {id && (
              <Link href="/dashboard" className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                 <LayoutDashboard className="h-4 w-4" />
              </Link>
           )}
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-orange-50">
                <Menu className="h-6 w-6 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <Image width={24} height={24} src="https://i.ibb.co.com/QF8TdfMS/mentora.png" alt="Logo" />
                  Mentora
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-10">
                {menu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={cn(
                      "text-lg font-semibold p-2 rounded-lg transition-colors",
                      pathname === item.url ? "bg-orange-50 text-orange-600" : "text-gray-600"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
                <hr className="border-gray-100" />
                {!id ? (
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" className="rounded-xl py-6">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="bg-orange-500 hover:bg-orange-600 rounded-xl py-6">
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={handleLogout}
                    variant="destructive" 
                    className="rounded-xl py-6 gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export { Navbar };