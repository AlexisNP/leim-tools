export interface LeimDate {
  day: number
  month: number
  year: number
  period: LeimPeriod
}

export type LeimPeriod = 'ante' | 'nante'
export type LeimPeriodShort = 'A.R' | 'N.R'
export type LeimDateOrder = 'asc' | 'desc'

export const monthsPerYear = 10
export const daysPerYear = 320
export const daysPerMonth = 32
export const daysPerWeek = 6

/**
 * Check whether two dates are identical
 *
 * @param date1 First date
 * @param date2 Second date
 * @returns True if the dates are identical
 */
export function areDatesIdentical(date1: LeimDate, date2: LeimDate) {
  return convertDateToDays({ ...date1 }) === convertDateToDays({ ...date2 })
}

/**
 * Compare dates
 *
 * @param date1 First date
 * @param date2 Second date
 * @returns 1 means the first date comes before the second, -1 means the second comes before the first, and 0 if they're identical
 */
export function compareDates(a: LeimDate, b: LeimDate, order: LeimDateOrder = 'desc'): number {
  // Reverses the order if specified
  const orderFactor = order === 'desc' ? 1 : -1

  if (a.period === 'ante' && b.period === 'nante') return -1 * orderFactor
  if (a.period === 'nante' && b.period === 'ante') return 1 * orderFactor

  if (a.year < b.year) return -1 * orderFactor
  if (a.year > b.year) return 1 * orderFactor

  if (a.month < b.month) return -1 * orderFactor
  if (a.month > b.month) return 1 * orderFactor

  if (a.day < b.day) return -1 * orderFactor
  if (a.day > b.day) return 1 * orderFactor

  return 0
}

export function convertDateToDays(dateToConvert: LeimDate) {
  let numberOfDays: number = dateToConvert.day

  numberOfDays = numberOfDays + dateToConvert.month * daysPerMonth
  numberOfDays = numberOfDays + dateToConvert.year * daysPerYear

  return numberOfDays
}

export function substractToDate(baseDate: LeimDate, substractionDate: LeimDate) {
  let newDay: number
  let newMonth: number
  let newYear: number
  let newPeriod: LeimPeriod

  // console.log(baseDate, substractionDate)
  // console.log(convertDateToDays(baseDate), convertDateToDays(substractionDate))

  return baseDate

  // return {
  //   day: newDay,
  //   month: newMonth,
  //   year: newYear,
  //   period: newPeriod
  // }
}

export function addToDate(firstDate: LeimDate, secondDate: LeimDate) {}
