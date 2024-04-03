<script lang="ts" setup>
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import type { CalendarEvent } from '@/stores/events'
import CalendarEventDetails from './CalendarEventDetails.vue'

defineProps<{
  event: CalendarEvent
}>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <button
        class="text-xs text-white px-2 py-1 bg-pink-700 block w-full text-left rounded-sm hover:bg-pink-800 whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {{ event.title }}
      </button>
    </PopoverTrigger>

    <CalendarEventDetails :event />
  </Popover>
</template>
