<script lang="ts" setup>
import type { CalendarMonth } from "~/models/CalendarMonth";

defineProps<{
  month: CalendarMonth
}>()
</script>

<template>
  <div>
    <div class="font-medium">
      {{ month.name }}
    </div>
    <div class="grid grid-cols-7">
      <CalendarStateYearlyDayTile
        v-for="day in month.days"
        :key="day"
        :month-number="month.position"
        :day-number="day"
      />
    </div>
  </div>
</template>
