<script lang="ts" setup>
import { useCalendar } from "@/stores/CalendarStore"

import { PhMagnifyingGlass } from "@phosphor-icons/vue"

const { revealAdvancedSearch } = useCalendar()
const { isReadOnly } = storeToRefs(useCalendar())
</script>

<template>
  <header class="mt-2 grid gap-4 border-slate-200 contrast-more:border-slate-500 dark:border-slate-700 border-b-[1px]">
    <div class="px-8 flex items-center justify-between gap-2">
      <menu class="flex items-center gap-2">
        <li v-if="!isReadOnly">
          <LazyCalendarDialogQuickCreateEvent />
        </li>
        <li>
          <CalendarMenuToday />
        </li>
        <li class="ml-4">
          <CalendarCurrentDate />
        </li>
      </menu>

      <menu class="flex items-center gap-2">
        <li>
          <UiButton search-slash @click="revealAdvancedSearch()">
            <PhMagnifyingGlass size="20" weight="light" />
            <span>
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
