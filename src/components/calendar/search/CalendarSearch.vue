<script lang="ts" setup>
import {
  isCharacter,
  type Character,
  characterCategories,
  type CharacterCategory
} from '@/models/Characters'
import type { LeimDateOrder } from '@/models/Date'
import {
  isCalendarEvent,
  type CalendarEvent,
  calendarEventCategories,
  type CalendarEventCategory
} from '@/models/Events'
import { capitalize } from '@/utils/Strings'
import { useCharacters } from '@/stores/CharacterStore'
import { useCalendarEvents } from '@/stores/EventStore'
import { useMagicKeys, useStorage, whenever } from '@vueuse/core'
import { computed, ref } from 'vue'
import { searchUnifier, type SearchMode } from '../Search'

import { Button } from '@/components/ui/button'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
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
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@/components/ui/tags-input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PhClockClockwise, PhClockCounterClockwise, PhMagnifyingGlass } from '@phosphor-icons/vue'
import {
  ComboboxAnchor,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
  VisuallyHidden
} from 'radix-vue'

import SearchList from './lists/SearchList.vue'

const { characters } = useCharacters()
const { baseEvents } = useCalendarEvents()

const modalOpen = ref<boolean>(false)

const searchQuery = ref<string>('')
// const searchEnough = computed<boolean>(() => searchQuery.value.length >= 2)

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
const itemsPerPage: number = 20
const startOfList = computed<number>(() => (currentPage.value - 1) * itemsPerPage)
const endOfList = computed<number>(() => startOfList.value + itemsPerPage)

function resetPage() {
  currentPage.value = 1
}

const searchResults = computed<(Character | CalendarEvent)[]>(() => {
  let results: (Character | CalendarEvent)[] = []
  let dataToFilter: Character[] | CalendarEvent[] | (Character | CalendarEvent)[]
  const shouldFilterCategories = selectedCategories.value.length > 0

  // Assign data to loop over and filter
  // They are assigned this way for readability
  if (selectedEntity.value === 'events') {
    dataToFilter = baseEvents
  } else if (selectedEntity.value === 'characters') {
    dataToFilter = characters
  } else {
    dataToFilter = [...baseEvents, ...characters]
  }

  /**
   * TODO: Refactor the categories logic, basically extract the return out of the ifs, like above
   */
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

      if (!shouldFilterCategories) {
        return hitTitle || hitDesc
      }

      // Handle categories logic
      let hitCategories: boolean = false
      let allCategories: CalendarEventCategory[] = []

      if (item.category) {
        allCategories.push(item.category)
      }

      if (item.secondaryCategories && item.secondaryCategories?.length > 0) {
        allCategories.push(...item.secondaryCategories)
      }

      hitCategories = selectedCategories.value.every((selectedCat) => {
        return allCategories.includes(selectedCat)
      })

      return (hitTitle || hitDesc) && hitCategories
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

      if (!shouldFilterCategories) {
        return hitTitle
      }

      // Handle categories logic
      let hitCategories: boolean = false
      let allCategories: CalendarEventCategory[] = []

      if (item.category) {
        allCategories.push(item.category)
      }

      if (item.secondaryCategories && item.secondaryCategories?.length > 0) {
        allCategories.push(...item.secondaryCategories)
      }

      hitCategories = selectedCategories.value.every((selectedCat) => {
        return allCategories.includes(selectedCat)
      })

      return hitTitle && hitCategories
    }
  })

  return results
})

function resetSearch() {
  searchQuery.value = ''
  resetPage()
  selectedCategories.value = []
}

function openDialog() {
  modalOpen.value = true
}

function closeDialog() {
  modalOpen.value = false
}

function handleEntitySwitch() {
  resetPage()
  selectedCategories.value = []
}

// Key combos to deploy modal
const keys = useMagicKeys()

whenever(keys.control_period, () => {
  openDialog()
})

// Categories
const currentCategories = computed(() => {
  if (selectedEntity.value === 'characters') {
    return [...characterCategories]
  } else {
    return [...calendarEventCategories]
  }
})

const selectedCategories = ref<(CharacterCategory | CalendarEventCategory)[]>([])
const categoryFilterOpened = ref<boolean>(false)
const searchCategory = ref<string>('')

const filteredFrameworks = computed(() =>
  currentCategories.value.filter((i) => !selectedCategories.value.includes(i))
)

function handleCategorySelect(e: any) {
  if (typeof e.detail.value === 'string') {
    searchCategory.value = ''
    selectedCategories.value.push(e.detail.value)
  }

  if (filteredFrameworks.value.length === 0) {
    categoryFilterOpened.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="modalOpen" @update:open="resetSearch()">
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
      <div class="grid gap-3" id="searchForm">
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
              @update:model-value="handleEntitySwitch()"
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
            <TagsInput class="px-0 gap-0 w-52" :model-value="selectedCategories">
              <div class="flex gap-2 flex-wrap items-center px-3">
                <TagsInputItem v-for="item in selectedCategories" :key="item" :value="item">
                  <TagsInputItemText class="capitalize" />
                  <TagsInputItemDelete />
                </TagsInputItem>
              </div>

              <ComboboxRoot
                v-model="selectedCategories"
                v-model:open="categoryFilterOpened"
                v-model:searchTerm="searchCategory"
                class="w-full"
              >
                <ComboboxAnchor as-child>
                  <ComboboxInput placeholder="Catégories" as-child>
                    <TagsInputInput
                      class="w-full px-3"
                      :class="selectedCategories.length > 0 ? 'mt-2' : ''"
                      @keydown.enter.prevent
                    />
                  </ComboboxInput>
                </ComboboxAnchor>

                <ComboboxPortal :to="'#searchForm'">
                  <CommandList
                    position="popper"
                    class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50"
                    :dismissable="true"
                  >
                    <CommandEmpty />
                    <CommandGroup>
                      <CommandItem
                        v-for="framework in filteredFrameworks"
                        :key="framework"
                        :value="framework"
                        @select.prevent="handleCategorySelect"
                      >
                        {{ capitalize(framework) }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </ComboboxPortal>
              </ComboboxRoot>
            </TagsInput>

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
