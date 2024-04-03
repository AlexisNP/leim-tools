<script lang="ts" setup>
import type { LeimDate } from '@/models/Date'
import { useCalendar } from '@/stores/calendar'
import { useCalendarEvents } from '@/stores/events'
import { computed } from 'vue'
import CalendarEvent from './CalendarEvent.vue'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  date: LeimDate
  faded?: boolean
}>()

const { compareTwoDates, defaultDate } = useCalendar()
const { currentEvents } = storeToRefs(useCalendarEvents())

const eventsForTheDay = computed(() => {
  return currentEvents.value.filter((currentEvent) => {
    return compareTwoDates(currentEvent.date, props.date)
  })
})

const isDefaultDate = computed(() => {
  return compareTwoDates(props.date, defaultDate)
})
</script>

<template>
  <div
    class="tile relative text-xs p-2 border-slate-700"
    :class="{
      'text-slate-500': props.faded,
      'text-slate-300': !props.faded
    }"
  >
    <div class="text-center">
      <span
        class="inline-flex w-8 h-8 aspect-square items-center justify-center rounded-full font-bold"
        :class="{ 'bg-slate-800': isDefaultDate }"
        >{{ date.day }}</span
      >
    </div>
    <ul
      v-if="eventsForTheDay.length > 0"
      class="absolute top-12 bottom-2 inset-x-2 grid auto-rows-min gap-1"
      :class="{
        'opacity-40': props.faded
      }"
    >
      <li v-for="event in eventsForTheDay" :key="event.title" class="grid">
        <CalendarEvent :event />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tile {
  &:not(:nth-child(10n)) {
    border-right-width: 1px;
  }

  &:nth-child(n + 11) {
    border-top-width: 1px;
  }
}
</style>
