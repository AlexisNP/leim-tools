<script lang="ts" setup>
import type { MenuItem } from '~/components/global/SidebarProps';

useHead({
  title: 'Dashboard'
})

const sidebarMenu: MenuItem[] = []
</script>

<template>
  <main class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar :menu-items="sidebarMenu" is-home />

    <div class="h-full grid place-items-center">
      <UiCard class="w-1/3 min-w-72" link="/calendar">
        <UiCardHeader>
          <UiCardTitle>Calendrier</UiCardTitle>
          <UiCardDescription>
            <UiBadge class="mix-blend-luminosity font-bold bg-gray-600" variant="secondary">
              chronologie
            </UiBadge>
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          Chronologie complète de Léïm, rassemblant les évènements et personnages clés du monde
        </UiCardContent>
      </UiCard>
    </div>
  </main>
</template>
