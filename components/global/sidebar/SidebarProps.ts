import type { ShallowRef } from "vue"

export type SidebarMenuActionType = "event-search"

export interface SidebarMenuItem {
  phIcon: ShallowRef // use shallowRef to build phIcon
  tooltip: string
  action?: SidebarMenuActionType
  to?: string
}

export interface SidebarProps {
  menuItems: SidebarMenuItem[],
  isHome?: boolean
}
