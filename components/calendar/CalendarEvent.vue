<script lang="ts" setup>
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import type { RPGDate } from '@/models/Date'
import type { CalendarEvent } from '~/models/CalendarEvent'

const props = defineProps<{
  event: CalendarEvent
  tileDate: RPGDate
}>()

const { areDatesIdentical } = useCalendar()

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
  <UiPopover v-model:open="isPopoverOpen">
    <UiPopoverTrigger as-child>
      <button
        class="text-xs px-2 py-1 block w-full text-left rounded-sm whitespace-nowrap overflow-hidden text-ellipsis"
        :class="
          cn({
            'text-white bg-slate-600 hover:bg-slate-700': !event.category,
            'text-white bg-lime-600 hover:bg-lime-700': event.category?.name === 'naissance',
            'text-white bg-stone-500 hover:bg-stone-700': event.category?.name === 'mort',
            'text-white bg-orange-600 hover:bg-orange-700': event.category?.name === 'catastrophe',
            'text-white bg-pink-600 hover:bg-pink-700': event.category?.name === 'catastrophe naturelle',
            'text-white bg-sky-600 hover:bg-sky-700': event.category?.name === 'législation',
            'text-white bg-purple-600 hover:bg-purple-700': event.category?.name === 'religion',
            'text-white bg-emerald-600 hover:bg-emerald-700': event.category?.name === 'joueurs',
            'text-slate-900 bg-amber-300 hover:bg-amber-400': event.category?.name === 'inauguration',
            'text-slate-900 bg-emerald-200 hover:bg-emerald-300': event.category?.name === 'invention',
            'text-slate-900 bg-cyan-300 hover:bg-cyan-400': event.category?.name === 'science',
            'text-slate-900 bg-white hover:bg-yellow-200': event.category?.name === 'bénédiction',
            'text-slate-900 bg-purple-200 hover:bg-purple-300': event.category?.name === 'découverte',
            'text-slate-900 bg-indigo-200 hover:bg-indigo-300': event.category?.name === 'exploration',
            'text-white bg-amber-600 hover:bg-amber-700': event.category?.name === 'construction',
            'text-slate-900 bg-violet-200 hover:bg-violet-300': event.category?.name === 'arcanologie',
            'text-white bg-rose-600 hover:bg-rose-700': event.category?.name === 'criminalité',
            'text-white bg-stone-600 hover:bg-stone-700': event.category?.name === 'scandale',
            'text-slate-900 bg-yellow-500 hover:bg-yellow-600': event.category?.name === 'commerce',
            'rounded-r-none': isStartEvent,
            'rounded-l-none': isEndEvent
          })
        "
      >
        {{ event.title }}
      </button>
    </UiPopoverTrigger>

    <CalendarEventDetails
      v-once
      :event
      :spans-multiple-days
      :is-start-event
      :is-end-event
      @query:close-popover="handleClosePopover"
    />
  </UiPopover>
</template>
