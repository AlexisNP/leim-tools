<script lang="ts" setup>
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

const sidebarMenu: MenuItem[] = []
</script>

<template>
  <div class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar :menu-items="sidebarMenu" />

    <Calendar />
  </div>
</template>
