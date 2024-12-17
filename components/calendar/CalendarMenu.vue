<script lang="ts" setup>
import { useCalendar } from "@/stores/CalendarStore"

import { PhMagnifyingGlass } from "@phosphor-icons/vue"

const { revealAdvancedSearch } = useCalendar()
const { isReadOnly } = storeToRefs(useCalendar())
</script>

<template>
  <header class="pt-4 border-slate-400 dark:border-slate-700 border-b-[1px]">
    <div class="px-6 flex justify-between">
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
        <li class="ml-6">
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

    <div class="ml-6">
      <CalendarMenuSubnav />
    </div>
  </header>
</template>
