<script lang="ts" setup>
import { PhHouse, PhList } from "@phosphor-icons/vue"
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
  <nav class="w-16 py-6 border-r-[1px] border-l-slate-500 grid grid-rows-[1fr_auto] justify-center">
    <menu class="flex flex-col gap-4">
      <li class="mb-12">
        <UiButton variant="ghost" size="icon" class="rounded-full" @click="console.log">
          <PhList size="27" />
        </UiButton>
      </li>

      <template v-if="!user">
        <UiTooltipProvider :delay-duration="50">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton variant="ghost" size="icon" class="rounded-full" as-child>
                <RouterLink to="/">
                  <PhHouse size="24" weight="fill" />
                </RouterLink>
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent :side="'right'" :side-offset="6">
              <p>Retourner aux outils</p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </template>

      <template v-else/>

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
