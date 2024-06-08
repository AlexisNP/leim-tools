<script lang="ts" setup>
import { PhAlarm, PhCircleNotch, PhMapPinArea } from '@phosphor-icons/vue'
import { VisuallyHidden } from 'radix-vue'

const { isEditEventModalOpen } = storeToRefs(useCalendarEvents())

const { resetSkeleton, updateEventFromSkeleton, cancelLatestRequest } = useCalendarEvents()
const { eventSkeleton, lastActiveEvent } = storeToRefs(useCalendarEvents())

const isLoading = ref(false)

const formErrors = reactive<{ message: string | null }>({
  message: null
})

// Watch the popover state
watch(isEditEventModalOpen, (hasOpened, _o) => {
  if (hasOpened && lastActiveEvent.value) {
    eventSkeleton.value = { ...lastActiveEvent.value }
  }
})

async function handleAction() {
  if (isLoading.value) return

  isLoading.value = true

  try {
    await updateEventFromSkeleton()

    isEditEventModalOpen.value = false
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
  <UiDialog v-model:open="isEditEventModalOpen">
    <UiDialogContent
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="pl-3 min-w-96 bg-slate-900 border-slate-800"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @pointer-down-outside="(e) => e.preventDefault()"
    >
      <VisuallyHidden>
        <UiDialogTitle> Modifier l'évènement</UiDialogTitle>

        <UiDialogDescription>
          Mettre à jour les données de l'évènement
        </UiDialogDescription>
      </VisuallyHidden>

      <form @submit.prevent="handleAction">
        <div class="grid grid-cols-2 gap-y-4">
          <div class="col-span-2 ml-8">
            <input
              id="new-event-title"
              v-model="eventSkeleton.title"
              type="text"
              name="new-event-title"
              required
              placeholder="Titre de l'évènement"
              class="w-full -my-1 py-1 -mx-1 px-1 text-lg border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600">
          </div>

          <div class="col-span-2 ml-8">
            <textarea
              id="new-event-description"
              v-model="eventSkeleton.description"
              name="new-event-description"
              placeholder="Ajouter une description"
              class="w-full -my-1 py-1 -mx-1 px-1 min-h-24 max-h-36 text-sm border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600"
            />
          </div>

          <div class="col-span-2">
            <div class="flex items-center gap-2">
              <PhAlarm size="18" weight="fill" />

              <CalendarInputRPGDate
                v-model:model-value="eventSkeleton.startDate"
                placeholder="Date de début"
                :initial-date="lastActiveEvent?.startDate"
                :required="true"
              />

              <span>—</span>

              <CalendarInputRPGDate
                v-model:model-value="eventSkeleton.endDate"
                placeholder="Date de fin"
                :initial-date="lastActiveEvent?.endDate"
              />
            </div>
          </div>

          <div class="col-span-2">
            <div class="flex items-center gap-2">
              <PhMapPinArea size="18" weight="fill" />

              <input
                id="new-event-location"
                v-model="eventSkeleton.location"
                type="text"
                name="new-event-location"
                placeholder="Ajouter un endroit"
                class="w-full -my-1 py-1 px-2 text-sm border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600">
            </div>
          </div>

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

            Enregistrer
          </UiButton>
        </footer>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
