<script lang="ts" setup>
import { PhCompass, PhGlobeHemisphereEast, PhHurricane, PhX } from "@phosphor-icons/vue"
import type { SidebarMenuActionType, SidebarMenuIcon } from "./SidebarProps";
import { cn } from "~/lib/utils";

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

// const sidebarRef = ref(null)

// onClickOutside(sidebarRef, () => {
//   isSidebarOpened.value = false
// })
</script>

<template>
  <nav
    ref="sidebarRef"
    :class="cn(
      ['md:relative md:isolate w-16 py-6 grid grid-rows-[1fr_auto] justify-center transition-all'], // Base appearance
      ['after:opacity-50 after:contrast-125 dark:after:opacity-75 dark:after:contrast-175 after:-hue-rotate-60'], // After styling
      ['border-r-[1px] bg-indigo-700 dark:bg-black text-white border-r-indigo-700 dark:border-r-indigo-950 shadow-navbar-light dark:shadow-navbar-dark'], // Colours
      ['max-md:absolute max-md:left-0 max-md:inset-0 max-md:z-50'], // Responsive behaviours
      {
        'max-md:-translate-x-16': !isSidebarOpened,
        'max-md:-translate-x-0 shadow-navbar-dark dark:bg-slate-950': isSidebarOpened
      }
    )"
  >
    <menu class="flex flex-col gap-4">
      <li class="mb-12">
        <UiButton variant="ghost" size="icon" class="rounded-full" @click="toggleSidebar">
          <PhX size="24" />
        </UiButton>
      </li>

      <li>
        <UiTooltipProvider :delay-duration="50">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton variant="ghost" size="icon" class="rounded-full" as-child>
                <RouterLink to="/explore">
                  <PhCompass size="24" weight="fill" />
                </RouterLink>
              </UiButton>
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
                  <RouterLink :to="item.to">
                    <component :is="computeMenuItemIcon(item.phIcon)" size="24" :weight="item.phIconWeight || 'fill'" />
                  </RouterLink>
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

    <div ref="userMenuRef">
      <UserCTA />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  &::after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    height: 25rem;
    max-height: 100%;
    background-image: url("/images/sidebar.png");
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    mask-image: linear-gradient(to top, black 25%, transparent 50%, transparent);
    z-index: -1;
  }
}
</style>
