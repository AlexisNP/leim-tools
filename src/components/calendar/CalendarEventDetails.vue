<script lang="ts" setup>
import { getRelativeString } from '@/models/Date'
import type { CalendarEvent } from '@/models/Events'
import { useCalendar } from '@/stores/CalendarStore'
import { computed } from 'vue'

import { PhHourglassMedium } from '@phosphor-icons/vue'
import { Badge } from '@/components/ui/badge'
import { PopoverContent } from '@/components/ui/popover'

const { defaultDate, getFormattedDateTitle } = useCalendar()

const props = defineProps<{ event: CalendarEvent }>()

const dateDifference = computed(() => getRelativeString(defaultDate, props.event.date))
</script>

<template>
  <PopoverContent
    class="w-96"
    align="start"
    :align-offset="50"
    :collision-padding="20"
    :class="{
      'border-slate-800': !event.category,
      'border-lime-800': event.category === 'naissance',
      'border-stone-800': event.category === 'mort',
      'border-orange-800': event.category === 'catastrophe',
      'border-pink-800': event.category === 'catastrophe naturelle',
      'border-sky-800': event.category === 'législation',
      'border-purple-800': event.category === 'religion',
      'border-emerald-800': event.category === 'joueurs',
      'border-amber-800': event.category === 'inauguration',
      'border-green-800': event.category === 'invention',
      'border-cyan-800': event.category === 'science',
      'border-yellow-800': event.category === 'bénédiction'
    }"
  >
    <div class="grid gap-1">
      <div class="text-lg font-semibold">
        {{ event.title }}
      </div>

      <div class="mb-1 space-y-1">
        <p class="font-semibold">{{ getFormattedDateTitle(event.date, true) }}</p>
        <p class="text-sm italic opacity-75 flex items-center gap-1">
          <PhHourglassMedium size="16" weight="fill" /> {{ dateDifference }}
        </p>
      </div>

      <div v-if="event.category || event.secondaryCategories">
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

      <div class="mt-2 italic text-sm text-slate-500">
        {{ event.description }}
      </div>
    </div>
  </PopoverContent>
</template>

<style lang="scss">
.border-slate-800 {
  background-color: color-mix(in srgb, var(--color-slate-800), var(--color-slate-950) 85%);
}
.border-lime-800 {
  background-color: color-mix(in srgb, var(--color-lime-800), var(--color-slate-950) 85%);
}
.border-stone-800 {
  background-color: color-mix(in srgb, var(--color-stone-800), var(--color-slate-950) 85%);
}
.border-orange-800 {
  background-color: color-mix(in srgb, var(--color-orange-800), var(--color-slate-950) 85%);
}
.border-pink-800 {
  background-color: color-mix(in srgb, var(--color-pink-800), var(--color-slate-950) 85%);
}
.border-sky-800 {
  background-color: color-mix(in srgb, var(--color-sky-800), var(--color-slate-950) 85%);
}
.border-purple-800 {
  background-color: color-mix(in srgb, var(--color-purple-800), var(--color-slate-950) 85%);
}
.border-emerald-800 {
  background-color: color-mix(in srgb, var(--color-emerald-800), var(--color-slate-950) 85%);
}
.border-amber-800 {
  background-color: color-mix(in srgb, var(--color-amber-800), var(--color-slate-950) 85%);
}
.border-green-800 {
  background-color: color-mix(in srgb, var(--color-green-800), var(--color-slate-950) 85%);
}
.border-cyan-800 {
  background-color: color-mix(in srgb, var(--color-cyan-800), var(--color-slate-950) 85%);
}
.border-yellow-800 {
  background-color: color-mix(in srgb, var(--color-yellow-800), var(--color-slate-950) 85%);
}
</style>
