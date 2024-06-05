<script lang="ts" setup>
import type { RPGDate } from '@/models/Date'
import type { CalendarEvent } from '@/models/CalendarEvent'
import { useCalendar } from '@/stores/CalendarStore'
import { useCalendarEvents } from '@/stores/EventStore'
import { useElementBounding } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'

import CalendarEventButton from '../../CalendarEvent.vue'

const props = defineProps<{
  date: RPGDate
  faded?: boolean
}>()

const calendarTile = ref()
const calendarEventsList = ref()

const { defaultDate, selectDate, areDatesIdentical } = useCalendar()
const { selectedDate } = storeToRefs(useCalendar())
const { currentEvents } = storeToRefs(useCalendarEvents())

/**
 * All events with a startDate / endDate that starts or ends on the tile
 */
const eventsForTheDay = computed(() => {
  return currentEvents.value.filter((currentEvent) => {
    return (
      areDatesIdentical(currentEvent.startDate, props.date) ||
      areDatesIdentical(currentEvent.endDate!, props.date)
    )
  })
})

/**
 * Is the tile on today's date ?
 */
const isDefaultDate = computed(() => {
  return areDatesIdentical(props.date, defaultDate)
})

/**
 * Is the tile on the hightlighted date ?
 */
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

/**
 * Events that can fit in the tile's space
*/
const eventsToDisplay: ComputedRef<CalendarEvent[]> = computed<CalendarEvent[]>(() => {
  return [...eventsForTheDay.value].splice(0, numberOfEventsToFit.value)
})

/**
 * Remaining events that are not displayed
 *
 * Used if not all events can be seen in the tile's space
*/
const eventsNotDisplayed: ComputedRef<number>  = computed<number>(() => eventsForTheDay.value.length - eventsToDisplay.value.length)
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
    <button
      class="relative z-10 group block w-full text-center cursor-pointer"
      @click="selectDate(date)"
    >
      <ClientOnly>
        <span
          class="inline-flex w-8 h-8 aspect-square items-center justify-center rounded-full border-2 border-transparent font-bold transition-colors group-hover:border-slate-800"
          :class="{
            'bg-slate-800': isDefaultDate && !isSelectedDate,
            'text-white bg-blue-500': isSelectedDate
          }"
        >
          {{ date.day }}
        </span>
      </ClientOnly>
    </button>

    <ClientOnly>
      <ul
        ref="calendarEventsList"
        class="absolute top-12 bottom-2 inset-x-2 grid auto-rows-min gap-1 z-10 pointer-events-none transition-opacity"
        :class="{
          'opacity-40': props.faded && !isSelectedDate
        }"
      >
        <TransitionGroup name="event">
          <li v-for="event in eventsToDisplay" :key="event.title" class="grid pointer-events-auto">
            <CalendarEventButton :event :tile-date="date" />
          </li>
        </TransitionGroup>

        <li v-if="eventsNotDisplayed > 0" class="pointer-events-auto">
          <UiPopover>
            <UiPopoverTrigger as-child>
              <button
                class="text-xs px-2 py-1 block w-full text-left font-bold rounded-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer transition-colors hover:bg-slate-800"
              >
                {{ eventsNotDisplayed }} autre{{ eventsNotDisplayed > 1 ? 's' : '' }}
              </button>
            </UiPopoverTrigger>
            <UiPopoverContent class="w-80" :align="'center'" :side="'right'">
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
            </UiPopoverContent>
          </UiPopover>
        </li>
      </ul>
    </ClientOnly>

    <ClientOnly>
      <CalendarFormCreateEvent :date btn-class="absolute inset-0 w-full h-full cursor-default z-0" />
    </ClientOnly>
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

.event-enter-active {
  transition: all 120ms ease-in-out;
}
.event-leave-active {
  transition: all 180ms ease-in-out;
}
.event-enter-from,
.event-leave-to {
  opacity: 0;
}
.event-enter-from {
  transform: translateX(.15rem);
}
.event-leave-to {
  transform: translateX(-.5rem);
}
</style>
