<script lang="ts" setup>
import { computed } from 'vue'
import { useCalendar } from '@/stores/calendar'
import CalendarTile from '../CalendarTile.vue'

const { staticConfig } = useCalendar()

const daysPerMonth = computed(() => staticConfig.daysPerMonth)
</script>

<template>
  <div class="grid" :class="`grid-cols-10`">
    <CalendarTile v-for="day in daysPerMonth" :key="day">
      <span class="font-bold">{{ day }}</span>
    </CalendarTile>

    <CalendarTile v-for="nextMonthDay in 8" :key="nextMonthDay" faded>
      <span>{{ nextMonthDay }}</span>
    </CalendarTile>
  </div>
</template>
