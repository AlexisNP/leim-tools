<script lang="ts" setup>
import { useCalendar } from "@/stores/CalendarStore"

import { PhMagnifyingGlass } from "@phosphor-icons/vue"

const { revealAdvancedSearch } = useCalendar()
const { isReadOnly } = storeToRefs(useCalendar())
</script>

<template>
  <header class="border-slate-200 contrast-more:border-slate-500 dark:border-slate-700 border-b-[1px]">
    <div class="px-8 flex justify-between">
      <menu class="flex items-center gap-2">
        <li v-if="!isReadOnly">
          <CalendarDialogQuickCreateEvent />
        </li>
        <li>
          <CalendarMenuToday />
        </li>
        <li>
          <CalendarMenuNav />
        </li>
        <li class="ml-4">
          <CalendarCurrentDate />
        </li>
      </menu>

      <menu class="flex items-center gap-2">
        <li>
          <UiButton search-slash @click="revealAdvancedSearch()">
            <PhMagnifyingGlass size="20" weight="light" />
            {{ $t('entity.advancedSearch.title') }}
          </UiButton>
        </li>
        <li>
          <ClientOnly>
            <CalendarSwitch />
          </ClientOnly>
        </li>
      </menu>
    </div>

    <div class="ml-8">
      <CalendarMenuSubnav />
    </div>
  </header>
</template>
