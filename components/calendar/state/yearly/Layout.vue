<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'
import { useThrottleFn } from '@vueuse/core'

import MonthTile from './MonthTile.vue'

const { staticConfig, decrementYear, incrementYear } = useCalendar()

function handleWheel(e: WheelEvent) {
  const isMovingUp = e.deltaY < 0
  if (isMovingUp) {
    moveCalendarLeft()
  } else {
    moveCalendarRight()
  }
}

const moveCalendarLeft = useThrottleFn(() => {
  decrementYear()
}, 100)

const moveCalendarRight = useThrottleFn(() => {
  incrementYear()
}, 100)
</script>

<template>
  <div class="container mt-[10vh] mb-auto" @wheel="handleWheel">
    <div class="grid grid-cols-5 gap-x-8 gap-y-16">
      <MonthTile
        v-for="month in staticConfig.monthsPerYear"
        :key="month"
        :month-number="month - 1"
      />
    </div>
  </div>
</template>
