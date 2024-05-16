<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'
import { useThrottleFn } from '@vueuse/core'

const { currentDate, decrementMonth, incrementMonth } = useCalendar()
const { currentMonthData } = storeToRefs(useCalendar())

function handleWheel(e: WheelEvent) {
  const isMovingUp = e.deltaY < 0
  if (isMovingUp) {
    moveCalendarLeft()
  } else {
    moveCalendarRight()
  }
}

const moveCalendarLeft = useThrottleFn(() => {
  decrementMonth()
}, 100)

const moveCalendarRight = useThrottleFn(() => {
  incrementMonth()
}, 100)
</script>

<template>
  <div class="grid grid-cols-10" @wheel="handleWheel">
    <CalendarStateMonthlyDayTile
      v-for="day in currentMonthData.days"
      :key="day"
      :date="{
        day: day,
        month: currentDate.currentMonth,
        year: currentDate.currentYear
      }"
    />
  </div>
</template>
