import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

export default function Commonlayout({children}: {children:ReactNode} ) {
  return (
    <div>
        <Navbar/>
        {children}
        <Toaster />
        <Footer/>
    </div>
  )
}
