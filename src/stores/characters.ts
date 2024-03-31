import { defineStore } from 'pinia'
import type { LeimDate } from '@/models/Date'

type Character = {
  name: string
  birth?: LeimDate
  death?: LeimDate
}

export const useCharacters = defineStore('characters', () => {
  const characters: Character[] = [
    { name: 'Quacille Lévios', birth: { day: 3, month: 6, year: 3162, period: 'nante' } },
    { name: 'Lazarus Tymos', birth: { day: 29, month: 9, year: 3145, period: 'nante' } },
    { name: 'Ernestin Pomel', birth: { day: 11, month: 2, year: 3179, period: 'nante' } }
  ]

  return { characters }
})
