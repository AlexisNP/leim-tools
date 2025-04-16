<script setup lang="ts">
import { PhPlus } from "@phosphor-icons/vue";

const isDialogOpen = ref<boolean>(false);
const { resetSkeleton } = useCalendar();

// Toggles the dialog
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
  <UiButton @click="toggleDialog">
    <PhPlus size="18" weight="bold" />

    <strong class="font-semibold">
      {{ $t("entity.calendar.event.newEvent") }}
    </strong>
  </UiButton>

  <UiDialog v-model:open="isDialogOpen">
    <UiDialogContent
      class="border-indigo-200 dark:bg-slate-950 dark:border-indigo-950"
      @escape-key-down.prevent="handleClosing"
      @pointer-down-outside.prevent="handleClosing"
    >
      <UiDialogTitle>
        {{ $t("entity.calendar.event.addSingle") }}
      </UiDialogTitle>
      <CalendarFormCreateEvent @event-created="toggleDialog" />
    </UiDialogContent>
  </UiDialog>
</template>
