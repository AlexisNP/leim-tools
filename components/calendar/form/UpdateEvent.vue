<script lang="ts" setup>
import {
  PhAlarm
} from '@phosphor-icons/vue'
import type { CalendarEvent } from '~/models/CalendarEvent';

import { PopoverAnchor } from 'radix-vue'

const popoverOpened = defineModel<boolean>()
const { eventSkeleton } = storeToRefs(useCalendarEvents())
const { resetSkeleton } = useCalendarEvents()

const formErrors = reactive<{ message: string | null }>({
  message: null
})

const props = defineProps<{
  event: CalendarEvent,
  anchor?: HTMLElement
}>()

// Watch the popover state
watch(popoverOpened, (hasOpened, _o) => {
  if (hasOpened) {
    eventSkeleton.value = { ...props.event }
  } else {
    resetSkeleton()
  }
})
</script>

<template>
  <UiPopover v-model:open="popoverOpened" :modal="true">
    <PopoverAnchor v-if="anchor" :element="anchor" />
    <UiPopoverContent
      :align="'center'"
      :side="'right'"
      :collision-padding="60"
      class="pl-3 min-w-96 bg-slate-900 border-slate-800"
    >
      <form>
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
                :initial-date="props.event.startDate"
                :required="true"
              />

              <span>—</span>

              <CalendarInputRPGDate
                v-model:model-value="eventSkeleton.endDate"
                placeholder="Date de fin"
                :initial-date="props.event.endDate"
              />
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
