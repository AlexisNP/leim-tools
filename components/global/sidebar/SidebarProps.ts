export interface SidebarMenuItem {
  phIcon: Component
  tooltip: string
  clickHandler?: () => void
  to?: string
}

export interface SidebarProps {
  menuItems: SidebarMenuItem[],
  isHome?: boolean
}
