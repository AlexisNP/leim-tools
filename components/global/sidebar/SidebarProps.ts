export type SidebarMenuActionType = "event-search"

export interface SidebarMenuItem {
  phIcon: Component
  tooltip: string
  action?: SidebarMenuActionType
  to?: string
}

export interface SidebarProps {
  menuItems: SidebarMenuItem[],
  isHome?: boolean
}
