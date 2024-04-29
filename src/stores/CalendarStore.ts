import {
  monthsPerYear,
  daysPerWeek,
  daysPerMonth,
  daysPerYear,
  type LeimDate,
  type LeimPeriod,
  type LeimPeriodShort
} from '@/models/Date'
import { isDigit, isInt, isSignedInt } from '@/utils/Regex'
import { useStorage, useUrlSearchParams } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

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
  currentDay: ComputedRef<number>
  currentMonth: ComputedRef<number>
  currentMonthName: ComputedRef<string>
  currentYear: ComputedRef<number>
  currentPeriod: Ref<LeimPeriod>
  currentPeriodAbbr: Ref<LeimPeriodShort>
  currentDateTitle: ComputedRef<string>
}

export const useCalendar = defineStore('calendar', () => {
  /**
   * Static calendar config
   * This shouldn't change
   */
  /**
   * Month list
   */
  const months: string[] = [
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

  // Assign the static config
  const staticConfig: CalendarStaticConfig = {
    months,
    monthsPerYear,
    daysPerYear,
    daysPerMonth,
    daysPerWeek
  }

  const currentConfig: Ref<CalendarCurrentConfig> = ref({
    viewType: 'month'
  })
  const viewTypeOptions: Set<CalendarViewType> = new Set<CalendarViewType>([
    'month',
    'year',
    'decade',
    'century'
  ])

  // Get date from URL params
  const params = useUrlSearchParams('history', {
    write: true
  })

  // Default date settings (current day in the world)
  const defaultDay: number = 23
  const defaultMonth: number = 8
  const defaultYear: number = 3209
  const defaultDate: ComputedRef<LeimDate> = computed(() => {
    return {
      day: defaultDay,
      month: defaultMonth,
      year: defaultYear
    }
  })

  const currentDay = computed<number>(() => {
    return Number(params.day)
  })

  const currentMonth = computed<number>(() => {
    return Number(params.month)
  })
  // Gets the label from currentMonth index
  const currentMonthName = computed<string>(() => getMonthName(currentMonth.value))

  const currentYear = computed<number>(() => {
    return Number(params.year)
  })

  // Get period from currentYear
  const currentPeriod = computed<LeimPeriod>(() => getPeriodOfYear(currentYear.value).long)
  const currentPeriodAbbr = computed<LeimPeriodShort>(
    () => getPeriodOfYear(currentYear.value).short
  )

  const currentDateTitle = computed<string>(() => {
    switch (currentConfig.value.viewType) {
      case 'month':
        return getFormattedDateTitle({
          day: currentDate.currentDay.value,
          month: currentDate.currentMonth.value,
          year: currentDate.currentYear.value,
          period: currentDate.currentPeriod.value
        })

      case 'year':
        return `Année ${currentYear.value} ${currentPeriodAbbr.value}`

      case 'decade':
        return `Années ${currentYear.value} ${getPeriodOfYear(currentYear.value).short} - ${currentYear.value + 10} ${getPeriodOfYear(currentYear.value + 10).short}`

      case 'century':
        return `Années ${currentYear.value} ${getPeriodOfYear(currentYear.value).short} - ${currentYear.value + 100} ${getPeriodOfYear(currentYear.value + 100).short}`

      default:
        return 'Date inconnue'
    }
  })

  // Create base config
  const currentDate: CalendarCurrentDate = {
    currentDay,
    currentMonth,
    currentMonthName,
    currentYear,
    currentPeriod,
    currentPeriodAbbr,
    currentDateTitle
  }

  const currentLeimDate = computed<LeimDate>(() => {
    return {
      day: currentDate.currentDay.value,
      month: currentDate.currentMonth.value,
      year: currentDate.currentYear.value,
      period: currentDate.currentPeriod.value
    }
  })

  const selectedDate = useStorage<LeimDate>('selected-date', currentLeimDate.value)

  /**
   * Check whether the current viewType is active
   */
  const isCurrentScreenActive = computed<boolean>(() => {
    switch (currentConfig.value.viewType) {
      case 'month':
        return (
          defaultDate.value.month === currentDate.currentMonth.value &&
          defaultDate.value.year === currentDate.currentYear.value
        )

      case 'year':
      case 'decade':
      case 'century':
        return defaultDate.value.year === currentDate.currentYear.value

      default:
        return false
    }
  })

  function validateUrlParams(): void {
    // Assign default values if no params exist in URL
    if (!params.day || typeof params.day === 'object' || !isInt(params.day)) {
      params.day = defaultDate.value.day.toString()
    }
    if (!params.month || typeof params.month === 'object' || !isDigit(params.month)) {
      params.month = defaultDate.value.month.toString()
    }
    if (!params.year || typeof params.year === 'object' || !isSignedInt(params.year)) {
      params.year = defaultDate.value.year.toString()
    }
  }

  /**
   * Moves the current date forward one month
   */
  function incrementMonth(): void {
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
  function decrementMonth(): void {
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
   * Get the previous month number
   *
   * @param monthNumber Initial month
   * @returns The previous month number in the year
   */
  function getPreviousMonth(monthNumber: number): number {
    const target: number = monthNumber - 1

    if (target < 0) {
      return monthsPerYear - 1
    }

    return target
  }

  /**
   * Get the following month number
   *
   * @param monthNumber Initial month
   * @returns The next month number in the year
   */
  function getNextMonth(monthNumber: number): number {
    const target: number = monthNumber + 1

    if (target + 1 >= monthsPerYear) {
      return 0
    }

    return target
  }

  /**
   * Moves the current date to a particular month
   */
  function setMonth(target: number): void {
    // If the target is outside the month bounds
    if (target < 0 || target >= staticConfig.monthsPerYear) {
      return
    }

    params.month = target.toString()
  }

  /**
   * Moves the current date forward one year
   */
  function incrementYear(inc: number = 1): void {
    const newValue = Number(params.year) + inc

    params.year = newValue.toString()
  }

  /**
   * Moves the current date backward one year
   */
  function decrementYear(inc: number = 1): void {
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

  /**
   * Get the formatted month name given its index
   *
   * @param monthNumber Index of the month
   * @returns Formatted month name
   */
  function getMonthName(monthNumber: number): string {
    const index = Number(monthNumber)
    return staticConfig.months[index]
  }

  /**
   * Switches the active viewType
   *
   * @param viewType Target viewType
   */
  function setViewType(viewType: CalendarViewType): void {
    currentConfig.value.viewType = viewType
  }

  /**
   * Gets the formatted viewType title
   *
   * @param viewType Target viewType
   * @returns Formatted mode title
   */
  function getViewTypeTitle(viewType: CalendarViewType): string {
    switch (viewType) {
      case 'year':
        return 'Année'

      case 'decade':
        return 'Décennie'

      case 'century':
        return 'Siècle'

      case 'month':
      default:
        return 'Mois'
    }
  }

  /**
   * From a LeimDate, returns the legible date title
   *
   * @param date Date target
   * @param showNumber Should the date show the day number
   * @returns Formatted date name
   */
  function getFormattedDateTitle(date: LeimDate, showNumber?: boolean): string {
    if (showNumber) {
      return `${date.day} ${getMonthName(date.month)} ${date.year} ${getPeriodOfYear(date.year).short}`
    }

    return `${getMonthName(date.month)} ${date.year} ${getPeriodOfYear(date.year).short}`
  }

  /**
   * Jumps the calendar to the given date
   *
   * @param date Target date
   */
  function jumpToDate(date: LeimDate): void {
    params.day = date.day.toString()
    params.month = date.month.toString()
    params.year = date.year.toString()
    selectDate(date)
  }

  /**
   * Jump the calendar to the default date
   */
  function jumpToDefaultDate(): void {
    jumpToDate(defaultDate.value)
  }

  /**
   * Jump the calendar to the default date
   */
  function selectDate(date: LeimDate): void {
    selectedDate.value = date
  }

  const isAdvancedSearchOpen: Ref<boolean> = ref<boolean>(false)

  function revealAdvancedSearch() {
    isAdvancedSearchOpen.value = true
  }

  return {
    staticConfig,
    viewTypeOptions,
    currentConfig,
    currentDate,
    currentLeimDate,
    defaultDate,
    selectedDate,
    selectDate,
    params,
    validateUrlParams,
    getPeriodOfYear,
    incrementMonth,
    decrementMonth,
    setMonth,
    getPreviousMonth,
    getNextMonth,
    incrementYear,
    decrementYear,
    jumpToDate,
    jumpToDefaultDate,
    getFormattedDateTitle,
    getMonthName,
    setViewType,
    getViewTypeTitle,
    isCurrentScreenActive,
    isAdvancedSearchOpen,
    revealAdvancedSearch
  }
})
