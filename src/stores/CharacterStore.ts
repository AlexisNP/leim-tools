import { charactersList } from '@/data/Characters'
import type { Character } from '@/models/Characters'
import { defineStore } from 'pinia'

export const useCharacters = defineStore('characters', () => {
  const characters: Character[] = charactersList

  // Get all birth events
  const charactersWithBirthData: Character[] = characters.filter((character) => character.birth)

  // Get all death events
  const charactersWithDeathData: Character[] = characters.filter((character) => character.death)

  return { characters, charactersWithBirthData, charactersWithDeathData }
})
