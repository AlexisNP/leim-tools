<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'
import { computed, type Component, type ComputedRef } from 'vue'

import { PhMagnifyingGlass } from '@phosphor-icons/vue'
import MonthlyLayout from './state/monthly/Layout.vue'
import CenturyLayout from './state/centennially/Layout.vue'
import DecadeLayout from './state/decennially/Layout.vue'
import YearLayout from './state/yearly/Layout.vue'

const route = useRoute()
const worldId = route.params.id

const { setCalendarId, setMonths, setDefaultDate, currentConfig, selectedDate, jumpToDate } = useCalendar()
const { setEvents, setCategories } = useCalendarEvents()
const { setCharacters } = useCharacters()

const { months } = storeToRefs(useCalendar())

const { data: calendar, pending: calPending, refresh: calRefresh } = await useLazyFetch(`/api/calendars/query?world_id=${worldId}`)
const { data: characters, pending: charPending, refresh: charRefresh } = await useLazyFetch(`/api/characters/query?world_id=${worldId}`)
const { data: categories, pending: categoryPending, refresh: categoryRefresh } = await useLazyFetch(`/api/calendars/categories/query`)

if (!calendar.value) {
  await calRefresh()
} else {
  if (calendar.value?.data?.id) {
    setCalendarId(calendar.value?.data?.id)
  }
  if (calendar.value?.data?.months) {
    setMonths(calendar.value?.data?.months)
  }
  if (calendar.value?.data?.months) {
    setMonths(calendar.value?.data?.months)
  }
  if (calendar.value?.data?.today) {
    setDefaultDate(calendar.value?.data?.today)
  }
  if (calendar.value?.data?.events) {
    setEvents(calendar.value?.data?.events)
  }
}

if (!categories.value) {
  await categoryRefresh()
} else {
  if (categories.value?.data) {
    setCategories(categories.value?.data)
  }
}

if (!characters.value) {
  await charRefresh()
} else {
  if (characters.value?.data) {
    setCharacters(characters.value?.data)
  }
}

watch(calPending, (newStatus) => {
  if (!newStatus) {
    if (calendar.value?.data?.id) {
      setCalendarId(calendar.value?.data?.id)
    }
    if (calendar.value?.data?.months) {
      setMonths(calendar.value?.data?.months)
    }
    if (calendar.value?.data?.today) {
      setDefaultDate(calendar.value?.data?.today)
    }
    if (calendar.value?.data?.events) {
      setEvents(calendar.value?.data?.events)
    }
  }
})
watch(categoryPending, (newStatus) => {
  if (!newStatus) {
    if (categories.value?.data) {
      setCategories(categories.value?.data)
    }
  }
})
watch(charPending, (newStatus) => {
  if (!newStatus) {
    if (characters.value?.data) {
      setCharacters(characters.value?.data)
    }
  }
})

const progressPercent = computed(() => 100 / [charPending.value, calPending.value, categoryPending.value].filter(Boolean).length)

const currentViewComponent: ComputedRef<Component> = computed<Component>(() => {
  switch (currentConfig.viewType) {
    case 'month':
      return MonthlyLayout

    case 'year':
      return YearLayout

    case 'decade':
      return DecadeLayout

    case 'century':
    default:
      return CenturyLayout
  }
})

const { setCurrentMenu } = useUiStore()

onMounted(() => {
  jumpToDate(selectedDate)

  setCurrentMenu([
    {
      phIcon: shallowRef(PhMagnifyingGlass),
      tooltip: 'Recherche avancée',
      action: 'event-search'
    }
  ])
})
</script>

<template>
  <div class="h-full w-full relative">
    <TransitionGroup name="screen">
      <div v-if="calPending || charPending || categoryPending" class="h-full w-full grid place-items-center">
        <div class="flex flex-col items-center w-1/2">
          <UiProgress :model-value="progressPercent" />
          <p class="text-lg mt-2">Chargement en cours…</p>
        </div>
      </div>
      <div v-else-if="months.length > 0" class="h-full grid grid-rows-[auto,1fr]">
        <CalendarMenu />

        <KeepAlive>
          <component :is="currentViewComponent"/>
        </KeepAlive>

        <LazyCalendarSearch />
        <LazyCalendarFormUpdateEvent />
        <LazyCalendarFormDeleteEvent />
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.screen-move, /* apply transition to moving elements */
.screen-enter-active,
.screen-leave-active {
  transition: all .4s ease-out;
}

.screen-enter-from,
.screen-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.screen-leave-active {
  position: absolute;
}
</style>
