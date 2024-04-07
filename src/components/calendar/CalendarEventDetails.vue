<script lang="ts" setup>
import { PopoverContent } from '@/components/ui/popover'
import type { CalendarEvent } from '@/models/Events'
import { useCalendar } from '@/stores/CalendarStore'

const { getFormattedDateTitle } = useCalendar()

defineProps<{ event: CalendarEvent }>()
</script>

<template>
  <PopoverContent class="w-96" align="start">
    <div class="space-y-1">
      <div class="font-semibold">
        {{ event.title }}
      </div>
      <div class="text-sm">
        {{ getFormattedDateTitle(event.date, true) }}
      </div>
      <div class="text-sm italic text-slate-500">
        {{ event.description }}
      </div>
    </div>
  </PopoverContent>
</template>
