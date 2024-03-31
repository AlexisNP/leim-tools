export type LeimDate = {
  day: number
  month: number
  year: number
  period: LeimPeriod
}

export type LeimPeriod = 'ante' | 'nante'
