import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { userServices } from "@/services/users.services";
import { ReactNode } from "react";

export default async function Commonlayout({children}: {children:ReactNode} ) {

  const session = await userServices.getSession()
  const id = session?.user?.id
 
  return (
    <div>
        <Navbar id={id}/>
        {children}
        <Toaster />
        <Footer/>
    </div>
  )
}
