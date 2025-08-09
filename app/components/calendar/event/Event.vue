<script lang="ts" setup>
import { cn } from "@/lib/utils"
import type { RPGDate } from "@@/models/Date"
import type { CalendarEvent } from "@@/models/CalendarEvent"
import { ja } from "zod/v4/locales";

const props = defineProps<{
  event: CalendarEvent
  tileDate: RPGDate
}>()

const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef')

const { areDatesIdentical, revealEditEventModal, revealDeleteEventModal, resetSkeleton } = useCalendar()
const { lastActiveEvent, eventSkeleton, isDraggingEvent } = storeToRefs(useCalendar())

const spansMultipleDays = computed(() => Boolean(props.event.startDate && props.event.endDate))
const isStartEvent = computed(() => spansMultipleDays.value && areDatesIdentical(props.tileDate, props.event.startDate))
const isEndEvent = computed(() => spansMultipleDays.value && props.event.endDate && areDatesIdentical(props.tileDate, props.event.endDate))

const titleCharLimit = 50;
const eventTitle = computed<string>(() => props.event.title.length <= titleCharLimit ? props.event.title : `${props.event.title.slice(0, titleCharLimit)}…`)

// Popover code
const isPopoverDetailsOpen = ref<boolean>(false)

function handleDoubleClick() {
  isPopoverDetailsOpen.value = false
  lastActiveEvent.value = structuredClone(toRaw(props.event))
  revealEditEventModal()
}

function handleDelete() {
  isPopoverDetailsOpen.value = false
  lastActiveEvent.value = structuredClone(toRaw(props.event))
  revealDeleteEventModal()
}

function handleClosePopover() {
  isPopoverDetailsOpen.value = false
}

onMounted(() => {
  // Listen for keydown events
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    // If the popover isn't opened, this is not the event we're trying to delete, so return
    if (!isPopoverDetailsOpen.value) return

    // If the key isn't the delete one, return
    if (e.key !== "Delete") return

    handleDelete()
  })
})

// Draggable logic
const isTileDragging = shallowRef(false)

function handleDragStart() {
  isTileDragging.value = true
  isDraggingEvent.value = true
  eventSkeleton.value = structuredClone(toRaw(props.event))
  handleClosePopover()
}
function handleDragEnd() {
  isTileDragging.value = false
  isDraggingEvent.value = false
}
</script>

<template>
  <UiPopover v-model:open="isPopoverDetailsOpen">
    <UiPopoverTrigger as-child>
      <button
        ref="buttonRef"
        class="event-button text-2xs md:text-xs px-[5px] py-[5px] md:px-2 md:py-1 block w-full text-left rounded-sm transition-opacity outline-offset-1 cursor-pointer"
        :draggable="event.endDate ? 'false' : 'true'"
        :class="
          cn(
            `element-${event.category?.color}`,
            {
              'is-hidden': event.hidden,
              'rounded-r-none': isStartEvent,
              'rounded-l-none': isEndEvent,
            },
            {
              'opacity-60': isTileDragging,
              'opacity-100': !isTileDragging
            }
          )
        "
        @dblclick="handleDoubleClick"
        @keydown.delete="handleDelete"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
      >
        <div class="line-clamp-2 [overflow-wrap:anywhere] hyphens-auto">
          {{ eventTitle }}
        </div>
      </button>
    </UiPopoverTrigger>

    <CalendarEventDetails
      :event
      :spans-multiple-days
      :is-start-event
      :is-end-event
      @query:close-popover="handleClosePopover"
    />
  </UiPopover>
</template>
