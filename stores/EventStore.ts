import { compareDates, convertDateToDays, daysPerMonth, type RPGDate } from '@/models/Date'
import type { CalendarEvent } from '@/models/CalendarEvent'
import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'
import { useCalendar } from './CalendarStore'

export const useCalendarEvents = defineStore('calendar-events', () => {
  const { currentDate, currentConfig } = useCalendar()

  const baseEvents = ref<CalendarEvent[]>([])

  function setEvents(data: CalendarEvent[]) {
    baseEvents.value = data
  }

  const allEvents = computed(() => baseEvents.value.sort((a, b) => {
    return compareDates(a.startDate, b.startDate, 'desc')
  }))

  // Gets all current event in its default state
  const currentEvents: Ref<CalendarEvent[]> = ref(computeCurrentEvents())

  // Watch for currentDate changes
  watch([currentDate, allEvents], () => {
    currentEvents.value = computeCurrentEvents()
  })

  /**
   * Determines if the event can appear in the front end
   *
   * This function takes into consideration the viewType of the calendar config
   *
   * @param event The event to analyze
   * @returns Whether the event should appear in the current view
   */
  function shouldEventBeDisplayed(event: CalendarEvent): boolean {
    const eventStartDateToDays = convertDateToDays(event.startDate)
    const eventEndDateToDays: number = event.endDate ? convertDateToDays(event.endDate) : 0

    const isEventOnCurrentScreen =
      (event.startDate.year === currentDate.currentYear &&
        event.startDate.month === currentDate.currentMonth) ||
      (event.endDate &&
        event.endDate.year === currentDate.currentYear &&
        event.endDate.month === currentDate.currentMonth)

    // Check whether the event is on the last 8 tiles
    // This is to allow leap events from appearing on the last 8 tiles
    const firstDayOfCurrentMonth = convertDateToDays({
      day: 1,
      month: currentDate.currentMonth,
      year: currentDate.currentYear
    })
    const lastDayOfCurrentMonth = firstDayOfCurrentMonth + daysPerMonth
    const last8Tiles = lastDayOfCurrentMonth + 8

    const isEventOnNext8Tiles =
      (eventStartDateToDays <= last8Tiles && eventStartDateToDays >= lastDayOfCurrentMonth) ||
      (Boolean(event.endDate) &&
        eventEndDateToDays <= last8Tiles &&
        eventEndDateToDays >= lastDayOfCurrentMonth)

    switch (currentConfig.viewType) {
      case 'month':
        return isEventOnCurrentScreen || isEventOnNext8Tiles

      case 'year':
        return event.startDate.year === currentDate.currentYear

      case 'decade':
        return (
          event.startDate.year >= currentDate.currentYear &&
          event.startDate.year <= currentDate.currentYear + 10
        )

      case 'century':
        return (
          event.startDate.year >= currentDate.currentYear &&
          event.startDate.year <= currentDate.currentYear + 100
        )

      default:
        return false
    }
  }

  /**
   * Fetches all the current events for the current view
   *
   * @returns A list of events that can appear in the current view
   */
  function computeCurrentEvents(): CalendarEvent[] {
    return allEvents.value.filter((event) => shouldEventBeDisplayed(event))
  }

  /**
   * From a base event, gets the next or previous in the timeline
   * @todo **This should probably be extracted to function FIRST with dates only, as the initialIsEnd param is only used at the beggining to establish a pivot**
   *
   * @param event The event at a given position in the data
   * @param position Whether we should get the next or previous event
   * @returns The next event in chronological order
   */
  function getRelativeEventFromEvent(
    event: CalendarEvent,
    position: 'next' | 'prev' = 'next',
    initialIsEnd: boolean = false
  ): { event: CalendarEvent; targetDate: RPGDate } {
    let dateToParse: RPGDate // Day value of the date that the user interacted with

    if (initialIsEnd && event.endDate) {
      dateToParse = event.endDate
    } else {
      dateToParse = event.startDate
    }

    return getRelativeEventFromDate(dateToParse, position)
  }

  function getRelativeEventFromDate(
    date: RPGDate,
    position: 'next' | 'prev' = 'next'
  ): { event: CalendarEvent; targetDate: RPGDate } {
    const pivotValue = convertDateToDays(date)
    let t: { eventData: CalendarEvent; distance: number; targetKey: 'startDate' | 'endDate' }[] = []

    // Loop over all event once to convert the structure to a usable one
    for (let i = 0; i < allEvents.value.length; i++) {
      const e: CalendarEvent = allEvents.value[i]

      // Estimate distance from pivot
      const startDateDays: number = convertDateToDays(e.startDate)
      const startDistance: number = startDateDays - pivotValue

      // Push startDate to comparator array
      t.push({
        eventData: e,
        distance: startDistance,
        targetKey: 'startDate'
      })

      // Check the same things for endDate
      if (e.endDate) {
        const endDateDays: number = convertDateToDays(e.endDate)
        const endDistance: number = endDateDays - pivotValue

        // Push optional endDate to comparator array
        t.push({
          eventData: e,
          distance: endDistance,
          targetKey: 'endDate'
        })
      }
    }

    // // Special case : If we query the first one but it already is
    // if (position === 'prev' && t[0].distance === 0) {
    //   const targetDate =
    //     t[0].targetKey === 'startDate' ? t[0].eventData.startDate : t[0].eventData.endDate!
    //   return {
    //     event: t[0].eventData,
    //     targetDate: targetDate
    //   }
    // }
    // // Special case : If we query the last one but it already is
    // if (position === 'next' && t[t.length - 1].distance === 0) {
    //   const targetDate =
    //     t[t.length - 1].targetKey === 'startDate'
    //       ? t[t.length - 1].eventData.startDate
    //       : t[t.length - 1].eventData.endDate!
    //   return {
    //     event: t[t.length - 1].eventData,
    //     targetDate: targetDate
    //   }
    // }

    // Based on the direction, either ignore negative distance (past) or positive distance (future)
    t = t.filter((i) => {
      return position === 'next' ? i.distance > 0 : i.distance < 0
    })

    if (!t.length) {
      throw new Error(
        "Aucun évènement suivant ou précédent trouvé ; Peut-être l'évènement se situe au début ou à la fin du calendrier ?"
      )
    }

    // Get event with remaining minimum distance
    const closestEvent = t.reduce((a, b) => {
      return Math.abs(b.distance) < Math.abs(a.distance) ? b : a
    })

    return {
      event: closestEvent.eventData,
      targetDate: closestEvent.eventData[closestEvent.targetKey]!
    }
  }

  return { allEvents, setEvents, currentEvents, getRelativeEventFromDate, getRelativeEventFromEvent }
})
