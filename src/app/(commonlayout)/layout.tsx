import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { userServices } from "@/services/users.services";
import { ReactNode } from "react";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

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
        

        <main className="min-h-screen">
          {children}
        </main>

     
        <ChatbotWidget />

        <Toaster />
        <Footer />
      </ThemeProvider>
    </div>
  );
}