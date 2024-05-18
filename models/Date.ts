export interface RPGDate {
  day: number
  month: number
  year: number
}

export type RPGDateOrder = 'asc' | 'desc'

// export function getRelativeDate(baseDate: RPGDate, relativeDate: RPGDate) {
//   let newDay: number
//   let newMonth: number
//   let newYear: number
//   let newPeriod: RPGPeriod

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
