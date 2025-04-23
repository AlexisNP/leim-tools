<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { useCalendar } from "~/stores/CalendarStore"

import { PhMagnifyingGlass } from "@phosphor-icons/vue"

const { revealAdvancedSearch, } = useCalendar()
const { isReadOnly, defaultDate } = storeToRefs(useCalendar())

const breakpoints = useBreakpoints(
  breakpointsTailwind
)
</script>

<template>
  <header class="mt-2 grid gap-4 border-border border-b-[1px]">
    <div class="px-8 flex items-center justify-between gap-2">
      <menu class="flex items-center gap-2">
        <li>
          <LazyCalendarDialogQuickCreateEvent v-if="!isReadOnly" />
        </li>
        <li>
          <LazyCalendarMenuToday v-if="defaultDate" />
        </li>
        <li class="ml-4">
          <CalendarCurrentDate />
        </li>
      </menu>

      <menu class="flex items-center gap-2">
        <li>
          <UiButton
            :search-slash="breakpoints.lg.value"
            :size="breakpoints.lg.value ? 'default' : 'icon'"
            @click="revealAdvancedSearch()"
          >
            <PhMagnifyingGlass size="20" weight="light" />

            <span class="max-lg:hidden">
              {{ $t('entity.advancedSearch.title') }}
            </span>
          </UiButton>
        </li>
        <li>
          <CalendarCategoriesCTA />
        </li>
        <li>
          <CalendarOptionsCTA />
        </li>
      </menu>
    </div>

    <div class="ml-8">
      <CalendarMenuSubnav />
    </div>
  </header>
</template>
