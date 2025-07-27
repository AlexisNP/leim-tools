export type SidebarMenuActionType = "event-search"

export type SidebarMenuIcon = "universe" | "world"

export interface SidebarMenuItem {
  phIcon: SidebarMenuIcon,
  phIconWeight?: "regular" | "light" | "fill" | "duotone" | "bold" | "thin"
  highlight?: boolean
  tooltip: string
  action?: SidebarMenuActionType
  to?: string
}

export interface SidebarProps {
  menuItems: SidebarMenuItem[],
  isHome?: boolean
}
