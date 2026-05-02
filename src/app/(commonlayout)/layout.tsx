import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { userServices } from "@/services/users.services";
import { ReactNode } from "react";

export default async function Commonlayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await userServices.getSession();
  const id = session?.user?.id;

  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar id={id} />
        {children}
        <Toaster />
        <Footer />
      </ThemeProvider>
    </div>
  );
}
