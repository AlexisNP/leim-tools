<script lang="ts" setup>
import type { RPGDate } from "@@/models/Date"
import type { CalendarEvent } from "@@/models/CalendarEvent"
import { breakpointsTailwind, useElementBounding } from "@vueuse/core"
import { storeToRefs } from "pinia"
import { computed, ref, type ComputedRef } from "vue"

import CalendarEventButton from "../../event/Event.vue"
import { useToast } from "@/components/ui/toast"
import type { APIError } from "@@/models/Errors"
import { ToastLifetime } from "@/components/ui/toast/use-toast"

const props = defineProps<{
  date: RPGDate
  faded?: boolean
}>()

const emit = defineEmits<{
  "on-open-create-dialog": [date: RPGDate]
}>()

const { toast } = useToast()
const { t } = useI18n()

const calendarTile = ref()
const calendarEventsList = ref()

const { defaultDate, selectDate, areDatesIdentical, getFormattedDateTitle, updateEventFromSkeleton, resetSkeleton } = useCalendar()
const { selectedDate, currentEvents, isReadOnly, eventSkeleton, isDraggingEvent } = storeToRefs(useCalendar())

const breakpoints = useBreakpoints(
  breakpointsTailwind
)

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

  let offset = 0

  if (isDraggingEvent.value && !tileNotHovered.value && !skeletonInsideCurrentDay.value) {
    offset = 1
  }

  return Math.trunc((tileHeight.value - (tileListTop.value - tileTop.value)) / 40) - offset
})

const skeletonInsideCurrentDay = computed(() => eventsForTheDay.value.find((e) => e.id === eventSkeleton.value.id))

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

// Handle drop events
const { isOutside: tileNotHovered } = useMouseInElement(calendarTile)
const isLoading = ref(false)

async function handleTileDrop() {
  if (isLoading.value) return
  if (skeletonInsideCurrentDay.value) return

  isLoading.value = true

  eventSkeleton.value.startDate = props.date

  const { error } = await tryCatch(updateEventFromSkeleton())

  if (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiError = (error as any).data as APIError

    apiError.data.errors.forEach((error) => {
      toast({
        title: t("entity.calendar.event.editErrors.toastTitle"),
        variant: "destructive",
        description: t(`entity.calendar.event.editErrors.${error.path[1]}_${error.code}`),
        duration: ToastLifetime.MEDIUM,
      })
    })

    isLoading.value = false
    return
  }

  isLoading.value = false
  resetSkeleton()
}
</script>

<template>
  <div
    ref="calendarTile"
    class="tile relative p-1 md:p-2 md:pt-1 transition-all"
    :class="{
      'text-slate-300 dark:text-slate-500': props.faded,
      'text-slate-500 dark:text-slate-300': !props.faded
    }"
    @drop.prevent="handleTileDrop"
    @dragenter.prevent
    @dragover.prevent
  >
    <button
      class="relative z-10 group block w-full text-2xs md:text-xs text-center cursor-pointer"
      @click="selectDate(date)"
    >
      <ClientOnly>
        <span
          class="inline-flex size-7 md:size-8 aspect-square items-center justify-center rounded-full border-1 md:border-2 border-transparent font-bold transition-colors group-hover:border-primary dark:group-hover:border-primary"
          :class="{
            'bg-secondary dark:bg-slate-700': isDefaultDate && !isSelectedDate,
            'bg-primary text-primary-foreground': isSelectedDate
          }"
        >
          {{ date.day }}
        </span>
      </ClientOnly>
    </button>

    <ClientOnly>
      <ul
        ref="calendarEventsList"
        class="absolute top-8 md:top-10 bottom-1 md:bottom-2 inset-x-2 grid auto-rows-min gap-1 z-10 pointer-events-none transition-opacity"
        :class="{
          'opacity-40': props.faded && !isSelectedDate
        }"
      >
        <li
          v-if="!tileNotHovered && isDraggingEvent && !skeletonInsideCurrentDay"
          :key="eventSkeleton.id"
          class="opacity-60"
        >
          <CalendarEventButton :event="eventSkeleton" :tile-date="date" />
        </li>

        <TransitionGroup :name="!isDraggingEvent ? 'event' : ''">
          <li
            v-for="(event, i) in eventsToDisplay"
            :key="event.id"
            class="grid w-full pointer-events-auto"
          >
            <CalendarEventButton :event :tile-date="date" />
          </li>
        </TransitionGroup>

        <li v-if="eventsNotDisplayed > 0" class="pointer-events-auto">
          <UiPopover>
            <UiPopoverTrigger as-child>
              <button
                class="text-2xs md:text-xs px-[5px] py-[5px] md:px-2 md:py-1 block w-full text-left font-bold rounded-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer transition-colors hover:text-foreground hover:bg-foreground/10"
              >
                {{ eventsNotDisplayed }} autre{{ eventsNotDisplayed > 1 ? 's' : '' }}
              </button>
            </UiPopoverTrigger>
            <UiPopoverContent
              class="w-80"
              :align="'center'"
              :align-offset="breakpoints.lg.value ? 50 : 25"
              :collision-padding="breakpoints.lg.value ? 50 : 25"
              :side="breakpoints.lg.value ? 'left' : 'bottom'"
              >
              <div class="text-center mb-2">
                <span
                  class="text-lg font-semibold rounded-full"
                >
                  {{ getFormattedDateTitle(date, true) }}
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
      <LazyCalendarDialogCreateEvent v-if="!isReadOnly && breakpoints.lg.value" :date btn-class="absolute inset-0 w-full h-full cursor-default z-0" />

      <button
        v-else-if="!isReadOnly && !breakpoints.lg.value"
        class="absolute inset-0 w-full h-full cursor-default z-0"
        @click="emit('on-open-create-dialog', props.date)"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.tile {
  border-right-width: 1px;
  border-bottom-width: 1px;
}

.event-enter-active {
  transition: all 120ms ease-in-out;
}
.event-move,
.event-leave-active {
  position: absolute;
  transition: all 200ms ease-in-out;
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
