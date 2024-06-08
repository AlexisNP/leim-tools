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
const { setEvents } = useCalendarEvents()
const { setCharacters } = useCharacters()

const { data: calendar, pending: calPending, refresh: calRefresh } = await useLazyFetch(`/api/calendars/query?world_id=${worldId}`)
const { data: characters, pending: charPending, refresh: charRefresh } = await useLazyFetch(`/api/characters/query?world_id=${worldId}`)

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
watch(charPending, (newStatus) => {
  if (!newStatus) {
    if (characters.value?.data) {
      setCharacters(characters.value?.data)
    }
  }
})

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
  <div class="h-full">
    <template v-if="calPending || charPending">
      <div class="h-full grid place-items-center">
        Loading notamment
      </div>
    </template>
    <template v-else>
      <div class="h-full grid grid-rows-[auto,1fr]">
        <CalendarMenu />

        <KeepAlive>
          <component :is="currentViewComponent"/>
        </KeepAlive>
      </div>

      <LazyCalendarSearch />
      <LazyCalendarFormUpdateEvent />
      <LazyCalendarFormDeleteEvent />
    </template>
  </div>
</template>
