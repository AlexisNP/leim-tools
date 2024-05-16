<script lang="ts" setup>
import {
  characterCategories,
  isCharacter,
  type Character,
  type CharacterCategory
} from '@/models/Characters'
import type { RPGDateOrder } from '@/models/Date'
import {
  calendarEventCategories,
  isCalendarEvent,
  type CalendarEvent,
  type CalendarEventCategory
} from '~/models/CalendarEvent'
import { useCharacters } from '@/stores/CharacterStore'
import { useCalendarEvents } from '@/stores/EventStore'
import { capitalize } from '@/utils/Strings'
import { useMagicKeys, useScroll, useStorage, whenever } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { searchUnifier, type SearchMode } from '../SearchMode'

import { PhClockClockwise, PhClockCounterClockwise, PhMagnifyingGlass } from '@phosphor-icons/vue'
import {
  ComboboxAnchor,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
  VisuallyHidden
} from 'radix-vue'

import SearchList from './lists/SearchList.vue'

const { characters } = storeToRefs(useCharacters())
const { allEvents } = storeToRefs(useCalendarEvents())

const modalOpen = defineModel<boolean>({ default: false })

const searchQuery = ref<string>('')
// const searchEnough = computed<boolean>(() => searchQuery.value.length >= 2)

const selectedEntity = useStorage('se', 'events' as SearchMode)

// Order
const selectedOrder = ref<RPGDateOrder>('asc')
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

/**
 * Resets the pagination
 */
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
    dataToFilter = allEvents.value
  } else if (selectedEntity.value === 'characters') {
    dataToFilter = characters.value
  } else {
    dataToFilter = [...allEvents.value, ...characters.value]
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
      const allCategories: CalendarEventCategory[] = []

      if (item.category) {
        allCategories.push(item.category)
      }

      if (item.secondaryCategories && item.secondaryCategories?.length > 0) {
        allCategories.push(...item.secondaryCategories)
      }

      hitCategories = selectedCategories.value.every((selectedCat) => {
        return allCategories.includes(selectedCat as CalendarEventCategory)
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
      const allCategories: CharacterCategory[] = []

      if (item.category) {
        allCategories.push(item.category)
      }

      if (item.secondaryCategories && item.secondaryCategories?.length > 0) {
        allCategories.push(...item.secondaryCategories)
      }

      hitCategories = selectedCategories.value.every((selectedCat) => {
        return allCategories.includes(selectedCat as CharacterCategory)
      })

      return hitTitle && hitCategories
    }
  })

  return results
})

/**
 * Removes the search query, resets the pagination and removes all selected categories
 */
function resetSearch() {
  searchQuery.value = ''
  resetPage()
  selectedCategories.value = []
}

/**
 * Opens the search Uidialog
 */
function openUiDialog() {
  modalOpen.value = true
}

/**
 * Closes the search Uidialog
 */
function closeUiDialog() {
  modalOpen.value = false
}

/**
 * Switches the selectedEntity
 */
function handleEntitySwitch() {
  resetPage()
  selectedCategories.value = []
}

// Key combos to deploy modal
const keys = useMagicKeys()

whenever(keys.control_period, () => {
  openUiDialog()
})

const searchResultsRef = ref<HTMLElement | null>(null)
const { y: searchResultsY } = useScroll(searchResultsRef)

watch([currentPage, selectedEntity], () => {
  searchResultsY.value = 0
})

// Compute categories based on current selectedEntity
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

const filteredCategories = computed(() =>
  currentCategories.value.filter((i) => !selectedCategories.value.includes(i))
)

/**
 * Handles the category selections from the TagInput component
 *
 * @param e Radix Change Event
 */
function handleCategorySelect(e: (CharacterCategory | CalendarEventCategory)) {
  if (typeof e === 'string') {
    searchCategory.value = ''
    selectedCategories.value.push(e)
  }

  if (filteredCategories.value.length === 0) {
    categoryFilterOpened.value = false
  }
}
</script>

