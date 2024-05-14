export interface MenuItem {
  phIcon: Component
  tooltip: string
  clickHandler?: () => void
  to?: string
}

export interface SidebarProps {
  menuItems: MenuItem[]
}
