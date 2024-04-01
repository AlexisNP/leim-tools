<script lang="ts" setup>
import { useCalendar } from '@/stores/calendar'
import CalendarMenu from './CalendarMenu.vue'
import Century from './state/Century.vue'
import Decade from './state/Decade.vue'
import Monthly from './state/Monthly.vue'
import Year from './state/Year.vue'

const { currentConfig } = useCalendar()

let currentViewComponent: any

switch (currentConfig.viewType) {
  case 'month':
    currentViewComponent = Monthly
    break

  case 'year':
    currentViewComponent = Year
    break

  case 'decade':
    currentViewComponent = Decade
    break

  case 'century':
    currentViewComponent = Century
    break

  default:
    break
}
</script>

<template>
  <div>
    <CalendarMenu />
    <component :is="currentViewComponent" />
  </div>
</template>
