import { initialEvents } from '@/data/Events'
import { compareDates, convertDateToDays, daysPerMonth, type LeimDate } from '@/models/Date'
import type { CalendarEvent } from '@/models/Events'
import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'
import { useCalendar } from './CalendarStore'
// import { useCharacters } from './CharacterStore'

export const useCalendarEvents = defineStore('calendar-events', () => {
  const { currentDate, currentConfig } = useCalendar()
  // const { charactersWithBirthData, charactersWithDeathData } = useCharacters()

  const baseEvents: CalendarEvent[] = initialEvents

  // const characterBirthEvents = charactersWithBirthData.map((character) => {
  //   return {
  //     title: `Naissance de ${character.name}`,
  //     startDate: character.birth,
  //     category: 'naissance'
  //   } as CalendarEvent
  // })

  // const characterDeathEvents = charactersWithDeathData.map((character) => {
  //   return {
  //     title: `Décès de ${character.name}`,
  //     startDate: character.death,
  //     category: 'mort'
  //   } as CalendarEvent
  // })

  const allEvents = [...baseEvents].sort((a, b) => {
    return compareDates(a.startDate, b.startDate, 'desc')
  })

  // Gets all current event in its default state
  const currentEvents: Ref<CalendarEvent[]> = ref(computeCurrentEvents())

  // Watch for currentDate changes
  watch(currentDate, () => {
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
    return allEvents.filter((event) => shouldEventBeDisplayed(event))
  }

  /**
   * From a base event, gets the next or previous in the timeline
   * @todo **This should probably be extracted to function FIRST with dates only, as the initialIsEnd param is only used at the beggining to establish a pivot**
   *
   * @param event The event at a given position in the data
   * @param position Whether we should get the next or previous event
   * @returns The next event in chronological order
   */
  function getRelativeEvent(
    event: CalendarEvent,
    position: 'next' | 'prev' = 'next',
    initialIsEnd: boolean = false
  ): { event: CalendarEvent; targetDate: LeimDate } {
    let eventPivotValue: number // Day value of the date that the user interacted with

    if (initialIsEnd && event.endDate) {
      eventPivotValue = convertDateToDays(event.endDate)
    } else {
      eventPivotValue = convertDateToDays(event.startDate)
    }

    const t: { eventData: CalendarEvent; distance: number; targetKey: 'startDate' | 'endDate' }[] =
      []
    let eventPivotIndex: number | null = null // Pivot index to save
    let realPositon: number = 0

    // Loop over all event once to convert the structure to a usable one
    for (let i = 0; i < allEvents.length; i++) {
      const e: CalendarEvent = allEvents[i]
      // Estimate distance from pivot
      const startDateDays: number = convertDateToDays(e.startDate)
      const startDistance: number = startDateDays - eventPivotValue

      // Push startDate to comparator array
      t.push({
        eventData: e,
        distance: startDistance,
        targetKey: 'startDate'
      })

      // If the distance from initial pivot is 0, this is our target index
      if (startDistance === 0) {
        eventPivotIndex = realPositon
      }

      // Check the same things for endDate
      if (e.endDate) {
        realPositon++
        const endDateDays: number = convertDateToDays(e.endDate)
        const endDistance: number = endDateDays - eventPivotValue

        // Push optional endDate to comparator array
        t.push({
          eventData: e,
          distance: endDistance,
          targetKey: 'endDate'
        })

        // Same as above, but with the optional end distance
        if (endDistance === 0) {
          eventPivotIndex = realPositon
        }
      }

      realPositon++

      // Optimization possible with index skipping (once we find the pivot index)
    }

    // If SOMEHOW we can't find the pivot index
    if (eventPivotIndex === null) {
      throw new Error("Impossible de trouver l'évènement initial.")
    }

    let returnEventIndex: number | null = null // Output event index
    if (position === 'next') {
      returnEventIndex = eventPivotIndex + 1
    } else {
      returnEventIndex = eventPivotIndex - 1
    }

    if (!t[returnEventIndex])
      throw new Error(
        "Aucun évènement trouvé ; Peut-être l'évènement se situe au début ou à la fin du calendrier ?"
      )

    return {
      event: t[returnEventIndex].eventData,
      targetDate: t[returnEventIndex].eventData[t[returnEventIndex].targetKey]!
    }
  }

  return { allEvents, currentEvents, getRelativeEvent }
})
