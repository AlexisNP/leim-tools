<script lang="ts" setup>
import type { LeimDate } from '@/models/Date'
import { useCalendar } from '@/stores/CalendarStore'
import { computed, type ComputedRef } from 'vue'

import DayTile from './DayTile.vue'

const { staticConfig, currentDate, getMonthName } = useCalendar()

const props = defineProps<{
  monthNumber: number
}>()

const daysPerMonth = computed(() => staticConfig.daysPerMonth)
const tileMonthName = computed(() => getMonthName(props.monthNumber))
</script>

<template>
  <div>
    <div class="font-medium">
      {{ tileMonthName }}
    </div>
    <div class="grid grid-cols-7">
      <DayTile
        v-for="day in daysPerMonth"
        :key="day"
        :month-number="monthNumber"
        :day-number="day"
      />
    </div>
  </div>
</template>
