<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { computed } from "vue"

const { defaultDate, areDatesIdentical, jumpToDefaultDate, getFormattedDateTitle } = useCalendar()
const { selectedDate } = storeToRefs(useCalendar())

const defaultDateFormatted: string = getFormattedDateTitle(defaultDate, true)

const isDefaultDate: ComputedRef<boolean> = computed<boolean>(() => areDatesIdentical(selectedDate.value, defaultDate))
</script>

<template>
  <UiTooltipProvider :delay-duration="250">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton size="sm" :disabled="isDefaultDate" @click="jumpToDefaultDate">
          {{ $t('entity.calendar.date.today') }}
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>{{ defaultDateFormatted }}</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>
