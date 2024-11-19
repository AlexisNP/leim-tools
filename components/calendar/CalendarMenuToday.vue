<script lang="ts" setup>
import { computed } from "vue"

const { defaultDate, jumpToDefaultDate, getFormattedDateTitle, currentDate } = useCalendar()

const defaultDateFormatted: string = getFormattedDateTitle(defaultDate, true)

const buttonDisabledState: ComputedRef<boolean> = computed<boolean>(() => {
  return currentDate.currentMonth === defaultDate.month && currentDate.currentYear === defaultDate.year
})
</script>

<template>
  <UiTooltipProvider :delay-duration="250">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton size="sm" :disabled="buttonDisabledState" @click="jumpToDefaultDate">
          {{ $t('entity.calendar.date.today') }}
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>{{ defaultDateFormatted }}</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>
