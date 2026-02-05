"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Role } from "@/type";
import Link from "next/link";

const data = {
  navMain: [
    // --- STUDENT ROLES ---
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      roles: ["STUDENT"]
    },
    {
      title: "My Bookings",
      url: "/dashboard/bookings",
      icon: IconListDetails,
      roles: ["STUDENT"]
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: IconUsers, 
      roles: ["STUDENT"]
    },


    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      roles: ["TUTOR"]
    },
    {
      title: "Availability",
      url: "/dashboard/availability",
      icon: IconInnerShadowTop, 
      roles: ["TUTOR"]
    },
    {
      title: "Booking",
      url: "/dashboard/booking",
      icon: IconFolder,
      roles: ["TUTOR"]
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: IconUsers,
      roles: ["TUTOR"]
    },

    // --- ADMIN ROLES ---
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      roles: ["ADMIN"]
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: IconUsers,
      roles: ["ADMIN"]
    },
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      icon: IconListDetails,
      roles: ["ADMIN"]
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: IconChartBar, 
      roles: ["ADMIN"]
    },
  ],
};


type AppSidebarProps = {
  role: Role;
} & React.ComponentProps<typeof Sidebar>;


export function AppSidebar({role, ...props }: AppSidebarProps) {

  const filterMenu = data.navMain.filter(item => item.roles.includes(role))

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                
                <span className="text-base font-semibold">Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filterMenu} />
      </SidebarContent>
    </Sidebar>
  );
}
