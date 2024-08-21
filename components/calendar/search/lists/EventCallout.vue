<script lang="ts" setup>
import { cn } from '@/lib/utils'
import type { RPGDate } from '@/models/Date'
import type { CalendarEvent } from '@/models/CalendarEvent'

import { PhArrowSquareOut, PhHourglassMedium, PhAlarm, PhMapPinArea, PhEye } from '@phosphor-icons/vue'

const props = defineProps<{
  event: CalendarEvent
}>()

defineEmits<{
  (e: 'query:date-jump', payload: RPGDate): void
}>()

const { getRelativeString, defaultDate, getFormattedDateTitle } = useCalendar()

const dateDifference: string = getRelativeString(defaultDate, props.event.startDate)
const dateDuration: string | null = props.event.endDate
  ? getRelativeString(props.event.startDate, props.event.endDate, 'compact')
  : null
</script>

<template>
  <button
    class="relative block w-full text-left py-3 px-4 rounded-sm transition-colors"
    :class="cn(
      event.category ? `event-${event.category.color}` : '',
      {
        'pt-4': event.hidden,
      })"
    @click="$emit('query:date-jump', event.startDate)"
  >
    <div class="flex gap-2 items-center mb-1">
      <h2 class="font-bold text-lg">
        {{ event.title }}
      </h2>
      <div v-if="event.wiki">
        <UiButton variant="link" size="xs" as-child class="text-inherit">
          <a :href="event.wiki" target="_blank">
            Wiki
            <PhArrowSquareOut size="16" weight="fill" />
          </a>
        </UiButton>
      </div>
    </div>

    <div class="flex gap-2 items-center justify-between mb-1">
      <template v-if="!event.endDate">
        <p class="font-semibold text-sm opacity-75">
          {{ getFormattedDateTitle(event.startDate, true) }}
        </p>
      </template>
      <template v-else>
        <p class="font-semibold text-sm opacity-75">
          Du {{ getFormattedDateTitle(event.startDate, true) }} au
          {{ getFormattedDateTitle(event.endDate, true) }}
        </p>
      </template>
      <div v-if="event.hidden" class="flex justify-end">
        <UiTooltipProvider :delay-duration="250">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiBadge class="flex gap-1 border-[1px] border-slate-900 hover:bg-slate-300 hover:opacity-100">
                <PhEye size="16" weight="fill" /> Évènement privé
              </UiBadge>
            </UiTooltipTrigger>
            <UiTooltipContent>
              <p>Cet évènement est uniquement visible pour vous</p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </div>
    </div>

    <div class="mb-1 flex gap-x-2 items-center">
      <template v-if="event.location">
        <p class="w-fit text-sm italic opacity-75 flex items-center gap-1">
          <PhMapPinArea size="16" weight="fill" /> {{ event.location }}
        </p>
      </template>
      <p class="w-fit text-sm italic opacity-75 flex items-center gap-1">
        <PhAlarm size="16" weight="fill" /> {{ dateDifference }}
      </p>
      <template v-if="dateDuration">
        <p class="w-fit text-sm italic opacity-75 flex items-center gap-1">
          <PhHourglassMedium size="16" weight="fill" /> Pendant {{ dateDuration }}
        </p>
      </template>
    </div>

    <div v-if="event.category || event.secondaryCategories" class="absolute top-3 right-4">
      <ul class="flex gap-1">
        <li v-if="event.category">
          <UiBadge class="mix-blend-luminosity font-bold bg-gray-600 lowercase" variant="secondary">
            {{ event.category?.name }}
          </UiBadge>
        </li>

        <li v-for="cat in event.secondaryCategories" :key="cat.id">
          <UiBadge class="mix-blend-luminosity bg-gray-600 lowercase" variant="secondary">
            {{ cat.name }}
          </UiBadge>
        </li>
      </ul>
    </div>

    <div v-if="event.description" class="text-sm">
      <hr class="my-2 border-white opacity-50" >
      <span class="opacity-75">
        {{ event.description }}
      </span>
    </div>
  </button>
</template>
