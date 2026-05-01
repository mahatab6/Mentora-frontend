"use client";

import { Menu, LogOut, LayoutDashboard } from "lucide-react";
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
import { ModeToggle } from "./HomeComponents/ModeToggle";

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
          ? "py-3 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-gray-100 dark:border-slate-800"
          : "py-5 bg-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-xl transition-transform group-hover:scale-105 group-hover:rotate-3">
            <Image
              width={40}
              height={40}
              src="https://i.ibb.co.com/QF8TdfMS/mentora.png"
              alt="Mentora Logo"
            />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Mentora
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "text-sm font-medium relative transition-colors hover:text-blue-500",
                pathname === item.url
                  ? "text-blue-600 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600"
                  : "text-gray-600"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-4">
          <ModeToggle />

          {!id ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                Login
              </Link>

              <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer">
                Join Free
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-blue-600"
              >
                Dashboard
              </Link>

              <button onClick={handleLogout}>
                <LogOut className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-3">
          {id && (
            <Link
              href="/dashboard"
              className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white"
            >
              <LayoutDashboard className="h-4 w-4" />
            </Link>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-gray-700" />
              </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col w-[300px] sm:w-[360px]">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      width={24}
                      height={24}
                      src="https://i.ibb.co.com/QF8TdfMS/mentora.png"
                      alt="Logo"
                    />
                    Mentora
                  </div>

                  <ModeToggle />
                </SheetTitle>
              </SheetHeader>

              {/* Menu */}
              <div className="flex flex-col gap-3 mt-8">
                {menu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={cn(
                      "text-lg font-semibold py-3 px-3 rounded-xl transition-all",
                      pathname === item.url
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="mt-auto pt-6 border-t">
                {!id ? (
                  <div className="flex flex-col gap-3">
                    <Button asChild className="w-full py-6 rounded-xl">
                      <Link href="/login">Login</Link>
                    </Button>

                    <Button
                      asChild
                      className="w-full py-6 rounded-xl bg-blue-600 hover:bg-blue-700"
                    >
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full py-6 rounded-xl"
                  >
                    Logout
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