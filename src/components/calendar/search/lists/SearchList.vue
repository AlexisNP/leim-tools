<script lang="ts" setup>
import { isCharacter, type Character } from '@/models/Characters'
import { compareDates, getRelativeString, type LeimDate, type LeimDateOrder } from '@/models/Date'
import { isCalendarEvent, type CalendarEvent } from '@/models/Events'
import { useCalendar } from '@/stores/CalendarStore'
import { computed } from 'vue'
import type { SearchMode } from '../../Search'

import { PhHourglassMedium, PhPlant, PhSkull } from '@phosphor-icons/vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
  <ul class="grid gap-4">
    <li v-for="r in pagedResults" :key="isCalendarEvent(r) ? r.title : r.name">
      <button
        v-if="isCalendarEvent(r)"
        class="relative block w-full text-left py-3 px-4 rounded-sm transition-colors"
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
        <div class="font-bold">
          {{ r.title }}
        </div>

        <div class="mb-1 space-y-1">
          <p class="opacity-75">{{ getFormattedDateTitle(r.date, true) }}</p>
          <p class="text-sm italic opacity-75 flex items-center gap-1">
            <PhHourglassMedium size="16" weight="fill" />
            {{ getRelativeString(defaultDate, r.date) }}
          </p>
        </div>

        <div v-if="r.category || r.secondaryCategories" class="absolute top-3 right-4">
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
        class="block w-full text-left py-3 px-4 border-[1px] border-slate-700 rounded-sm"
      >
        <div class="grid gap-2">
          <h2>
            {{ r.name }}
          </h2>

          <menu class="flex gap-2 border-[1px] border-slate-700 rounded-sm w-fit">
            <li v-if="r.birth">
              <TooltipProvider :delayDuration="100">
                <Tooltip>
                  <TooltipTrigger>
                    <Button @click="handleJumpToDate(r.birth)" variant="ghost" size="xs">
                      <PhPlant size="16" weight="fill" />
                      {{ getFormattedDateTitle(r.birth, true) }}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Date de naissance</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <span v-if="r.birth && r.death">-</span>
            <li v-if="r.death">
              <TooltipProvider :delayDuration="100">
                <Tooltip>
                  <TooltipTrigger>
                    <Button @click="handleJumpToDate(r.death)" variant="ghost" size="xs">
                      <PhSkull size="16" weight="fill" />
                      {{ getFormattedDateTitle(r.death, true) }}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Date de décès</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          </menu>

          <hr v-if="r.description" class="border-white opacity-25" />

          <div v-if="r.description" class="text-sm">
            <span class="opacity-75">
              {{ r.description }}
            </span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
