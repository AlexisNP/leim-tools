<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useCalendar } from '@/stores/CalendarStore'
import { useTitle } from '@vueuse/core'
import { titleTemplate } from './meta'

import Calendar from '@/components/calendar/Calendar.vue'
import Sidebar from '@/components/calendar/Sidebar.vue'
import CalendarSearch from '@/components/calendar/search/CalendarSearch.vue'

const { validateUrlParams } = useCalendar()
const { isAdvancedSearchOpen } = storeToRefs(useCalendar())

onMounted(() => validateUrlParams())

useTitle('Calendrier', titleTemplate)
</script>

<template>
  <main class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar />
    <Calendar />
  </main>

  <CalendarSearch v-model:model-value="isAdvancedSearchOpen" />
</template>
