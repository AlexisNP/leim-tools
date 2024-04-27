<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'
import MonthTile from './MonthTile.vue'

const { staticConfig } = useCalendar()
</script>

<template>
  <div class="container mt-[10vh] mb-auto">
    <div ref="test" class="grid grid-cols-5 gap-x-8 gap-y-16">
      <MonthTile
        v-for="month in staticConfig.monthsPerYear"
        :key="month"
        :month-number="month - 1"
      />
    </div>
  </div>
</template>
