<script lang="ts" setup>
const { isDeleteEventModalOpen } = storeToRefs(useCalendarEvents())

const { resetSkeleton, deleteEventFromSkeleton } = useCalendarEvents()
const { eventSkeleton, lastActiveEvent } = storeToRefs(useCalendarEvents())

const formErrors = reactive<{ message: string | null }>({
  message: null
})

// Watch the popover state
watch(isDeleteEventModalOpen, (hasOpened, _o) => {
  if (hasOpened && lastActiveEvent.value) {
    eventSkeleton.value = { ...lastActiveEvent.value }
  }
})

async function handleAction() {
  try {
    await deleteEventFromSkeleton()

    isDeleteEventModalOpen.value = false
  } catch (err) {
    if (err instanceof Error) {
      formErrors.message = err.message
    }
  } finally {
    resetSkeleton()
  }
}
</script>

<template>
  <UiAlertDialog v-model:open="isDeleteEventModalOpen" :modal="true">
    <UiAlertDialogContent
      :align="'center'"
      :side="'right'"
      :collision-padding="60"
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="min-w-96 bg-slate-900 border-slate-800"
    >
      <UiAlertDialogTitle> Supprimer l'évènement</UiAlertDialogTitle>

      <UiAlertDialogDescription>
        Les données associés à cet évènement seront supprimées et vous ne pourrez plus les récupérer !
      </UiAlertDialogDescription>

      <form>
        <div class="grid grid-cols-2 gap-y-4">
          <div class="text-red-500 ml-8">
            <span class="text-sm">
              {{ formErrors.message }}
            </span>
          </div>
        </div>
      </form>

      <UiAlertDialogFooter>
        <UiAlertDialogCancel>
          Annuler
        </UiAlertDialogCancel>
        <UiAlertDialogAction class="destructive" @click="handleAction">
          Supprimer
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
