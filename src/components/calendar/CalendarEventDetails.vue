<script lang="ts" setup>
import type { CalendarEvent } from '@/models/Events'
import { useCalendar } from '@/stores/CalendarStore'

import { PopoverContent } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

const { getFormattedDateTitle } = useCalendar()

defineProps<{ event: CalendarEvent }>()
</script>

<template>
  <PopoverContent class="w-96" align="start">
    <div class="grid gap-1">
      <div class="text-lg font-semibold">
        {{ event.title }}
      </div>

      <div>
        {{ getFormattedDateTitle(event.date, true) }}
      </div>

      <div v-if="event.category || event.secondaryCategories">
        <ul class="flex gap-1">
          <li v-if="event.category">
            <Badge class="mix-blend-luminosity font-bold bg-gray-600" variant="secondary">
              {{ event.category }}
            </Badge>
          </li>

          <li v-for="cat in event.secondaryCategories" :key="cat">
            <Badge class="mix-blend-luminosity bg-gray-600" variant="secondary">
              {{ cat }}
            </Badge>
          </li>
        </ul>
      </div>

      <hr class="my-2" />

      <div class="italic text-slate-500">
        {{ event.description }}
      </div>
    </div>
  </PopoverContent>
</template>
