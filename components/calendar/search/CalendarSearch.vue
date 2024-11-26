<script lang="ts" setup>
import {
  isCharacter,
  type Character,
} from "@/models/Characters"
import type { RPGDateOrder } from "@/models/Date"
import {
  isCalendarEvent,
  type CalendarEvent,
} from "~/models/CalendarEvent"
import { capitalize } from "@/utils/Strings"
import { useMagicKeys, useScroll, useStorage, whenever } from "@vueuse/core"
import { computed, ref, watch } from "vue"
import { searchUnifier, type SearchMode } from "../SearchMode"

import { PhCaretDown, PhClockClockwise, PhClockCounterClockwise, PhMagnifyingGlass } from "@phosphor-icons/vue"
import {
  ComboboxAnchor,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  VisuallyHidden
} from "radix-vue"

import SearchList from "./lists/SearchList.vue"
import type { Category } from "~/models/Category"

const { isAdvancedSearchOpen, allEvents } = storeToRefs(useCalendar())
const { characters } = storeToRefs(useCharacters())

const searchQuery = ref<string>("")
// const searchEnough = computed<boolean>(() => searchQuery.value.length >= 2)

// If the query changes, resets the pagination
// This prevents active page to be greater than the search results
watch(searchQuery, resetPage)

const selectedEntity = useStorage("se", "events" as SearchMode)

// Order
const selectedOrder = ref<RPGDateOrder>("asc")
function setOrderAsc() {
  selectedOrder.value = "asc"
  resetPage()
}

