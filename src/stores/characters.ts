import { defineStore } from 'pinia'
import type { LeimDate } from '@/models/Date'
import { computed, type ComputedRef } from 'vue'

export type Character = {
  name: string
  birth?: LeimDate
  death?: LeimDate
}

export const useCharacters = defineStore('characters', () => {
  const characters: Character[] = [
    { name: 'Quacille Lévios', birth: { day: 3, month: 6, year: 3162, period: 'nante' } },
    { name: 'Lazarus Tymos', birth: { day: 29, month: 9, year: 3145, period: 'nante' } },
    { name: 'Ernestin Pomel', birth: { day: 11, month: 2, year: 3179, period: 'nante' } },
    { name: 'Sulvan Trois-Barbes', birth: { day: 20, month: 3, year: 3169, period: 'nante' } }
  ]

  // Get all birth events
  const charactersWithBirthData: ComputedRef<Character[]> = computed(() =>
    characters.filter((character) => character.birth)
  )

  // Get all death events
  const charactersWithDeathData: ComputedRef<Character[]> = computed(() =>
    characters.filter((character) => character.death)
  )

  return { characters, charactersWithBirthData, charactersWithDeathData }
})
