<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { isCharacter, type Character } from '@/models/Characters'
import { compareDates, type LeimDate, type LeimDateOrder } from '@/models/Date'
import { isCalendarEvent, type CalendarEvent } from '@/models/Events'
import { useCalendar } from '@/stores/calendar'
import { computed } from 'vue'
import type { SearchMode } from '../../Search'

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
          'bg-slate-600 hover:bg-slate-700': !r.category,
          'bg-green-700 hover:bg-green-800': r.category === 'birth',
          'bg-stone-600 hover:bg-stone-800': r.category === 'death',
          'bg-red-600 hover:bg-red-800': r.category === 'catastrophe',
          'bg-pink-600 hover:bg-pink-800': r.category === 'natural-disaster',
          'bg-blue-600 hover:bg-blue-800': r.category === 'legal',
          'bg-amber-700 hover:bg-amber-800': r.category === 'player'
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
