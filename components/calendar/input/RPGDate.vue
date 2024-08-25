<script lang="ts" setup>
import type { RPGDate } from "~/models/Date";

import {
  PhXCircle
} from "@phosphor-icons/vue"

const model = defineModel<RPGDate | null>()

const id = useId()

const props = defineProps<{
  initialDate?: RPGDate
  placeholder?: string
  required?: boolean
}>()

const { getFormattedDateTitle, getMonthName, defaultDate } = useCalendar()
const { sortedMonths } = storeToRefs(useCalendar())

const popoverOpened = ref<boolean>(false)

const inputPlaceholder = computed<string>(() => {
  if (model.value) {
    return getFormattedDateTitle(model.value, true)
  } else if (props.placeholder) {
    return props.placeholder
  }

  return ""
})

const initialDateValue = props.initialDate ? { ...props.initialDate } : null

const monthTitle = computed<string>(() => {
  if (model.value) {
    return getMonthName(model.value.month)
  }

  return ""
})

const hasValue = computed<boolean>(() => !!model.value)
const monthData = computed(() => {
  if (model.value) {
    return sortedMonths.value[model.value.month]
  }

  return null
})

function setModelDay(day: number) {
  if (model.value) {
    model.value.day = day
  }
}

function handleMonthChange(e: string) {
  const monthId = Number(e)

  if (model.value) {
    model.value.month = monthId
  }
}

/**
 * Handle click if the date is null
 */
function handleNullClick() {
  // Early return
  if (model.value) return

  if (!model.value) {
    if (props.initialDate) {
      model.value = initialDateValue
    } else {
      model.value = { ...defaultDate }
    }
  }
}

function handleValueReset() {
  // Early return
  if (!model.value) return

  model.value = null
}
</script>

<template>
  <UiPopover v-model:open="popoverOpened">
    <UiPopoverTrigger>
      <div class="flex">
        <UiButton
          size='sm'
          variant="outline"
          :class="{
            'text-slate-500': !hasValue,
            'rounded-tr-none rounded-br-none': model
          }"
          @click.prevent="handleNullClick"
        >
          {{ inputPlaceholder }}
        </UiButton>
        <UiButton
          v-if="model && !required"
          size='sm'
          variant="outline"
          class="rounded-tl-none rounded-bl-none px-2"
          @click.prevent="handleValueReset"
        >
          <PhXCircle size="14" />
        </UiButton>
      </div>
    </UiPopoverTrigger>
    <UiPopoverContent
      v-if="model"
      align="start"
      side="bottom"
      class="bg-slate-900 border-slate-800"
    >
      <div class="grid grid-cols-2 items-center gap-x-2 gap-y-3">
        <UiSelect @update:model-value="handleMonthChange">
          <UiSelectTrigger>
            <UiSelectValue :placeholder="monthTitle" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectGroup class="max-h-[50vh]">
              <UiSelectItem v-for="(month, i) in sortedMonths" :key="`popover-select-item-${id}-${i}`" :value="i.toString()">
                {{ month.name }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>

        <UiInput v-model="model.year" type="number" />

        <!-- <nav class="flex items-center justify-end gap-2">
          <UiButton variant="outline" size="icon" class="w-8 h-8" @click="decrementModelMonth()">
            <PhCaretLeft size="14" />
          </UiButton>
          <UiButton variant="outline" size="icon" class="w-8 h-8" @click="incrementModelMonth()">
            <PhCaretRight size="14" />
          </UiButton>
        </nav> -->

        <hr class="col-span-2" >

        <div class="col-span-2">
          <div v-if="monthData" class="grid grid-cols-7 gap-1">
            <button
              v-for="day in monthData.days"
              :key="`popover-day-grid-${id}-${day}`"
              class="aspect-square rounded-full text-[.8em] transition-colors hover:bg-slate-700"
              :class="{'bg-blue-500 hover:bg-blue-700': day === model.day}"
              @click="setModelDay(day)"
            >
              {{ day }}
            </button>
          </div>
        </div>
      </div>

    </UiPopoverContent>
  </UiPopover>
</template>
