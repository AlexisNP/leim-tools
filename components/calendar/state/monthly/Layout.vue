<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'
import { useThrottleFn } from '@vueuse/core'

const { currentDate, decrementViewMonth, incrementViewMonth } = useCalendar()
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
  decrementViewMonth()
}, 100)

const moveCalendarRight = useThrottleFn(() => {
  incrementViewMonth()
}, 100)
</script>

<template>
  <div class="grid grid-cols-10" @wheel="handleWheel">
    <template v-if="currentMonthData">
      <CalendarStateMonthlyDayTile
        v-for="day in currentMonthData?.days"
        :key="`layout-month-grid-${day}`"
        :date="{
          day: day,
          month: currentDate.currentMonth,
          year: currentDate.currentYear
        }"
      />
    </template>
  </div>
</template>
