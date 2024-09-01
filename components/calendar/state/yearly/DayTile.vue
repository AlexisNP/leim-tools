<script lang="ts" setup>
import type { RPGDate } from "@/models/Date"
import { storeToRefs } from "pinia"
import { computed, type ComputedRef } from "vue"

const { currentDate, defaultDate, selectDate, areDatesIdentical } = useCalendar()
const { selectedDate, currentEvents } = storeToRefs(useCalendar())

const props = defineProps<{
  monthNumber: number
  dayNumber: number
}>()

const tileDate: ComputedRef<RPGDate> = computed(() => {
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
      return areDatesIdentical(currentEvent.startDate, tileDate.value)
    })
  )
})
</script>

<template>
  <button
    class="relative grid place-items-center aspect-square rounded-full border-2 border-transparent transition-colors after:content-[''] after:absolute after:top-1 after:right-1 after:w-[.3rem] after:h-[.3rem] after:rounded-full after:transition-colors"
    :class="{
      'text-slate-500 hover:border-indigo-300 hover:text-slate-900': !isDefaultDate && !isSelectedDate,
      'font-semibold text-white bg-slate-600 dark:bg-slate-800 hover:border-indigo-400': isDefaultDate && !isSelectedDate,
      'font-semibold text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-500': isSelectedDate,
      'after:bg-green-600': hasAtLeastOneEvent,
      'after:bg-slate-950': hasAtLeastOneEvent && isSelectedDate
    }"
    @click="selectDate(tileDate)"
  >
    <span ref="tileRef" class="text-[.85em]">{{ dayNumber }}</span>
  </button>
</template>
