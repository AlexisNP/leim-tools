<script lang="ts" setup>
import type { LeimDate } from '@/models/Date'
import { useCalendar } from '@/stores/calendar'
import type { CalendarEvent } from '@/stores/events'

defineProps<{
  events: CalendarEvent[]
}>()

const emit = defineEmits(['jumpedToDate'])

const { jumpToDate } = useCalendar()

function handleJumpToDate(date: LeimDate) {
  jumpToDate(date)
  emit('jumpedToDate')
}
</script>

<template>
  <ul class="grid gap-3">
    <li v-for="e in events" :key="e.title">
      <button
        class="block w-full text-left p-2 rounded-sm"
        :class="{
          'bg-slate-600 hover:bg-slate-700': !e.category,
          'bg-green-700 hover:bg-green-800': e.category === 'birth',
          'bg-stone-600 hover:bg-stone-800': e.category === 'death',
          'bg-red-600 hover:bg-red-800': e.category === 'catastrophe',
          'bg-pink-600 hover:bg-pink-800': e.category === 'natural-disaster',
          'bg-blue-600 hover:bg-blue-800': e.category === 'legal',
          'bg-amber-700 hover:bg-amber-800': e.category === 'player'
        }"
        @click="handleJumpToDate(e.date)"
      >
        <div>
          {{ e.title }}
        </div>

        <div v-if="e.description" class="text-sm">
          <hr class="my-2 border-white opacity-25" />
          <span class="opacity-75">
            {{ e.description }}
          </span>
        </div>
      </button>
    </li>
  </ul>
</template>
