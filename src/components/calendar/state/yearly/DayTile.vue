<script lang="ts" setup>
import { areDatesIdentical, type LeimDate } from '@/models/Date'
import { useCalendar } from '@/stores/CalendarStore'
import { useCalendarEvents } from '@/stores/EventStore'
import { storeToRefs } from 'pinia'
import { computed, type ComputedRef } from 'vue'

const { currentDate, defaultDate, selectDate } = useCalendar()
const { selectedDate } = storeToRefs(useCalendar())
const { currentEvents } = storeToRefs(useCalendarEvents())

const props = defineProps<{
  monthNumber: number
  dayNumber: number
}>()

const tileDate: ComputedRef<LeimDate> = computed(() => {
  return {
    day: props.dayNumber,
    month: props.monthNumber,
    year: currentDate.currentYear
  }
})

const isDefaultDate = computed<boolean>(() => {
  return areDatesIdentical(tileDate.value, defaultDate)
})

const isSelectedDate = computed<boolean>(() => {
  return areDatesIdentical(tileDate.value, selectedDate.value)
})

const hasAtLeastOneEvent = computed<boolean>(() => {
  return Boolean(
    currentEvents.value.find((currentEvent) => {
      return areDatesIdentical(currentEvent.date, tileDate.value)
    })
  )
})
</script>

<template>
  <button
    class="relative grid place-items-center aspect-square rounded-full border-2 border-transparent transition-colors after:content-[''] after:absolute after:top-1 after:right-1 after:w-[.3rem] after:h-[.3rem] after:rounded-full after:transition-colors"
    :class="{
      'hover:bg-slate-800 hover:border-slate-800': !isDefaultDate && !isSelectedDate,
      'bg-slate-800 hover:bg-slate-600 hover:border-slate-600': isDefaultDate && !isSelectedDate,
      'text-white bg-blue-500 hover:bg-blue-600 hover:border-blue-600': isSelectedDate,
      'after:bg-green-600': hasAtLeastOneEvent,
      'after:bg-slate-950': hasAtLeastOneEvent && isSelectedDate
    }"
    @click="selectDate(tileDate)"
  >
    <span ref="tileRef" class="text-slate-300 text-[.85em]">{{ dayNumber }}</span>
  </button>
</template>
