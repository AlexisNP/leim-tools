<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCalendar } from '@/stores/CalendarStore'

import Calendar from '@/components/calendar/Calendar.vue'
import Sidebar from '@/components/calendar/Sidebar.vue'
import CalendarSearch from '@/components/calendar/search/CalendarSearch.vue'

const { isAdvancedSearchOpen } = storeToRefs(useCalendar())

useHead({
  title: 'Calendar'
})
</script>

<template>
  <main class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar />
    <Calendar />

    <CalendarSearch v-model:model-value="isAdvancedSearchOpen" />
  </main>
</template>
