<script lang="ts" setup>
import type { RPGDate } from '@/models/Date'
import type { CalendarEvent } from '@/models/CalendarEvent'
import { useCalendar } from '@/stores/CalendarStore'

import {
  PhHourglassMedium,
  PhAlarm,
  PhHourglassHigh,
  PhHourglassLow,
  PhMapPinArea,
  PhDotsThreeOutlineVertical
} from '@phosphor-icons/vue'

const { defaultDate, getFormattedDateTitle, jumpToDate, getRelativeString } = useCalendar()
const { revealEditEventModal, revealDeleteEventModal } = useCalendarEvents()
const { lastActiveEvent } = storeToRefs(useCalendarEvents())

const props = defineProps<{
  event: CalendarEvent
  spansMultipleDays: boolean
  isStartEvent?: boolean
  isEndEvent?: boolean
}>()

// Ref for the popover
const eventDetails = ref<HTMLElement>()

const emit = defineEmits(['query:close-popover'])

const dateDifference: string = getRelativeString(defaultDate, props.event.startDate)
const dateDuration: string | null = props.event.endDate
  ? getRelativeString(props.event.startDate, props.event.endDate, 'compact')
  : null

function handleJumpToDate(date: RPGDate) {
  jumpToDate(date)
  emit('query:close-popover')
}

/**
 * Edit event
 */
const commandMenuOpened = ref(false)

function deployEditModal() {
  lastActiveEvent.value = { ...props.event }
  revealEditEventModal()
  commandMenuOpened.value = false
}

/**
 * Confirm event deletion
 */
function deployDeleteModal() {
  lastActiveEvent.value = { ...props.event }
  revealDeleteEventModal()
  commandMenuOpened.value = false
}
</script>

