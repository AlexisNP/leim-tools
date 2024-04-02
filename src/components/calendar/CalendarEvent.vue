<script lang="ts" setup>
import { computed } from 'vue'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import type { CalendarEvent } from '@/stores/events'
import CalendarEventDetails from './CalendarEventDetails.vue'

const props = defineProps<{
  event: CalendarEvent
}>()

const eventTitleExcerpt = computed(() => {
  if (props.event.title.length > 20) return props.event.title.substring(0, 20) + '…'
  return props.event.title
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <button
        class="text-xs text-white px-2 py-1 bg-pink-700 block w-full text-left rounded-sm hover:bg-pink-800"
      >
        {{ eventTitleExcerpt }}
      </button>
    </PopoverTrigger>

    <CalendarEventDetails :event />
  </Popover>
</template>
