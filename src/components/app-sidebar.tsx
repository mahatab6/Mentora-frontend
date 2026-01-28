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
      url: "/tutor/dashboard",
      icon: IconFolder,
      roles:["TUTOR"]
    },
    {
      title: "Availability",
      url: "/tutor/availability",
      icon: IconUsers,
      roles:["TUTOR"]
    },
    {
      title: "Profile",
      url: "/tutor/profile",
      icon: IconUsers,
      roles:["TUTOR"]
    },
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconUsers,
      roles:["ADMIN"]
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: IconUsers,
      roles:["ADMIN"]
    },
    {
      title: "Bookings",
      url: "/admin/bookings",
      icon: IconUsers,
      roles:["ADMIN"]
    },
    {
      title: "Categories",
      url: "/admin/categories",
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
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
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
