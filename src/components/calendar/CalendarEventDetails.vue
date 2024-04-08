<script lang="ts" setup>
import type { CalendarEvent } from '@/models/Events'
import { useCalendar } from '@/stores/CalendarStore'

import { PopoverContent } from '@/components/ui/popover'

const { getFormattedDateTitle } = useCalendar()

defineProps<{ event: CalendarEvent }>()
</script>

<template>
  <PopoverContent class="w-96" align="start">
    <div class="space-y-1">
      <div class="text-lg font-semibold">
        {{ event.title }}
      </div>
      <div class="">
        {{ getFormattedDateTitle(event.date, true) }}
      </div>
      <div class="italic text-slate-500">
        {{ event.description }}
      </div>
    </div>
  </PopoverContent>
</template>
