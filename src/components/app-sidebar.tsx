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
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      roles:["STUDENT"]
    },
    {
      title: "My Bookings",
      url: "/dashboard/bookings",
      icon: IconListDetails,
      roles:["STUDENT"]
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: IconChartBar,
      roles:["STUDENT"]
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconFolder,
      roles:["TUTOR"]
    },
    {
      title: "Availability",
      url: "/dashboard/availability",
      icon: IconUsers,
      roles:["TUTOR"]
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: IconUsers,
      roles:["TUTOR"]
    },
    {
      title: "Courses",
      url: "/dashboard/courses",
      icon: IconUsers,
      roles:["TUTOR"]
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconUsers,
      roles:["ADMIN"]
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: IconUsers,
      roles:["ADMIN"]
    },
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      icon: IconUsers,
      roles:["ADMIN"]
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: IconUsers,
      roles:["ADMIN"]
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
