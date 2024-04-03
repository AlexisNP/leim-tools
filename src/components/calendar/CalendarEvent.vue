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
        class="text-xs text-white px-2 py-1 block w-full text-left rounded-sm whitespace-nowrap overflow-hidden text-ellipsis"
        :class="{
          'bg-slate-600 hover:bg-slate-700': !event.category,
          'bg-green-700 hover:bg-green-800': event.category === 'birth',
          'bg-stone-600 hover:bg-stone-800': event.category === 'death',
          'bg-red-600 hover:bg-red-800': event.category === 'catastrophe',
          'bg-pink-600 hover:bg-pink-800': event.category === 'natural-disaster',
          'bg-blue-600 hover:bg-blue-800': event.category === 'legal',
          'bg-amber-700 hover:bg-amber-800': event.category === 'player'
        }"
      >
        {{ event.title }}
      </button>
    </PopoverTrigger>

    <CalendarEventDetails :event />
  </Popover>
</template>
