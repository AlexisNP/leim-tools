import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

type CalendarPeriod = 'ante' | 'nante'

type CalendarStaticConfig = {
  months: string[]
  monthsPerYear: number
  daysPerYear: number
  daysPerMonth: number
  daysPerWeek: number
}

type CalendarCurrentConfig = {
  currentPeriod: Ref<CalendarPeriod>
  currentYear: Ref<number>
  currentMonth: Ref<number>
  currentDay: Ref<number>
}

export const useCalendar = defineStore('calendar', () => {
  const months = [
    'Jalen',
    'Malsen',
    'Verlys',
    'Nalys',
    'Verdore',
    'Sidore',
    'Lyllion',
    'Rion',
    'Farene',
    'Dalvene'
  ]
  const monthsPerYear = computed(() => months.length)
  const daysPerYear = 320
  const daysPerMonth = computed(() => daysPerYear / monthsPerYear.value)
  const daysPerWeek = 6

  const staticConfig: CalendarStaticConfig = {
    months,
    monthsPerYear: monthsPerYear.value,
    daysPerYear,
    daysPerMonth: daysPerMonth.value,
    daysPerWeek
  }

  const currentPeriod: Ref<'nante' | 'ante'> = ref('nante')
  const currentYear = ref(3209)
  const currentMonth = ref(8)
  const currentDay = ref(12)

  const config: CalendarCurrentConfig = {
    currentPeriod,
    currentYear,
    currentMonth,
    currentDay
  }

  return { staticConfig, config }
})
