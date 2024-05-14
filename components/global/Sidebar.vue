<script lang="ts" setup>
import { PhHouse, PhList } from '@phosphor-icons/vue'
import type { SidebarProps } from './SidebarProps';

defineProps<SidebarProps>()
</script>

<template>
  <nav class="w-16 py-6 border-r-[1px] border-l-slate-500 grid grid-rows-[1fr_auto] justify-center">
    <menu class="flex flex-col gap-4">
      <li class="mb-12">
        <UiButton variant="ghost" size="icon" class="rounded-full" @click="console.log">
          <PhList size="27" />
        </UiButton>
      </li>

      <li>
        <UiTooltipProvider :delay-duration="100">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton variant="ghost" size="icon" class="rounded-full" as-child>
                <RouterLink to="/">
                  <PhHouse size="24" weight="fill" />
                </RouterLink>
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent :side="'right'">
              <p>Retourner aux outils</p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </li>

      <li v-for="(item, i) in menuItems" :key="i">
        <UiTooltipProvider :delay-duration="100">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton v-if="item.to" variant="ghost" size="icon" class="rounded-full" as-child>
                <RouterLink :to="item.to">
                  <component :is="item.phIcon" size="24" weight="fill" />
                </RouterLink>
              </UiButton>
              <UiButton v-if="item.clickHandler" variant="ghost" size="icon" class="rounded-full" @click="item.clickHandler">
                <component :is="item.phIcon" size="24" weight="fill" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent :side="'right'">
              <p>{{ item.tooltip }}</p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </li>

      <!-- <li>
        <UiTooltipProvider :delay-duration="100">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon"
                class="rounded-full"
                @click="revealAdvancedSearch()"
              >
                <PhMagnifyingGlass size="24" weight="fill" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent :side="'right'">
              <p>Recherche avancée</p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </li> -->
    </menu>

    <UserCTA />
  </nav>
</template>
