<script setup lang="ts">
import { PhPlus } from "@phosphor-icons/vue";

const isDialogOpen = ref<boolean>(false);

// Toggles the dialog
function toggleDialog() {
  isDialogOpen.value = !isDialogOpen.value;
};
</script>

<template>
  <UiButton @click="toggleDialog">
    <PhPlus size="18" weight="bold" />

    <strong class="font-semibold">
      {{ $t("entity.calendar.event.newEvent") }}
    </strong>
  </UiButton>

  <UiDialog v-model:open="isDialogOpen">
    <UiDialogContent>
      <UiDialogTitle>
        {{ $t("entity.calendar.event.addSingle") }}
      </UiDialogTitle>
      <CalendarFormCreateEvent />
    </UiDialogContent>
  </UiDialog>
</template>
