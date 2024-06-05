<script lang="ts" setup>
const isModalOpened = defineModel<boolean>({ default: false })
const { resetSkeleton, deleteEventFromSkeleton } = useCalendarEvents()
const { eventSkeleton, lastActiveEvent } = storeToRefs(useCalendarEvents())

const formErrors = reactive<{ message: string | null }>({
  message: null
})

// Watch the popover state
watch(isModalOpened, (hasOpened, _o) => {
  if (hasOpened && lastActiveEvent.value) {
    eventSkeleton.value = { ...lastActiveEvent.value }
  } else {
    resetSkeleton()
  }
})

async function handleSubmit() {
  try {
    await deleteEventFromSkeleton()

    isModalOpened.value = false
  } catch (err) {
    if (err instanceof Error) {
      formErrors.message = err.message
    }
  }
}
</script>

<template>
  <UiDialog v-model:open="isModalOpened" :modal="true">
    <UiDialogContent
      :align="'center'"
      :side="'right'"
      :collision-padding="60"
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="pl-3 min-w-96 bg-slate-900 border-slate-800"
    >
      <UiDialogTitle> Supprimer l'évènement</UiDialogTitle>

      <UiDialogDescription>
        Les données associés à cet évènement seront supprimées et vous ne pourrez plus les récupérer !
      </UiDialogDescription>

      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-y-4">
          <div class="text-red-500 ml-8">
            <span class="text-sm">
              {{ formErrors.message }}
            </span>
          </div>

          <div class="text-right">
            <UiButton size="sm" type="submit" variant="destructive">
              Supprimer
            </UiButton>
          </div>
        </div>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
