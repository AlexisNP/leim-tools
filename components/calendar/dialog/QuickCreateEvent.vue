<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
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

const breakpoints = useBreakpoints(
  breakpointsTailwind
)
</script>

<template>
  <ClientOnly>
    <Transition name="fade" appear>
      <UiButton
        class="max-md:fixed max-md:bottom-8 max-md:right-8 max-md:z-50 max-md:size-14 max-md:rounded-xl"
        :size="breakpoints.md.value ? 'default' : 'icon'"
        @click="toggleDialog"
      >
        <PhPlus :size="breakpoints.md.value ? 18 : 24" weight="bold" />

        <strong v-if="breakpoints.md.value" class="font-semibold">
          {{ $t("entity.calendar.event.newEvent") }}
        </strong>
      </UiButton>
    </Transition>
  </ClientOnly>

  <UiDialog v-model:open="isDialogOpen">
    <UiDialogContent
      class="border-indigo-200 dark:bg-slate-950 dark:border-indigo-950"
      :trap-focus="true"
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
