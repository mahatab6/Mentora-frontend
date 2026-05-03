"use client";

import { Menu, LogOut, LayoutDashboard, User, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ModeToggle } from "./HomeComponents/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MenuItem {
  title: string;
  url: string;
  onlyLoggedIn?: boolean;
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

  // Updated Menu Logic
  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Explore Mentors", url: "/find-tutors" },
    // { title: "My Sessions", url: "/my-sessions", onlyLoggedIn: true },
    { title: "About", url: "/about" },
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
          ? "py-3 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 shadow-sm border-b border-gray-100 dark:border-slate-800"
          : "py-5 bg-transparent",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1 transition-transform group-hover:scale-105">
            <Image
              width={35}
              height={35}
              src="https://i.ibb.co.com/QF8TdfMS/mentora.png"
              alt="Mentora Logo"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Mentora
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {menu
            .filter(item => !item.onlyLoggedIn || (item.onlyLoggedIn && id))
            .map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-500",
                  pathname === item.url
                    ? "text-blue-600"
                    : "text-gray-600 dark:text-slate-400"
                )}
              >
                {item.title}
              </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ModeToggle />

          {!id ? (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 dark:text-slate-400 hover:text-blue-600"
              >
                Login
              </Link>
              <Button asChild className="rounded-full px-6 bg-blue-600 hover:bg-blue-700">
                <Link href="/sign-up">Join Free</Link>
              </Button>
            </div>
          ) : (
            /* Profile Dropdown */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:cursor-pointer">
                  <Avatar className="h-10 w-10 border border-gray-200 dark:border-slate-700">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground">Manage your settings</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem asChild className="hover:cursor-pointer">
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                  <Link href="/my-sessions">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>My Sessions</span>
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-600 dark:text-red-400 focus:text-red-600 hover:cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-gray-700 dark:text-slate-300" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-[300px]">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image width={24} height={24} src="https://i.ibb.co.com/QF8TdfMS/mentora.png" alt="Logo" />
                    <span>Mentora</span>
                  </div>
                  <ModeToggle />
                  <></>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-8">
                {menu
                  .filter(item => !item.onlyLoggedIn || (item.onlyLoggedIn && id))
                  .map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className={cn(
                        "text-lg font-semibold py-3 px-3 rounded-xl",
                        pathname === item.url ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-gray-700 dark:text-slate-300"
                      )}
                    >
                      {item.title}
                    </Link>
                ))}
              </div>
              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-800">
                {!id ? (
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" className="w-full py-6 rounded-xl">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full py-6 rounded-xl bg-blue-600">
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" className="w-full justify-start py-6">
                       <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4"/> Dashboard</Link>
                    </Button>
                    <Button onClick={handleLogout} variant="destructive" className="w-full py-6 rounded-xl">
                      Logout
                    </Button>
                  </div>
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