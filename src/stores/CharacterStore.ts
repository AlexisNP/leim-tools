import { charactersList } from '@/data/Characters'
import type { Character } from '@/models/Characters'
import { defineStore } from 'pinia'
import { computed, type ComputedRef } from 'vue'

export const useCharacters = defineStore('characters', () => {
  const characters: Character[] = charactersList

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
