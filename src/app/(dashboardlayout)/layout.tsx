import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { userServices } from "@/services/users.services";
import React from "react";


export default async function Dashboardlayout({
  children,
  student,
  tutor,
  admin
}: {
  children: React.ReactNode,
  tutor: React.ReactNode,
  admin: React.ReactNode,
  student: React.ReactNode,
}) {

  const session = await userServices.getSession()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar role={session?.user?.role} variant="inset" /> 
      <SidebarInset>
        <SiteHeader />
        {
          session?.user?.role === "ADMIN" ? admin : session?.user?.role === "TUTOR" ? tutor : student
        }

        
        
      </SidebarInset>
    </SidebarProvider>
  );
}
