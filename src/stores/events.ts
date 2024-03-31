import { defineStore, storeToRefs } from 'pinia'
import { computed, watch, type ComputedRef, toRefs, type Ref, ref } from 'vue'
import { useCharacters, type Character } from './characters'

import type { LeimDate } from '@/models/Date'
import { useCalendar } from './calendar'

type CalendarEvent = {
  title: string
  date: LeimDate
}

export const useCalendarEvents = defineStore('calendar-events', () => {
  const { characters } = useCharacters()
  const calendarStore = useCalendar()

  const charactersWithBirthData: ComputedRef<Character[]> = computed(() =>
    characters.filter((character) => character.birth)
  )
  const characterBirthEvents = computed(() => {
    return charactersWithBirthData.value.map((character) => {
      return { title: `Naissance de ${character.name}`, date: character.birth } as CalendarEvent
    })
  })
  const charactersWithDeathData: ComputedRef<Character[]> = computed(() =>
    characters.filter((character) => character.death)
  )
  const characterDeathEvents = computed(() => {
    return charactersWithDeathData.value.map((character) => {
      return { title: `Décès de ${character.name}`, date: character.death } as CalendarEvent
    })
  })

  const currentEvents: Ref<CalendarEvent[]> = ref(computeCurrentEvents())

  watch(calendarStore.currentDate, () => {
    currentEvents.value = computeCurrentEvents()
  })

  function shouldEventBeDisplayed(event: CalendarEvent): boolean {
    switch (calendarStore.currentConfig.viewType) {
      case 'month':
        return event.date.month === Number(calendarStore.currentDate.currentMonth)

      case 'year':
        return event.date.year === Number(calendarStore.currentDate.currentYear)

      case 'decade':
        return (
          event.date.year >= Number(calendarStore.currentDate.currentYear) - 10 &&
          event.date.year <= Number(calendarStore.currentDate.currentYear) + 10
        )

      case 'century':
        return (
          event.date.year >= Number(calendarStore.currentDate.currentYear) - 100 &&
          event.date.year <= Number(calendarStore.currentDate.currentYear) + 100
        )

      default:
        return false
    }
  }

  function computeCurrentEvents(): CalendarEvent[] {
    const allEvents = [...characterBirthEvents.value, ...characterDeathEvents.value]

    return allEvents.filter((event) => shouldEventBeDisplayed(event))
  }

  return { currentEvents }
})
