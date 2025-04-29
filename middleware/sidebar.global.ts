export default defineNuxtRouteMiddleware(() => {
  const { closeSidebar } = useUiStore()

  closeSidebar()
})
