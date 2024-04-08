<script lang="ts" setup>
import { getRelativeString } from '@/models/Date'
import type { CalendarEvent } from '@/models/Events'
import { useCalendar } from '@/stores/CalendarStore'
import { computed } from 'vue'

import { PhHourglassMedium } from '@phosphor-icons/vue'
import { Badge } from '@/components/ui/badge'
import { PopoverContent } from '@/components/ui/popover'

const { defaultDate, getFormattedDateTitle } = useCalendar()

const props = defineProps<{ event: CalendarEvent }>()

const dateDifference = computed(() => getRelativeString(defaultDate, props.event.date))
</script>

<template>
  <PopoverContent class="w-96" align="start" :align-offset="50" :collision-padding="20">
    <div class="grid gap-1">
      <div class="text-lg font-semibold">
        {{ event.title }}
      </div>

      <div class="mb-1 space-y-1">
        <p class="font-semibold">{{ getFormattedDateTitle(event.date, true) }}</p>
        <p class="text-sm italic opacity-75 flex items-center gap-1">
          <PhHourglassMedium size="16" weight="fill" /> {{ dateDifference }}
        </p>
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

      <div class="mt-2 italic text-sm text-slate-500">
        {{ event.description }}
      </div>
    </div>
  </PopoverContent>
</template>
