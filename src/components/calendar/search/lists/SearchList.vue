<script lang="ts" setup>
import { isCharacter, type Character } from '@/models/Characters'
import { compareDates, type LeimDate, type LeimDateOrder } from '@/models/Date'
import { isCalendarEvent, type CalendarEvent } from '@/models/Events'
import { useCalendar } from '@/stores/CalendarStore'
import { computed } from 'vue'
import type { SearchMode } from '../../Search'

import { Button } from '@/components/ui/button'

const props = defineProps<{
  results: (Character | CalendarEvent)[]
  currentEntity: SearchMode
  order: LeimDateOrder
}>()

const emit = defineEmits(['jumpedToDate'])

const { getFormattedDateTitle, jumpToDate } = useCalendar()

function handleJumpToDate(date?: LeimDate) {
  if (!date) return

  jumpToDate(date)
  emit('jumpedToDate')
}

const searchLimit = 10
const activeSearchLimit = computed<number>(() => (!props.currentEntity ? searchLimit : 9999))

const resultsToDisplay = computed(() => props.results.slice(0, activeSearchLimit.value))
const sortedResults = computed(() => {
  return [...resultsToDisplay.value].sort((a, b) => {
    let firstDate: LeimDate
    let secondDate: LeimDate

    if (isCalendarEvent(a)) {
      firstDate = a.date
    } else if (isCharacter(a) && a.birth) {
      firstDate = a.birth
    } else {
      return 1
    }

    if (isCalendarEvent(b)) {
      secondDate = b.date
    } else if (isCharacter(b) && b.birth) {
      secondDate = b.birth
    } else {
      return -1
    }

    return compareDates(firstDate, secondDate, props.order)
  })
})
</script>

<template>
  <ul class="grid gap-3">
    <li v-for="r in sortedResults" :key="isCalendarEvent(r) ? r.title : r.name">
      <button
        v-if="isCalendarEvent(r)"
        class="block w-full text-left p-2 rounded-sm"
        :class="{
          'text-white bg-slate-600 hover:bg-slate-700': !r.category,
          'text-white bg-lime-600 hover:bg-lime-700': r.category === 'birth',
          'text-white bg-stone-600 hover:bg-stone-700': r.category === 'death',
          'text-white bg-orange-600 hover:bg-orange-700': r.category === 'catastrophe',
          'text-white bg-pink-600 hover:bg-pink-700': r.category === 'natural-disaster',
          'text-white bg-sky-600 hover:bg-sky-700': r.category === 'legal',
          'text-slate-900 bg-amber-300 hover:bg-amber-400': r.category === 'inauguration',
          'text-white bg-purple-600 hover:bg-purple-700': r.category === 'religious',
          'text-slate-900 bg-yellow-50 hover:bg-yellow-200': r.category === 'boon',
          'text-white bg-emerald-600 hover:bg-emerald-700': r.category === 'player'
        }"
        @click="handleJumpToDate(r.date)"
      >
        <div>
          {{ r.title }}
        </div>

        <div>
          <span class="opacity-75 italic">{{ getFormattedDateTitle(r.date, true) }}</span>
        </div>

        <div v-if="r.description" class="text-sm">
          <hr class="my-2 border-white opacity-25" />
          <span class="opacity-75">
            {{ r.description }}
          </span>
        </div>
      </button>

      <div
        v-else-if="isCharacter(r)"
        class="block w-full text-left py-2 px-4 border-[1px] border-slate-700 rounded-sm"
      >
        <div class="flex items-center gap-6">
          <div>
            <div>
              {{ r.name }}
            </div>

            <div v-if="r.description" class="text-sm">
              <hr class="my-2 border-white opacity-25" />
              <span class="opacity-75">
                {{ r.description }}
              </span>
            </div>
          </div>

          <menu class="flex gap-2">
            <li v-if="r.birth">
              <Button @click="handleJumpToDate(r.birth)" variant="outline" size="sm">
                Naissance
              </Button>
            </li>
            <li v-if="r.death">
              <Button @click="handleJumpToDate(r.death)" variant="outline" size="sm">
                Décès
              </Button>
            </li>
          </menu>
        </div>
      </div>
    </li>
  </ul>
</template>
