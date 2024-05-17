import {
  type RPGDate,
} from '@/models/Date'
import { useLocalStorage, useUrlSearchParams } from '@vueuse/core'
import { defineStore, skipHydrate } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { CalendarMonth } from '~/models/CalendarMonth'

type CalendarViewType = 'month' | 'year' | 'decade' | 'century'

type CalendarCurrentConfig = {
  viewType: CalendarViewType
}

type CalendarCurrentDate = {
  currentDay: ComputedRef<number>
  currentMonth: ComputedRef<number>
  currentMonthName: ComputedRef<string>
  currentYear: ComputedRef<number>
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
  const months: Ref<CalendarMonth[]> = ref<CalendarMonth[]>([])

  function setMonths(data: CalendarMonth[]) {
    months.value = data
  }

  /**
   * Sorted month data
   */
  const sortedMonths = computed<CalendarMonth[]>(() => months.value.sort((a, b) => a.position - b.position))
  const monthsPerYear = computed(() => months.value.length)
  const daysPerYear = computed(() => months.value.reduce((acc, o) => acc + o.days, 0))

  const currentConfig: Ref<CalendarCurrentConfig> = ref({
    viewType: 'month'
  })
  const viewTypeOptions: Set<CalendarViewType> = new Set<CalendarViewType>([
    'month',
    'year',
    'decade',
    'century'
  ])

  // Default date settings (current day in the world)
  const defaultDay: number = 23
  const defaultMonth: number = 8
  const defaultYear: number = 3209
  const defaultDate: ComputedRef<RPGDate> = computed(() => {
    return {
      day: defaultDay,
      month: defaultMonth,
      year: defaultYear
    }
  })

  // Get date from URL params
  const params = useUrlSearchParams('history', {
    write: false,
    initialValue: {
      day: defaultDate.value.day.toString(),
      month: defaultDate.value.month.toString(),
      year: defaultDate.value.year.toString()
    }
  })

  const currentDay = computed<number>(() => {
    return Number(params.day)
  })

  const currentMonth = computed<number>(() => {
    return Number(params.month)
  })
  const currentMonthData = computed<CalendarMonth>(() => {
    return sortedMonths.value[currentMonth.value]
  })
  // Gets the label from currentMonth index
  const currentMonthName = computed<string>(() => getMonthName(currentMonth.value))

  const currentYear = computed<number>(() => {
    return Number(params.year)
  })

  const currentDateTitle = computed<string>(() => {
    switch (currentConfig.value.viewType) {
      case 'month':
        return getFormattedDateTitle({
          day: currentDate.currentDay.value,
          month: currentDate.currentMonth.value,
          year: currentDate.currentYear.value,
        })

      case 'year':
        return `Année ${currentYear.value}`

      case 'decade':
        return `Années ${currentYear.value} - ${currentYear.value + 10}`

      case 'century':
        return `Années ${currentYear.value} - ${currentYear.value + 100}`

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
    currentDateTitle
  }

  const currentRPGDate = computed<RPGDate>(() => {
    return {
      day: currentDate.currentDay.value,
      month: currentDate.currentMonth.value,
      year: currentDate.currentYear.value,
    }
  })

  const selectedDate = useLocalStorage<RPGDate>('selected-date', currentRPGDate.value, { deep: true })

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

  /**
   * Moves the current date forward one month
   */

  function incrementMonth(): void {
    let newValue = Number(params.month) + 1

    // If the new value would exceed the max number of month per year
    if (newValue >= monthsPerYear.value) {
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
      newValue = monthsPerYear.value - 1
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
      return monthsPerYear.value - 1
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

    if (target + 1 >= monthsPerYear.value) {
      return 0
    }

    return target
  }

  /**
   * Moves the current date to a particular month
   */
  function setMonth(target: number): void {
    // If the target is outside the month bounds
    if (target < 0 || target >= monthsPerYear.value) {
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
   * Get the formatted month name given its index
   *
   * @param monthNumber Index of the month
   * @returns Formatted month name
   */
  function getMonthName(monthNumber: number): string {
    const index = Number(monthNumber)
    return sortedMonths.value[index].name
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
   * From a RPGDate, returns the legible date title
   *
   * @param date Date target
   * @param showNumber Should the date show the day number
   * @returns Formatted date name
   */
  function getFormattedDateTitle(date: RPGDate, showNumber?: boolean): string {
    if (showNumber) {
      return `${date.day} ${getMonthName(date.month)} ${date.year}`
    }

    return `${getMonthName(date.month)} ${date.year}`
  }

  /**
   * Jumps the calendar to the given date
   *
   * @param date Target date
   */
  function jumpToDate(date: RPGDate): void {
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
  function selectDate(date: RPGDate): void {
    selectedDate.value = date
  }

  const isAdvancedSearchOpen: Ref<boolean> = ref<boolean>(false)

  function revealAdvancedSearch() {
    isAdvancedSearchOpen.value = true
  }

  return {
    months,
    setMonths,
    sortedMonths,
    daysPerYear,
    monthsPerYear,
    viewTypeOptions,
    currentConfig,
    currentDate,
    currentRPGDate,
    currentMonthData,
    defaultDate,
    selectedDate: skipHydrate(selectedDate),
    selectDate,
    params,
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
