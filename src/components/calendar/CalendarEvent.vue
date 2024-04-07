<script lang="ts" setup>
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import type { CalendarEvent } from '@/models/Events'

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
          'bg-lime-600 hover:bg-lime-700': event.category === 'birth',
          'bg-stone-600 hover:bg-stone-700': event.category === 'death',
          'bg-orange-600 hover:bg-orange-700': event.category === 'catastrophe',
          'bg-pink-600 hover:bg-pink-700': event.category === 'natural-disaster',
          'bg-sky-600 hover:bg-sky-700': event.category === 'legal',
          'text-slate-900 bg-amber-300 hover:bg-amber-400': event.category === 'inauguration',
          'bg-purple-600 hover:bg-purple-700': event.category === 'religious',
          'bg-emerald-600 hover:bg-emerald-700': event.category === 'player'
        }"
      >
        {{ event.title }}
      </button>
    </PopoverTrigger>

    <CalendarEventDetails :event />
  </Popover>
</template>
