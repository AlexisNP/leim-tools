import type { Character } from '@/models/Characters'
import { defineStore } from 'pinia'

export const useCharacters = defineStore('characters', () => {
  const characters = ref<Character[]>([])
  const charactersAreLoading = ref<boolean>(false)
  const charactersLoaded = ref<boolean>(false)

  async function fetchCharacters() {
    try {
      charactersAreLoading.value = true
      const fetched = await useFetch<Character[]>('/api/characters')

      if (fetched.data.value) {
        charactersLoaded.value = true
        characters.value = fetched.data.value
      }
    } catch (err) {
      console.log(err)
    } finally {
      charactersAreLoading.value = false
    }
  }
  fetchCharacters()

  return { characters }
})
