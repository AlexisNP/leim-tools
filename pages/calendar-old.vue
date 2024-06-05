<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCalendar } from '@/stores/CalendarStore'
import type { MenuItem } from '~/components/global/SidebarProps';
import { PhMagnifyingGlass } from '@phosphor-icons/vue'

const { revealAdvancedSearch } = useCalendar()
const { isAdvancedSearchOpen } = storeToRefs(useCalendar())

useHead({
  title: 'Calendar'
})

const sidebarMenu: MenuItem[] = [
  {
    phIcon: PhMagnifyingGlass,
    tooltip: 'Recherche avancée',
    clickHandler: revealAdvancedSearch
  }
]
</script>

<template>
  <main class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar :menu-items="sidebarMenu" />
    <Calendar />

    <CalendarSearch v-model:model-value="isAdvancedSearchOpen" />
  </main>
</template>
