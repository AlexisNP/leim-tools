import { initialEvents } from '@/data/Events'
import { compareDates, convertDateToDays, daysPerMonth } from '@/models/Date'
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

  return { allEvents, currentEvents }
})
