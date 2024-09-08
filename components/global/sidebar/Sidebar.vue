<script lang="ts" setup>
import { PhGlobeHemisphereWest, PhList } from "@phosphor-icons/vue"
import type { SidebarMenuActionType } from "./SidebarProps";

const { revealAdvancedSearch } = useCalendar()
const { currentMenu } = storeToRefs(useUiStore())

const user = useSupabaseUser()

function handleMenuItemAction(actionType: SidebarMenuActionType) {
  if (actionType === "event-search") {
    revealAdvancedSearch()
  }
}
</script>

<template>
  <nav class="w-16 py-6 border-r-[1px] bg-indigo-700 dark:bg-black text-white border-r-indigo-700 dark:border-r-indigo-950 grid grid-rows-[1fr_auto] justify-center transition-colors">
    <menu class="flex flex-col gap-4">
      <li class="mb-12">
        <UiButton variant="ghost" size="icon" class="rounded-full" @click="console.log">
          <PhList size="27" />
        </UiButton>
      </li>

      <li v-if="user">
        <UiTooltipProvider :delay-duration="50">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton variant="ghost" size="icon" class="rounded-full" as-child>
                <RouterLink to="/my">
                  <PhGlobeHemisphereWest size="24" weight="fill" />
                </RouterLink>
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent :side="'right'" :side-offset="6">
              <p>
                {{ $t('entity.world.namePlural') }}
              </p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </li>

      <li v-for="(item, i) in currentMenu" :key="i">
        <UiTooltipProvider :delay-duration="50">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton v-if="item.to" variant="ghost" size="icon" class="rounded-full" as-child>
                <RouterLink :to="item.to">
                  <component :is="item.phIcon" size="24" weight="fill" />
                </RouterLink>
              </UiButton>
              <UiButton v-if="item.action" variant="ghost" size="icon" class="rounded-full" @click="handleMenuItemAction(item.action!)">
                <component :is="item.phIcon" size="24" weight="fill" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent :side="'right'" :side-offset="6">
              <p>{{ item.tooltip }}</p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </li>
    </menu>

    <UserCTA />
  </nav>
</template>
