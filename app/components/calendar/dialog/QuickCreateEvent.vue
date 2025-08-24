<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { PhPlus } from "@phosphor-icons/vue";
import { VisuallyHidden } from "radix-vue";

const { isCreatingEventModalOpen } = storeToRefs(useCalendar());
const { resetSkeleton, toggleCreatingEventModal } = useCalendar();

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
        @click="toggleCreatingEventModal"
      >
        <PhPlus :size="breakpoints.md.value ? 18 : 24" weight="bold" />

        <strong v-if="breakpoints.md.value" class="font-semibold">
          {{ $t("entity.calendar.event.newEvent") }}
        </strong>
      </UiButton>
    </Transition>
  </ClientOnly>

  <UiDialog v-model:open="isCreatingEventModalOpen">
    <UiDialogContent
      class="max-md:translate-0 max-md:inset-0 max-md:w-full max-md:block"
      :trap-focus="true"
      @escape-key-down="handleClosing"
      @pointer-down-outside="handleClosing"
    >
      <UiDialogTitle class="max-md:mb-8">
        {{ $t("entity.calendar.event.addSingle") }}
      </UiDialogTitle>

      <VisuallyHidden>
        <UiDialogDescription>
          {{ $t("entity.calendar.event.addSingleDescription") }}
        </UiDialogDescription>
      </VisuallyHidden>

      <CalendarFormCreateEvent @event-created="toggleCreatingEventModal" />
    </UiDialogContent>
  </UiDialog>
</template>
