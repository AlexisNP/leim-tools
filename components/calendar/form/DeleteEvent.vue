<script lang="ts" setup>
import { PhCircleNotch } from '@phosphor-icons/vue';

const { isDeleteEventModalOpen } = storeToRefs(useCalendarEvents())

const { resetSkeleton, deleteEventFromSkeleton, cancelLatestRequest } = useCalendarEvents()
const { eventSkeleton, lastActiveEvent } = storeToRefs(useCalendarEvents())

const isLoading = ref(false)

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
  if (isLoading.value) return

  isLoading.value = true

  try {
    await deleteEventFromSkeleton()

    isDeleteEventModalOpen.value = false
  } catch (err) {
    if (err instanceof Error) {
      formErrors.message = err.message
    }
  } finally {
    resetSkeleton()
    isLoading.value = false
  }
}

/**
 * Prevents the modal from closing if's still loading
 *
 * @param e The closing event (can be keydown or click)
 */
function handleClosing(e: Event) {
  if (isLoading.value) {
    e.preventDefault()
  }
}

/**
 * Click on the cancel button
 *
 * Must cancel the abortController in the store, and stop the loading
 */
function handleCancel() {
  cancelLatestRequest()
  isLoading.value = false
}
</script>

<template>
  <UiAlertDialog v-model:open="isDeleteEventModalOpen">
    <UiAlertDialogContent
      :align="'center'"
      :side="'right'"
      :collision-padding="60"
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="min-w-96 bg-slate-900 border-slate-800"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @pointer-down-outside="handleClosing"
    >
      <UiAlertDialogTitle> Supprimer l'évènement</UiAlertDialogTitle>

      <UiAlertDialogDescription>
        Les données associés à cet évènement seront supprimées et vous ne pourrez plus les récupérer !
      </UiAlertDialogDescription>

      <form @submit.prevent="handleAction">
        <div class="grid grid-cols-2 gap-y-4">
          <div class="text-red-500 ml-8">
            <span class="text-sm">
              {{ formErrors.message }}
            </span>
          </div>
        </div>

        <footer class="flex gap-2 justify-end">
          <Transition name="fade-delay">
            <UiButton v-if="isLoading" type="button" size="sm" variant="destructive" @click.prevent="handleCancel">
              Annuler
            </UiButton>
          </Transition>

          <UiButton size="sm" :disabled="isLoading">
            <Transition name="fade">
              <PhCircleNotch v-if="isLoading" size="20" class="animate-spin"/>
            </Transition>

            Supprimer
          </UiButton>
        </footer>
      </form>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
