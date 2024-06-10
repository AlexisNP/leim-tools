<script lang="ts" setup>
import { cn } from '@/lib/utils'
import type { RPGDate } from '@/models/Date'
import type { CalendarEvent } from '@/models/CalendarEvent'
import { useCalendar } from '@/stores/CalendarStore'

import {
  PhHourglassMedium,
  PhAlarm,
  PhHourglassHigh,
  PhHourglassLow,
  PhMapPinArea,
  PhDotsThreeOutlineVertical,
  PhEye
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
    class=" w-96 bg-slate-900 border-slate-800"
    :align="'center'"
    :align-offset="50"
    :side="'left'"
    :collision-padding="60"
    :hide-when-detached="true"
    :class="cn(
      event.category ? `event-details-${event.category.color}` : '',
      {
        'event-details': event.category
      }
    )"
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

    <UiTooltipProvider v-if="event.hidden" :delay-duration="250">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiBadge class="absolute -top-2 right-2 flex gap-1 hover:bg-slate-300 hover:opacity-100">
            <PhEye size="16" weight="fill" /> Évènement privé
          </UiBadge>
        </UiTooltipTrigger>
        <UiTooltipContent>
          <p>Cet évènement est uniquement visible pour vous</p>
        </UiTooltipContent>
      </UiTooltip>
    </UiTooltipProvider>
  </UiPopoverContent>
</template>
