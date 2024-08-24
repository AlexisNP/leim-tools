<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'
import { useThrottleFn } from '@vueuse/core'

const { decrementViewYear, incrementViewYear } = useCalendar()
const { sortedMonths: months } = storeToRefs(useCalendar())

function handleWheel(e: WheelEvent) {
  const isMovingUp = e.deltaY < 0
  if (isMovingUp) {
    moveCalendarLeft()
  } else {
    moveCalendarRight()
  }
}

const moveCalendarLeft = useThrottleFn(() => {
  decrementViewYear()
}, 100)

const moveCalendarRight = useThrottleFn(() => {
  incrementViewYear()
}, 100)
</script>

<template>
  <div class="container mt-[10vh] mb-auto" @wheel="handleWheel">
    <div class="grid grid-cols-5 gap-x-8 gap-y-16">
      <CalendarStateYearlyMonthTile
        v-for="month in months"
        :key="month.id"
        :month
      />
    </div>
  </div>
</template>