function setOrderDesc() {
  selectedOrder.value = "desc"
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
  if (selectedEntity.value === "events") {
    dataToFilter = allEvents.value
  } else if (selectedEntity.value === "characters") {
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
        .replace(searchUnifier, "")
        .toLocaleLowerCase()

      const hitTitle = item.title
        .replace(searchUnifier, "")
        .toLocaleLowerCase()
        .includes(queryString)
      const hitDesc = item.description
        ?.replace(searchUnifier, "")
        .toLocaleLowerCase()
        .includes(queryString)

      if (!shouldFilterCategories) {
        return hitTitle || hitDesc
      }

      // Handle categories logic
      let hitCategories: boolean = false
      const allCategories: Category[] = []

      if (item.category) {
        allCategories.push(item.category)
      }

      if (item.secondaryCategories && item.secondaryCategories?.length > 0) {
        allCategories.push(...item.secondaryCategories)
      }

      hitCategories = selectedCategories.value.every((selectedCat) => {
        return allCategories.findIndex((c) => c.name === selectedCat.name) !== -1
      })

      return (hitTitle || hitDesc) && hitCategories
    }

    // Filter characters
    if (isCharacter(item)) {
      const queryString = new String(searchQuery.value)
        .replace(searchUnifier, "")
        .toLocaleLowerCase()

      const hitTitle = item.name
        .replace(searchUnifier, "")
        .toLocaleLowerCase()
        .includes(queryString)

      if (!shouldFilterCategories) {
        return hitTitle
      }

      // Handle categories logic
      let hitCategories: boolean = false
      const allCategories: Category[] = []

      if (item.category) {
        allCategories.push(item.category)
      }

      if (item.secondaryCategories && item.secondaryCategories?.length > 0) {
        allCategories.push(...item.secondaryCategories)
      }

      hitCategories = selectedCategories.value.every((selectedCat) => {
        return allCategories.includes(selectedCat as Category)
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
  searchQuery.value = ""
  resetPage()
  selectedCategories.value = []
}

/**
 * Opens the search Uidialog
 */
function openUiDialog() {
  isAdvancedSearchOpen.value = true
}

/**
 * Closes the search Uidialog
 */
function closeUiDialog() {
  isAdvancedSearchOpen.value = false
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
const { data: resCategories } = await useFetch("/api/calendars/categories/query")
const currentCategories = ref<Category[]>(resCategories.value?.data as Category[])

const selectedCategories = ref<(Category)[]>([])
const categoryFilterOpened = ref<boolean>(false)
const searchCategory = ref<string>("")

const filteredCategories = computed(() => {
  // Display original data
  if (!currentCategories.value) return []

  // If current categories are selected, ignore them
  if (!searchCategory.value) return currentCategories.value.filter((i) => !selectedCategories.value.includes(i))

  // If we also have a query to filter them by, do that
  return currentCategories.value.filter((i) => {
    return !selectedCategories.value.includes(i) && i.name.toLocaleLowerCase().includes(searchCategory.value.toLocaleLowerCase())
  })
})

// Reactivity rules for category searches
const categoryInput = ref(null)
const categoryInputValue = ref<string>("")
const { focused: categoryInputFocused } = useFocus(categoryInput)

watch(categoryInputFocused, (isFocused) => {
  categoryFilterOpened.value = isFocused
})

/**
 * Handles the category selections from the TagInput component
 *
 * @param e Radix Change Event
 */
function handleCategorySelect(e: Category) {
  searchCategory.value = ""
  selectedCategories.value.push(e)

  if (filteredCategories.value.length === 0) {
    categoryFilterOpened.value = false
  }
}

/**
 * Removes a category from selection from the TagInput component
 */
function handleCategoryUnselect(e: Category) {
  selectedCategories.value.splice(selectedCategories.value.findIndex(sc => sc.name === e.name), 1)

  if (filteredCategories.value.length === 0) {
    categoryFilterOpened.value = false
  }
}
</script>

<template>
  <UiDialog v-model:open="isAdvancedSearchOpen" @update:open="resetSearch()">
    <UiDialogContent
      class="flex flex-col flex-nowrap top-16 -translate-y-0 data-[state=closed]:slide-out-to-top-[5%] data-[state=open]:slide-in-from-top-[5%]"
      :class="{
        'bottom-16': searchResults.length > 0
      }"
    >
      <VisuallyHidden>
        <UiDialogTitle> {{ $t('entity.advancedSearch.title') }} </UiDialogTitle>
      </VisuallyHidden>
      <VisuallyHidden>
        <UiDialogDescription>
          {{ $t('entity.advancedSearch.title') }}
        </UiDialogDescription>
      </VisuallyHidden>

      <!-- UiDialog header -->
      <div id="searchForm" class="grid gap-3">
        <div class="relative w-full h-fit">
          <UiInput
            id="search"
            v-model:model-value="searchQuery"
            type="text"
            :placeholder="$t('entity.advancedSearch.ctaPlaceholder')"
            class="pl-10 py-6 text-lg"
            autocomplete="off"
          />
          <span class="absolute start-1 inset-y-0 flex items-center justify-center px-2 opacity-50">
            <PhMagnifyingGlass size="20" />
          </span>
        </div>

        <div class="flex items-center justify-between gap-8">
          <div>
            <UiToggleGroup
              v-model="selectedEntity"
              type="single"
              class="justify-start"
              @update:model-value="handleEntitySwitch()"
            >
              <UiToggleGroupItem value="events" aria-label="Uniquement les évènements">
                {{ $t('entity.calendar.event.namePlural') }}
              </UiToggleGroupItem>
              <!-- Not used for now -->
              <!-- <UiToggleGroupItem value="characters" aria-label="Uniquement les personnages">
                {{ $t('entity.character.namePlural') }}
              </UiToggleGroupItem> -->
            </UiToggleGroup>
          </div>

          <div class="grow flex justify-end items-center gap-1">
            <UiTagsInput class="grow px-0 gap-y-1 w-80">
              <div v-if="selectedCategories.length > 0" class="flex gap-2 flex-wrap items-center px-3">
                <UiTagsInputItem v-for="item in selectedCategories" :key="item.id" :value="item.name">
                  <UiTagsInputItemText class="capitalize cursor-pointer" @click="handleCategoryUnselect(item)" />
                </UiTagsInputItem>
              </div>

              <ComboboxRoot
                v-model="selectedCategories"
                v-model:open="categoryFilterOpened"
                v-model:searchTerm="searchCategory"
                class="grow flex items-center gap-y-1 pr-2"
              >
                <ComboboxAnchor as-child>
                  <ComboboxInput :placeholder="$t('entity.category.namePlural')" as-child>
                    <UiTagsInputInput
                      ref="categoryInput"
                      v-model="categoryInputValue"
                      class="min-w-16 px-3"
                      @keydown.enter.prevent
                    />
                  </ComboboxInput>
                </ComboboxAnchor>

                <ComboboxTrigger>
                  <PhCaretDown size="16" />
                </ComboboxTrigger>

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
                        :key="cat.name"
                        :value="cat"
                        @select.prevent="handleCategorySelect(cat)"
                      >
                        {{ capitalize(cat.name) }}
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
                  <p>{{ $t('entity.advancedSearch.older') }}</p>
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
                  <p>{{ $t('entity.advancedSearch.newer') }}</p>
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
