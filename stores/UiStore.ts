import type { SidebarMenuItem } from "~/components/global/sidebar/SidebarProps"

export const useUiStore = defineStore('ui', () => {
  const currentMenu: Ref<SidebarMenuItem[]> = ref<SidebarMenuItem[]>([])

  function setCurrentMenu(items: SidebarMenuItem[]) {
    currentMenu.value = items
  }

  return {
    currentMenu,
    setCurrentMenu
  }
})
