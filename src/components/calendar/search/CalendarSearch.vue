<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useCharacters } from '@/stores/characters'
import { useCalendarEvents } from '@/stores/events'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'
import { useMagicKeys, useStorage, useTimeoutFn, whenever } from '@vueuse/core'
import { computed, ref } from 'vue'
import { searchUnifier, type SearchMode } from '../Search'
import SearchList from './lists/SearchList.vue'
import { isCalendarEvent, type CalendarEvent } from '@/models/Events'
import { isCharacter, type Character } from '@/models/Characters'

const { characters } = useCharacters()
const { baseEvents } = useCalendarEvents()

const modalOpen = ref(false)

const searchQuery = ref('')
const searchEnough = computed(() => searchQuery.value.length >= 2)

const selectedEntity = useStorage('se', undefined as SearchMode)

const searchResults = computed(() => {
  let results: (Character | CalendarEvent)[] = []
  let dataToFilter: Character[] | CalendarEvent[] | (Character | CalendarEvent)[]

  // Assign data to loop over and filter
  // They are assigned this way for readability
  if (selectedEntity.value === 'events') {
    dataToFilter = baseEvents
  } else if (selectedEntity.value === 'characters') {
    dataToFilter = characters
  } else {
    dataToFilter = [...baseEvents, ...characters]
  }

  results = dataToFilter.filter((item) => {
    // Filter calendar events
    if (isCalendarEvent(item)) {
      const queryString = new String(searchQuery.value)
        .replace(searchUnifier, '')
        .toLocaleLowerCase()

      const hitTitle = item.title
        .replace(searchUnifier, '')
        .toLocaleLowerCase()
        .includes(queryString)
      const hitDesc = item.description
        ?.replace(searchUnifier, '')
        .toLocaleLowerCase()
        .includes(queryString)

      return hitTitle || hitDesc
    }

    // Filter characters
    if (isCharacter(item)) {
      const queryString = new String(searchQuery.value)
        .replace(searchUnifier, '')
        .toLocaleLowerCase()

      const hitTitle = item.name
        .replace(searchUnifier, '')
        .toLocaleLowerCase()
        .includes(queryString)

      return hitTitle
    }
  })

  return results
})

function resetSearch() {
  searchQuery.value = ''
}

const resetSearchLazy = useTimeoutFn(() => {
  resetSearch()
}, 300)

function openDialog() {
  modalOpen.value = true
}

function closeDialog() {
  modalOpen.value = false
}

// Key combos to deploy modal
const keys = useMagicKeys()

whenever(keys.control_period, () => {
  openDialog()
})
</script>

<template>
  <Dialog v-model:open="modalOpen" @update:open="resetSearchLazy.start">
    <DialogTrigger>
      <Button search-slash>
        <PhMagnifyingGlass size="20" weight="light" />
        Recherche avancée
      </Button>
    </DialogTrigger>

    <DialogContent
      class="flex flex-col flex-nowrap top-16 -translate-y-0 data-[state=closed]:slide-out-to-top-[5%] data-[state=open]:slide-in-from-top-[5%]"
      :class="{
        'bottom-16': searchResults.length > 0
      }"
    >
      <div class="relative w-full h-fit">
        <Input
          id="search"
          type="text"
          placeholder="Rechercher le calendrier"
          class="pl-10 py-6 text-lg"
          v-model:model-value="searchQuery"
          autocomplete="off"
        />
        <span class="absolute start-1 inset-y-0 flex items-center justify-center px-2 opacity-50">
          <PhMagnifyingGlass size="20" />
        </span>
      </div>

      <ToggleGroup type="single" class="justify-start" v-model="selectedEntity">
        <ToggleGroupItem value="events" aria-label="Uniquement les évènements">
          Évènements
        </ToggleGroupItem>
        <ToggleGroupItem value="characters" aria-label="Uniquement les personnages">
          Personnages
        </ToggleGroupItem>
      </ToggleGroup>

      <hr />

      <div v-if="searchResults.length > 0" class="overflow-y-auto">
        <SearchList
          :results="searchResults"
          :current-entity="selectedEntity"
          @jumped-to-date="closeDialog()"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>
