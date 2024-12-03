<script lang="ts" setup>
const { isDeleteEventModalOpen, eventSkeleton, lastActiveEvent } = storeToRefs(useCalendar())

const isLoading = ref<boolean>(false)

// Watch the popover state
watch(isDeleteEventModalOpen, (hasOpened, _o) => {
  if (hasOpened && lastActiveEvent.value) {
    eventSkeleton.value = { ...lastActiveEvent.value }
  }
})

/**
 * Prevents the modal from closing if's still loading
 *
 * @param e The closing event (can be keydown or click)
 */
function handleClosing(e: Event): void {
  if (isLoading.value) {
    e.preventDefault()
  }
}
</script>

<template>
  <UiAlertDialog v-model:open="isDeleteEventModalOpen">
    <UiAlertDialogContent
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="min-w-96 border-indigo-200 dark:bg-slate-950 dark:border-indigo-950"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @pointer-down-outside="handleClosing"
    >
      <UiAlertDialogTitle>{{ $t('entity.calendar.event.deleteDialog.title') }}</UiAlertDialogTitle>

      <UiAlertDialogDescription>
        {{ $t('entity.calendar.event.deleteDialog.subtitle') }}
      </UiAlertDialogDescription>

      <CalendarFormDeleteEvent />
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
