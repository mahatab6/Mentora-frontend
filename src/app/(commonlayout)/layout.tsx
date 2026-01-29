import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { userServices } from "@/services/users.services";
import { ReactNode } from "react";

export default async function Commonlayout({children}: {children:ReactNode} ) {

  const session = await userServices.getSession()

  return (
    <div>
        <Navbar session={session}/>
        {children}
        <Toaster />
        <Footer/>
    </div>
  )
}
