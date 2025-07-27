<script lang="ts" setup>
import { PhX } from "@phosphor-icons/vue";

const { toggleCategoriesModal } = useCalendar()
const { categories, isCategoriesModalOpen } = storeToRefs(useCalendar())

function handleClosing() {
  toggleCategoriesModal(false)
}
</script>

<template>
  <UiAlertDialog :open="isCategoriesModalOpen">
    <UiAlertDialogContent
      class="grid grid-rows-[auto_1fr_auto] items-start min-h-[66vh] max-w-4xl"
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @close-auto-focus="(e) => e.preventDefault()"
    >
      <header>
        <UiAlertDialogTitle>
          <span class="text-2xl">
            {{ $t('entity.category.manageDialog.title') }}
          </span>
        </UiAlertDialogTitle>

        <UiAlertDialogDescription>
          {{ $t('entity.category.manageDialog.subtitle') }}
        </UiAlertDialogDescription>
      </header>

      <UiButton size="icon" variant="ghost" class="absolute top-4 right-4" title="Fermer la fenêtre" @click="handleClosing">
        <PhX size="20" />
      </UiButton>

      <CalendarCategoryTable :categories />
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
