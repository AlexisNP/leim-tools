import type { CalendarEvent } from "./CalendarEvent"
import type { CalendarMonth } from "./CalendarMonth"

export interface CalendarConfig {
  months: CalendarMonth[]
  daysPerMonth: number
}

export interface Calendar extends CalendarConfig {
  id: number
  events: CalendarEvent[]
}
