import { computed, type Ref, type ComputedRef, ref } from 'vue'
import { defineStore } from 'pinia'
import { useUrlSearchParams } from '@vueuse/core'
import type { LeimPeriod, LeimPeriodShort } from '@/models/Date'

type CalendarViewType = 'month' | 'year' | 'decade' | 'century'

type CalendarStaticConfig = {
  months: string[]
  monthsPerYear: number
  daysPerYear: number
  daysPerMonth: number
  daysPerWeek: number
}

type CalendarCurrentConfig = {
  viewType: CalendarViewType
}

type CalendarCurrentDate = {
  currentDay: ComputedRef<string | string[]>
  currentMonth: ComputedRef<string | string[]>
  currentMonthName: ComputedRef<string>
  currentYear: ComputedRef<string | string[]>
  currentPeriod: Ref<LeimPeriod>
  currentPeriodAbbr: Ref<LeimPeriodShort>
}

export const useCalendar = defineStore('calendar', () => {
  /**
   * Static calendar config
   * This shouldn't change
   */
  /**
   * Month list
   */
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

  // Assign the static config
  const staticConfig: CalendarStaticConfig = {
    months,
    monthsPerYear: monthsPerYear.value,
    daysPerYear,
    daysPerMonth: daysPerMonth.value,
    daysPerWeek
  }

  const currentConfig: Ref<CalendarCurrentConfig> = ref({
    viewType: 'month'
  })

  // Get date from URL params
  const params = useUrlSearchParams('history', {
    removeNullishValues: true
  })

  // Default date settings (current day)
  const defaultDay = String(12)
  const defaultMonth = String(7)
  const defaultYear = String(3209)

  // Assign default values if no params exist in URL
  if (!params.day) {
    params.day = defaultDay
  }
  if (!params.month) {
    params.month = defaultMonth
  }
  if (!params.year) {
    params.year = defaultYear
  }

  const currentDay = computed(() => params.day)

  const currentMonth = computed(() => params.month)
  // Gets the label from currentMonth index
  const currentMonthName = computed(() => {
    const index = Number(currentMonth.value)
    return staticConfig.months[index]
  })

  const currentYear = computed(() => params.year)

  // Get period from currentYear
  const currentPeriod: ComputedRef<LeimPeriod> = computed(() => {
    const year = Number(currentYear.value)
    return year >= 0 ? 'nante' : 'ante'
  })
  const currentPeriodAbbr: ComputedRef<LeimPeriodShort> = computed(() => {
    return currentPeriod.value === 'ante' ? 'A.R' : 'N.R'
  })

  // Create base config
  const currentDate: CalendarCurrentDate = {
    currentDay,
    currentMonth,
    currentMonthName,
    currentYear,
    currentPeriod,
    currentPeriodAbbr
  }

  /**
   * Moves the current date forward one month
   */
  function incrementMonth() {
    // const oldValue = params.month
    let newValue = Number(params.month) + 1

    // If the new value would exceed the max number of month per year
    if (newValue >= staticConfig.monthsPerYear) {
      newValue = 0
      // Increment the year
      incrementYear()
    }

    params.month = newValue.toString()
  }

  /**
   * Moves the current date backward one month
   */
  function decrementMonth() {
    // const oldValue = params.month
    let newValue = Number(params.month) - 1

    // If the new value would go below 0
    if (newValue < 0) {
      newValue = staticConfig.monthsPerYear - 1
      // Decrement the year
      decrementYear()
    }

    params.month = newValue.toString()
  }

  /**
   * Moves the current date to a particular month
   */
  function setMonth(target: number) {
    // If the target is outside the month bounds
    if (target < 0 || target >= staticConfig.monthsPerYear) {
      return
    }

    params.month = target.toString()
  }

  /**
   * Moves the current date forward one year
   */
  function incrementYear(inc: number = 1) {
    const newValue = Number(params.year) + inc

    params.year = newValue.toString()
  }

  /**
   * Moves the current date backward one year
   */
  function decrementYear(inc: number = 1) {
    const newValue = Number(params.year) - inc

    params.year = newValue.toString()
  }

  /**
   * From a given year, returns a set of LeimPeriod identifier
   *
   * This is used in range use-cases
   *
   * @param year The year to display
   * @returns An object containing both short and long LeimPeriod
   */
  function getPeriodOfYear(year: string | number): { long: LeimPeriod; short: LeimPeriodShort } {
    const numYear = year as number

    return {
      long: numYear >= 0 ? 'nante' : 'ante',
      short: numYear >= 0 ? 'N.R' : 'A.R'
    }
  }

  return {
    staticConfig,
    currentConfig,
    currentDate,
    params,
    getPeriodOfYear,
    incrementMonth,
    decrementMonth,
    setMonth,
    incrementYear,
    decrementYear
  }
})
