<script lang="ts" setup>
import { useCalendar } from "~/stores/CalendarStore"
import { breakpointsTailwind } from "@vueuse/core"

const breakpoints = useBreakpoints(
  breakpointsTailwind
)

const { isReadOnly, defaultDate } = storeToRefs(useCalendar())
</script>

<template>
  <header class="md:mt-2 grid gap-3 md:gap-4 border-border border-b-[1px] transition-colors">
    <div class="px-4 md:px-8 flex items-center justify-between gap-2">
      <menu class="flex items-center md:gap-2">
        <li>
          <LazyCalendarDialogQuickCreateEvent v-if="!isReadOnly" />
        </li>
        <li class="md:hidden">
          <SidebarToggle />
        </li>
        <li class="max-md:hidden">
          <LazyCalendarMenuToday v-if="defaultDate" />
        </li>
        <li class="ml-4">
          <CalendarCurrentDate />
        </li>
      </menu>

      <menu class="flex items-center gap-2">
        <li>
          <CalendarSearchCTA />
        </li>
        <ClientOnly>
          <li v-if="breakpoints.md.value">
            <CalendarCategoriesCTA />
          </li>
        </ClientOnly>
        <li>
          <CalendarOptionsCTA />
        </li>
      </menu>
    </div>

    <div class="ml-4 md:ml-8">
      <CalendarMenuSubnav />
    </div>
  </header>
</template>
