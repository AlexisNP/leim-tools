<script lang="ts" setup>
import { isCharacter, type Character } from '@/models/Characters'
import type { LeimDateOrder } from '@/models/Date'
import { isCalendarEvent, type CalendarEvent } from '@/models/Events'
import { useCharacters } from '@/stores/CharacterStore'
import { useCalendarEvents } from '@/stores/EventStore'
import { PhClockClockwise, PhClockCounterClockwise, PhMagnifyingGlass } from '@phosphor-icons/vue'
import { useMagicKeys, useStorage, useTimeoutFn, whenever } from '@vueuse/core'
import { VisuallyHidden } from 'radix-vue'
import { computed, ref } from 'vue'
import { searchUnifier, type SearchMode } from '../Search'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import SearchList from './lists/SearchList.vue'

const { characters } = useCharacters()
const { baseEvents } = useCalendarEvents()

const modalOpen = ref(false)

const searchQuery = ref('')
const searchEnough = computed(() => searchQuery.value.length >= 2)

const selectedEntity = useStorage('se', 'events' as SearchMode)

// Order
const selectedOrder = ref<LeimDateOrder>('asc')
function setOrderAsc() {
  selectedOrder.value = 'asc'
  resetPage()
}

function setOrderDesc() {
  selectedOrder.value = 'desc'
  resetPage()
}

// Limit
const currentPage = ref<number>(1)
const itemsPerPage = 20
const startOfList = computed(() => (currentPage.value - 1) * itemsPerPage)
const endOfList = computed(() => startOfList.value + itemsPerPage)

function resetPage() {
  currentPage.value = 1
}

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
}, 100)

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
      <VisuallyHidden>
        <DialogTitle> Recherche avancée </DialogTitle>
      </VisuallyHidden>
      <VisuallyHidden>
        <DialogDescription>
          Rechercher les données disponibles sur le calendrier
        </DialogDescription>
      </VisuallyHidden>

      <!-- Dialog header -->
      <div class="grid gap-3">
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

        <div class="flex items-center justify-between">
          <div>
            <ToggleGroup
              type="single"
              class="justify-start"
              v-model="selectedEntity"
              @update:model-value="resetPage()"
            >
              <ToggleGroupItem value="events" aria-label="Uniquement les évènements">
                Évènements
              </ToggleGroupItem>
              <ToggleGroupItem value="characters" aria-label="Uniquement les personnages">
                Personnages
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div class="flex items-center gap-1">
            <TooltipProvider :delayDuration="250">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    :variant="selectedOrder === 'desc' ? 'secondary' : 'outline'"
                    size="icon"
                    @click="setOrderDesc()"
                  >
                    <PhClockCounterClockwise size="18" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Plus ancien</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider :delayDuration="250">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    :variant="selectedOrder === 'asc' ? 'secondary' : 'outline'"
                    size="icon"
                    @click="setOrderAsc()"
                  >
                    <PhClockClockwise size="18" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Plus récent</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <hr />

      <div v-if="searchResults.length > 0" class="grow overflow-y-auto">
        <SearchList
          :results="searchResults"
          :current-entity="selectedEntity"
          :order="selectedOrder"
          :start-at="startOfList"
          :end-at="endOfList"
          @jumped-to-date="closeDialog()"
        />
      </div>

      <div class="flex justify-end">
        <Pagination
          v-model:page="currentPage"
          :total="searchResults.length"
          :items-per-page="itemsPerPage"
          :sibling-count="2"
          show-edges
          :default-page="1"
        >
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrev />

            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  class="w-10 h-10 p-0"
                  :variant="item.value === currentPage ? 'default' : 'outline'"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext />
            <PaginationLast />
          </PaginationList>
        </Pagination>
      </div>
    </DialogContent>
  </Dialog>
</template>
