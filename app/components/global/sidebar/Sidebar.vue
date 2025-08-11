<script lang="ts" setup>
import { PhCompass, PhGlobeHemisphereEast, PhHurricane, PhInfo, PhX } from "@phosphor-icons/vue"
import type { SidebarMenuActionType, SidebarMenuIcon } from "./SidebarProps";
import { cn } from "@/lib/utils";
import { breakpointsTailwind } from "@vueuse/core"

const { revealAdvancedSearch } = useCalendar()
const { toggleSidebar } = useUiStore()
const { currentMenu, isSidebarOpened } = storeToRefs(useUiStore())

function handleMenuItemAction(actionType: SidebarMenuActionType) {
  if (actionType === "event-search") {
    revealAdvancedSearch()
  }
}

function computeMenuItemIcon(iconString: SidebarMenuIcon) {
  switch (iconString) {
    case "universe":
      return PhHurricane
    case "world":
      return PhGlobeHemisphereEast
    default:
      return PhCompass
  }
}

const breakpoints = useBreakpoints(
  breakpointsTailwind
)

// const sidebarRef = ref(null)

// onClickOutside(sidebarRef, () => {
//   isSidebarOpened.value = false
// })
</script>

<template>
  <nav
    ref="sidebarRef"
    :class="cn(
      ['md:relative md:isolate w-16 py-6 grid gap-4 grid-rows-[1fr_auto] bg-background justify-center md:transition-colors'], // Base appearance
      ['after:opacity-50 after:contrast-125 dark:after:opacity-75'], // After styling
      ['border-r-[1px] border-r-border dark:border-r-border'], // Colours
      ['max-md:justify-stretch max-md:px-4 max-md:py-4 max-md:absolute max-md:left-0 max-md:inset-0 max-md:z-50 max-md:w-40 max-md:max-w-full max-md:transition-all'], // Responsive behaviours
      {
        'max-md:-translate-x-40': !isSidebarOpened,
        'max-md:-translate-x-0': isSidebarOpened
      }
    )"
  >
    <menu class="flex flex-col gap-4 max-md:items-center">
      <li class="mb-12 mt-4 max-md:self-start">
        <UiButton
          variant="outline"
          size="icon"
          class="md:hidden size-9 border-background/30"
          @click="toggleSidebar"
        >
          <PhX size="19" />
        </UiButton>
      </li>

      <li class="max-md:self-start">
        <UiTooltipProvider :delay-duration="50" :disabled="!breakpoints.md.value">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon"
                class="rounded-full max-md:hidden"
                as-child
              >
                <NuxtLink to="/explore">
                  <PhCompass size="24" weight="fill" />
                </NuxtLink>
              </UiButton>
              <NuxtLink
                to="/explore"
                class="md:hidden flex items-center gap-[.6ch] underline-offset-4 hover:underline"
              >
                <PhCompass size="22" weight="fill" />

                <span class="text-[.9em]">
                  {{ $t('pages.explore.menuLabel') }}
                </span>
              </NuxtLink>
            </UiTooltipTrigger>
            <UiTooltipContent :side="'right'" :side-offset="6">
              <p>
                {{ $t('pages.explore.menuLabel') }}
              </p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </li>

      <ClientOnly>
        <li v-for="(item, i) in currentMenu" :key="i">
          <UiTooltipProvider :delay-duration="50">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton
                  v-if="item.to"
                  variant="ghost"
                  size="icon"
                  class="rounded-full"
                  as-child
                >
                  <NuxtLink :to="item.to">
                    <component :is="computeMenuItemIcon(item.phIcon)" size="24" :weight="item.phIconWeight || 'fill'" />
                  </NuxtLink>
                </UiButton>
                <UiButton
                  v-if="item.action"
                  variant="ghost"
                  size="icon"
                  class="rounded-full"
                  @click="handleMenuItemAction(item.action!)"
                >
                  <component :is="computeMenuItemIcon(item.phIcon)" size="24" :weight="item.phIconWeight || 'fill'" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent :side="'right'" :side-offset="6">
                <p>{{ item.tooltip }}</p>
              </UiTooltipContent>
            </UiTooltip>
          </UiTooltipProvider>
        </li>
      </ClientOnly>
    </menu>

    <UserCTA />
  </nav>
</template>
