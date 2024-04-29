<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'

import DayTile from './DayTile.vue'

const { staticConfig, getMonthName } = useCalendar()

const props = defineProps<{
  monthNumber: number
}>()

const tileMonthName: string = getMonthName(props.monthNumber)
</script>

<template>
  <div>
    <div class="font-medium">
      {{ tileMonthName }}
    </div>
    <div class="grid grid-cols-7">
      <DayTile
        v-for="day in staticConfig.daysPerMonth"
        :key="day"
        :month-number="monthNumber"
        :day-number="day"
      />
    </div>
  </div>
</template>
