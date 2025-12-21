"use client"

import type * as React from "react"
import { BarChart3, LayoutDashboard, Folder, Layers, List, Wallet, Settings, type LucideIcon } from "lucide-react"
import { ROUTES } from "@/constants/routes"

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
      url: ROUTES.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      title: "Dépenses",
      url: ROUTES.DASHBOARD_EXPENSES,
      icon: List,
    },
    {
      title: "Budgets",
      url: ROUTES.DASHBOARD_BUDGETS,
      icon: Wallet,
    },
    {
      title: "Catégories",
      url: ROUTES.DASHBOARD_CATEGORIES,
      icon: Folder,
    },
    {
      title: "Rapports",
      url: ROUTES.DASHBOARD_REPORTS,
      icon: BarChart3,
    },
    {
      title: "Paramètres",
      url: ROUTES.DASHBOARD_SETTINGS,
      icon: Settings,
    },
  ],
}

const COMPANY_CONFIG = {
  name: "MoneyTrack",
  logo: Layers,
} as const

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href={ROUTES.DASHBOARD}>
                <COMPANY_CONFIG.logo className="!size-5" />
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
