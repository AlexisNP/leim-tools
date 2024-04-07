<script lang="ts" setup>
import { areDatesIdentical, type LeimDate } from '@/models/Date'
import { useCalendar } from '@/stores/CalendarStore'
import { useCalendarEvents } from '@/stores/EventStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import CalendarEvent from './CalendarEvent.vue'

const props = defineProps<{
  date: LeimDate
  faded?: boolean
}>()

const { defaultDate, selectDate } = useCalendar()
const { selectedDate } = storeToRefs(useCalendar())
const { currentEvents } = storeToRefs(useCalendarEvents())

const eventsForTheDay = computed(() => {
  return currentEvents.value.filter((currentEvent) => {
    return areDatesIdentical(currentEvent.date, props.date)
  })
})

const isDefaultDate = computed(() => {
  return areDatesIdentical(props.date, defaultDate)
})

const isSelectedDate = computed(() => {
  return areDatesIdentical(props.date, selectedDate.value)
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
        class="inline-flex w-8 h-8 aspect-square items-center justify-center rounded-full font-bold transition-colors"
        :class="{
          'bg-slate-800': isDefaultDate && !isSelectedDate,
          'text-white bg-blue-500': isSelectedDate
        }"
      >
        {{ date.day }}
      </span>
    </div>

    <ul
      v-if="eventsForTheDay.length > 0"
      class="absolute top-12 bottom-2 inset-x-2 grid auto-rows-min gap-1 z-10 pointer-events-none transition-opacity"
      :class="{
        'opacity-40': props.faded && !isSelectedDate
      }"
    >
      <li v-for="event in eventsForTheDay" :key="event.title" class="grid pointer-events-auto">
        <CalendarEvent :event />
      </li>
    </ul>

    <button class="absolute inset-0 w-full h-full cursor-default z-0" @click="selectDate(date)" />
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