<template>
  <UiDialog v-model:open="modalOpen" @update:open="resetSearch()">
    <UiDialogContent
      class="flex flex-col flex-nowrap top-16 -translate-y-0 data-[state=closed]:slide-out-to-top-[5%] data-[state=open]:slide-in-from-top-[5%]"
      :class="{
        'bottom-16': searchResults.length > 0
      }"
    >
      <VisuallyHidden>
        <UiDialogTitle> Recherche avancée </UiDialogTitle>
      </VisuallyHidden>
      <VisuallyHidden>
        <UiDialogDescription>
          Rechercher les données disponibles sur le calendrier
        </UiDialogDescription>
      </VisuallyHidden>

      <!-- UiDialog header -->
      <div id="searchForm" class="grid gap-3">
        <div class="relative w-full h-fit">
          <UiInput
            id="search"
            v-model:model-value="searchQuery"
            type="text"
            placeholder="Rechercher le calendrier"
            class="pl-10 py-6 text-lg"
            autocomplete="off"
          />
          <span class="absolute start-1 inset-y-0 flex items-center justify-center px-2 opacity-50">
            <PhMagnifyingGlass size="20" />
          </span>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <UiToggleGroup
              v-model="selectedEntity"
              type="single"
              class="justify-start"
              @update:model-value="handleEntitySwitch()"
            >
              <UiToggleGroupItem value="events" aria-label="Uniquement les évènements">
                Évènements
              </UiToggleGroupItem>
              <UiToggleGroupItem value="characters" aria-label="Uniquement les personnages">
                Personnages
              </UiToggleGroupItem>
            </UiToggleGroup>
          </div>

          <div class="flex items-center gap-1">
            <UiTagsInput class="px-0 gap-0 w-72" :model-value="selectedCategories">
              <div class="flex gap-2 flex-wrap items-center px-3">
                <UiTagsInputItem v-for="item in selectedCategories" :key="item" :value="item">
                  <UiTagsInputItemText class="capitalize" />
                  <UiTagsInputItemDelete />
                </UiTagsInputItem>
              </div>

              <ComboboxRoot
                v-model="selectedCategories"
                v-model:open="categoryFilterOpened"
                v-model:searchTerm="searchCategory"
                class="w-full"
              >
                <ComboboxAnchor as-child>
                  <ComboboxInput placeholder="Catégories" as-child>
                    <UiTagsInputInput
                      class="w-full px-3"
                      :class="selectedCategories.length > 0 ? 'mt-2' : ''"
                      @keydown.enter.prevent
                    />
                  </ComboboxInput>
                </ComboboxAnchor>

                <ComboboxPortal :to="'#searchForm'">
                  <UiCommandList
                    position="popper"
                    class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50"
                    :dismissable="true"
                  >
                    <UiCommandEmpty />
                    <UiCommandGroup>
                      <UiCommandItem
                        v-for="cat in filteredCategories"
                        :key="cat"
                        :value="cat"
                        @select.prevent="handleCategorySelect(cat)"
                      >
                        {{ capitalize(cat) }}
                      </UiCommandItem>
                    </UiCommandGroup>
                  </UiCommandList>
                </ComboboxPortal>
              </ComboboxRoot>
            </UiTagsInput>

            <UiTooltipProvider :delay-duration="250">
              <UiTooltip>
                <UiTooltipTrigger as-child>
                  <UiButton
                    :variant="selectedOrder === 'desc' ? 'secondary' : 'outline'"
                    size="icon"
                    @click="setOrderDesc()"
                  >
                    <PhClockCounterClockwise size="18" />
                  </UiButton>
                </UiTooltipTrigger>
                <UiTooltipContent>
                  <p>Plus ancien</p>
                </UiTooltipContent>
              </UiTooltip>
            </UiTooltipProvider>

            <UiTooltipProvider :delay-duration="250">
              <UiTooltip>
                <UiTooltipTrigger as-child>
                  <UiButton
                    :variant="selectedOrder === 'asc' ? 'secondary' : 'outline'"
                    size="icon"
                    @click="setOrderAsc()"
                  >
                    <PhClockClockwise size="18" />
                  </UiButton>
                </UiTooltipTrigger>
                <UiTooltipContent>
                  <p>Plus récent</p>
                </UiTooltipContent>
              </UiTooltip>
            </UiTooltipProvider>
          </div>
        </div>
      </div>

      <hr >

      <div v-if="searchResults.length > 0" ref="searchResultsRef" class="grow overflow-y-auto">
        <SearchList
          :results="searchResults"
          :current-entity="selectedEntity"
          :order="selectedOrder"
          :start-at="startOfList"
          :end-at="endOfList"
          @jumped-to-date="closeUiDialog()"
        />
      </div>

      <div class="flex justify-end">
        <UiPagination
          v-model:page="currentPage"
          :total="searchResults.length"
          :items-per-page="itemsPerPage"
          :sibling-count="2"
          show-edges
          :default-page="1"
        >
          <UiPaginationList v-slot="{ items }" class="flex items-center gap-1">
            <UiPaginationFirst />
            <UiPaginationPrev />

            <template v-for="(item, index) in items">
              <UiPaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <UiButton
                  class="w-10 h-10 p-0"
                  :variant="item.value === currentPage ? 'default' : 'outline'"
                >
                  {{ item.value }}
                </UiButton>
              </UiPaginationListItem>
              <UiPaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <UiPaginationNext />
            <UiPaginationLast />
          </UiPaginationList>
        </UiPagination>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>
