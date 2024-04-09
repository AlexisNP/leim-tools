<script lang="ts" setup>
import { isCharacter, type Character } from '@/models/Characters'
import { compareDates, getRelativeString, type LeimDate, type LeimDateOrder } from '@/models/Date'
import { isCalendarEvent, type CalendarEvent } from '@/models/Events'
import { useCalendar } from '@/stores/CalendarStore'
import { computed } from 'vue'
import type { SearchMode } from '../../Search'

import { PhHourglassMedium } from '@phosphor-icons/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const props = defineProps<{
  results: (Character | CalendarEvent)[]
  currentEntity: SearchMode
  order: LeimDateOrder
  startAt: number
  endAt: number
  limit?: number
}>()

const emit = defineEmits(['jumpedToDate'])

const { defaultDate, getFormattedDateTitle, jumpToDate } = useCalendar()

function handleJumpToDate(date?: LeimDate) {
  if (!date) return

  jumpToDate(date)
  emit('jumpedToDate')
}

// Initial sorting of the results
const sortedResults = computed(() => {
  return [...props.results].sort((a, b) => {
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

// Page the sorted results
const pagedResults = computed(() => sortedResults.value.slice(props.startAt, props.endAt))
</script>

<template>
  <ul class="grid gap-3">
    <li v-for="r in pagedResults" :key="isCalendarEvent(r) ? r.title : r.name">
      <button
        v-if="isCalendarEvent(r)"
        class="relative block w-full text-left p-2 rounded-sm"
        :class="{
          'text-white bg-slate-600 hover:bg-slate-700': !r.category,
          'text-white bg-lime-600 hover:bg-lime-700': r.category === 'naissance',
          'text-white bg-stone-500 hover:bg-stone-700': r.category === 'mort',
          'text-white bg-orange-600 hover:bg-orange-700': r.category === 'catastrophe',
          'text-white bg-pink-600 hover:bg-pink-700': r.category === 'catastrophe-naturel',
          'text-white bg-sky-600 hover:bg-sky-700': r.category === 'législation',
          'text-white bg-purple-600 hover:bg-purple-700': r.category === 'religion',
          'text-white bg-emerald-600 hover:bg-emerald-700': r.category === 'joueurs',
          'text-slate-900 bg-amber-300 hover:bg-amber-400': r.category === 'inauguration',
          'text-slate-900 bg-emerald-200 hover:bg-emerald-300': r.category === 'invention',
          'text-slate-900 bg-cyan-300 hover:bg-cyan-400': r.category === 'science',
          'text-slate-900 bg-yellow-100 hover:bg-yellow-200': r.category === 'bénédiction'
        }"
        @click="handleJumpToDate(r.date)"
      >
        <div>
          {{ r.title }}
        </div>

        <div class="mb-1 space-y-1">
          <p class="opacity-75 font-semibold">{{ getFormattedDateTitle(r.date, true) }}</p>
          <p class="text-sm italic opacity-75 flex items-center gap-1">
            <PhHourglassMedium size="16" weight="fill" />
            {{ getRelativeString(defaultDate, r.date) }}
          </p>
        </div>

        <div v-if="r.category || r.secondaryCategories" class="absolute top-2 right-2">
          <ul class="flex gap-1">
            <li v-if="r.category">
              <Badge class="mix-blend-luminosity font-bold bg-gray-600" variant="secondary">
                {{ r.category }}
              </Badge>
            </li>

            <li v-for="cat in r.secondaryCategories" :key="cat">
              <Badge class="mix-blend-luminosity bg-gray-600" variant="secondary">
                {{ cat }}
              </Badge>
            </li>
          </ul>
        </div>

        <div v-if="r.description" class="text-sm">
          <hr class="my-2 border-white opacity-50" />
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
