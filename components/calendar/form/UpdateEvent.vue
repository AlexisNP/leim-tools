<script lang="ts" setup>
import { PhAlarm } from '@phosphor-icons/vue'
import { VisuallyHidden } from 'radix-vue'

const { isEditEventModalOpen } = storeToRefs(useCalendarEvents())

const { resetSkeleton, updateEventFromSkeleton } = useCalendarEvents()
const { eventSkeleton, lastActiveEvent } = storeToRefs(useCalendarEvents())

const formErrors = reactive<{ message: string | null }>({
  message: null
})

// Watch the popover state
watch(isEditEventModalOpen, (hasOpened, _o) => {
  if (hasOpened && lastActiveEvent.value) {
    eventSkeleton.value = { ...lastActiveEvent.value }
  } else {
    resetSkeleton()
  }
})

async function handleAction() {
  try {
    await updateEventFromSkeleton()

    isEditEventModalOpen.value = false
  } catch (err) {
    if (err instanceof Error) {
      formErrors.message = err.message
    }
  }
}
</script>

<template>
  <UiAlertDialog v-model:open="isEditEventModalOpen" :modal="true">
    <UiAlertDialogContent
      :align="'center'"
      :side="'right'"
      :collision-padding="60"
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="pl-3 min-w-96 bg-slate-900 border-slate-800"
    >
      <VisuallyHidden>
        <UiAlertDialogTitle> Modifier l'évènement</UiAlertDialogTitle>

        <UiAlertDialogDescription>
          Mettre à jour les données de l'évènement
        </UiAlertDialogDescription>
      </VisuallyHidden>

      <form>
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
              placeholder="Description brève de l'évènement"
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
        <UiAlertDialogAction @click="handleAction">
          Sauvegarder
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
