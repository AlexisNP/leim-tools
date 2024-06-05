<script lang="ts" setup>
import { PhMagnifyingGlass } from '@phosphor-icons/vue';
import type { MenuItem } from '~/components/global/SidebarProps';

useHead({
  title: 'Calendrier'
})
definePageMeta({
  middleware: ['auth-guard']
})

const user = useSupabaseUser()
// Redirect user back home when they log out on the page
watch(user, (n, _o) => {
  if (!n) {
    navigateTo('/')
  }
})

const { revealAdvancedSearch } = useCalendar()

const sidebarMenu: MenuItem[] = [
  {
    phIcon: PhMagnifyingGlass,
    tooltip: 'Recherche avancée',
    clickHandler: revealAdvancedSearch
  }
]
</script>

<template>
  <div class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar :menu-items="sidebarMenu" />

    <Calendar />
  </div>
</template>
