export default defineNuxtRouteMiddleware(() => {
  const { resetMenu } = useUiStore()
  resetMenu()
})
