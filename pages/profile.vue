<script lang="ts" setup>
import type { MenuItem } from '~/components/global/SidebarProps';

const user = useSupabaseUser()

useHead({
  title: 'Profil'
})

definePageMeta({
  middleware: ['auth-guard']
})

// Redirect user back home when they log out on the page
watch(user, (n, _o) => {
  if (!n) {
    navigateTo('/')
  }
})
const sidebarMenu: MenuItem[] = []
</script>

<template>
  <main class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar :menu-items="sidebarMenu" />

    <ProfileLayout />
  </main>
</template>
