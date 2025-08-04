<script lang="ts" setup>
import type { RPGDate } from "@@/models/Date"
import { storeToRefs } from "pinia"
import { computed, type ComputedRef } from "vue"
import { cn } from "~/lib/utils"

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
    class="relative grid place-items-center aspect-square rounded-full border-2 border-transparent transition-colors after:content-[''] after:absolute after:top-1 after:right-1 after:w-[.3rem] after:h-[.3rem] after:rounded-full after:transition-colors cursor-pointer"
    :class="cn({
      'text-foreground/75 hover:border-primary hover:text-foreground': !isDefaultDate && !isSelectedDate,
      'font-semibold text-foreground bg-secondary hover:border-primary/70': isDefaultDate && !isSelectedDate,
      'font-semibold text-primary-foreground bg-primary hover:border-primary/70': isSelectedDate,
      'after:bg-primary': hasAtLeastOneEvent,
      'after:bg-primary-foreground': hasAtLeastOneEvent && isSelectedDate
    })"
    @click="selectDate(tileDate)"
  >
    <span ref="tileRef" class="text-[.85em]">{{ dayNumber }}</span>
  </button>
</template>
