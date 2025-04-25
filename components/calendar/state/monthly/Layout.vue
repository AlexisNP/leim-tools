<script lang="ts" setup>
import { useCalendar } from "~/stores/CalendarStore"
import { useThrottleFn } from "@vueuse/core"
import type { RPGDate } from "~/models/Date"

const { currentDate, decrementViewMonth, incrementViewMonth, resetSkeleton } = useCalendar()
const { currentMonthData, operationInProgress, eventSkeleton } = storeToRefs(useCalendar())

function handleWheel(e: WheelEvent) {
  // Prevent scrolling
  e.preventDefault()

  const isMovingUp = e.deltaY < 0
  if (isMovingUp) {
    moveCalendarLeft()
  } else {
    moveCalendarRight()
  }
}

const moveCalendarLeft = useThrottleFn(() => {
  decrementViewMonth()
}, 100)

const moveCalendarRight = useThrottleFn(() => {
  incrementViewMonth()
}, 100)

const isDialogOpen = ref<boolean>(false);

/**
 * Opens event creation's popover
 */
function handleDialogOpen(date: RPGDate) {
  // If another operation is in progress, whether it's another create popup or a modal, don't bother opening it
  if (operationInProgress.value) {
    isDialogOpen.value = false
    return
  }

  resetSkeleton()

  isDialogOpen.value = true

  // Set skeleton initial startDate if it's known
  if (date) {
    eventSkeleton.value.startDate = date
  }
}

function toggleDialog() {
  isDialogOpen.value = !isDialogOpen.value;
};

/**
 * Prevents the modal from closing if's still loading
 */
function handleClosing() {
  setTimeout(() => resetSkeleton(), 100)
}
</script>

<template>
  <div class="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10" @wheel="handleWheel">
    <template v-if="currentMonthData">
      <CalendarStateMonthlyDayTile
        v-for="day in currentMonthData?.days"
        :key="`layout-month-grid-${day}`"
        :date="{
          day: day,
          month: currentDate.currentMonth,
          year: currentDate.currentYear
        }"
        @on-open-create-dialog="handleDialogOpen"
      />

      <UiDialog v-model:open="isDialogOpen">
        <UiDialogContent
          class="border-indigo-200 dark:bg-slate-950 dark:border-indigo-950"
          :disable-outside-pointer-events="true"
          :trap-focus="true"
          @focus-outside="handleClosing"
          @interact-outside="handleClosing"
          @close-auto-focus="(e) => e.preventDefault()"
        >
          <UiDialogTitle>
            {{ $t("entity.calendar.event.addSingle") }}
          </UiDialogTitle>
          <CalendarFormCreateEvent @event-created="toggleDialog" />
        </UiDialogContent>
      </UiDialog>
    </template>
  </div>
</template>
