import type { LeimDate } from './Date'

export interface CalendarEvent {
  title: string
  startDate: LeimDate
  endDate?: LeimDate
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
  'joueurs',
  'découverte',
  'exploration',
  'construction',
  'arcanologie',
  'criminalité',
  'scandale'
] as const

export type CalendarEventCategory = (typeof calendarEventCategories)[number]

export function isCalendarEvent(object: any): object is CalendarEvent {
  return 'startDate' in object
}
