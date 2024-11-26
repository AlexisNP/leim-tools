<script lang="ts" setup>
import { PhX } from "@phosphor-icons/vue";

defineProps<{
  modalState?: boolean
}>()

const worldSkeletonName = ref<string>("")

function onChangedName(newName: string) {
  worldSkeletonName.value = newName
}

const emit = defineEmits(["on-close"])

function handleClose() {
  emit("on-close")
}
</script>

<template>
  <UiAlertDialog :open="modalState">
    <UiAlertDialogContent class="gap-4">
      <header>
        <UiAlertDialogTitle>
          <span class="text-2xl">
            <span v-if="worldSkeletonName">
              {{ $t('entity.world.createDialog.title') }} — {{ worldSkeletonName }}
            </span>
            <span v-else>
              {{ $t('entity.world.createDialog.title') }}
            </span>
          </span>
        </UiAlertDialogTitle>

        <UiAlertDialogDescription>
          {{ $t('entity.world.createDialog.subtitle') }}
        </UiAlertDialogDescription>
      </header>

      <UiButton size="icon" variant="ghost" class="absolute top-4 right-4" title="Fermer la fenêtre" @click="handleClose">
        <PhX size="20" />
      </UiButton>

      <WorldFormCreate @on-changed-name="onChangedName" @on-close="handleClose" />
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
