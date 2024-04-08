import type { LeimDate } from './Date'

export interface CalendarEvent {
  title: string
  date: LeimDate
  description?: string
  category?: CalendarEventCategory
  secondaryCategories?: CalendarEventCategory[]
  hidden?: boolean
  wiki?: string
}

export type CalendarEventCategory =
  | 'naissance'
  | 'mort'
  | 'catastrophe'
  | 'législation'
  | 'catastrophe-naturel'
  | 'inauguration'
  | 'religion'
  | 'invention'
  | 'science'
  | 'bénédiction' // Great event on a global scale
  | 'joueurs'

export function isCalendarEvent(object: any): object is CalendarEvent {
  return 'date' in object
}
