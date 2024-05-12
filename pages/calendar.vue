<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCalendar } from '@/stores/CalendarStore'

import Calendar from '@/components/calendar/Calendar.vue'
import Sidebar from '@/components/calendar/Sidebar.vue'
import CalendarSearch from '@/components/calendar/search/CalendarSearch.vue'
import { useRoute, useRouter } from 'vue-router'
import { isDigit, isInt, isSignedInt } from '@/utils/Regex'
import { onBeforeMount } from 'vue'

const router = useRouter()
const route = useRoute()
const { defaultDate, selectedDate, jumpToDate } = useCalendar()
const { isAdvancedSearchOpen } = storeToRefs(useCalendar())

// Check whether all the params are good to go before rendering anything
onBeforeMount(() => {
  let isInvalid: boolean = false

  // If the user already has a selected date from session, jump to it
  if (selectedDate) {
    jumpToDate(selectedDate)
  } else {
    // Assign default values if no params exist in URL
    if (!route.query.day || typeof route.query.day === 'object' || !isInt(route.query.day)) {
      route.query.day = defaultDate.day.toString()
      isInvalid = true
    }
    if (
      !route.query.month ||
      typeof route.query.month === 'object' ||
      !isDigit(route.query.month)
    ) {
      route.query.month = defaultDate.month.toString()
      isInvalid = true
    }
    if (
      !route.query.year ||
      typeof route.query.year === 'object' ||
      !isSignedInt(route.query.year)
    ) {
      route.query.year = defaultDate.year.toString()
      isInvalid = true
    }

    if (isInvalid) {
      console.log('replaced')
      router.replace({ query: route.query, replace: true })
    }
  }
})
</script>

<template>
  <main class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar />
    <Calendar />

    <CalendarSearch v-model:model-value="isAdvancedSearchOpen" />
  </main>
</template>