<template>
  <UiPopoverContent
    class="event-details w-96 bg-slate-900"
    :align="'center'"
    :align-offset="50"
    :side="'left'"
    :collision-padding="60"
    :hide-when-detached="true"
    :class="{
      'border-slate-800': !event.category,
      'border-lime-800': event.category?.name === 'naissance',
      'border-stone-600': event.category?.name === 'mort',
      'border-orange-800': event.category?.name === 'catastrophe',
      'border-pink-800': event.category?.name === 'catastrophe naturelle',
      'border-sky-800': event.category?.name === 'législation',
      'border-purple-800': event.category?.name === 'religion',
      'border-emerald-800': event.category?.name === 'joueurs',
      'border-amber-800': event.category?.name === 'inauguration',
      'border-green-800': event.category?.name === 'invention',
      'border-cyan-800': event.category?.name === 'science',
      'border-slate-600': event.category?.name === 'bénédiction',
      'border-purple-700': event.category?.name === 'découverte',
      'border-indigo-700': event.category?.name === 'exploration',
      'border-amber-700': event.category?.name === 'construction',
      'border-violet-700': event.category?.name === 'arcanologie',
      'border-rose-800': event.category?.name === 'criminalité',
      'border-stone-700': event.category?.name === 'scandale',
      'border-yellow-600': event.category?.name === 'commerce'
    }"
  >
    <div ref="eventDetails" class="grid gap-1">
      <header class="pr-12">
        <div class="text-lg font-semibold">
          {{ event.title }}
        </div>

        <div class="mb-1">
          <template v-if="!event.endDate">
            <p class="font-semibold">{{ getFormattedDateTitle(event.startDate, true) }}</p>
          </template>
          <template v-else>
            <p class="font-semibold">
              Du {{ getFormattedDateTitle(event.startDate, true) }} au
              {{ getFormattedDateTitle(event.endDate, true) }}
            </p>
          </template>
        </div>
      </header>

      <div class="mb-1 space-y-1">
        <template v-if="event.location">
          <p class="text-sm italic opacity-75 flex items-center gap-1">
            <PhMapPinArea size="16" weight="fill" /> {{ event.location }}
          </p>
        </template>
        <p class="text-sm italic opacity-75 flex items-center gap-1">
          <PhAlarm size="16" weight="fill" /> {{ dateDifference }}
        </p>
        <template v-if="dateDuration">
          <p class="text-sm italic opacity-75 flex items-center gap-1">
            <PhHourglassMedium size="16" weight="fill" /> Pendant {{ dateDuration }}
          </p>
        </template>
      </div>

      <template v-if="event.category || event.secondaryCategories">
        <ul class="flex gap-1">
          <li v-if="event.category">
            <UiBadge class="mix-blend-luminosity font-bold bg-gray-600" variant="secondary">
              {{ event.category?.name }}
            </UiBadge>
          </li>

          <li v-for="cat in event.secondaryCategories" :key="cat.id">
            <UiBadge class="mix-blend-luminosity bg-gray-600" variant="secondary">
              {{ cat.name }}
            </UiBadge>
          </li>
        </ul>
      </template>

      <template v-if="event.description">
        <hr class="border-slate-500 mt-2" >

        <div class="mt-2 text-sm text-slate-300">
          {{ event.description }}
        </div>
      </template>
    </div>

    <menu class="absolute top-4 right-4">
      <UiPopover v-model:open="commandMenuOpened">
        <UiPopoverTrigger as-child>
          <UiButton size="icon" variant="ghost">
            <PhDotsThreeOutlineVertical size="20" weight="fill" />
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-fit p-0" align="start" side="right" :collision-padding="20" >
          <UiCommand>
            <UiCommandList>
              <UiCommandGroup>
                <UiCommandItem value="edit-event" @select="deployEditModal"> Modifier </UiCommandItem>
                <UiCommandItem value="delete-event" @select="deployDeleteModal"> Supprimer </UiCommandItem>
              </UiCommandGroup>
            </UiCommandList>
          </UiCommand>
        </UiPopoverContent>
      </UiPopover>
    </menu>

    <nav v-if="event.startDate && event.endDate" class="mt-2 flex gap-2">
      <UiBadge class="hover:opacity-100 hover:bg-slate-300" as-child>
        <button
          class="flex gap-1"
          title="Naviguer au début"
          @click="handleJumpToDate(event.startDate!)"
        >
          <PhHourglassHigh size="16" weight="fill" /> Début
        </button>
      </UiBadge>
      <UiBadge class="hover:opacity-100 hover:bg-slate-300" as-child title="Naviguer à la fin">
        <button
          class="flex gap-1"
          title="Naviguer à la fin"
          @click="handleJumpToDate(event.endDate!)"
        >
          <PhHourglassLow size="16" weight="fill" /> Fin
        </button>
      </UiBadge>
    </nav>
  </UiPopoverContent>
</template>

<style lang="scss">
.border-slate-800 {
  --base-color: var(--color-slate-800);
}
.border-lime-800 {
  --base-color: var(--color-lime-800);
}
.border-stone-600 {
  --base-color: var(--color-stone-600);
}
.border-orange-800 {
  --base-color: var(--color-orange-800);
}
.border-pink-800 {
  --base-color: var(--color-pink-800);
}
.border-sky-800 {
  --base-color: var(--color-sky-800);
}
.border-purple-800 {
  --base-color: var(--color-purple-800);
}
.border-emerald-800 {
  --base-color: var(--color-emerald-800);
}
.border-amber-800 {
  --base-color: var(--color-amber-800);
}
.border-green-800 {
  --base-color: var(--color-green-800);
}
.border-cyan-800 {
  --base-color: var(--color-cyan-800);
}
.border-slate-600 {
  --base-color: var(--color-slate-600);
}
.border-purple-700 {
  --base-color: var(--color-purple-700);
}
.border-indigo-700 {
  --base-color: var(--color-indigo-700);
}
.border-amber-700 {
  --base-color: var(--color-amber-700);
}
.border-violet-700 {
  --base-color: var(--color-violet-700);
}
.border-rose-800 {
  --base-color: var(--color-rose-800);
}
.border-stone-700 {
  --base-color: var(--color-stone-700);
}
.border-yellow-600 {
  --base-color: var(--color-yellow-600);
}

.event-details {
  --bg-color: color-mix(in srgb, var(--base-color), var(--color-slate-950) 85%);
  background-color: var(--bg-color);

  hr {
    border-color: var(--base-color);
  }
}
</style>
