import type { LeimDate } from './Date'

export interface CalendarEvent {
  title: string
  date: LeimDate
  description?: string
  category?: CalendarEventCategory
}

export type CalendarEventCategory =
  | 'birth'
  | 'death'
  | 'catastrophe'
  | 'legal'
  | 'natural-disaster'
  | 'inauguration'
  | 'religious'
  | 'player'

export function isCalendarEvent(object: any): object is CalendarEvent {
  return 'date' in object
}
