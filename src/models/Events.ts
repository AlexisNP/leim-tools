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

export const calendarEventCategories = [
  'naissance',
  'mort',
  'catastrophe',
  'législation',
  'catastrophe naturelle',
  'inauguration',
  'religion',
  'invention',
  'science',
  'bénédiction',
  'joueurs'
]

export type CalendarEventCategory = (typeof calendarEventCategories)[number]

export function isCalendarEvent(object: any): object is CalendarEvent {
  return 'date' in object
}
