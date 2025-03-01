<script lang="ts" setup>
import { PhX } from "@phosphor-icons/vue";
import type { World } from "~/models/World";

const props = defineProps<{
  modalState?: boolean
  world: World | null
}>()

const worldSkeletonName = ref<string>(props.world?.name ?? "")
watch(() => props.world, (newWorld) => {
  worldSkeletonName.value = newWorld?.name ?? ""
})

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
    <UiAlertDialogContent class="gap-4" @close-auto-focus="(e) => e.preventDefault()">
      <header>
        <UiAlertDialogTitle>
          <span class="text-2xl">
            <span v-if="worldSkeletonName">
              {{ $t('entity.world.editDialog.title') }} — {{ worldSkeletonName }}
            </span>
            <span v-else>
              {{ $t('entity.world.editDialog.title') }}
            </span>
          </span>
        </UiAlertDialogTitle>

        <UiAlertDialogDescription>
          {{ $t('entity.world.editDialog.subtitle') }}
        </UiAlertDialogDescription>
      </header>

      <UiButton size="icon" variant="ghost" class="absolute top-4 right-4" title="Fermer la fenêtre" @click="handleClose">
        <PhX size="20" />
      </UiButton>

      <WorldFormEdit :world @on-changed-name="onChangedName" @on-close="handleClose" />
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
