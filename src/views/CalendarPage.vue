<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'

import Calendar from '@/components/calendar/Calendar.vue'
import Sidebar from '@/components/calendar/Sidebar.vue'

const { validateUrlParams } = useCalendar()

validateUrlParams()
</script>

<template>
  <main class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar />
    <Calendar />
  </main>
</template>
