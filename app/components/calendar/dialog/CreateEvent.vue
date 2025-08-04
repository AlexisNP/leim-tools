<script lang="ts" setup>
import type { RPGDate } from "@@/models/Date";

const { eventSkeleton, operationInProgress, currentRPGDate } = storeToRefs(useCalendar())
const { resetSkeleton } = useCalendar()
const popoverOpen = ref(false)

const props = defineProps<{
  date?: RPGDate
  btnClass?: string
}>()

/**
 * Opens event creation's popover
 */
function openEventCreatePopover() {
  // If another operation is in progress, whether it's another create popup or a modal, don't bother opening it
  if (operationInProgress.value) {
    popoverOpen.value = false
    return
  }

  resetSkeleton()

  popoverOpen.value = true

  // Set skeleton initial startDate if it's known
  if (props.date) {
    eventSkeleton.value.startDate = { ...props.date } // We need to clone it otherwise the props ends up mutating (?)
  }
}

/**
 * Prevents the modal from closing if's still loading
 *
 * @param e The closing event (can be keydown or click)
 */
function handleClosing() {
  popoverOpen.value = false
  resetSkeleton()
}

// If the date changes, the popover should close
// Only for months for now (because it's the only view)
watch(currentRPGDate, () => {
  if (!popoverOpen.value) return
  handleClosing()
})
</script>

<template>
  <UiPopover v-model:open="popoverOpen">
    <UiPopoverTrigger as-child>
      <button :class="btnClass" @click="openEventCreatePopover()" />
    </UiPopoverTrigger>
    <UiPopoverContent
      :align="'center'"
      :side="'right'"
      :collision-padding="60"
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="pl-3 w-[30rem] max-w-full"
      @escape-key-down.prevent="handleClosing"
      @pointer-down-outside.prevent="handleClosing"
    >
      <CalendarFormCreateEvent @event-created="handleClosing" />
    </UiPopoverContent>
  </UiPopover>
</template>
