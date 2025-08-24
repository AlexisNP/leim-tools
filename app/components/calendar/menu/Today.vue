<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { PhCalendar } from "@phosphor-icons/vue"

const { defaultDate, jumpToDefaultDate, getFormattedDateTitle, currentDate } = useCalendar()

const defaultDateFormatted: string = getFormattedDateTitle(defaultDate, true)

const buttonDisabledState: ComputedRef<boolean> = computed<boolean>(() => {
  return currentDate.currentMonth === defaultDate.month && currentDate.currentYear === defaultDate.year
})

const breakpoints = useBreakpoints(
  breakpointsTailwind
)
</script>

<template>
  <ClientOnly>
    <UiTooltipProvider :delay-duration="250">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton
            :size="breakpoints.md.value ? 'default' : 'icon'"
            variant="secondary"
            :disabled="buttonDisabledState" @click="jumpToDefaultDate"
          >
            <PhCalendar v-if="!breakpoints.md.value" size="20" weight="fill" />

            <span v-if="breakpoints.md.value">
              {{ $t('entity.calendar.date.today') }}
            </span>
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>
          <p>{{ defaultDateFormatted }}</p>
        </UiTooltipContent>
      </UiTooltip>
    </UiTooltipProvider>
  </ClientOnly>
</template>
