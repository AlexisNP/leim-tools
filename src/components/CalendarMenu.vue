<script lang="ts" setup>
import { useCalendar } from '@/stores/calendar'
import { computed } from 'vue'

const { currentConfig, currentDate, getPeriodOfYear } = useCalendar()

const navbarTitle = computed(() => {
  switch (currentConfig.viewType) {
    case 'month':
      return `${currentDate.currentMonthName} ${currentDate.currentYear} ${currentDate.currentPeriodAbbr}`

    case 'year':
      return `Année ${currentDate.currentYear} ${currentDate.currentPeriodAbbr}`

    case 'decade':
      return `Années ${Number(currentDate.currentYear)} ${getPeriodOfYear(Number(currentDate.currentYear)).short} - ${Number(currentDate.currentYear) + 10} ${getPeriodOfYear(Number(currentDate.currentYear) + 10).short}`

    case 'century':
      return `Années ${Number(currentDate.currentYear)} ${getPeriodOfYear(Number(currentDate.currentYear)).short} - ${Number(currentDate.currentYear) + 100} ${getPeriodOfYear(Number(currentDate.currentYear) + 100).short}`

    default:
      return ''
  }
})
</script>

<template>
  <header>
    <h1 class="text-2xl font-bold">
      {{ navbarTitle }}
    </h1>
  </header>
</template>
