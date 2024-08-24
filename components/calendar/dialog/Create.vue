<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';
import type { World } from '~/models/World';

defineProps<{
  world: World,
  modalState?: boolean
}>()

const calendarSkeletonName = ref<string>('')

function onChangedName(newName: string) {
  calendarSkeletonName.value = newName
}

const emit = defineEmits(['on-close'])

function handleClose() {
  emit('on-close')
}
</script>

<template>
  <UiAlertDialog :open="modalState">
    <UiAlertDialogContent class="grid grid-rows-[auto_1fr_auto] items-start min-h-[66vh] max-w-4xl gap-6">
      <UiAlertDialogTitle>
        <span class="text-2xl">
          <strong class="font-bold">{{ world.name }}</strong>
          <span class="opacity-30"> — </span>
          <span v-if="calendarSkeletonName">
            {{ calendarSkeletonName }}
          </span>
          <span v-else>Nouveau calendrier</span>
        </span>
      </UiAlertDialogTitle>

      <UiButton size="icon" variant="ghost" class="absolute top-4 right-4" title="Fermer la fenêtre" @click="handleClose">
        <PhX size="20" />
      </UiButton>

      <CalendarFormCreate @on-changed-name="onChangedName" @on-close="handleClose" />
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
