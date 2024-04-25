<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'
import { computed } from 'vue'

import MonthTile from './MonthTile.vue'

const { staticConfig } = useCalendar()

const monthsPerYear = computed(() => staticConfig.monthsPerYear)
</script>

<template>
  <div class="container mt-[10vh] mb-auto">
    <div class="grid grid-cols-5 gap-x-8 gap-y-16">
      <MonthTile v-for="month in monthsPerYear" :key="month" :month-number="month - 1" />
    </div>
  </div>
</template>
