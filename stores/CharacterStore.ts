import type { Character } from '@/models/Characters'
import { defineStore } from 'pinia'

export const useCharacters = defineStore('characters', () => {
  const characters = ref<Character[]>([])

  async function setCharacters(data: Character[]) {
    characters.value = data
  }

  return { characters, setCharacters }
})
