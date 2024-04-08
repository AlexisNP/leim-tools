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
  | 'birth'
  | 'death'
  | 'catastrophe'
  | 'legal'
  | 'natural-disaster'
  | 'inauguration'
  | 'religious'
  | 'invention'
  | 'science'
  | 'boon' // Great event on a global scale
  | 'player'

export function isCalendarEvent(object: any): object is CalendarEvent {
  return 'date' in object
}
