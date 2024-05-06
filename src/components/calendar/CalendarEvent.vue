<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { areDatesIdentical, type LeimDate } from '@/models/Date'
import type { CalendarEvent } from '@/models/Events'
import { ref } from 'vue'

import CalendarEventDetails from './CalendarEventDetails.vue'
import { Popover, PopoverTrigger } from '@/components/ui/popover'

const props = defineProps<{
  event: CalendarEvent
  tileDate: LeimDate
}>()

const spansMultipleDays = Boolean(props.event.startDate && props.event.endDate)

const isStartEvent = spansMultipleDays && areDatesIdentical(props.tileDate, props.event.startDate)
const isEndEvent =
  spansMultipleDays && props.event.endDate && areDatesIdentical(props.tileDate, props.event.endDate)

const isPopoverOpen = ref<boolean>(false)

function handleClosePopover() {
  isPopoverOpen.value = false
}
</script>

<template>
  <Popover v-model:open="isPopoverOpen">
    <PopoverTrigger as-child>
      <button
        class="text-xs px-2 py-1 block w-full text-left rounded-sm whitespace-nowrap overflow-hidden text-ellipsis"
        :class="
          cn({
            'text-white bg-slate-600 hover:bg-slate-700': !event.category,
            'text-white bg-lime-600 hover:bg-lime-700': event.category === 'naissance',
            'text-white bg-stone-500 hover:bg-stone-700': event.category === 'mort',
            'text-white bg-orange-600 hover:bg-orange-700': event.category === 'catastrophe',
            'text-white bg-pink-600 hover:bg-pink-700': event.category === 'catastrophe naturelle',
            'text-white bg-sky-600 hover:bg-sky-700': event.category === 'législation',
            'text-white bg-purple-600 hover:bg-purple-700': event.category === 'religion',
            'text-white bg-emerald-600 hover:bg-emerald-700': event.category === 'joueurs',
            'text-slate-900 bg-amber-300 hover:bg-amber-400': event.category === 'inauguration',
            'text-slate-900 bg-emerald-200 hover:bg-emerald-300': event.category === 'invention',
            'text-slate-900 bg-cyan-300 hover:bg-cyan-400': event.category === 'science',
            'text-slate-900 bg-white hover:bg-yellow-200': event.category === 'bénédiction',
            'text-slate-900 bg-purple-200 hover:bg-purple-300': event.category === 'découverte',
            'text-slate-900 bg-indigo-200 hover:bg-indigo-300': event.category === 'exploration',
            'text-white bg-amber-600 hover:bg-amber-700': event.category === 'construction',
            'text-slate-900 bg-violet-200 hover:bg-violet-300': event.category === 'arcanologie',
            'text-white bg-rose-600 hover:bg-rose-700': event.category === 'criminalité',
            'text-white bg-stone-600 hover:bg-stone-700': event.category === 'scandale',
            'text-slate-900 bg-yellow-500 hover:bg-yellow-600': event.category === 'commerce',
            'rounded-r-none': isStartEvent,
            'rounded-l-none': isEndEvent
          })
        "
      >
        {{ event.title }}
      </button>
    </PopoverTrigger>

    <CalendarEventDetails
      :event
      :spans-multiple-days
      :is-start-event
      :is-end-event
      @query:close-popover="handleClosePopover"
      v-once
    />
  </Popover>
</template>
