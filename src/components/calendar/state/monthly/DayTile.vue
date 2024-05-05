<script lang="ts" setup>
import { areDatesIdentical, type LeimDate } from '@/models/Date'
import { useCalendar } from '@/stores/CalendarStore'
import { useCalendarEvents } from '@/stores/EventStore'
import { useElementBounding } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import CalendarEventButton from '../../CalendarEvent.vue'
import type { CalendarEvent } from '@/models/Events'

const props = defineProps<{
  date: LeimDate
  faded?: boolean
}>()

const calendarTile = ref()
const calendarEventsList = ref()

const { defaultDate, selectDate } = useCalendar()
const { selectedDate } = storeToRefs(useCalendar())
const { currentEvents } = storeToRefs(useCalendarEvents())

const eventsForTheDay = computed(() => {
  return currentEvents.value.filter((currentEvent) => {
    return (
      areDatesIdentical(currentEvent.startDate, props.date) ||
      areDatesIdentical(currentEvent.endDate!, props.date)
    )
  })
})

const isDefaultDate = computed(() => {
  return areDatesIdentical(props.date, defaultDate)
})

const isSelectedDate = computed(() => {
  return areDatesIdentical(props.date, selectedDate.value)
})

// Get bounding elements for both tile and events list
const { height: tileHeight, top: tileTop } = useElementBounding(calendarTile)
const { top: tileListTop } = useElementBounding(calendarEventsList)

// Compute the available number of events that can be displayed from refs heights
const numberOfEventsToFit: ComputedRef<number> = computed(() => {
  if (!eventsForTheDay.value.length) return 0

  return Math.trunc((tileHeight.value - (tileListTop.value - tileTop.value)) / 40)
})

const eventsToDisplay: ComputedRef<CalendarEvent[]> = computed(() => {
  return [...eventsForTheDay.value].splice(0, numberOfEventsToFit.value)
})
const eventsNotDisplayed = computed(
  () => eventsForTheDay.value.length - eventsToDisplay.value.length
)
</script>

<template>
  <div
    ref="calendarTile"
    class="tile relative text-xs p-2 border-slate-700"
    :class="{
      'text-slate-500': props.faded,
      'text-slate-300': !props.faded
    }"
  >
    <!-- Used for "display all events" -->
    <button class="absolute inset-0 w-full h-full cursor-default z-0" />

    <button
      class="relative z-10 group block w-full text-center cursor-pointer"
      @click="selectDate(date)"
    >
      <span
        class="inline-flex w-8 h-8 aspect-square items-center justify-center rounded-full border-2 border-transparent font-bold transition-colors group-hover:border-slate-800"
        :class="{
          'bg-slate-800': isDefaultDate && !isSelectedDate,
          'text-white bg-blue-500': isSelectedDate
        }"
      >
        {{ date.day }}
      </span>
    </button>

    <ul
      ref="calendarEventsList"
      class="absolute top-12 bottom-2 inset-x-2 grid auto-rows-min gap-1 z-10 pointer-events-none transition-opacity"
      :class="{
        'opacity-40': props.faded && !isSelectedDate
      }"
    >
      <li v-for="event in eventsToDisplay" :key="event.title" class="grid pointer-events-auto">
        <CalendarEventButton :event :tile-date="date" />
      </li>

      <li v-if="eventsNotDisplayed > 0" class="pointer-events-auto">
        <Popover>
          <PopoverTrigger as-child>
            <button
              class="text-xs px-2 py-1 block w-full text-left font-bold rounded-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer transition-colors hover:bg-slate-800"
            >
              {{ eventsNotDisplayed }} autre{{ eventsNotDisplayed > 1 ? 's' : '' }}
            </button>
          </PopoverTrigger>
          <PopoverContent class="w-80" :align="'center'" :side="'right'">
            <div class="text-center mb-4">
              <span
                class="inline-flex w-12 h-12 aspect-square items-center justify-center text-lg font-semibold text-slate-300 bg-slate-800 rounded-full"
              >
                {{ date.day }}
              </span>
            </div>
            <ul class="grid auto-rows-min gap-1 z-10 pointer-events-none transition-opacity">
              <li
                v-for="event in eventsForTheDay"
                :key="event.title"
                class="grid pointer-events-auto"
              >
                <CalendarEventButton :event :tile-date="date" />
              </li>
            </ul>
          </PopoverContent>
        </Popover>
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
