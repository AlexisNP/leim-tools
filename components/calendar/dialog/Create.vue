<script lang="ts" setup>
import type { World } from '~/models/World';

defineProps<{
  world: World,
  modalState?: boolean
}>()

const calendarSkeletonName = ref<string>('')

function onChangedName(newName: string) {
  calendarSkeletonName.value = newName
}
</script>

<template>
  <UiAlertDialog :open="modalState">
    <UiAlertDialogContent class="grid grid-rows-[auto_1fr_auto] items-start min-h-[66vh] max-w-4xl gap-6">
      <UiAlertDialogTitle>
        <span class="text-2xl">
          <strong class="font-bold">{{ world.name }}</strong> —
          <span v-if="calendarSkeletonName">
            {{ calendarSkeletonName }}
          </span>
          <span v-else>Nouveau calendrier</span>
        </span>
      </UiAlertDialogTitle>

      <CalendarFormCreate @changed-name="onChangedName" />
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
