import type { CalendarEvent } from '@/models/Events'
import { defineStore } from 'pinia'
import { computed, ref, watch, type Ref } from 'vue'
import { useCalendar } from './CalendarStore'
import { useCharacters } from './CharacterStore'
import { regularEvents } from '@/data/Events'
import { convertDateToDays, daysPerMonth } from '@/models/Date'

export const useCalendarEvents = defineStore('calendar-events', () => {
  const { currentDate, currentConfig, currentLeimDate } = useCalendar()
  const { charactersWithBirthData, charactersWithDeathData } = useCharacters()

  const baseEvents = ref<CalendarEvent[]>(regularEvents)

  const characterBirthEvents = computed(() => {
    return charactersWithBirthData.map((character) => {
      return {
        title: `Naissance de ${character.name}`,
        date: character.birth,
        category: 'naissance'
      } as CalendarEvent
    })
  })

  const characterDeathEvents = computed(() => {
    return charactersWithDeathData.map((character) => {
      return {
        title: `Décès de ${character.name}`,
        date: character.death,
        category: 'mort'
      } as CalendarEvent
    })
  })

  const allEvents = computed(() => {
    return [...characterBirthEvents.value, ...characterDeathEvents.value, ...baseEvents.value]
  })

  // Gets all current event in its default state
  const currentEvents: Ref<CalendarEvent[]> = ref(computeCurrentEvents())

  // Watch for currentDate changes
  watch(currentDate, () => {
    currentEvents.value = computeCurrentEvents()
    console.log(currentEvents.value)
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
    const eventDateToDays = convertDateToDays(event.date)
    const isEventOnCurrentScreen =
      event.date.year === currentDate.currentYear && event.date.month === currentDate.currentMonth

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
      eventDateToDays <= last8Tiles && eventDateToDays >= lastDayOfCurrentMonth

    switch (currentConfig.viewType) {
      case 'month':
        return isEventOnCurrentScreen || isEventOnNext8Tiles

      case 'year':
        return event.date.year === currentDate.currentYear

      case 'decade':
        return (
          event.date.year >= currentDate.currentYear &&
          event.date.year <= currentDate.currentYear + 10
        )

      case 'century':
        return (
          event.date.year >= currentDate.currentYear &&
          event.date.year <= currentDate.currentYear + 100
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

  return { baseEvents, allEvents, currentEvents }
})
