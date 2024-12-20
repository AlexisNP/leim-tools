<script lang="ts" setup>
const { eventSkeleton, lastActiveEvent, isEditEventModalOpen } = storeToRefs(useCalendar())

// Watch the popover state
watch(isEditEventModalOpen, (hasOpened, _o) => {
  if (hasOpened && lastActiveEvent.value) {
    eventSkeleton.value = { ...lastActiveEvent.value }
  }
})

/**
 * Prevents the modal from closing if's still loading
 *
 * @param e The closing event (can be keydown or click)
 */
function handleClosing() {
  isEditEventModalOpen.value = false
}
</script>

<template>
  <UiDialog v-model:open="isEditEventModalOpen">
    <UiDialogContent
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="pl-3 min-w-96 border-indigo-200 dark:bg-slate-950 dark:border-indigo-950"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @pointer-down-outside="(e) => e.preventDefault()"
    >
      <header class="pl-8 grid gap-y-2">
        <UiDialogTitle>
          {{ $t('entity.calendar.event.editDialog.title') }}
        </UiDialogTitle>

        <UiDialogDescription>
          {{ $t('entity.calendar.event.editDialog.subtitle') }}
        </UiDialogDescription>
      </header>

      <CalendarFormUpdateEvent @event-updated="handleClosing" />
    </UiDialogContent>
  </UiDialog>
</template>
