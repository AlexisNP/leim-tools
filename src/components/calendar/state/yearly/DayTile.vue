<script lang="ts" setup>
import { areDatesIdentical, type LeimDate } from '@/models/Date'
import { useCalendar } from '@/stores/CalendarStore'
import { storeToRefs } from 'pinia'
import { computed, type ComputedRef } from 'vue'

const { currentDate, defaultDate, selectDate } = useCalendar()
const { selectedDate } = storeToRefs(useCalendar())

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

const isDefaultDate = computed(() => {
  return areDatesIdentical(tileDate.value, defaultDate)
})

const isSelectedDate = computed(() => {
  return areDatesIdentical(tileDate.value, selectedDate.value)
})
</script>

<template>
  <button
    class="grid place-items-center aspect-square rounded-full border-2 border-transparent transition-colors hover:bg-slate-800 hover:border-slate-800"
    :class="{
      'bg-slate-800 hover:bg-slate-600 hover:border-slate-600': isDefaultDate && !isSelectedDate,
      'text-white bg-blue-500 hover:bg-blue-600 hover:border-blue-600': isSelectedDate
    }"
    @click="selectDate(tileDate)"
  >
    <span class="text-slate-300 text-[.85em]">{{ dayNumber }}</span>
  </button>
</template>
