<script lang="ts" setup>
import type { MenuItem } from '~/components/global/SidebarProps';

useHead({
  title: 'Profil'
})

const sidebarMenu: MenuItem[] = []
</script>

<template>
  <main class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar :menu-items="sidebarMenu" />

    <ProfileLayout />
  </main>
</template>
