import type { Category } from './Category'
import type { RPGDate } from './Date'

export interface CalendarEvent {
  id: number
  title: string
  startDate: RPGDate
  endDate?: RPGDate
  description?: string
  category?: Category
  hidden?: boolean
  wiki?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCalendarEvent(object: any): object is CalendarEvent {
  return 'startDate' in object
}
