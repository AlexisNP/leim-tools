<script lang="ts" setup>
import { PhAlarm, PhCircleNotch, PhEye, PhEyeClosed, PhMapPinArea, PhPencilSimpleLine, PhTag } from "@phosphor-icons/vue"

const { resetSkeleton, updateEventFromSkeleton, cancelLatestRequest } = useCalendar()
const { eventSkeleton, lastActiveEvent, isEditEventModalOpen } = storeToRefs(useCalendar())

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
      class="pl-3 min-w-96 border-indigo-200 dark:bg-slate-950 dark:border-indigo-950"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @pointer-down-outside="(e) => e.preventDefault()"
    >
      <header class="pl-8 grid gap-y-2">
        <UiDialogTitle>
          {{ $t('entity.calendar.event.editDialog.title') }}
        </UiDialogTitle>

        <UiDialogDescription>
          {{ $t('entity.calendar.event.editDialog.subtitle') }}
        </UiDialogDescription>
      </header>

      <form @submit.prevent="handleAction">
        <div class="grid grid-cols-2 gap-y-3">
          <div class="col-span-2">
            <div class="flex items-center gap-4">
              <PhPencilSimpleLine size="20" weight="fill" />

              <input
                id="new-event-title"
                v-model="eventSkeleton.title"
                type="text"
                name="new-event-title"
                required
                :placeholder="$t('entity.calendar.event.title')"
                class="w-full -my-1 py-1 -mx-1 px-1 text-lg border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600"
              >
            </div>
          </div>

          <div class="col-span-2 my-2 ml-8">
            <textarea
              id="new-event-description"
              v-model="eventSkeleton.description"
              name="new-event-description"
              :placeholder="$t('entity.addDescription')"
              class="w-full -my-1 py-1 -mx-1 px-1 min-h-24 max-h-36 text-sm border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600"
            />
          </div>

          <div class="col-span-2">
            <div class="flex items-center gap-4">
              <PhAlarm size="18" weight="fill" />

              <CalendarInputRPGDate
                v-model:model-value="eventSkeleton.startDate"
                :placeholder="$t('entity.calendar.date.start')"
                :initial-date="lastActiveEvent?.startDate"
                :required="true"
              />

              <span>—</span>

              <CalendarInputRPGDate
                v-model:model-value="eventSkeleton.endDate"
                :placeholder="$t('entity.calendar.date.end')"
                :initial-date="lastActiveEvent?.endDate"
              />
            </div>
          </div>

          <div class="col-span-2">
            <div class="flex items-center gap-4">
              <PhTag size="18" weight="fill" />

              <div class="w-1/2">
                <CalendarInputEventCategory v-model="eventSkeleton.category" placeholder="Ajouter une catégorie principale" />
              </div>
            </div>
          </div>

          <!-- <div class="col-span-2">
            <div class="flex items-center gap-4">
              <PhTag size="18" weight="fill" />

              <div class="w-1/2">
                <CalendarInputEventCategories v-model="eventSkeleton.secondaryCategories" :placeholder="Ajouter des catégories secondaires" />
              </div>
            </div>
          </div> -->

          <div class="col-span-2 mb-2">
            <div class="flex items-center gap-4">
              <PhMapPinArea size="18" weight="fill" />

              <input
                id="new-event-location"
                v-model="eventSkeleton.location"
                type="text"
                name="new-event-location"
                :placeholder="$t('entity.calendar.event.addLocation')"
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
                    {{ $t('entity.calendar.event.isPublic') }}
                  </template>
                  <template v-else>
                    {{ $t('entity.calendar.event.isHidden') }}
                  </template>
                </UiLabel>
              </div>
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
              {{ $t('ui.action.cancel') }}
            </UiButton>
          </Transition>

          <UiButton size="sm" :disabled="isLoading">
            <Transition name="fade">
              <PhCircleNotch v-if="isLoading" size="20" class="animate-spin"/>
            </Transition>

            {{ $t('ui.action.save') }}
          </UiButton>
        </footer>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
