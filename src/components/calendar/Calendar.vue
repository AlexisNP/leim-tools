<script lang="ts" setup>
import { useCalendar } from '@/stores/calendar'
import CalendarMenu from './CalendarMenu.vue'
import Century from './state/Century.vue'
import Decade from './state/Decade.vue'
import Monthly from './state/Monthly.vue'
import Year from './state/Year.vue'
import { computed } from 'vue'

const { currentConfig } = useCalendar()

const currentViewComponent = computed(() => {
  switch (currentConfig.viewType) {
    case 'month':
      return Monthly

    case 'year':
      return Year

    case 'decade':
      return Decade

    case 'century':
    default:
      return Century
  }
})
</script>

<template>
  <div class="h-full grid grid-rows-[auto,1fr]">
    <CalendarMenu />
    <component :is="currentViewComponent" />
  </div>
</template>
