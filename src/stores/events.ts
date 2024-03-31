import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useCharacters } from './characters'

import type { LeimDate } from '@/models/Date'

type CalendarEvent = {
  title: string
  date: LeimDate
}

export const useCalendarEvents = defineStore('calendar-events', () => {
  const { characters } = useCharacters()

  const characterBirthEvents = computed(() => {
    const charactersWithBirthData = characters.filter((character) => character.birth)
    return charactersWithBirthData.map((character) => {
      return { title: `Naissance de ${character.name}`, date: character.birth } as CalendarEvent
    })
  })

  const characterDeathEvents = computed(() => {
    const charactersWithDeathData = characters.filter((character) => character.death)
    return charactersWithDeathData.map((character) => {
      return { title: `Décès de ${character.name}`, date: character.death } as CalendarEvent
    })
  })

  return { characterBirthEvents, characterDeathEvents }
})
