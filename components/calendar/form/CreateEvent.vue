<script lang="ts" setup>
import type { RPGDate } from '~/models/Date';

import { PhAlarm, PhMapPinArea } from '@phosphor-icons/vue'

const { eventSkeleton } = storeToRefs(useCalendarEvents())
const { resetSkeleton, submitSkeleton } = useCalendarEvents()
const popoverOpen = ref(false)

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
  resetSkeleton()

  popoverOpen.value = true

  // Set skeleton initial startDate if it's known
  if (props.date) {
    eventSkeleton.value.startDate = { ...props.date } // We need to clone it otherwise the props ends up mutating (?)
  }
}

async function handleSubmit() {
  try {
    await submitSkeleton()

    popoverOpen.value = false
  } catch (err) {
    if (err instanceof Error) {
      formErrors.message = err.message
    }
  }
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
      class="pl-3 min-w-96 bg-slate-900 border-slate-800"
    >
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-y-4">
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

          <div class="col-span-2 pl-8">
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

          <div class="text-red-500 pl-8">
            <span class="text-sm">
              {{ formErrors.message }}
            </span>
          </div>

          <div class="text-right">
            <UiButton size="sm">
              Sauvegarder
            </UiButton>
          </div>
        </div>
      </form>
    </UiPopoverContent>
  </UiPopover>
</template>
