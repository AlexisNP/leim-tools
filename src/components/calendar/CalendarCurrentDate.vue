<script lang="ts" setup>
import { getRelativeString } from '@/models/Date'
import { useCalendar } from '@/stores/CalendarStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { PhMapPin } from '@phosphor-icons/vue'

const { defaultDate, getFormattedDateTitle } = useCalendar()
const { selectedDate } = storeToRefs(useCalendar())

const mainDateTitle = computed(() => getFormattedDateTitle(selectedDate.value, true))

const dateDifference = computed(() => getRelativeString(defaultDate, selectedDate.value))
</script>

<template>
  <h1 class="text-2xl font-bold flex items-center gap-1">
    <PhMapPin size="26" weight="bold" /> {{ mainDateTitle }}
  </h1>
  <h2 class="text-lg italic opacity-75">
    {{ dateDifference }}
  </h2>
</template>
