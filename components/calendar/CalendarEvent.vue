<script lang="ts" setup>
import { cn } from '@/lib/utils'
import type { RPGDate } from '@/models/Date'
import type { CalendarEvent } from '~/models/CalendarEvent'

const props = defineProps<{
  event: CalendarEvent
  tileDate: RPGDate
}>()

const { areDatesIdentical } = useCalendar()
const { revealEditEventModal, revealDeleteEventModal } = useCalendarEvents()
const { lastActiveEvent } = storeToRefs(useCalendarEvents())

const spansMultipleDays = computed(() => Boolean(props.event.startDate && props.event.endDate))
const isStartEvent = computed(() => spansMultipleDays.value && areDatesIdentical(props.tileDate, props.event.startDate))
const isEndEvent = computed(() => spansMultipleDays.value && props.event.endDate && areDatesIdentical(props.tileDate, props.event.endDate))

const titleCharLimit = 50;
const eventTitle = computed<string>(() => props.event.title.length <= titleCharLimit ? props.event.title : `${props.event.title.slice(0, titleCharLimit)}…`)

// Popover code
const isPopoverDetailsOpen = ref<boolean>(false)

function handleDoubleClick() {
  isPopoverDetailsOpen.value = false
  lastActiveEvent.value = { ...props.event }
  revealEditEventModal()
}

function handleDelete() {
  isPopoverDetailsOpen.value = false
  lastActiveEvent.value = { ...props.event }
  revealDeleteEventModal()
}

function handleClosePopover() {
  isPopoverDetailsOpen.value = false
}

onMounted(() => {
  // Listen for keydown events
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    // If the popover isn't opened, this is not the event we're trying to delete, so return
    if (!isPopoverDetailsOpen.value) return

    // If the key isn't the delete one, return
    if (e.key !== 'Delete') return

    handleDelete()
  })
})
</script>

<template>
  <UiPopover v-model:open="isPopoverDetailsOpen">
    <UiPopoverTrigger as-child>
      <button
        class="text-xs px-2 py-1 block w-full text-left rounded-sm focus-visible:bg-red-200"
        :class="
          cn(
            event.category ? `event-${event.category.color}` : '',
            {
              'italic': event.hidden,
              'rounded-r-none': isStartEvent,
              'rounded-l-none': isEndEvent,
            }
          )
        "
        @dblclick="handleDoubleClick"
        @keydown.delete="handleDelete"
      >
        <div class="line-clamp-2 [overflow-wrap:anywhere] hyphens-auto">
          {{ eventTitle }}
        </div>
      </button>
    </UiPopoverTrigger>

    <LazyCalendarEventDetails
      :event
      :spans-multiple-days
      :is-start-event
      :is-end-event
      @query:close-popover="handleClosePopover"
    />
  </UiPopover>
</template>
