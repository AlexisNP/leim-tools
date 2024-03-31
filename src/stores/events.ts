import { defineStore } from 'pinia'
import { computed, watch, type ComputedRef, type Ref, ref } from 'vue'
import { useCharacters, type Character } from './characters'

import type { LeimDate } from '@/models/Date'
import { useCalendar } from './calendar'

type CalendarEvent = {
  title: string
  date: LeimDate
}

export const useCalendarEvents = defineStore('calendar-events', () => {
  const { characters } = useCharacters()
  const { currentDate, currentConfig } = useCalendar()

  // Get all birth events
  const charactersWithBirthData: ComputedRef<Character[]> = computed(() =>
    characters.filter((character) => character.birth)
  )
  const characterBirthEvents = computed(() => {
    return charactersWithBirthData.value.map((character) => {
      return { title: `Naissance de ${character.name}`, date: character.birth } as CalendarEvent
    })
  })

  // Get all death events
  const charactersWithDeathData: ComputedRef<Character[]> = computed(() =>
    characters.filter((character) => character.death)
  )
  const characterDeathEvents = computed(() => {
    return charactersWithDeathData.value.map((character) => {
      return { title: `Décès de ${character.name}`, date: character.death } as CalendarEvent
    })
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
    switch (currentConfig.viewType) {
      case 'month':
        return event.date.month === Number(currentDate.currentMonth)

      case 'year':
        return event.date.year === Number(currentDate.currentYear)

      case 'decade':
        return (
          event.date.year >= Number(currentDate.currentYear) - 10 &&
          event.date.year <= Number(currentDate.currentYear) + 10
        )

      case 'century':
        return (
          event.date.year >= Number(currentDate.currentYear) - 100 &&
          event.date.year <= Number(currentDate.currentYear) + 100
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
    const allEvents = [...characterBirthEvents.value, ...characterDeathEvents.value]

    return allEvents.filter((event) => shouldEventBeDisplayed(event))
  }

  return { currentEvents }
})
