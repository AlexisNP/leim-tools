<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'
import { useCalendarEvents } from '@/stores/events'
import CalendarMenuSearchResults from './CalendarMenuSearchResults.vue'
import { useMagicKeys, whenever } from '@vueuse/core'

const { allEvents } = useCalendarEvents()

const modalOpen = ref(false)

const searchQuery = ref('')
const searchEnough = computed(() => searchQuery.value.length >= 2)
const displaySearch = computed(() => searchQuery.value && searchEnough.value)

const unifier = new RegExp(/[^a-zA-Z0-9\-'']/g)

const searchResults = computed(() => {
  return allEvents.filter((event) => {
    const queryString = new String(searchQuery.value).replace(unifier, '').toLocaleLowerCase()
    const hitTitle = event.title.replace(unifier, '').toLocaleLowerCase().includes(queryString)
    const hitDesc = event.description
      ?.replace(unifier, '')
      .toLocaleLowerCase()
      .includes(queryString)

    return hitTitle || hitDesc
  })
})

function resetSearch() {
  searchQuery.value = ''
}

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
  <Dialog v-model:open="modalOpen" @update:open="resetSearch">
    <DialogTrigger>
      <Button search-slash>
        <PhMagnifyingGlass size="20" weight="light" />
        Recherche avancée
      </Button>
    </DialogTrigger>

    <DialogContent
      class="flex flex-col flex-nowrap top-32 -translate-y-0 data-[state=closed]:slide-out-to-top-[2rem] data-[state=open]:slide-in-from-top-[2rem]"
      :class="{
        'bottom-16': displaySearch && searchResults.length > 0
      }"
    >
      <div class="relative w-full h-fit">
        <Input
          id="search"
          type="text"
          placeholder="Rechercher un évènement, un personnage…"
          class="pl-10 py-6 text-lg"
          v-model:model-value="searchQuery"
          autocomplete="off"
        />
        <span class="absolute start-1 inset-y-0 flex items-center justify-center px-2 opacity-50">
          <PhMagnifyingGlass size="20" />
        </span>
      </div>

      <div v-if="displaySearch && searchResults.length > 0" class="overflow-y-auto">
        <hr class="mb-4" />
        <CalendarMenuSearchResults :events="searchResults" @jumped-to-date="closeDialog()" />
      </div>
    </DialogContent>
  </Dialog>
</template>
