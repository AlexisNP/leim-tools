<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { areDatesIdentical } from '@/models/Date'

const { defaultDate, selectedDate } = storeToRefs(useCalendar())
const { jumpToDefaultDate, getFormattedDateTitle } = useCalendar()

const defaultDateFormatted = getFormattedDateTitle(defaultDate.value, true)

const isDefaultDate = computed(() => {
  return areDatesIdentical(selectedDate.value, defaultDate.value)
})
</script>

<template>
  <UiTooltipProvider :delay-duration="250">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton size="sm" :disabled="isDefaultDate" @click="jumpToDefaultDate">
          Aujourd'hui
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>{{ defaultDateFormatted }}</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>
