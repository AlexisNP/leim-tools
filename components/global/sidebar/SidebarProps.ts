import type { ShallowRef } from "vue"

export type SidebarMenuActionType = "event-search"

export interface SidebarMenuItem {
  phIcon: ShallowRef
  tooltip: string
  action?: SidebarMenuActionType
  to?: string
}

export interface SidebarProps {
  menuItems: SidebarMenuItem[],
  isHome?: boolean
}
