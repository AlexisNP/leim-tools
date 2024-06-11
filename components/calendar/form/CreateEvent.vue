<script lang="ts" setup>
import type { RPGDate } from '~/models/Date';
import { PhAlarm, PhCircleNotch, PhEye, PhEyeClosed, PhMapPinArea, PhTag } from '@phosphor-icons/vue'

const { eventSkeleton, operationInProgress } = storeToRefs(useCalendarEvents())
const { resetSkeleton, submitSkeleton, cancelLatestRequest } = useCalendarEvents()
const popoverOpen = ref(false)
const isLoading = ref(false)

const formErrors = reactive<{ message: string | null }>({
  message: null
})

const props = defineProps<{
  date?: RPGDate
  btnClass?: string
}>()

/**
 * Opens event creation's popover
 */
function openEventCreatePopover() {
  // If another operation is in progress, whether it's another create popup or a modal, don't bother opening it
  if (operationInProgress.value) {
    popoverOpen.value = false
    return
  }

  resetSkeleton()

  popoverOpen.value = true

  // Set skeleton initial startDate if it's known
  if (props.date) {
    eventSkeleton.value.startDate = { ...props.date } // We need to clone it otherwise the props ends up mutating (?)
  }
}

async function handleSubmit() {
  // Prevent form submission if already loading
  if (isLoading.value) return

  isLoading.value = true

  try {
    await submitSkeleton()

    popoverOpen.value = false
  } catch (err) {
    if (err instanceof Error) {
      formErrors.message = err.message
    }
  } finally {
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
  <UiPopover v-model:open="popoverOpen">
    <UiPopoverTrigger as-child>
      <button :class="btnClass" @click="openEventCreatePopover()" />
    </UiPopoverTrigger>
    <UiPopoverContent
      :align="'center'"
      :side="'right'"
      :collision-padding="60"
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="pl-3 min-w-96 bg-slate-900 border-slate-800"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @pointer-down-outside="handleClosing"
    >
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-y-3">
          <div class="col-span-2 pl-8">
            <input
              id="new-event-title"
              v-model="eventSkeleton.title"
              type="text"
              name="new-event-title"
              required
              placeholder="Titre de l'évènement"
              class="w-full -my-1 py-1 -mx-1 px-1 text-lg border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600">
          </div>

          <div class="col-span-2 my-2 pl-8">
            <textarea
              id="new-event-description"
              v-model="eventSkeleton.description"
              name="new-event-description"
              placeholder="Ajouter une description"
              class="w-full -my-1 py-1 -mx-1 px-1 min-h-24 max-h-36 text-sm border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600"
            />
          </div>

          <div class="col-span-2">
            <div class="flex items-center gap-4">
              <PhAlarm size="18" weight="fill" />

              <CalendarInputRPGDate
                v-model:model-value="eventSkeleton.startDate"
                placeholder="Date de début"
                :initial-date="props.date"
                :required="true"
              />

              <span>—</span>

              <CalendarInputRPGDate
                v-model:model-value="eventSkeleton.endDate"
                placeholder="Date de fin"
                :initial-date="props.date"
              />
            </div>
          </div>

          <div class="col-span-2">
            <div class="flex items-center gap-4">
              <PhTag size="18" weight="fill" />

              <CalendarInputEventCategories v-model="eventSkeleton.category" placeholder="Ajouter une catégorie principale" />
            </div>
          </div>

          <div class="col-span-2 mb-2">
            <div class="flex items-center gap-4">
              <PhMapPinArea size="18" weight="fill" />

              <input
                id="new-event-location"
                v-model="eventSkeleton.location"
                type="text"
                name="new-event-location"
                placeholder="Ajouter un endroit"
                class="w-full -my-1 py-2 px-2 text-sm border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600">
            </div>
          </div>

          <div class="col-span-2">
            <div class="flex items-center gap-4">
              <PhEye v-if="!eventSkeleton.hidden" size="18" weight="fill" />
              <PhEyeClosed v-else size="18" />

              <div class="flex items-center gap-x-2">
                <UiSwitch id="new-event-visibility" v-model:checked="eventSkeleton.hidden" />
                <UiLabel for="new-event-visibility">
                  <template v-if="!eventSkeleton.hidden">
                    Évènement visible
                  </template>
                  <template v-else>
                    Évènement caché
                  </template>
                </UiLabel>
              </div>
            </div>
          </div>

          <div class="text-red-500 pl-8">
            <span class="text-sm">
              {{ formErrors.message }}
            </span>
          </div>

          <div class="flex gap-2 justify-end">
            <Transition name="fade-delay">
              <UiButton v-if="isLoading" type="button" size="sm" variant="destructive" @click.prevent="handleCancel">
                Annuler
              </UiButton>
            </Transition>

            <UiButton size="sm" :disabled="isLoading">
              <Transition name="fade">
                <PhCircleNotch v-if="isLoading" size="20" class="opacity-50 animate-spin"/>
              </Transition>

              Sauvegarder
            </UiButton>
          </div>
        </div>
      </form>
    </UiPopoverContent>
  </UiPopover>
</template>
