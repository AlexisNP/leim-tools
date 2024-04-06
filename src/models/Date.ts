export interface LeimDate {
  day: number
  month: number
  year: number
  period: LeimPeriod
}

export type LeimPeriod = 'ante' | 'nante'
export type LeimPeriodShort = 'A.R' | 'N.R'
