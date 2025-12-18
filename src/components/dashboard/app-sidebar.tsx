"use client"

import type * as React from "react"
import { BarChart3, LayoutDashboard, Folder, Layers, List, Users, type LucideIcon } from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
}

interface UserData {
  name: string
  email: string
  avatar: string
}

interface SidebarData {
  user: UserData
  navMain: NavItem[]
}

const SIDEBAR_CONFIG: SidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: List,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart3,
    },
    {
      title: "Projects",
      url: "#",
      icon: Folder,
    },
    {
      title: "Team",
      url: "#",
      icon: Users,
    },
  ],
}

const COMPANY_CONFIG = {
  name: "Acme Inc.",
  logo: Layers,
} as const

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="#">
                <COMPANY_CONFIG.logo className="size-5!" />
                <span className="text-base font-semibold">{COMPANY_CONFIG.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SIDEBAR_CONFIG.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={SIDEBAR_CONFIG.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
