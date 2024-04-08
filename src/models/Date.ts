export interface LeimDate {
  day: number
  month: number
  year: number
  period?: LeimPeriod
}

export type LeimPeriod = 'ante' | 'nante'
export type LeimPeriodShort = 'A.R' | 'N.R'
export type LeimDateOrder = 'asc' | 'desc'

export const monthsPerYear: number = 10
export const daysPerYear: number = 320
export const daysPerMonth: number = 32
export const daysPerWeek: number = 6

/**
 * Check whether two dates are identical
 *
 * @param date1 First date
 * @param date2 Second date
 * @returns True if the dates are identical
 */
export function areDatesIdentical(date1: LeimDate, date2: LeimDate): boolean {
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
  const orderFactor: number = order === 'desc' ? 1 : -1

  // Compare eras
  if ((a.period === 'ante' && b.period === 'nante') || (a.year < 0 && b.year >= 0))
    return -1 * orderFactor
  if ((a.period === 'nante' && b.period === 'ante') || (a.year >= 0 && b.year < 0))
    return 1 * orderFactor

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
 * Converts a LeimDate to its equivalent in days
 *
 * @todo Handle negative dates
 * @param dateToConvert The date object
 * @returns How many days does it represent
 */
export function convertDateToDays(dateToConvert: LeimDate): number {
  let numberOfDays: number = dateToConvert.day

  numberOfDays = numberOfDays + dateToConvert.month * daysPerMonth
  numberOfDays = numberOfDays + dateToConvert.year * daysPerYear

  return numberOfDays
}

/**
 * From two dates, get the difference in days between them
 * @param baseDate The base date
 * @param relativeDate The year to compare it to
 * @returns The number of days separating the two dates (both positive and negative numbers)
 */
export function getDifferenceInDays(baseDate: LeimDate, relativeDate: LeimDate): number {
  return convertDateToDays(relativeDate) - convertDateToDays(baseDate)
}

/**
 * From two dates, gives information on how many years, months and days it has been / will be between them
 *
 * @param baseDate The base date
 * @param relativeDate The year to compare it to
 * @returns A string with info on how the relative date differs to the base date
 */
export function getRelativeString(baseDate: LeimDate, relativeDate: LeimDate): string {
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
    directionPrefix = 'Dans'
  } else if (direction === 'past') {
    directionPrefix = 'Il y a'
  }

  output += directionPrefix

  const yearPackets: number = Math.abs(Math.trunc(differenceInDays / daysPerYear))
  const monthPackets: number = Math.abs(Math.trunc(differenceInDays / daysPerMonth) % monthsPerYear)

  const remainingDays: number =
    Math.abs(differenceInDays) - (yearPackets * daysPerYear + monthPackets * daysPerMonth)

  // Assign year part
  if (yearPackets) {
    if (yearPackets === 1) {
      output += ` ${yearPackets} an`
    } else {
      output += ` ${yearPackets} ans`
    }
  }

  // Assign month part
  if (monthPackets) {
    // If there was a year packet(s), separate from them
    if (yearPackets) {
      output += ','
    }

    output += ` ${monthPackets} mois`
  }

  // Assign day part
  if (remainingDays) {
    // If there was a year OR month packet(s), separate from them
    if (yearPackets || monthPackets) {
      output += ' et'
    }

    if (remainingDays === 1) {
      output += ` ${remainingDays} jour`
    } else {
      output += ` ${remainingDays} jours`
    }
  }

  return output
}

// export function getRelativeDate(baseDate: LeimDate, relativeDate: LeimDate) {
//   let newDay: number
//   let newMonth: number
//   let newYear: number
//   let newPeriod: LeimPeriod

//   const differenceInDays = getDifferenceInDays(baseDate, relativeDate)

//   // console.log(baseDate, substractionDate)
//   console.log(getRelativeString(baseDate, relativeDate))

//   return differenceInDays

//   // return {
//   //   day: newDay,
//   //   month: newMonth,
//   //   year: newYear,
//   //   period: newPeriod
//   // }
// }
