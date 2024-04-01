<script lang="ts" setup>
import type { CalendarEvent } from '@/stores/events'

const props = defineProps<{
  event: CalendarEvent
}>()
</script>

<template>
  <button
    class="text-xs text-white px-2 py-1 bg-pink-700 block w-full text-left rounded-sm hover:bg-pink-800"
  >
    {{ event.title }}
  </button>
</template>
