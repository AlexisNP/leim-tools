import { breakpointsTailwind } from "@vueuse/core"
import type { SidebarMenuItem } from "~/components/global/sidebar/SidebarProps"

const breakpoints = useBreakpoints(
  breakpointsTailwind
)

export const useUiStore = defineStore("ui", () => {
  const currentMenu = ref<SidebarMenuItem[]>([])
  const isSidebarOpened = ref<boolean>(false)

  function setCurrentMenu(items: SidebarMenuItem[]) {
    currentMenu.value = items
  }

  function resetMenu() {
    currentMenu.value = []
  }

  function openSidebar() {
    if (breakpoints.isGreater("md")) return

    isSidebarOpened.value = true
  }

  function closeSidebar() {
    if (breakpoints.isGreater("md")) return

    isSidebarOpened.value = false
  }

  function toggleSidebar() {
    if (breakpoints.isGreater("md")) return

    isSidebarOpened.value = !isSidebarOpened.value
  }

  watch(breakpoints.md, () => {
    isSidebarOpened.value = false
  })

  return {
    currentMenu,
    setCurrentMenu,
    resetMenu,
    isSidebarOpened,
    openSidebar,
    closeSidebar,
    toggleSidebar
  }
})
