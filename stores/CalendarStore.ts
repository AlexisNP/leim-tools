import {
  type RPGDate,
  type RPGDateOrder,
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
  const currentConfig: Ref<CalendarCurrentConfig> = ref({
    viewType: 'month'
  })
  const viewTypeOptions: Set<CalendarViewType> = new Set<CalendarViewType>([
    'month',
    'year',
    'decade',
    'century'
  ])

  const calendarId = ref<number>(0)

  function setCalendarId(data: number) {
    calendarId.value = data
  }
  /**
   * Month list (queried from API)
   */
  const months: Ref<CalendarMonth[]> = ref<CalendarMonth[]>([])

  function setMonths(data: CalendarMonth[]) {
    months.value = data
  }

  /**
   * Sorted month data using the raw months
   */
  const sortedMonths = computed<CalendarMonth[]>(() => months.value.sort((a, b) => a.position - b.position))
  const monthsPerYear = computed(() => months.value.length)
  const daysPerYear = computed(() => months.value.reduce((acc, o) => acc + o.days, 0))

  // Default date settings (current day in the world)
  // The base setting is the first day / month of year 0
  const defaultDay: Ref<number> = ref<number>(1)
  const defaultMonth: Ref<number> = ref<number>(0)
  const defaultYear: Ref<number> = ref<number>(0)

  // Object representation
  const defaultDate: ComputedRef<RPGDate> = computed(() => {
    return {
      day: defaultDay.value,
      month: defaultMonth.value,
      year: defaultYear.value
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

  /**
   * Sets the new defaultDate (aka the "today" value from the calendar)
   *
   * @param date The new data to set as defaultDate
   */
  function setDefaultDate(date: RPGDate) {
    defaultDay.value = date.day
    defaultMonth.value = date.month
    defaultYear.value = date.year
  }

  // Everytime the defaultDate changes / is set, we should update the params in the URL
  watch(defaultDate, () => {
    params.day = String(defaultDate.value.day)
    params.month = String(defaultDate.value.month)
    params.year = String(defaultDate.value.year)
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

    if (target + 1 > monthsPerYear.value) {
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
    if (sortedMonths.value[index]) {
      return sortedMonths.value[index].name
    }

    return ''
  }

  /**
   * State for advanced search modal
   */
  const isAdvancedSearchOpen: Ref<boolean> = ref<boolean>(false)

  /**
   * Opens the search modal
   */
  function revealAdvancedSearch() {
    isAdvancedSearchOpen.value = true
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
   * FORMATTING
   */
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
   * DATE JUMPS & SELECTION
   */
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

  /**
   * DATE OPERATIONS
   *
   * Used to convert dates, sort them and compare them
   */
  /**
   * Converts a RPGDate to its equivalent in days
   *
   * @param dateToConvert The date object
   * @returns How many days does it represent
   */
  function convertDateToDays(dateToConvert: RPGDate): number {
    let numberOfDays: number = dateToConvert.day

    // Get only the remaining months on the year
    const remainingMonths = sortedMonths.value.filter((m) => dateToConvert.month >= m.position)
    // From remaining months, reduce their days value
    const monthDaysToAdd = remainingMonths.reduce((a, b) => {
      return a + b.days
    }, 0)

    numberOfDays = numberOfDays + monthDaysToAdd
    numberOfDays = numberOfDays + dateToConvert.year * daysPerYear.value

    return numberOfDays - 1
  }

  /**
   * From two dates, get the difference in days between them
   * @param baseDate The base date
   * @param relativeDate The year to compare it to
   * @returns The number of days separating the two dates (both positive and negative numbers)
   */
  function getDifferenceInDays(baseDate: RPGDate, relativeDate: RPGDate): number {
    return convertDateToDays(relativeDate) - convertDateToDays(baseDate)
  }

  /**
   * Check whether two dates are identical
   *
   * @param date1 First date
   * @param date2 Second date
   * @returns True if the dates are identical
   */
  function areDatesIdentical(date1: RPGDate, date2: RPGDate): boolean {
    return getDifferenceInDays({ ...date1 }, { ...date2 }) === 0
  }

  /**
   * Compare dates (used for array sorting)
   *
   * @param date1 First date
   * @param date2 Second date
   * @returns 1 means the first date comes before the second, -1 means the second comes before the first, and 0 if they're identical
   */
  function compareDates(a: RPGDate, b: RPGDate, order: RPGDateOrder = 'desc'): number {
  // Reverses the order if specified
    const orderFactor: number = order === 'desc' ? 1 : -1

    // Compare years
    if (a.year < b.year) return -1 * orderFactor
    if (a.year > b.year) return 1 * orderFactor

    // Compare months
    if (a.month < b.month) return -1 * orderFactor
    if (a.month > b.month) return 1 * orderFactor

    // Compare days
    if (a.day < b.day) return -1 * orderFactor
    if (a.day > b.day) return 1 * orderFactor

    return 0
  }

  /**
   * From two dates, gives information on how many years, months and days it has been / will be between them
   *
   * @param baseDate The base date
   * @param relativeDate The year to compare it to
   * @returns A string with info on how the relative date differs to the base date
   */
  function getRelativeString(
    baseDate: RPGDate,
    relativeDate: RPGDate,
    formatting: 'compact' | 'complex' = 'complex'
  ): string {
    const differenceInDays: number = getDifferenceInDays(baseDate, relativeDate)
    let output: string = ''
    let direction: 'past' | 'present' | 'future' = 'present'
    let directionPrefix: string = ''

    // Check whether it's a past or future date
    if (differenceInDays > 0) {
      direction = 'future'
    } else if (differenceInDays < 0) {
      direction = 'past'
    }

    if (formatting === 'complex') {
    // Handle if it's the same date
      if (direction === 'present') {
        return "Aujourd'hui"
      }
      if (differenceInDays === -2) {
        return 'Avant-hier'
      }
      if (differenceInDays === -1) {
        return 'Hier'
      }
      if (differenceInDays === 1) {
        return 'Demain'
      }
      if (differenceInDays === 2) {
        return 'Après-demain'
      }

      // Get relevant prefix for the string
      if (direction === 'future') {
        directionPrefix = 'Dans '
      } else if (direction === 'past') {
        directionPrefix = 'Il y a '
      }

      output += directionPrefix
    }

    const isSameMonth = baseDate.month === relativeDate.month
    const isSameYear = baseDate.year === relativeDate.year

    // At this point, we are beyond simple scenarios and must calculate the distance accurately

    // Get which date should come first
    let ancientDate: RPGDate
    let futureDate: RPGDate

    if (direction === "future") {
      ancientDate = baseDate
      futureDate = relativeDate
    } else {
      ancientDate = relativeDate
      futureDate = baseDate
    }

    // The pivot point that will help proceed towards the relativeDate
    const datePivot: RPGDate = { ...ancientDate }
    // The accumulator that will hold the distance between the two dates
    const dateAcc: RPGDate = { day: 0, month: 0, year: 0 }

    // If we are on the same month / year during acceleration, just don't rev up
    if (isSameMonth && isSameYear) {
      dateAcc.day = futureDate.day - datePivot.day

      if (dateAcc.day === 1) {
        output += ` ${dateAcc.day} jour`
      } else {
        output += ` ${dateAcc.day} jours`
      }

      return output
    }

    // If we are on the same year during acceleration, just don't rev up the next month, it might overflow to the next year
    else if (isSameYear) {
      dateAcc.month = futureDate.month - datePivot.month

      output += ` ${dateAcc.month} mois`

      return output
    }

    // Else, we need to accelerate and decelerate
    else {
      // First, get all the remaining days in the current month
      const currentMonth = sortedMonths.value[datePivot.month]
      dateAcc.day = currentMonth.days - datePivot.day
      if (direction === 'future') {
        datePivot.month = getNextMonth(datePivot.month)
      } else {
        datePivot.month = getPreviousMonth(datePivot.month)
      }
      datePivot.day = 1

      // Then, get the remaining months in the year
      const remainingMonthsStart = sortedMonths.value.filter((m) => datePivot.month < m.position )
      if (direction === 'future') {
        dateAcc.month = remainingMonthsStart.length + 1
      } else {
        dateAcc.month = remainingMonthsStart.length - 1
      }
      datePivot.month = 0

      // Then, Accelerate through years
      dateAcc.month = dateAcc.month + ((futureDate.year - datePivot.year) - 1) * monthsPerYear.value
      datePivot.year = futureDate.year

      // Once we reached the relativeYear, decelerate and get through the extra months
      const remainingMonthsEnd = futureDate.month
      dateAcc.month = dateAcc.month + remainingMonthsEnd
      datePivot.month = futureDate.month

      // Then at the destination month, decelerate to get the rest of the days
      dateAcc.day = dateAcc.day + futureDate.day
      datePivot.day = futureDate.day

      const computedYear = Math.trunc(dateAcc.month / monthsPerYear.value)
      const remainderMonths = dateAcc.month % monthsPerYear.value

      if (computedYear >= 1 && remainderMonths) {
        output += ` ${computedYear} an(s) et ${remainderMonths} mois`
      }
      else if (computedYear >= 1 && !remainderMonths) {
        output += ` ${computedYear} an(s)`;
      }
      else {
        output += ` ${remainderMonths} mois`
      }

      return output
    }
  }

  return {
    calendarId,
    setCalendarId,
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
    setDefaultDate,
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
    convertDateToDays,
    getDifferenceInDays,
    areDatesIdentical,
    compareDates,
    getRelativeString,
    revealAdvancedSearch
  }
})
