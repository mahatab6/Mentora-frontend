"use client"; 

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; 

export function SiteHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
       await authClient.signOut()
      router.push("/");
      router.refresh(); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        
        <div className="ml-auto flex items-center gap-2">

          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex text-red-600 hover:text-red-700 hover:cursor-pointer hover:bg-red-50"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}