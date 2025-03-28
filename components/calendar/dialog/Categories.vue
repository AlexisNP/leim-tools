<script lang="ts" setup>
import { PhX } from "@phosphor-icons/vue";

const { toggleCategoriesModal } = useCalendar()
const { isCategoriesModalOpen } = storeToRefs(useCalendar())

function handleClosing() {
  toggleCategoriesModal(false)
}
</script>

<template>
  <UiAlertDialog :open="isCategoriesModalOpen">
    <UiAlertDialogContent
      class="grid grid-rows-[auto_1fr_auto] items-start min-h-[66vh] max-w-4xl gap-6"
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @close-auto-focus="(e) => e.preventDefault()"
    >
      <UiAlertDialogTitle>
        <span class="text-2xl">
          <strong class="font-bold">Gestion des catégories</strong>
        </span>
      </UiAlertDialogTitle>

      <UiButton size="icon" variant="ghost" class="absolute top-4 right-4" title="Fermer la fenêtre" @click="handleClosing">
        <PhX size="20" />
      </UiButton>

      catégories là
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
