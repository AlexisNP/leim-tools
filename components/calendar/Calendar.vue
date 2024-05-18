<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'
import { computed, type Component, type ComputedRef } from 'vue'

import MonthlyLayout from './state/monthly/Layout.vue'
import CenturyLayout from './state/centennially/Layout.vue'
import DecadeLayout from './state/decennially/Layout.vue'
import YearLayout from './state/yearly/Layout.vue'

const route = useRoute()
const worldId = route.params.id

const { setMonths, setDefaultDate, currentConfig, selectedDate, jumpToDate } = useCalendar()
const { setEvents } = useCalendarEvents()

const { data: calendar, pending, refresh } = await useLazyFetch(`/api/calendars/query?world_id=${worldId}`)

if (!calendar.value) {
  await refresh()
} else {
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

watch(pending, (newStatus) => {
  if (!newStatus) {
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

onMounted(() => {
  jumpToDate(selectedDate)
})
</script>

<template>
  <div class="h-full">
    <template v-if="pending">
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
    </template>
  </div>
</template>
