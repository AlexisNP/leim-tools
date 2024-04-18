<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useCalendar } from '@/stores/CalendarStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import Button from '../ui/button/Button.vue'
import { areDatesIdentical } from '@/models/Date'

const { defaultDate, selectedDate } = storeToRefs(useCalendar())
const { jumpToDefaultDate, getFormattedDateTitle } = useCalendar()

const defaultDateFormatted = computed(() => getFormattedDateTitle(defaultDate.value, true))

const isDefaultDate = computed(() => {
  return areDatesIdentical(selectedDate.value, defaultDate.value)
})
</script>

<template>
  <TooltipProvider :delayDuration="250">
    <Tooltip>
      <TooltipTrigger>
        <Button @click="jumpToDefaultDate" size="sm" :disabled="isDefaultDate">
          Aujourd'hui
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ defaultDateFormatted }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
