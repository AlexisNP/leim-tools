<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'
import { computed, type Component, type ComputedRef } from 'vue'

import CalendarMenu from './CalendarMenu.vue'

import MonthlyLayout from './state/monthly/Layout.vue'
import CenturyLayout from './state/centennially/Layout.vue'
import DecadeLayout from './state/decennially/Layout.vue'
import YearLayout from './state/yearly/Layout.vue'

const { currentConfig } = useCalendar()

const currentViewComponent: ComputedRef<Component> = computed<Component>(() => {
  switch (currentConfig.viewType) {
    case 'month':
      return MonthlyLayout

    case 'year':
      return YearLayout

    case 'decade':
      return DecadeLayout

    case 'century':
    default:
      return CenturyLayout
  }
})
</script>

<template>
  <div class="h-full grid grid-rows-[auto,1fr]">
    <CalendarMenu />
    <KeepAlive>
      <component :is="currentViewComponent" />
    </KeepAlive>
  </div>
</template>
