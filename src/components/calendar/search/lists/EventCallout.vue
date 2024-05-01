<script lang="ts" setup>
import { getRelativeString } from '@/models/Date'
import type { CalendarEvent } from '@/models/Events'
import { useCalendar } from '@/stores/CalendarStore'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PhArrowSquareOut, PhHourglassMedium } from '@phosphor-icons/vue'

defineProps<{
  event: CalendarEvent
}>()

const { defaultDate, getFormattedDateTitle } = useCalendar()
</script>

<template>
  <button
    class="relative block w-full text-left py-3 px-4 rounded-sm transition-colors"
    :class="{
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
      'text-white bg-stone-600 hover:bg-stone-700': event.category === 'scandale'
    }"
  >
    <div class="flex gap-2 items-center">
      <h2 class="font-bold">
        {{ event.title }}
      </h2>
      <div v-if="event.wiki">
        <Button variant="link" size="xs" as-child class="text-inherit">
          <a :href="event.wiki" target="_blank">
            Wiki
            <PhArrowSquareOut size="16" weight="fill" />
          </a>
        </Button>
      </div>
    </div>

    <div class="mb-1 flex gap-4 items-center">
      <p class="opacity-75">{{ getFormattedDateTitle(event.date, true) }}</p>
      <p class="text-sm italic opacity-75 flex items-center gap-1">
        <PhHourglassMedium size="16" weight="fill" />
        {{ getRelativeString(defaultDate, event.date) }}
      </p>
    </div>

    <div v-if="event.category || event.secondaryCategories" class="absolute top-3 right-4">
      <ul class="flex gap-1">
        <li v-if="event.category">
          <Badge class="mix-blend-luminosity font-bold bg-gray-600" variant="secondary">
            {{ event.category }}
          </Badge>
        </li>

        <li v-for="cat in event.secondaryCategories" :key="cat">
          <Badge class="mix-blend-luminosity bg-gray-600" variant="secondary">
            {{ cat }}
          </Badge>
        </li>
      </ul>
    </div>

    <div v-if="event.description" class="text-sm">
      <hr class="my-2 border-white opacity-50" />
      <span class="opacity-75">
        {{ event.description }}
      </span>
    </div>
  </button>
</template>
