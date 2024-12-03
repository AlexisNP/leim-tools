<script lang="ts" setup>
import type { RPGDate } from "~/models/Date";

const { eventSkeleton, operationInProgress } = storeToRefs(useCalendar())
const { resetSkeleton } = useCalendar()
const popoverOpen = ref(false)

const isLoading = ref(false)

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
function handleClosing(e: Event) {
  if (isLoading.value) {
    e.preventDefault()
  }
}
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
      class="pl-3 w-[30rem] max-w-full border-indigo-200 dark:bg-slate-950 dark:border-indigo-950"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @pointer-down-outside="handleClosing"
    >
      <CalendarFormCreateEvent />
    </UiPopoverContent>
  </UiPopover>
</template>
